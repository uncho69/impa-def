import crypto from "crypto";

const WINDOW_MS = 10 * 60 * 1000; // 10 minuti

function codeFromHmac(hmac: string): string {
  // Usa 6 cifre decimali dal digest
  const int = parseInt(hmac.slice(0, 12), 16); // 48 bit
  const num = int % 1_000_000;
  return num.toString().padStart(6, "0");
}

export function generateCode(email: string, time: number = Date.now()): string {
  const secret = process.env.REG_CODE_SECRET || "dev-secret-change-me";
  const window = Math.floor(time / WINDOW_MS);
  const hmac = crypto.createHmac("sha256", secret).update(`${email}|${window}`).digest("hex");
  return codeFromHmac(hmac);
}

export function verifyCode(email: string, code: string): boolean {
  const now = Date.now();
  const candidates = [generateCode(email, now), generateCode(email, now - WINDOW_MS)];
  return candidates.includes(code);
}

