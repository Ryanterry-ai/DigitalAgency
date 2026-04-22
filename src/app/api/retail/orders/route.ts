import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { orderSchema } from "@/lib/validation/schemas";
import { createOrder, listOrders } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listOrders());
  } catch (error) {
    return fail("Unable to fetch orders", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid order payload", 422, parsed.error.flatten());
    }

    return ok(await createOrder(parsed.data));
  } catch (error) {
    return fail("Unable to create order", 500, error instanceof Error ? error.message : undefined);
  }
}
