import { NextRequest } from "next/server";

import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/http";
import { deleteAtmSite, updateAtmSite } from "@/server/services/data.service";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiSession();
    const body = await request.json();
    const record = await updateAtmSite(params.id, body);
    if (!record) {
      return fail("ATM site not found", 404);
    }

    return ok(record);
  } catch (error) {
    return fail("Unable to update ATM site", 500, error instanceof Error ? error.message : undefined);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireApiSession();
    const deleted = await deleteAtmSite(params.id);
    if (!deleted) {
      return fail("ATM site not found", 404);
    }

    return ok({ deleted: true });
  } catch (error) {
    return fail("Unable to delete ATM site", 500, error instanceof Error ? error.message : undefined);
  }
}
