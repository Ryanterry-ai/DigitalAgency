"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { transitions } from "@/lib/motion";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to send OTP");
      }

      setDevCode(json.data.devCode ?? null);
      router.push(`/verify-otp?mobile=${encodeURIComponent(mobile)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP");
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
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Sai Associates</p>
            <h1 className="text-lg font-semibold text-slate-900">OTP Sign In</h1>
          </div>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Mobile Number</span>
            <Input
              placeholder="Enter mobile (e.g. 9876543210)"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
            />
          </label>

          <Button type="submit" loading={loading} className="w-full">
            Send OTP
          </Button>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {devCode ? (
            <motion.p
              className="text-xs text-emerald-700"
              initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              Dev OTP: {devCode}
            </motion.p>
          ) : null}
        </form>

        <div className="mt-5 rounded-lg border bg-slate-50 p-3 text-xs text-slate-600">
          <p className="font-medium text-slate-700">Test Accounts</p>
          <p>Admin: 9876543210</p>
          <p>Employee: 9988776655 / 9123456780 / 8865056535</p>
          <p>OTP (testing for all mobiles): 123456</p>
        </div>
      </Card>
      </motion.div>
    </main>
  );
}
