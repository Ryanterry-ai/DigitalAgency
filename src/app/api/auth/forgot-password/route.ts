import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/http";
import { forgotPasswordSchema } from "@/lib/validation/schemas";
import { requestEmployeePasswordReset } from "@/server/services/data.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid forgot password payload", 422, parsed.error.flatten());
    }

    return ok(await requestEmployeePasswordReset(parsed.data.employeeCode));
  } catch (error) {
    return fail("Unable to process forgot password request", 500, error instanceof Error ? error.message : undefined);
  }
}
