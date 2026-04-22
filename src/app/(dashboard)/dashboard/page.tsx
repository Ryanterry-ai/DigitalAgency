import { DashboardOverview } from "@/components/modules/dashboard-overview";
import { getDashboardOverview } from "@/server/services/data.service";

export default async function DashboardPage() {
  const data = await getDashboardOverview();
  return <DashboardOverview data={data} />;
}
