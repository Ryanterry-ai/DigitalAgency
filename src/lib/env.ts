import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  SESSION_SECRET: z.string().default("please-change-session-secret"),
  SESSION_COOKIE_NAME: z.string().default("sai_session"),
  SESSION_TTL_HOURS: z.coerce.number().default(12),
  OTP_EXPIRY_MINUTES: z.coerce.number().default(10),
  OTP_DEV_FALLBACK: z.enum(["true", "false"]).default("true"),
  PUBLIC_PREVIEW_MODE: z.enum(["true", "false"]).default("true"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_BUCKET: z.string().default("uploads"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // Keep app booting in preview mode while exposing readable logs for setup fixes.
  console.error("Environment validation warning", parsed.error.flatten().fieldErrors);
}

const fallback = envSchema.parse({});

export const env = {
  ...fallback,
  ...(parsed.success ? parsed.data : {}),
  isPreviewMode:
    (parsed.success ? parsed.data.PUBLIC_PREVIEW_MODE : fallback.PUBLIC_PREVIEW_MODE) === "true" ||
    !(parsed.success ? parsed.data.DATABASE_URL : process.env.DATABASE_URL),
  otpDevFallback:
    (parsed.success ? parsed.data.OTP_DEV_FALLBACK : fallback.OTP_DEV_FALLBACK) === "true",
};
