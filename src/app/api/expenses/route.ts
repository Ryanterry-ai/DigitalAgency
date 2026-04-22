import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { expenseSchema } from "@/lib/validation/schemas";
import { createExpense, listExpenses } from "@/server/services/data.service";

export async function GET() {
  try {
    await requireApiSession();
    return ok(await listExpenses());
  } catch (error) {
    return fail("Unable to fetch expenses", 401, error instanceof Error ? error.message : undefined);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiSession();
    const body = await request.json();
    const parsed = expenseSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid expense payload", 422, parsed.error.flatten());
    }

    return ok(await createExpense(parsed.data));
  } catch (error) {
    return fail("Unable to create expense", 500, error instanceof Error ? error.message : undefined);
  }
}
