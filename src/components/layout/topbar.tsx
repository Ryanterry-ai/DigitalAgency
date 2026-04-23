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
      className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#333333] bg-[#222222]/95 px-4 backdrop-blur-xl md:px-6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-slate-200 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm text-[#9ca3af]">
            Dashboard <span className="px-1 text-[#666666]">›</span>{" "}
            <span className="text-[#e8822a]">{currentSection}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="hidden w-56 items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-2.5 py-1.5 lg:flex">
          <Search size={14} className="text-[#666666]" />
          <input
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-[#d1d5db] outline-none placeholder:text-[#666666]"
          />
          <span className="inline-flex items-center gap-1 rounded border border-[#444] px-1.5 py-0.5 text-[10px] text-[#888]">
            <Command size={10} />
            K
          </span>
        </label>

        <label className="hidden items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-2.5 py-1.5 md:flex">
          <Palette size={14} className="text-[#e8822a]" />
          <select
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as DashboardThemeId)}
            className="bg-transparent text-xs font-medium text-[#d1d5db] outline-none"
          >
            {DASHBOARD_THEMES.map((option) => (
              <option key={option.id} value={option.id} className="bg-[#1a1a1a] text-[#d1d5db]">
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-[#9ca3af] transition hover:text-[#e8822a]">
          <Bell size={14} />
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-[#9ca3af] transition hover:text-[#e8822a]">
          <Monitor size={14} />
        </button>

        <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#e8822a]/60 bg-gradient-to-br from-[#e8822a]/30 to-[#e8822a]/5 text-xs font-semibold text-[#f9fafb] sm:inline-flex">
          {name?.slice(0, 1).toUpperCase() || "A"}
        </div>

        <Badge tone={role === "admin" ? "success" : "neutral"}>{role.toUpperCase()}</Badge>
        <Button variant="ghost" loading={pending} onClick={onLogout} className="text-[#9ca3af] hover:text-[#f9fafb]">
          <LogOut size={14} />
        </Button>
      </div>
    </motion.header>
  );
}
