import { ReportsCharts } from "@/components/charts/reports-charts";
import { Card } from "@/components/ui/card";
import { getReportsData } from "@/server/services/data.service";

export default async function ReportsPage() {
  const data = await getReportsData();

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-slate-900">Reports & Insights</h2>
        <p className="text-sm text-slate-500">
          ATM operations, field efficiency, order conversion, and expense trends for management review.
        </p>
      </Card>

      <ReportsCharts
        monthlyTrend={data.monthlyTrend}
        expenseByEmployee={data.expenseByEmployee}
        visitsByEmployee={data.visitsByEmployee}
        orderStatus={data.orderStatus}
      />
    </div>
  );
}
