"use client";

import { useTransition } from "react";
import { LogOut, Menu, Palette } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_THEMES, DashboardThemeId } from "@/lib/dashboard-theme";
import { transitions } from "@/lib/motion";

export function Topbar({
  role,
  name,
  onOpenSidebar,
  theme,
  onThemeChange,
}: {
  role: "admin" | "employee";
  name?: string;
  onOpenSidebar: () => void;
  theme: DashboardThemeId;
  onThemeChange: (theme: DashboardThemeId) => void;
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
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a1324]/70 px-4 backdrop-blur-xl md:px-6"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-slate-200 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-100">Welcome back{name ? `, ${name}` : ""}</p>
          <p className="text-xs text-slate-400">Operations snapshot, alerts, and field updates in one place</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 md:flex">
          <Palette size={14} className="text-cyan-300" />
          <select
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as DashboardThemeId)}
            className="bg-transparent text-xs font-medium text-slate-100 outline-none"
          >
            {DASHBOARD_THEMES.map((option) => (
              <option key={option.id} value={option.id} className="bg-slate-900 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <Badge tone={role === "admin" ? "success" : "neutral"}>{role.toUpperCase()}</Badge>
        <Button variant="secondary" loading={pending} onClick={onLogout} className="hover:-translate-y-[1px]">
          <LogOut className="mr-1" size={14} />
          Logout
        </Button>
      </div>
    </motion.header>
  );
}
