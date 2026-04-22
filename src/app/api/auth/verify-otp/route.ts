import { NextRequest } from "next/server";

import { setSessionCookie } from "@/lib/auth/session";
import { fail, ok } from "@/lib/http";
import { verifyOtpSchema } from "@/lib/validation/schemas";
import { verifyOtp } from "@/server/services/data.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifyOtpSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid OTP payload", 422, parsed.error.flatten());
    }

    const session = await verifyOtp(parsed.data.mobile, parsed.data.code);
    if (!session) {
      return fail("OTP verification failed", 401);
    }

    await setSessionCookie(session);
    return ok({ user: session });
  } catch (error) {
    return fail("Unable to verify OTP", 500, error instanceof Error ? error.message : undefined);
  }
}
