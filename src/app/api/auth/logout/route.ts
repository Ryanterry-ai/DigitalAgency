import { clearSessionCookie } from "@/lib/auth/session";
import { ok } from "@/lib/http";

export async function POST() {
  clearSessionCookie();
  return ok({ loggedOut: true });
}
