import { NextRequest } from "next/server";

import { setSessionCookie } from "@/lib/auth/session";
import { fail, ok } from "@/lib/http";
import { passwordLoginSchema } from "@/lib/validation/schemas";
import { loginWithPassword } from "@/server/services/data.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = passwordLoginSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid login payload", 422, parsed.error.flatten());
    }

    const session = await loginWithPassword(parsed.data);
    if (!session) {
      return fail("Invalid credentials", 401);
    }

    await setSessionCookie(session);
    return ok({ user: session });
  } catch (error) {
    return fail("Unable to sign in", 500, error instanceof Error ? error.message : undefined);
  }
}
