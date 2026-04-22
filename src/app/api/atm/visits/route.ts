import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { siteVisitSchema } from "@/lib/validation/schemas";
import { createSiteVisit, listSiteVisits } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listSiteVisits());
  } catch (error) {
    return fail("Unable to fetch site visits", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = siteVisitSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid site visit payload", 422, parsed.error.flatten());
    }

    return ok(await createSiteVisit(parsed.data));
  } catch (error) {
    return fail("Unable to create site visit", 500, error instanceof Error ? error.message : undefined);
  }
}
