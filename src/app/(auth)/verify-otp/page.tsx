import { Suspense } from "react";

import { VerifyOtpClient } from "@/app/(auth)/verify-otp/verify-otp-client";

export default function VerifyOtpPage({
  searchParams,
}: {
  searchParams: { mobile?: string };
}) {
  return (
    <Suspense>
      <VerifyOtpClient mobile={searchParams.mobile ?? ""} />
    </Suspense>
  );
}
