import { NextRequest } from "next/server";

import { requireApiRole } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { resetPasswordSchema } from "@/lib/validation/schemas";
import { resetEmployeePassword } from "@/server/services/data.service";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireApiRole(["admin"]);
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid reset password payload", 422, parsed.error.flatten());
    }

    const result = await resetEmployeePassword(params.id, parsed.data.newPassword, session.name ?? "Admin");
    if (!result) {
      return fail("Employee not found", 404);
    }

    return ok(result);
  } catch (error) {
    return fail("Unable to reset employee password", 500, error instanceof Error ? error.message : undefined);
  }
}
