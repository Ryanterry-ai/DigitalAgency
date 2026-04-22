import { RetailVisitModule } from "@/components/modules/retail-visit-module";
import { listEmployees, listRetailers } from "@/server/services/data.service";

export default async function RetailVisitsPage() {
  const [employees, retailers] = await Promise.all([listEmployees(), listRetailers()]);

  return (
    <RetailVisitModule
      retailers={retailers.map((retailer) => ({ label: retailer.shopName, value: retailer.id }))}
      employees={employees.map((employee) => ({ label: employee.fullName, value: employee.id }))}
    />
  );
}
