import { DashboardOverview } from "@/components/modules/dashboard-overview";
import { EmployeeWorkbench } from "@/components/modules/employee-workbench";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getDashboardOverview, getEmployeeById, getEmployeeWorkbenchData } from "@/server/services/data.service";

export default async function DashboardPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  if (session.role === "admin") {
    const data = await getDashboardOverview();
    return <DashboardOverview data={data} />;
  }

  const employee = await getEmployeeById(session.employeeId);
  if (!employee) {
    redirect("/login");
  }

  const employeeCategory = employee.category === "crompton" ? "crompton" : "atm";
  const data = await getEmployeeWorkbenchData(employee.id, employeeCategory);
  return <EmployeeWorkbench employeeName={employee.fullName} category={employeeCategory} data={data} />;
}
