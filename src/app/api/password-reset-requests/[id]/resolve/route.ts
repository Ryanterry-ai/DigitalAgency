import { NextRequest } from "next/server";

import { requireApiRole } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { resolvePasswordResetRequest } from "@/server/services/data.service";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireApiRole(["admin"]);
    const body = await request.json().catch(() => ({}));
    const nextPassword =
      typeof body.newPassword === "string" && body.newPassword.trim().length > 0
        ? body.newPassword.trim()
        : undefined;
    if (nextPassword && nextPassword.length < 6) {
      return fail("Password must be at least 6 characters", 422);
    }

    const result = await resolvePasswordResetRequest(params.id, session.name ?? "Admin", nextPassword);
    if (!result) {
      return fail("Password reset request not found", 404);
    }

    return ok(result);
  } catch (error) {
    return fail("Unable to resolve password reset request", 500, error instanceof Error ? error.message : undefined);
  }
}
