"use client";

import { AlertTriangle, Building2, CheckCircle2, IndianRupee, ListTodo, Store } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { OverviewCharts } from "@/components/charts/overview-charts";
import { FadeIn } from "@/components/motion/fade-in";
import { MetricCard } from "@/components/modules/metric-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

type DashboardOverviewProps = {
  data: {
    metrics: {
      totalAtmSites: number;
      pendingIssues: number;
      resolvedIssues: number;
      todaysAttendance: number;
      monthlyExpenses: number;
      retailVisits: number;
      ordersBooked: number;
      pendingFollowUps: number;
    };
    issueTrend: Array<{ label: string; pending: number; resolved: number }>;
    retailTrend: Array<{ label: string; visits: number; orders: number }>;
    expenseByType: Array<{ name: string; value: number }>;
    recentNotifications: Array<{ id: string; title: string; message: string; type: string; isRead: boolean; createdAt: string }>;
  };
};

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const reduceMotion = useReducedMotion();

  const metrics = [
    {
      title: "ATM Sites",
      value: data.metrics.totalAtmSites,
      helper: "Active network points",
      icon: <Building2 size={18} />,
      accent: "#0891B2",
    },
    {
      title: "Pending Issues",
      value: data.metrics.pendingIssues,
      helper: "Requires immediate action",
      icon: <AlertTriangle size={18} />,
      accent: "#D97706",
    },
    {
      title: "Resolved Issues",
      value: data.metrics.resolvedIssues,
      helper: "Closed in current cycle",
      icon: <CheckCircle2 size={18} />,
      accent: "#16A34A",
    },
    {
      title: "Monthly Expenses",
      value: data.metrics.monthlyExpenses,
      helper: "Field + maintenance costs",
      icon: <IndianRupee size={18} />,
      accent: "#7C3AED",
    },
    {
      title: "Retail Visits",
      value: data.metrics.retailVisits,
      helper: "Crompton route activity",
      icon: <Store size={18} />,
      accent: "#0EA5E9",
    },
    {
      title: "Pending Follow-ups",
      value: data.metrics.pendingFollowUps,
      helper: "Sales actions due soon",
      icon: <ListTodo size={18} />,
      accent: "#EF4444",
    },
  ];

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((item) => (
            <MetricCard key={item.title} {...item} />
          ))}
        </div>
      </FadeIn>

      <OverviewCharts
        issueTrend={data.issueTrend}
        retailTrend={data.retailTrend}
        expenseByType={data.expenseByType}
      />

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      >
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Recent Alerts</h3>
            <Badge tone="neutral">{data.recentNotifications.length}</Badge>
          </div>
          <div className="space-y-2">
            {data.recentNotifications.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduceMotion ? undefined : { opacity: 0, x: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-lg border bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <Badge tone={item.isRead ? "neutral" : "warning"}>{item.type}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                <p className="mt-1 text-xs text-slate-400">{formatDateTime(item.createdAt)}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
