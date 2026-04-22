import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/http";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    if (!file) {
      return fail("File is required", 422);
    }

    // Preview-safe upload response. Replace with Supabase/Cloudinary adapter in production env.
    return ok({
      url: `https://picsum.photos/seed/${Date.now()}/1200/800`,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    return fail("Upload failed", 500, error instanceof Error ? error.message : undefined);
  }
}
