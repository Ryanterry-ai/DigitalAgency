"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { transitions } from "@/lib/motion";

type LoginRole = "admin" | "employee";

export default function LoginPage() {
  const [role, setRole] = useState<LoginRole>("admin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmployeeCode, setForgotEmployeeCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, identifier, password }),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to sign in");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setForgotMessage(null);
    setError(null);
    setForgotLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeCode: forgotEmployeeCode }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to submit forgot password request");
      }
      setForgotMessage(json.data?.message ?? "Reset request sent to admin.");
      setForgotEmployeeCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit forgot password request");
    } finally {
      setForgotLoading(false);
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
              <h1 className="text-lg font-semibold text-slate-900">Secure Sign In</h1>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg border bg-slate-50 p-1">
            <button
              onClick={() => setRole("admin")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                role === "admin" ? "bg-cyan-700 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Admin Login
            </button>
            <button
              onClick={() => setRole("employee")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                role === "employee" ? "bg-cyan-700 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Employee Login
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="space-y-1 text-sm text-slate-600">
              <span>{role === "admin" ? "Admin User ID (Email)" : "Employee ID"}</span>
              <Input
                placeholder={role === "admin" ? "Enter admin email" : "Enter employee ID (e.g. SAI-EMP-101)"}
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                required
              />
            </label>
            <label className="space-y-1 text-sm text-slate-600">
              <span>Password</span>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <Button type="submit" loading={loading} className="w-full">
              <KeyRound size={14} className="mr-1" />
              Login
            </Button>
          </form>

          <form className="mt-4 rounded-lg border bg-slate-50 p-3" onSubmit={onForgotPassword}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Forgot Password?</p>
            <p className="mt-1 text-xs text-slate-500">Employees can request password reset from admin.</p>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Employee ID"
                value={forgotEmployeeCode}
                onChange={(event) => setForgotEmployeeCode(event.target.value)}
                required
              />
              <Button type="submit" variant="secondary" loading={forgotLoading}>
                Request
              </Button>
            </div>
          </form>

          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
          {forgotMessage ? <p className="mt-3 text-sm text-emerald-700">{forgotMessage}</p> : null}

          <div className="mt-5 rounded-lg border bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">Test Credentials</p>
            <p>Admin: aman@saiassociates.in / Admin@123</p>
            <p>Employee: SAI-EMP-101 / 123456</p>
            <p>Reset employee passwords from Employee Details panel (admin).</p>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
