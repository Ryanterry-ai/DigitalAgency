"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { Card } from "@/components/ui/card";

const COLORS = ["#0891B2", "#22C55E", "#F59E0B", "#EF4444", "#6366F1"];

type ReportsChartProps = {
  monthlyTrend: Array<{ month: string; expenses: number; visits: number; orders: number }>;
  expenseByEmployee: Array<{ name: string; value: number }>;
  visitsByEmployee: Array<{ name: string; value: number }>;
  orderStatus: Array<{ name: string; value: number }>;
};

export function ReportsCharts({ monthlyTrend, expenseByEmployee, visitsByEmployee, orderStatus }: ReportsChartProps) {
  const reduceMotion = useReducedMotion();

  const topExpense = useMemo(
    () => [...expenseByEmployee].sort((a, b) => b.value - a.value).slice(0, 6),
    [expenseByEmployee],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Monthly Performance</p>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expenses" stroke="#0E7490" strokeWidth={2} isAnimationActive={!reduceMotion} />
              <Line type="monotone" dataKey="visits" stroke="#7C3AED" strokeWidth={2} isAnimationActive={!reduceMotion} />
              <Line type="monotone" dataKey="orders" stroke="#16A34A" strokeWidth={2} isAnimationActive={!reduceMotion} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Expense by Employee</p>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={topExpense}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0E7490" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Visits by Employee</p>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={visitsByEmployee}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="h-[320px] p-4">
          <p className="mb-4 text-sm font-semibold text-slate-900">Order Status Split</p>
          <ResponsiveContainer width="100%" height="88%">
            <PieChart>
              <Pie data={orderStatus} dataKey="value" nameKey="name" outerRadius={108} isAnimationActive={!reduceMotion}>
                {orderStatus.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}
