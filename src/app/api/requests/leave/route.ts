import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { leaveRequestSchema } from "@/lib/validation/schemas";
import { createLeaveRequest, listLeaveRequests } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const scope = request.nextUrl.searchParams.get("scope");
    const employeeId = session.role === "employee" || scope === "mine" ? session.employeeId : undefined;
    return ok(await listLeaveRequests(employeeId));
  } catch (error) {
    return fail("Unable to fetch leave requests", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const body = await request.json();
    const parsed = leaveRequestSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid leave request payload", 422, parsed.error.flatten());
    }

    const employeeId = session.role === "employee" ? session.employeeId : parsed.data.employeeId;
    if (!employeeId) {
      return fail("Employee is required", 422);
    }

    return ok(await createLeaveRequest({ ...parsed.data, employeeId, status: "pending" }));
  } catch (error) {
    return fail("Unable to create leave request", 500, error instanceof Error ? error.message : undefined);
  }
}
