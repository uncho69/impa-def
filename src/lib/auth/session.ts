import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE_NAME = "idf_session";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 giorni

type SessionPayload = {
  userId: string;
  provider: "privy" | "clerk";
  exp: number;
};

function getSessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET?.trim();
  if (secret && secret.length >= 16) return secret;
  return "dev-insecure-session-secret-change-me";
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
}

export function createSessionToken(userId: string, provider: "privy" | "clerk", ttlSeconds = DEFAULT_TTL_SECONDS): string {
  const payload: SessionPayload = {
    userId,
    provider,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function parseSessionToken(token: string | null | undefined): SessionPayload | null {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expectedSignature);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;
    if (!parsed?.userId || !parsed?.provider || typeof parsed?.exp !== "number") return null;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

