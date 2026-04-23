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

import { cn } from "@/lib/utils";
import { Role } from "@/types/entities";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/atm/sites", label: "ATM Sites", icon: Building2 },
  { href: "/atm/visits", label: "Site Visits & Issues", icon: Wrench },
  { href: "/employees", label: "Employees", icon: Users, adminOnly: true },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/expenses", label: "Salary & Expenses", icon: IndianRupee },
  { href: "/retail/retailers", label: "Retailers", icon: Store },
  { href: "/retail/visits", label: "Retail Visits", icon: Store },
  { href: "/retail/orders", label: "Orders", icon: Store },
  { href: "/reports", label: "Reports", icon: FileBarChart2, adminOnly: true },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: ShieldCheck, adminOnly: true },
];

export function Sidebar({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Sai Associates</p>
        <h1 className="mt-2 text-lg font-semibold text-slate-100">Management System</h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-auto px-3 pb-4">
        {NAV.filter((item) => !item.adminOnly || role === "admin").map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_10px_28px_rgba(6,182,212,.3)]"
                  : "text-slate-300 hover:bg-white/10 hover:text-slate-100",
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
