"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, useReducedMotion } from "framer-motion";

import { Card } from "@/components/ui/card";

type DashboardChartProps = {
  issueTrend: Array<{ label: string; pending: number; resolved: number }>;
  retailTrend: Array<{ label: string; visits: number; orders: number }>;
  expenseByType: Array<{ name: string; value: number }>;
};

const COLORS = ["#0E7490", "#14B8A6", "#F59E0B", "#EF4444", "#6366F1"];

export function OverviewCharts({ issueTrend, retailTrend, expenseByType }: DashboardChartProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">ATM Issue Trend</p>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={issueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
              <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Retail Visits vs Orders</p>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={retailTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#0E7490" strokeWidth={2} isAnimationActive={!reduceMotion} />
              <Line type="monotone" dataKey="orders" stroke="#7C3AED" strokeWidth={2} isAnimationActive={!reduceMotion} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-2"
      >
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Expense Composition</p>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie
                data={expenseByType}
                dataKey="value"
                nameKey="name"
                outerRadius={108}
                isAnimationActive={!reduceMotion}
                label
              >
                {expenseByType.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}
