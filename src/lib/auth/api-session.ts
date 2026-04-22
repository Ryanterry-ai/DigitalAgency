import { cookies } from "next/headers";

import { env } from "@/lib/env";
import { verifySessionToken } from "@/lib/auth/session";
import { Role } from "@/types/entities";

export async function requireApiSession() {
  const token = cookies().get(env.SESSION_COOKIE_NAME)?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const session = await verifySessionToken(token);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function requireApiRole(allowed: Role[]) {
  const session = await requireApiSession();
  if (!allowed.includes(session.role)) {
    throw new Error("Forbidden");
  }
  return session;
}
