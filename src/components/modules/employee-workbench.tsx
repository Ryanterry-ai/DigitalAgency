import Link from "next/link";
import { ArrowRight, Bell, ClipboardList, MapPin, ReceiptText, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import type {
  AttendanceRecord,
  EmployeeCategory,
  FlmTaskRecord,
  NotificationRecord,
  OrderRecord,
  RetailVisitRecord,
  SiteVisitRecord,
} from "@/types/entities";

type WorkbenchData = {
  category: EmployeeCategory;
  attendanceToday: AttendanceRecord | null;
  monthExpenses: number;
  pendingLeave: number;
  pendingAdvance: number;
  openTasks: FlmTaskRecord[];
  recentNotifications: NotificationRecord[];
  recentVisits: SiteVisitRecord[];
  recentOrders: OrderRecord[];
  recentRetailVisits: RetailVisitRecord[];
  kpis: {
    visitsToday?: number;
    pendingIssues?: number;
    resolvedIssues?: number;
    visitsThisWeek?: number;
    newOrders?: number;
    followUpsDue?: number;
  };
};

export function EmployeeWorkbench({
  employeeName,
  category,
  data,
}: {
  employeeName: string;
  category: EmployeeCategory;
  data: WorkbenchData;
}) {
  const quickActions =
    category === "atm"
      ? [
          { href: "/attendance", label: "Mark Attendance", icon: ClipboardList },
          { href: "/atm/visits", label: "Log ATM Visit", icon: MapPin },
          { href: "/expenses", label: "Add Expense", icon: ReceiptText },
          { href: "/requests/leave", label: "Apply Leave", icon: ClipboardList },
          { href: "/requests/advance", label: "Advance Request", icon: ReceiptText },
          { href: "/flm/tasks", label: "Update FLM Tasks", icon: ClipboardList },
        ]
      : [
          { href: "/attendance", label: "Mark Attendance", icon: ClipboardList },
          { href: "/retail/visits", label: "Capture Retail Visit", icon: MapPin },
          { href: "/retail/orders", label: "Log Retail Order", icon: ShoppingBag },
          { href: "/salary", label: "View Salary", icon: ReceiptText },
          { href: "/notifications", label: "Check Alerts", icon: Bell },
          { href: "/profile/details", label: "Update Profile", icon: ClipboardList },
        ];

  const attendanceStatus = data.attendanceToday?.punchOut
    ? "Shift closed"
    : data.attendanceToday?.punchIn
      ? "On duty"
      : "Not marked";

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {category === "atm" ? "ATM Employee Panel" : "Crompton Employee Panel"}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">Welcome, {employeeName}</h2>
        <p className="mt-1 text-sm text-slate-300">
          Daily workbench with your assignments, requests, attendance status, and follow-up actions.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Attendance Today</p>
          <p className="mt-2 text-2xl font-semibold text-white">{attendanceStatus}</p>
          <p className="mt-1 text-xs text-slate-400">
            {data.attendanceToday?.punchIn ? `Punch In ${formatDateTime(data.attendanceToday.punchIn)}` : "Mark attendance now"}
          </p>
        </Card>

        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Month Expenses</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(data.monthExpenses)}</p>
          <p className="mt-1 text-xs text-slate-400">Submitted expenses in current month</p>
        </Card>

        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Pending Leave</p>
          <p className="mt-2 text-2xl font-semibold text-white">{data.pendingLeave}</p>
          <p className="mt-1 text-xs text-slate-400">Requests awaiting admin decision</p>
        </Card>

        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Pending Advance</p>
          <p className="mt-2 text-2xl font-semibold text-white">{data.pendingAdvance}</p>
          <p className="mt-1 text-xs text-slate-400">Advance requests awaiting approval</p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {category === "atm" ? (
          <>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Visits Today</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.visitsToday ?? 0}</p>
            </Card>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Pending Issues</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.pendingIssues ?? 0}</p>
            </Card>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Resolved Issues</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.resolvedIssues ?? 0}</p>
            </Card>
          </>
        ) : (
          <>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Visits This Week</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.visitsThisWeek ?? 0}</p>
            </Card>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">New Orders</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.newOrders ?? 0}</p>
            </Card>
            <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Follow-ups Due</p>
              <p className="mt-2 text-2xl font-semibold text-white">{data.kpis.followUpsDue ?? 0}</p>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-sm font-semibold text-white">Quick Actions</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-300/40 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={14} className="text-sky-300" />
                    {action.label}
                  </span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-sm font-semibold text-white">Open Tasks</p>
          <div className="mt-3 space-y-2">
            {data.openTasks.length === 0 ? (
              <p className="text-sm text-slate-400">No open tasks right now.</p>
            ) : (
              data.openTasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-100">{task.taskTitle}</p>
                    <Badge tone={task.status === "pending" ? "warning" : "neutral"}>{task.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{formatDate(task.taskDate)} • {task.siteOrArea || "General area"}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-sm font-semibold text-white">
            {category === "atm" ? "Recent ATM Visits" : "Recent Retail Visits"}
          </p>
          <div className="mt-3 space-y-2">
            {category === "atm" ? (
              data.recentVisits.length === 0 ? (
                <p className="text-sm text-slate-400">No ATM visits submitted yet.</p>
              ) : (
                data.recentVisits.map((visit) => (
                  <div key={visit.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-100">{visit.siteName}</p>
                      <Badge tone={visit.status === "resolved" ? "success" : "warning"}>{visit.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{visit.issueType.replace("_", " ")} • {formatDateTime(visit.visitedAt)}</p>
                  </div>
                ))
              )
            ) : data.recentRetailVisits.length === 0 ? (
              <p className="text-sm text-slate-400">No retail visits submitted yet.</p>
            ) : (
              data.recentRetailVisits.map((visit) => (
                <div key={visit.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-100">{visit.shopName}</p>
                    <Badge tone={visit.proofStatus === "verified" ? "success" : "danger"}>{visit.proofStatus}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{formatDate(visit.visitDate)} • {visit.visitTime}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-sm font-semibold text-white">
            {category === "atm" ? "Recent Notifications" : "Recent Orders"}
          </p>
          <div className="mt-3 space-y-2">
            {category === "atm" ? (
              data.recentNotifications.length === 0 ? (
                <p className="text-sm text-slate-400">No recent alerts.</p>
              ) : (
                data.recentNotifications.map((notification) => (
                  <div key={notification.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-medium text-slate-100">{notification.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{notification.message}</p>
                  </div>
                ))
              )
            ) : data.recentOrders.length === 0 ? (
              <p className="text-sm text-slate-400">No recent orders logged yet.</p>
            ) : (
              data.recentOrders.map((order) => (
                <div key={order.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-100">{order.shopName}</p>
                    <Badge tone={order.orderStatus === "confirmed" ? "success" : "warning"}>{order.orderStatus}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{order.productName} • Qty {order.quantity}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
