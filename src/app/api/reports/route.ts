import { fail, ok } from "@/lib/http";
import { requireApiRole } from "@/lib/auth/api-session";
import { getReportsData } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiRole(["admin"]);
    return ok(await getReportsData());
  } catch (error) {
    return fail("Unable to load reports", 401, error instanceof Error ? error.message : undefined);
  }
}
