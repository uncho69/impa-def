import crypto from "crypto";
import { hasDatabase, pool } from "@/lib/db";
import { ensureAccessGateTables } from "@/lib/db/ensure-access-gate-tables";

export const ACCESS_GATE_COOKIE_NAME = "idf_access_gate_session";
export const ACCESS_GATE_SESSION_HOURS = 12;

type PasswordStatus = "active" | "used" | "revoked";

export type AccessGatePasswordRow = {
  id: number;
  code: string;
  status: PasswordStatus;
  usedAt: string | null;
  revokedAt: string | null;
  createdBy: string | null;
  createdAt: string;
  recipientName: string | null;
};

const NO_DB_STORE_KEY = "__idfAccessGateStore";

type NoDbPassword = {
  id: number;
  code: string;
  status: PasswordStatus;
  usedAt: string | null;
  revokedAt: string | null;
  createdBy: string | null;
  createdAt: string;
  recipientName: string | null;
};

type NoDbSession = {
  token: string;
  expiresAt: number;
  isAdminBypass: boolean;
};

type NoDbStore = {
  nextId: number;
  passwords: NoDbPassword[];
  sessions: NoDbSession[];
};

function getNoDbStore(): NoDbStore {
  const g = globalThis as Record<string, unknown>;
  if (!g[NO_DB_STORE_KEY]) {
    g[NO_DB_STORE_KEY] = {
      nextId: 1,
      passwords: [],
      sessions: [],
    } as NoDbStore;
  }
  return g[NO_DB_STORE_KEY] as NoDbStore;
}

function mapDbRow(row: Record<string, unknown>): AccessGatePasswordRow {
  return {
    id: Number(row.id),
    code: String(row.code),
    status: String(row.status) as PasswordStatus,
    usedAt: row.used_at ? String(row.used_at) : null,
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    createdBy: row.created_by ? String(row.created_by) : null,
    createdAt: String(row.created_at),
    recipientName: row.recipient_name != null ? String(row.recipient_name) : null,
  };
}

export function generateAccessPasswordCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(12);
  let raw = "";
  for (let i = 0; i < 12; i += 1) {
    raw += alphabet[bytes[i] % alphabet.length];
  }
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function sessionExpiryDate(): Date {
  return new Date(Date.now() + ACCESS_GATE_SESSION_HOURS * 60 * 60 * 1000);
}

export async function createAccessGatePassword(createdBy: string | null): Promise<AccessGatePasswordRow> {
  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    let code = generateAccessPasswordCode();
    while (store.passwords.some((p) => p.code === code)) {
      code = generateAccessPasswordCode();
    }
    const nowIso = new Date().toISOString();
    const item: NoDbPassword = {
      id: store.nextId++,
      code,
      status: "active",
      usedAt: null,
      revokedAt: null,
      createdBy,
      createdAt: nowIso,
      recipientName: null,
    };
    store.passwords.unshift(item);
    return { ...item };
  }

  await ensureAccessGateTables();
  for (let i = 0; i < 10; i += 1) {
    const code = generateAccessPasswordCode();
    try {
      const res = await pool.query(
        `
          INSERT INTO access_gate_passwords (code, created_by, status, created_at, updated_at)
          VALUES ($1, $2, 'active', now(), now())
          RETURNING id, code, status, used_at, revoked_at, created_by, created_at, recipient_name
        `,
        [code, createdBy],
      );
      return mapDbRow(res.rows[0] as Record<string, unknown>);
    } catch (error) {
      // Retry only on unique conflict.
      const code = (error as { code?: string })?.code;
      if (code !== "23505") throw error;
    }
  }
  throw new Error("Unable to generate unique access password.");
}

export async function listAccessGatePasswords(): Promise<AccessGatePasswordRow[]> {
  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    return store.passwords
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .map((p) => ({ ...p, recipientName: p.recipientName ?? null }));
  }

  await ensureAccessGateTables();
  const res = await pool.query(
    `
      SELECT id, code, status, used_at, revoked_at, created_by, created_at, recipient_name
      FROM access_gate_passwords
      ORDER BY created_at DESC
      LIMIT 200
    `,
  );
  return res.rows.map((r) => mapDbRow(r as Record<string, unknown>));
}

