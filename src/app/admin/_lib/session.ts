import "server-only";
import { cookies } from "next/headers";
import { getServerEnv } from "@/lib/env";

const COOKIE_NAME = "gladys_admin_session";

export type AdminSession = {
  email: string;
  rol: string;
  token: string;
  expiresAt: number;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const decoded = decodeSession(raw);
  if (!decoded) return null;
  if (decoded.expiresAt < Date.now()) return null;
  return decoded;
}

export async function setAdminSession(email: string, rol: string, token: string): Promise<void> {
  const env = getServerEnv();
  const payload: AdminSession = { email, rol, token, expiresAt: Date.now() + 1000 * 60 * 60 * 8 };
  const encoded = encodeSession(payload, env.adminSessionSecret);
  const store = await cookies();
  store.set(COOKIE_NAME, encoded, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

function encodeSession(payload: AdminSession, secret: string): string {
  const json = JSON.stringify(payload);
  const body = Buffer.from(json, "utf-8").toString("base64url");
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

function decodeSession(token: string): AdminSession | null {
  const env = getServerEnv();
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if (sign(body, env.adminSessionSecret) !== sig) return null;
  try {
    const json = Buffer.from(body, "base64url").toString("utf-8");
    return JSON.parse(json) as AdminSession;
  } catch {
    return null;
  }
}

function sign(value: string, secret: string): string {
  // Signature minima determinista (placeholder). Reemplazar por HMAC real
  // (p. ej. usando `crypto` del módulo `node:crypto`) cuando integre auth real.
  let hash = 0;
  const input = `${value}::${secret}`;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}
