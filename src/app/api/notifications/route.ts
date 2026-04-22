import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { notificationSchema } from "@/lib/validation/schemas";
import { createNotification, listNotifications } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listNotifications());
  } catch (error) {
    return fail("Unable to fetch notifications", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = notificationSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid notification payload", 422, parsed.error.flatten());
    }

    return ok(await createNotification(parsed.data));
  } catch (error) {
    return fail("Unable to create notification", 500, error instanceof Error ? error.message : undefined);
  }
}
