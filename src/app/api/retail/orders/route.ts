import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { orderSchema } from "@/lib/validation/schemas";
import { createOrder, getEmployeeById, listOrders } from "@/server/services/data.service";

export async function GET() {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "crompton") {
        return fail("Retail order workflow is available for Crompton employees only", 403);
      }
    }
    const employeeId = session.role === "employee" ? session.employeeId : undefined;
    return ok(await listOrders(employeeId));
  } catch (error) {
    return fail("Unable to fetch orders", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    if (session.role === "employee") {
      const employee = await getEmployeeById(session.employeeId);
      if (employee?.category !== "crompton") {
        return fail("Retail order workflow is available for Crompton employees only", 403);
      }
    }
    const body = await request.json();
    const payload = session.role === "employee" ? { ...body, employeeId: session.employeeId } : body;
    const parsed = orderSchema.safeParse(payload);
    if (!parsed.success) {
      return fail("Invalid order payload", 422, parsed.error.flatten());
    }

    return ok(await createOrder(parsed.data));
  } catch (error) {
    return fail("Unable to create order", 500, error instanceof Error ? error.message : undefined);
  }
}
