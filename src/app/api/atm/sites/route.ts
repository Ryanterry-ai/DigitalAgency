import { NextRequest } from "next/server";

import { requireApiRole, requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { atmSiteSchema } from "@/lib/validation/schemas";
import { createAtmSite, listAtmSites } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    await requireApiSession();
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    return ok(await listAtmSites(search));
  } catch (error) {
    return fail("Unable to fetch ATM sites", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const parsed = atmSiteSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid ATM site payload", 422, parsed.error.flatten());
    }

    return ok(await createAtmSite(parsed.data));
  } catch (error) {
    return fail("Unable to create ATM site", 500, error instanceof Error ? error.message : undefined);
  }
}
