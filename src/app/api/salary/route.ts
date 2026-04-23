import { NextRequest } from "next/server";

import { requireApiRole, requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { salarySchema } from "@/lib/validation/schemas";
import { createSalaryRecord, listSalaryRecords } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const scope = request.nextUrl.searchParams.get("scope");
    const employeeId = session.role === "employee" || scope === "mine" ? session.employeeId : undefined;
    return ok(await listSalaryRecords(employeeId));
  } catch (error) {
    return fail("Unable to fetch salary records", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const parsed = salarySchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid salary payload", 422, parsed.error.flatten());
    }

    return ok(await createSalaryRecord(parsed.data));
  } catch (error) {
    return fail("Unable to create salary record", 500, error instanceof Error ? error.message : undefined);
  }
}
