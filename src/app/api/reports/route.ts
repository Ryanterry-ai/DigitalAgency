import { fail, ok } from "@/lib/http";
import { requireApiSession } from "@/lib/auth/api-session";
import { getReportsData } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await getReportsData());
  } catch (error) {
    return fail("Unable to load reports", 401, error instanceof Error ? error.message : undefined);
  }
}
