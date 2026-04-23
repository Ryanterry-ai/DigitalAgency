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
      <div className="border-b border-[#333333] px-4 pb-4 pt-5">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8822a] text-xs font-bold text-[#1a1a1a]">
          SA
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-[#666666]">Sai Associates</p>
        <h1 className="mt-1 text-sm font-semibold text-[#f9fafb]">Management System</h1>
      </div>

      <nav className="flex-1 space-y-4 overflow-auto px-3 pb-4 pt-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">{group.title}</p>
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
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                      active
                        ? "border border-[#e8822a]/20 bg-[#e8822a]/15 text-[#e8822a]"
                        : "text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-[#f9fafb]",
                    )}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      <div className="border-t border-[#333333] p-3">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#222222] p-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e8822a]/40 bg-[#1f1f1f] text-sm font-semibold text-[#f9fafb]">
              {(name?.slice(0, 1) || "A").toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-[#f9fafb]">{name || "Admin User"}</p>
              <p className="text-xs text-[#9ca3af]">{role === "admin" ? "Administrator" : "Employee"}</p>
            </div>
          </div>
          <div className="mt-3 inline-flex rounded-full border border-[#e8822a]/35 bg-[#e8822a]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#e8822a]">
            Pro Plan
          </div>
        </div>
      </div>
    </aside>
  );
}
