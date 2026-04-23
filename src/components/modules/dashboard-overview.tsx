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
      title: "TOTAL ATM SITES",
      value: data.metrics.totalAtmSites,
      helper: "Active network points",
      delta: "+8.3%",
      bars: [32, 46, 65, 82, 94],
    },
    {
      title: "PENDING ISSUES",
      value: data.metrics.pendingIssues,
      helper: "Requires immediate action",
      delta: "+2.1%",
      bars: [30, 42, 58, 74, 86],
    },
    {
      title: "RETAIL VISITS",
      value: data.metrics.retailVisits,
      helper: "Crompton route activity",
      delta: "+11.4%",
      bars: [35, 49, 68, 88, 95],
    },
    {
      title: "ORDERS BOOKED",
      value: data.metrics.ordersBooked,
      helper: "Committed distributor orders",
      delta: "+6.7%",
      bars: [31, 44, 60, 79, 92],
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
    success: "border-[#4ade80]/20 bg-[#4ade80]/10 text-[#4ade80]",
    pending: "border-[#fbbf24]/20 bg-[#fbbf24]/10 text-[#fbbf24]",
    refunded: "border-[#f87171]/20 bg-[#f87171]/10 text-[#f87171]",
  };

  return (
    <div className="space-y-4">
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
        <Card className="rounded-xl border border-[#2a2a2a] p-4">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
              <p className="text-xs text-[#9ca3af]">Live transactional records and operation status.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-56">
                <Search size={14} className="pointer-events-none absolute left-2.5 top-2.5 text-[#666666]" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search transactions"
                  className="pl-8"
                />
              </div>
              <Button>Add Transaction</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-y border-[#2a2a2a]">
                  {["", "ID", "Customer", "Product", "Status", "Qty", "Unit Price", "Total", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]"
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
                    className="border-b border-[#2a2a2a] transition hover:bg-[#2a2a2a]/50"
                  >
                    <td className="px-3 py-3">
                      <input type="checkbox" className="h-3.5 w-3.5 rounded border-[#3a3a3a] bg-[#1f1f1f]" />
                    </td>
                    <td className="px-3 py-3 text-[#9ca3af]">{entry.id}</td>
                    <td className="px-3 py-3 font-medium text-white">{entry.customer}</td>
                    <td className="px-3 py-3 text-[#d1d5db]">{entry.product}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.04em] ${statusStyle[entry.status]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#d1d5db]">{entry.quantity}</td>
                    <td className="px-3 py-3 text-[#d1d5db]">{formatCurrency(entry.unitPrice)}</td>
                    <td className="px-3 py-3 font-medium text-white">{formatCurrency(entry.total)}</td>
                    <td className="px-3 py-3">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white">
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
