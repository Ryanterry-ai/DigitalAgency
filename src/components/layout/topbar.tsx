"use client";

import { useTransition } from "react";
import { LogOut, Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { transitions } from "@/lib/motion";

export function Topbar({
  role,
  name,
  onOpenSidebar,
}: {
  role: "admin" | "employee";
  name?: string;
  onOpenSidebar: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  const onLogout = () => {
    startTransition(async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    });
  };

  return (
    <motion.header
      initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : transitions.base}
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur md:px-6"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-slate-600 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-900">Welcome back{name ? `, ${name}` : ""}</p>
          <p className="text-xs text-slate-500">Operations snapshot, alerts, and field updates in one place</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge tone={role === "admin" ? "success" : "neutral"}>{role.toUpperCase()}</Badge>
        <Button variant="secondary" loading={pending} onClick={onLogout} className="hover:-translate-y-[1px]">
          <LogOut className="mr-1" size={14} />
          Logout
        </Button>
      </div>
    </motion.header>
  );
}
