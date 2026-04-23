import { NextRequest } from "next/server";

import { requireApiRole } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { updateLeaveRequest } from "@/server/services/data.service";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const record = await updateLeaveRequest(params.id, body);
    if (!record) {
      return fail("Leave request not found", 404);
    }

    return ok(record);
  } catch (error) {
    return fail("Unable to update leave request", 500, error instanceof Error ? error.message : undefined);
  }
}
