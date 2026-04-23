"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, useReducedMotion } from "framer-motion";
import { Settings2, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

type DashboardChartProps = {
  issueTrend: Array<{ label: string; pending: number; resolved: number }>;
  retailTrend: Array<{ label: string; visits: number; orders: number }>;
  expenseByType: Array<{ name: string; value: number }>;
};

export function OverviewCharts({ issueTrend, retailTrend, expenseByType }: DashboardChartProps) {
  const reduceMotion = useReducedMotion();

  const salesSeries = issueTrend.map((entry, index) => ({
    month: entry.label,
    leads: entry.pending + entry.resolved + (retailTrend[index]?.orders ?? 0),
    closes: Math.max(1, (retailTrend[index]?.visits ?? 0) + (retailTrend[index]?.orders ?? 0) - 2),
  }));
  const focusMonth = salesSeries[salesSeries.length - 1]?.month;

  const breakdown = expenseByType
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const maxBreakdown = Math.max(...breakdown.map((item) => item.value), 1);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="lg:col-span-8"
      >
        <Card className="h-[330px] rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Sales Momentum</p>
          <p className="mb-4 text-sm text-slate-300">Lead velocity vs closed outcomes by cycle.</p>
          <ResponsiveContainer width="100%" height="82%">
            <BarChart data={salesSeries} barGap={7}>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(148,163,184,0.22)" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(56,189,248,0.1)" }}
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148,163,184,.28)",
                  borderRadius: "12px",
                  color: "#e2e8f0",
                }}
              />
              <ReferenceLine x={focusMonth} stroke="#38bdf8" strokeDasharray="4 4" />
              <Bar dataKey="leads" fill="rgba(99,102,241,0.52)" radius={[6, 6, 0, 0]} isAnimationActive={!reduceMotion} />
              <Bar dataKey="closes" fill="rgba(56,189,248,0.92)" radius={[6, 6, 0, 0]} isAnimationActive={!reduceMotion} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="lg:col-span-4"
      >
        <Card className="h-[330px] rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Revenue Mix</p>
          <p className="mb-3 text-sm text-slate-300">AI-highlighted expense concentration.</p>

          <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2">
            <Sparkles size={14} className="text-sky-300" />
            <p className="text-xs text-slate-200">Insight: top 2 categories now drive most spend variance.</p>
            <Settings2 size={14} className="ml-auto text-slate-400" />
          </div>

          <div className="space-y-2">
            {breakdown.map((entry) => (
              <div key={entry.name}>
                <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                  <span className="capitalize">{entry.name}</span>
                  <span>{entry.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800/70">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                    initial={reduceMotion ? undefined : { width: 0 }}
                    animate={reduceMotion ? undefined : { width: `${(entry.value / maxBreakdown) * 100}%` }}
                    transition={reduceMotion ? undefined : { duration: 0.34 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex h-10 items-end gap-[3px]">
            {salesSeries.map((entry, index) => {
              const value = Math.min(96, Math.max(30, Math.round((entry.leads / 14) * 100)));
              return (
                <span
                  key={`mini-${entry.month}`}
                  className="w-1.5 rounded-sm bg-sky-300"
                  style={{ height: `${value}%`, opacity: index < 2 ? 0.38 : 0.95 }}
                />
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
