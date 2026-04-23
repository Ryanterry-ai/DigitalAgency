"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  ClipboardCheck,
  FileBarChart2,
  Gauge,
  IndianRupee,
  ShieldCheck,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Role } from "@/types/entities";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

const NAV_GROUPS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Main Menu",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Gauge },
      { href: "/notifications", label: "Notifications", icon: Bell },
      { href: "/reports", label: "Reports", icon: FileBarChart2, adminOnly: true },
      { href: "/settings", label: "Settings", icon: ShieldCheck, adminOnly: true },
    ],
  },
  {
    title: "ATM Operations",
    items: [
      { href: "/atm/sites", label: "ATM Sites", icon: Building2 },
      { href: "/atm/visits", label: "Site Visits & Issues", icon: Wrench },
      { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/expenses", label: "Salary & Expenses", icon: IndianRupee },
    ],
  },
  {
    title: "Retail",
    items: [
      { href: "/retail/retailers", label: "Retailers", icon: Store },
      { href: "/retail/visits", label: "Retail Visits", icon: Store },
      { href: "/retail/orders", label: "Orders", icon: Store },
      { href: "/employees", label: "Employees", icon: Users, adminOnly: true },
    ],
  },
];

export function Sidebar({ role, onNavigate, name }: { role: Role; onNavigate?: () => void; name?: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-slate-950">
          SA
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Sai Associates</p>
        <h1 className="mt-1 text-sm font-semibold text-slate-100">CRM Command Center</h1>
      </div>

      <nav className="flex-1 space-y-5 overflow-auto px-3 pb-4 pt-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{group.title}</p>
            {group.items
              .filter((item) => !item.adminOnly || role === "admin")
              .map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "border border-sky-400/25 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-200"
                        : "text-slate-300 hover:bg-white/10 hover:text-slate-50",
                    )}
                  >
                    <Icon size={15} className={cn(active ? "text-sky-300" : "text-slate-400 group-hover:text-slate-200")} />
                    {item.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/40 bg-slate-800/70 text-sm font-semibold text-slate-100">
              {(name?.slice(0, 1) || "A").toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-100">{name || "Admin User"}</p>
              <p className="text-xs text-slate-400">{role === "admin" ? "Administrator" : "Employee"}</p>
            </div>
          </div>
          <div className="mt-3 inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-200">
            Pro Plan
          </div>
        </div>
      </div>
    </aside>
  );
}
