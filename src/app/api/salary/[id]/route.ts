import { NextRequest } from "next/server";

import { requireApiRole } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { updateSalaryRecord } from "@/server/services/data.service";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const record = await updateSalaryRecord(params.id, body);
    if (!record) {
      return fail("Salary record not found", 404);
    }

    return ok(record);
  } catch (error) {
    return fail("Unable to update salary record", 500, error instanceof Error ? error.message : undefined);
  }
}
