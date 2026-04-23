import { RetailVisitModule } from "@/components/modules/retail-visit-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getEmployeeById, listEmployees, listRetailers } from "@/server/services/data.service";

export default async function RetailVisitsPage() {
  const session = await getCurrentSession();
  const isAdmin = session?.role === "admin";
  const currentEmployee = await getEmployeeById(session?.employeeId);
  if (session?.role === "employee" && currentEmployee?.category !== "crompton") {
    redirect("/dashboard");
  }

  const [employees, retailers] = await Promise.all([listEmployees(), listRetailers()]);
  const employeeOptions = isAdmin
    ? employees.map((employee) => ({ label: employee.fullName, value: employee.id }))
    : currentEmployee
      ? [{ label: currentEmployee.fullName, value: currentEmployee.id }]
      : [];

  return (
    <RetailVisitModule
      retailers={retailers.map((retailer) => ({ label: retailer.shopName, value: retailer.id }))}
      employees={employeeOptions}
      endpoint={isAdmin ? "/api/retail/visits" : "/api/retail/visits?scope=mine"}
      isEmployee={!isAdmin}
    />
  );
}
