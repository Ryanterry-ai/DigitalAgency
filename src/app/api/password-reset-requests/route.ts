import { NextRequest } from "next/server";

import { requireApiRole } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { listPasswordResetRequests } from "@/server/services/data.service";

export async function GET(request: NextRequest) {
  try {
    await requireApiRole(["admin"]);
    const statusParam = request.nextUrl.searchParams.get("status");
    const status = statusParam === "completed" || statusParam === "all" ? statusParam : "pending";
    return ok(await listPasswordResetRequests(status));
  } catch (error) {
    return fail("Unable to fetch password reset requests", 401, error instanceof Error ? error.message : undefined);
  }
}
