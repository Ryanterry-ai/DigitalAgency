import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { deleteEmployee, updateEmployee } from "@/server/services/data.service";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiSession();
    const body = await request.json();
    const record = await updateEmployee(params.id, body);
    if (!record) {
      return fail("Employee not found", 404);
    }

    return ok(record);
  } catch (error) {
    return fail("Unable to update employee", 500, error instanceof Error ? error.message : undefined);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiSession();
    const deleted = await deleteEmployee(params.id);
    if (!deleted) {
      return fail("Employee not found", 404);
    }

    return ok({ deleted: true });
  } catch (error) {
    return fail("Unable to delete employee", 500, error instanceof Error ? error.message : undefined);
  }
}
