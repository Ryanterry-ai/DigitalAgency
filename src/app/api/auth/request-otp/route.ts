import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/http";
import { loginSchema } from "@/lib/validation/schemas";
import { requestOtp } from "@/server/services/data.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid mobile number", 422, parsed.error.flatten());
    }

    const result = await requestOtp(parsed.data.mobile);
    if (!result.ok) {
      return fail(
        `OTP already sent. Please retry after ${result.remainingSeconds} seconds.`,
        429,
        result,
      );
    }
    return ok(result);
  } catch (error) {
    return fail("Unable to request OTP", 500, error instanceof Error ? error.message : undefined);
  }
}
