import { NextRequest } from "next/server";

import { requireApiRole, requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { employeeSchema } from "@/lib/validation/schemas";
import { createEmployee, listEmployees } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    await requireApiSession();
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    return ok(await listEmployees(search));
  } catch (error) {
    return fail("Unable to fetch employees", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const parsed = employeeSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid employee payload", 422, parsed.error.flatten());
    }

    return ok(await createEmployee(parsed.data));
  } catch (error) {
    return fail("Unable to create employee", 500, error instanceof Error ? error.message : undefined);
  }
}
