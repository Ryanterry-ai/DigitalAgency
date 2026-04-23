"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Banknote,
  Bell,
  Building2,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  FileBarChart2,
  Gauge,
  HandCoins,
  IndianRupee,
  ScrollText,
  ShieldCheck,
  Store,
  UserCircle2,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { EmployeeCategory, Role } from "@/types/entities";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  employeeOnly?: boolean;
  categories?: EmployeeCategory[];
};

const NAV_GROUPS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Main Menu",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Gauge },
      { href: "/notifications", label: "Notifications", icon: Bell },
      { href: "/reports", label: "Reports", icon: FileBarChart2, adminOnly: true },
      { href: "/settings", label: "Settings", icon: ShieldCheck, adminOnly: true },
      { href: "/profile/details", label: "Employee Details", icon: UserCircle2, employeeOnly: true },
    ],
  },
  {
    title: "Admin Panel",
    items: [
      { href: "/employees", label: "Employee Name Edit", icon: Users, adminOnly: true },
      { href: "/salary", label: "Salary Adjustment", icon: Banknote, adminOnly: true },
      { href: "/expenses", label: "Daily Expense Tracker", icon: IndianRupee, adminOnly: true },
      { href: "/flm/tasks", label: "FLM Daily Tasks", icon: ClipboardList, adminOnly: true },
      { href: "/retail/orders", label: "Crompton Orders", icon: Store, adminOnly: true },
      { href: "/retail/visits", label: "Retailer Visits", icon: Store, adminOnly: true },
    ],
  },
  {
    title: "ATM User Panel",
    items: [
      {
        href: "/salary",
        label: "Salary View",
        icon: Banknote,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/requests/advance",
        label: "Salary Advance Request",
        icon: HandCoins,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/requests/leave",
        label: "Leave Request",
        icon: CalendarClock,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/expenses",
        label: "Daily Expense",
        icon: IndianRupee,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/attendance",
        label: "Attendance",
        icon: ClipboardCheck,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/flm/tasks",
        label: "FLM (Daily Task)",
        icon: ClipboardList,
        employeeOnly: true,
        categories: ["atm"],
      },
      {
        href: "/atm/visits",
        label: "ATM Visits & Issues",
        icon: Wrench,
        employeeOnly: true,
        categories: ["atm"],
      },
    ],
  },
  {
    title: "Crompton User Panel",
    items: [
      {
        href: "/retail/visits",
        label: "Retailer Visit",
        icon: Store,
        employeeOnly: true,
        categories: ["crompton"],
      },
      {
        href: "/attendance",
        label: "Attendance",
        icon: ClipboardCheck,
        employeeOnly: true,
        categories: ["crompton"],
      },
      {
        href: "/salary",
        label: "Salary",
        icon: Banknote,
        employeeOnly: true,
        categories: ["crompton"],
      },
      {
        href: "/retail/orders",
        label: "Orders",
        icon: ScrollText,
        employeeOnly: true,
        categories: ["crompton"],
      },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/atm/sites", label: "ATM Sites", icon: Building2, adminOnly: true },
      { href: "/retail/retailers", label: "Retailers", icon: Store },
      { href: "/requests/advance", label: "Advance Requests", icon: HandCoins, adminOnly: true },
      { href: "/requests/leave", label: "Leave Requests", icon: CalendarClock, adminOnly: true },
    ],
  },
];

export function Sidebar({
  role,
  employeeCategory,
  onNavigate,
  name,
}: {
  role: Role;
  employeeCategory?: EmployeeCategory;
  onNavigate?: () => void;
  name?: string;
}) {
  const pathname = usePathname();
  const resolvedCategory: EmployeeCategory = employeeCategory ?? (role === "admin" ? "admin" : "atm");

  const canAccess = (item: NavItem) => {
    if (item.adminOnly && role !== "admin") return false;
    if (item.employeeOnly && role !== "employee") return false;

    if (item.categories && role === "employee" && !item.categories.includes(resolvedCategory)) {
      return false;
    }

    return true;
  };

  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-slate-950">
          SA
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Sai Associates</p>
        <h1 className="mt-1 text-sm font-semibold text-slate-100">CRM Command Center</h1>
      </div>

      <nav className="flex-1 space-y-5 overflow-auto px-3 pb-4 pt-5">
        {NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter(canAccess);
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">{group.title}</p>
              {visibleItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200",
                      active
                        ? "border border-sky-400/25 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-200"
                        : "text-slate-200 hover:translate-x-[2px] hover:bg-white/10 hover:text-slate-50",
                    )}
                  >
                    <Icon size={15} className={cn(active ? "text-sky-300" : "text-slate-300 group-hover:text-slate-100")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/40 bg-slate-800/70 text-sm font-semibold text-slate-100">
              {(name?.slice(0, 1) || "A").toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-100">{name || "Admin User"}</p>
              <p className="text-xs text-slate-400">
                {role === "admin" ? "Administrator" : `${resolvedCategory.toUpperCase()} Employee`}
              </p>
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
