import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { markNotificationRead } from "@/server/services/data.service";

export async function PATCH(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiSession();
    const record = await markNotificationRead(params.id);
    if (!record) {
      return fail("Notification not found", 404);
    }

    return ok(record);
  } catch (error) {
    return fail("Unable to update notification", 500, error instanceof Error ? error.message : undefined);
  }
}