export async function updateAccessGatePasswordRecipient(id: number, recipientName: string | null): Promise<boolean> {
  if (!Number.isFinite(id) || id <= 0) return false;
  const value = recipientName != null ? String(recipientName).trim() || null : null;

  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    const item = store.passwords.find((p) => p.id === id);
    if (!item) return false;
    item.recipientName = value;
    return true;
  }

  await ensureAccessGateTables();
  const res = await pool.query(
    `
      UPDATE access_gate_passwords
      SET recipient_name = $2, updated_at = now()
      WHERE id = $1
    `,
    [id, value],
  );
  return (res.rowCount ?? 0) > 0;
}

export async function revokeAccessGatePassword(id: number): Promise<boolean> {
  if (!Number.isFinite(id) || id <= 0) return false;

  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    const item = store.passwords.find((p) => p.id === id);
    if (!item || item.status === "used" || item.status === "revoked") return false;
    item.status = "revoked";
    item.revokedAt = new Date().toISOString();
    return true;
  }

  await ensureAccessGateTables();
  const res = await pool.query(
    `
      UPDATE access_gate_passwords
      SET status = 'revoked', revoked_at = now(), updated_at = now()
      WHERE id = $1 AND status = 'active'
    `,
    [id],
  );
  return (res.rowCount ?? 0) > 0;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const normalized = token.trim();
  if (!normalized) return false;

  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    const now = Date.now();
    store.sessions = store.sessions.filter((s) => s.expiresAt > now);
    return store.sessions.some((s) => s.token === normalized && s.expiresAt > now);
  }

  await ensureAccessGateTables();
  const res = await pool.query(
    `
      SELECT id
      FROM access_gate_sessions
      WHERE token = $1
        AND expires_at > now()
      LIMIT 1
    `,
    [normalized],
  );
  return res.rows.length > 0;
}

export async function createSessionFromPassword(password: string): Promise<{ token: string; expiresAt: Date } | null> {
  const normalized = normalizeCode(password);
  if (!normalized) return null;

  const expiresAt = sessionExpiryDate();
  const token = generateSessionToken();

  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    const item = store.passwords.find((p) => p.code === normalized);
    if (!item || item.status !== "active") return null;
    item.status = "used";
    item.usedAt = new Date().toISOString();
    store.sessions.push({
      token,
      expiresAt: expiresAt.getTime(),
      isAdminBypass: false,
    });
    return { token, expiresAt };
  }

  await ensureAccessGateTables();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const passRes = await client.query(
      `
        SELECT id
        FROM access_gate_passwords
        WHERE code = $1
          AND status = 'active'
        FOR UPDATE
      `,
      [normalized],
    );
    if (passRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const passwordId = Number((passRes.rows[0] as Record<string, unknown>).id);
    await client.query(
      `
        UPDATE access_gate_passwords
        SET status = 'used', used_at = now(), updated_at = now()
        WHERE id = $1
      `,
      [passwordId],
    );

    await client.query(
      `
        INSERT INTO access_gate_sessions (token, password_id, is_admin_bypass, expires_at, created_at)
        VALUES ($1, $2, 0, $3, now())
      `,
      [token, passwordId, expiresAt.toISOString()],
    );

    await client.query("COMMIT");
    return { token, expiresAt };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function createAdminBypassSession(): Promise<{ token: string; expiresAt: Date }> {
  const expiresAt = sessionExpiryDate();
  const token = generateSessionToken();

  if (!hasDatabase || !pool) {
    const store = getNoDbStore();
    store.sessions.push({
      token,
      expiresAt: expiresAt.getTime(),
      isAdminBypass: true,
    });
    return { token, expiresAt };
  }

  await ensureAccessGateTables();
  await pool.query(
    `
      INSERT INTO access_gate_sessions (token, is_admin_bypass, expires_at, created_at)
      VALUES ($1, 1, $2, now())
    `,
    [token, expiresAt.toISOString()],
  );
  return { token, expiresAt };
}

export async function cleanupExpiredAccessGateSessions(): Promise<void> {
  if (!hasDatabase || !pool) return;
  await ensureAccessGateTables();
  await pool.query(`DELETE FROM access_gate_sessions WHERE expires_at <= now()`);
}

