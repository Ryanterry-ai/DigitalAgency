import { NextRequest } from "next/server";

import { requireApiRole, requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { retailerSchema } from "@/lib/validation/schemas";
import { createRetailer, listRetailers } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listRetailers());
  } catch (error) {
    return fail("Unable to fetch retailers", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiRole(["admin"]);
    const body = await request.json();
    const parsed = retailerSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid retailer payload", 422, parsed.error.flatten());
    }

    return ok(await createRetailer(parsed.data));
  } catch (error) {
    return fail("Unable to create retailer", 500, error instanceof Error ? error.message : undefined);
  }
}
