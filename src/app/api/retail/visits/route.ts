import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { retailVisitSchema } from "@/lib/validation/schemas";
import { createRetailVisit, listRetailVisits } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listRetailVisits());
  } catch (error) {
    return fail("Unable to fetch retail visits", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = retailVisitSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid retail visit payload", 422, parsed.error.flatten());
    }

    return ok(await createRetailVisit(parsed.data));
  } catch (error) {
    return fail("Unable to create retail visit", 500, error instanceof Error ? error.message : undefined);
  }
}
