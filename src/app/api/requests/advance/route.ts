import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { advanceRequestSchema } from "@/lib/validation/schemas";
import { createAdvanceRequest, getEmployeeById, listAdvanceRequests } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "atm") {
        return fail("Advance request workflow is available for ATM employees only", 403);
      }
    }
    const scope = request.nextUrl.searchParams.get("scope");
    const employeeId = session.role === "employee" || scope === "mine" ? session.employeeId : undefined;
    return ok(await listAdvanceRequests(employeeId));
  } catch (error) {
    return fail("Unable to fetch salary advance requests", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "atm") {
        return fail("Advance request workflow is available for ATM employees only", 403);
      }
    }
    const body = await request.json();
    const parsed = advanceRequestSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid advance request payload", 422, parsed.error.flatten());
    }

    const employeeId = session.role === "employee" ? session.employeeId : parsed.data.employeeId;
    if (!employeeId) {
      return fail("Employee is required", 422);
    }

    return ok(await createAdvanceRequest({ ...parsed.data, employeeId, status: "pending" }));
  } catch (error) {
    return fail("Unable to create salary advance request", 500, error instanceof Error ? error.message : undefined);
  }
}
