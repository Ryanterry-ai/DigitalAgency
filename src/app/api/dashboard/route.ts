import { fail, ok } from "@/lib/http";
import { requireApiSession } from "@/lib/auth/api-session";
import { getDashboardOverview } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await getDashboardOverview());
  } catch (error) {
    return fail("Unable to load dashboard", 401, error instanceof Error ? error.message : undefined);
  }
}
