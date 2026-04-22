import { getSessionFromCookie } from "@/lib/auth/session";

export async function requireSession() {
  const session = await getSessionFromCookie();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function getCurrentSession() {
  return getSessionFromCookie();
}
