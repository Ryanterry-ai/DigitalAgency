import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { attendanceSchema } from "@/lib/validation/schemas";
import { listAttendance, punchAttendance } from "@/server/services/data.service";

export async function GET() {
  try {
    const session = await requireApiSession();
    const employeeId = session.role === "employee" ? session.employeeId : undefined;
    return ok(await listAttendance(employeeId));
  } catch (error) {
    return fail("Unable to fetch attendance", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const body = await request.json();
    const payload = session.role === "employee" ? { ...body, employeeId: session.employeeId } : body;
    const parsed = attendanceSchema.safeParse(payload);
    if (!parsed.success) {
      return fail("Invalid attendance payload", 422, parsed.error.flatten());
    }

    if (session.role === "employee") {
      if (!parsed.data.selfieUrl) {
        return fail("Selfie photo is required for employee attendance", 422);
      }
      if (!parsed.data.location?.trim()) {
        return fail("Location is required for employee attendance", 422);
      }
    }

    return ok(await punchAttendance(parsed.data));
  } catch (error) {
    return fail("Unable to update attendance", 500, error instanceof Error ? error.message : undefined);
  }
}
