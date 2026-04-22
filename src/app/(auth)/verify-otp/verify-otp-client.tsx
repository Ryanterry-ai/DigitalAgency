"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { transitions } from "@/lib/motion";

export function VerifyOtpClient({ mobile }: { mobile: string }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code: otp }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "OTP verification failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={reduceMotion ? undefined : transitions.base}
        className="w-full max-w-md"
      >
        <Card className="w-full p-6">
          <h1 className="text-lg font-semibold text-slate-900">Verify OTP</h1>
          <p className="mt-1 text-sm text-slate-500">Enter the code sent to {mobile || "your number"}</p>

          <form className="mt-4 space-y-4" onSubmit={onSubmit}>
            <label className="space-y-1 text-sm text-slate-600">
              <span>One-Time Password</span>
              <Input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                maxLength={6}
                required
                className="text-center font-[family-name:var(--font-geist-mono)] tracking-[0.35em]"
              />
            </label>

            <Button type="submit" loading={loading} className="w-full">
              Verify & Continue
            </Button>

            {error ? (
              <motion.p
                className="text-sm text-rose-600"
                initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: [0, -2, 2, -1, 0] }}
              >
                {error}
              </motion.p>
            ) : null}
          </form>
        </Card>
      </motion.div>
    </main>
  );
}
