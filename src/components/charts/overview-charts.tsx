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
  const combined = issueTrend.map((entry, index) => ({
    month: entry.label,
    volume: entry.pending + entry.resolved + (retailTrend[index]?.orders ?? 0),
    conversion: (retailTrend[index]?.visits ?? 0) + (retailTrend[index]?.orders ?? 0),
  }));
  const highlightedMonth = combined[combined.length - 1]?.month;

  const breakdown = expenseByType
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const maxBreakdown = Math.max(...breakdown.map((item) => item.value), 1);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8"
      >
        <Card className="h-[320px] rounded-xl border border-[#2a2a2a] p-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">Sales Trend</p>
          <p className="mb-4 text-sm text-[#9ca3af]">Grouped monthly performance and conversion depth.</p>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={combined} barGap={8}>
              <CartesianGrid strokeDasharray="4 4" stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="month" stroke="#666666" tickLine={false} axisLine={false} />
              <YAxis stroke="#666666" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(232,130,42,0.12)" }}
                contentStyle={{
                  background: "#2a2a2a",
                  border: "1px solid #3a3a3a",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                }}
              />
              <ReferenceLine x={highlightedMonth} stroke="#e8822a" strokeDasharray="4 4" />
              <Bar dataKey="volume" fill="rgba(232,130,42,0.35)" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
              <Bar dataKey="conversion" fill="#e8822a" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-4"
      >
        <Card className="h-[320px] rounded-xl border border-[#2a2a2a] p-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">Revenue Breakdown</p>
          <p className="mb-3 text-sm text-[#9ca3af]">AI-assisted composition and frequency bars.</p>

          <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-2">
            <Sparkles size={14} className="text-[#e8822a]" />
            <p className="text-xs text-[#d1d5db]">AI Insight: Maintenance and petrol are the top cost drivers this week.</p>
            <Settings2 size={14} className="ml-auto text-[#666666]" />
          </div>

          <div className="space-y-2">
            {breakdown.map((entry) => (
              <div key={entry.name}>
                <div className="mb-1 flex items-center justify-between text-xs text-[#9ca3af]">
                  <span className="capitalize">{entry.name}</span>
                  <span>{entry.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[#2a2a2a]">
                  <motion.div
                    className="h-full rounded-full bg-[#e8822a]"
                    initial={reduceMotion ? undefined : { width: 0 }}
                    animate={reduceMotion ? undefined : { width: `${(entry.value / maxBreakdown) * 100}%` }}
                    transition={reduceMotion ? undefined : { duration: 0.35 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex h-10 items-end gap-[2px]">
            {combined.map((entry, index) => {
              const value = Math.min(95, Math.max(30, Math.round((entry.volume / 14) * 100)));
              return (
                <span
                  key={`mini-${entry.month}`}
                  className="w-1.5 rounded-sm bg-[#e8822a]"
                  style={{ height: `${value}%`, opacity: index < 2 ? 0.4 : 1 }}
                />
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
