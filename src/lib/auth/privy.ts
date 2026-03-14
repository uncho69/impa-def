import { verifyAccessToken } from "@privy-io/node";
import { createRemoteJWKSet } from "jose";

export type VerifiedPrivyAccessToken = {
  userId: string;
  sessionId?: string;
  email?: string | null;
};

function decodeJwtPayloadUnsafe(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function pickEmailCandidate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return normalized.includes("@") ? normalized : null;
}

function extractEmailFromUnknown(source: unknown): string | null {
  if (!source) return null;
  if (typeof source === "string") return pickEmailCandidate(source);
  if (Array.isArray(source)) {
    for (const item of source) {
      const nested = extractEmailFromUnknown(item);
      if (nested) return nested;
    }
    return null;
  }
  if (typeof source === "object") {
    const rec = source as Record<string, unknown>;
    const direct = [rec.email, rec.emailAddress, rec.address, rec.user_email, rec.primary_email];
    for (const item of direct) {
      const candidate = pickEmailCandidate(item);
      if (candidate) return candidate;
    }
    const nested = [rec.linked_accounts, rec.linkedAccounts, rec.user, rec.claims, rec.profile];
    for (const item of nested) {
      const candidate = extractEmailFromUnknown(item);
      if (candidate) return candidate;
    }
  }
  return null;
}

export async function verifyPrivyAccessToken(accessToken: string): Promise<VerifiedPrivyAccessToken | null> {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim();
  const verificationKey = process.env.PRIVY_VERIFICATION_KEY?.trim();

  if (!appId) return null;

  // Verifica forte (consigliata in prod)
  if (verificationKey) {
    try {
      const verificationInput = verificationKey.startsWith("http://") || verificationKey.startsWith("https://")
        ? createRemoteJWKSet(new URL(verificationKey))
        : verificationKey;

      const verified = await verifyAccessToken({
        access_token: accessToken,
        app_id: appId,
        verification_key: verificationInput,
      });
      const verifiedPayload = verified as unknown as Record<string, unknown>;
      return {
        userId: verified.user_id,
        sessionId: verified.session_id,
        email: extractEmailFromUnknown(verifiedPayload),
      };
    } catch {
      return null;
    }
  }

  // Fallback sviluppo senza verification key.
  // Accetta token non verificato solo in development.
  if (process.env.NODE_ENV !== "development") return null;
  const payload = decodeJwtPayloadUnsafe(accessToken);
  const maybeUserId = payload?.sub ?? payload?.user_id;
  if (typeof maybeUserId !== "string" || maybeUserId.length === 0) return null;
  return { userId: maybeUserId, email: extractEmailFromUnknown(payload) };
}

