import { NextRequest } from "next/server";

import { requireApiRole, requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { deleteEmployee, updateEmployee } from "@/server/services/data.service";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    const body = await request.json();

    const canEditAsAdmin = session.role === "admin";
    const canEditOwnProfile = session.role === "employee" && session.employeeId === params.id;

    if (!canEditAsAdmin && !canEditOwnProfile) {
      return fail("Forbidden", 403);
    }

    const patch = canEditAsAdmin
      ? body
      : {
          fullName: body.fullName,
          mobile: body.mobile,
          completeAddress: body.completeAddress,
          aadhaarNumber: body.aadhaarNumber,
          panNumber: body.panNumber,
          photoUrl: body.photoUrl,
          location: body.location,
          email: body.email,
        };

    const record = await updateEmployee(params.id, patch);
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
    await requireApiRole(["admin"]);
    const deleted = await deleteEmployee(params.id);
    if (!deleted) {
      return fail("Employee not found", 404);
    }

    return ok({ deleted: true });
  } catch (error) {
    return fail("Unable to delete employee", 500, error instanceof Error ? error.message : undefined);
  }
}
