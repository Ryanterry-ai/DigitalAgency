import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { env } from "@/lib/env";
import { UserSession } from "@/types/entities";

const encoder = new TextEncoder();
const secret = encoder.encode(env.SESSION_SECRET);

export async function createSessionToken(payload: UserSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${env.SESSION_TTL_HOURS}h`)
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as UserSession;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: UserSession) {
  const token = await createSessionToken(payload);
  cookies().set(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: env.SESSION_TTL_HOURS * 60 * 60,
    path: "/",
  });
}

export function clearSessionCookie() {
  cookies().delete(env.SESSION_COOKIE_NAME);
}

export async function getSessionFromCookie() {
  const token = cookies().get(env.SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}
