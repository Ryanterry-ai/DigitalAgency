"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { OverviewCharts } from "@/components/charts/overview-charts";
import { FadeIn } from "@/components/motion/fade-in";
import { MetricCard } from "@/components/modules/metric-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

type TransactionStatus = "success" | "pending" | "refunded";

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
    recentTransactions: Array<{
      id: string;
      customer: string;
      product: string;
      status: TransactionStatus;
      quantity: number;
      unitPrice: number;
      total: number;
    }>;
  };
};

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");

  const metrics = [
    {
      title: "Active Pipelines",
      value: data.metrics.totalAtmSites,
      helper: "ATM + Retail accounts in motion",
      delta: "+8.4%",
      bars: [34, 45, 63, 80, 94],
      gradient: "bg-gradient-to-br from-sky-500/35 via-cyan-500/20 to-slate-900/80",
    },
    {
      title: "Pending Escalations",
      value: data.metrics.pendingIssues,
      helper: "Issues requiring owner attention",
      delta: "+2.1%",
      bars: [31, 42, 55, 72, 86],
      gradient: "bg-gradient-to-br from-amber-400/35 via-orange-500/20 to-slate-900/80",
    },
    {
      title: "Visits Completed",
      value: data.metrics.retailVisits,
      helper: "Field team productivity this cycle",
      delta: "+11.2%",
      bars: [36, 52, 66, 84, 95],
      gradient: "bg-gradient-to-br from-emerald-400/30 via-teal-500/20 to-slate-900/80",
    },
    {
      title: "Orders Closed",
      value: data.metrics.ordersBooked,
      helper: "Confirmed commitments in funnel",
      delta: "+6.9%",
      bars: [29, 43, 60, 77, 91],
      gradient: "bg-gradient-to-br from-indigo-500/35 via-violet-500/20 to-slate-900/80",
    },
  ];

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data.recentTransactions;

    return data.recentTransactions.filter((entry) =>
      [entry.id, entry.customer, entry.product].some((field) => field.toLowerCase().includes(query)),
    );
  }, [data.recentTransactions, search]);

  const statusStyle: Record<TransactionStatus, string> = {
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    refunded: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <Card className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Recent Transactions</h3>
              <p className="text-sm text-slate-400">Pipeline movements, payouts, and follow-up outcomes.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-56">
                <Search size={14} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer or product"
                  className="pl-8"
                />
              </div>
              <Button>Add Transaction</Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/50">
                  {["", "ID", "Customer", "Product", "Status", "Qty", "Unit Price", "Total", ""].map((header) => (
                    <th
                      key={header}
                      className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((entry, index) => (
                  <motion.tr
                    key={`${entry.id}-${index}`}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 5 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.2) }}
                    className="border-b border-white/10 transition hover:bg-white/5"
                  >
                    <td className="px-3 py-3">
                      <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-slate-900/50" />
                    </td>
                    <td className="px-3 py-3 text-slate-400">{entry.id}</td>
                    <td className="px-3 py-3 font-medium text-slate-100">{entry.customer}</td>
                    <td className="px-3 py-3 text-slate-300">{entry.product}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${statusStyle[entry.status]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-300">{entry.quantity}</td>
                    <td className="px-3 py-3 text-slate-300">{formatCurrency(entry.unitPrice)}</td>
                    <td className="px-3 py-3 font-semibold text-white">{formatCurrency(entry.total)}</td>
                    <td className="px-3 py-3">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/10 hover:text-white">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
