"use client";

import { useTransition } from "react";
import { Bell, Command, LogOut, Menu, Monitor, Palette, Search } from "lucide-react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const currentSection =
    pathname
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join(" / ") || "Overview";

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
      className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-2xl md:px-6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-slate-200 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400">
            Dashboard <span className="px-1 text-slate-500">›</span>{" "}
            <span className="text-sky-300">{currentSection}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="hidden w-56 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 lg:flex">
          <Search size={14} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-500"
          />
          <span className="inline-flex items-center gap-1 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-slate-400">
            <Command size={10} />
            K
          </span>
        </label>

        <label className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 md:flex">
          <Palette size={14} className="text-sky-300" />
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

        <button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-slate-400 transition hover:text-sky-300">
          <Bell size={14} />
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-slate-400 transition hover:text-sky-300">
          <Monitor size={14} />
        </button>

        <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-sky-300/50 bg-gradient-to-br from-sky-400/30 to-indigo-500/30 text-xs font-semibold text-slate-50 sm:inline-flex">
          {name?.slice(0, 1).toUpperCase() || "A"}
        </div>

        <Badge tone={role === "admin" ? "success" : "neutral"}>{role.toUpperCase()}</Badge>
        <Button variant="ghost" loading={pending} onClick={onLogout} className="text-slate-400 hover:text-slate-100">
          <LogOut size={14} />
        </Button>
      </div>
    </motion.header>
  );
}
