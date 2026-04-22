import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { attendanceSchema } from "@/lib/validation/schemas";
import { listAttendance, punchAttendance } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listAttendance());
  } catch (error) {
    return fail("Unable to fetch attendance", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = attendanceSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid attendance payload", 422, parsed.error.flatten());
    }

    return ok(await punchAttendance(parsed.data));
  } catch (error) {
    return fail("Unable to update attendance", 500, error instanceof Error ? error.message : undefined);
  }
}
