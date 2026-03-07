import { verifyAccessToken } from "@privy-io/node";
import { createRemoteJWKSet } from "jose";

export type VerifiedPrivyAccessToken = {
  userId: string;
  sessionId?: string;
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
      return {
        userId: verified.user_id,
        sessionId: verified.session_id,
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
  return { userId: maybeUserId };
}

