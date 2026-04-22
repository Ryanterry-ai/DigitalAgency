import { fail, ok } from "@/lib/http";
import { requireApiRole } from "@/lib/auth/api-session";
import { getSettings } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiRole(["admin"]);
    return ok(await getSettings());
  } catch (error) {
    return fail("Unable to load settings", 401, error instanceof Error ? error.message : undefined);
  }
}
