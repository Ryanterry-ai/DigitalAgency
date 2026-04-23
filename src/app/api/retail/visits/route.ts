import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { retailVisitSchema } from "@/lib/validation/schemas";
import { createRetailVisit, getEmployeeById, listRetailVisits } from "@/server/services/data.service";

export async function GET() {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "crompton") {
        return fail("Retail visit workflow is available for Crompton employees only", 403);
      }
    }
    const employeeId = session.role === "employee" ? session.employeeId : undefined;
    return ok(await listRetailVisits(employeeId));
  } catch (error) {
    return fail("Unable to fetch retail visits", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "crompton") {
        return fail("Retail visit workflow is available for Crompton employees only", 403);
      }
    }
    const body = await request.json();
    const payload = session.role === "employee" ? { ...body, employeeId: session.employeeId } : body;
    const parsed = retailVisitSchema.safeParse(payload);
    if (!parsed.success) {
      return fail("Invalid retail visit payload", 422, parsed.error.flatten());
    }

    return ok(await createRetailVisit(parsed.data));
  } catch (error) {
    return fail("Unable to create retail visit", 500, error instanceof Error ? error.message : undefined);
  }
}
