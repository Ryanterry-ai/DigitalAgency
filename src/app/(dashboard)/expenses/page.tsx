import { ResourceModule } from "@/components/modules/resource-module";
import { listAtmSites, listEmployees } from "@/server/services/data.service";

export default async function ExpensesPage() {
  const [employees, sites] = await Promise.all([listEmployees(), listAtmSites()]);

  return (
    <ResourceModule
      title="Salary & Expense Tracking"
      description="Track salary, advances, petrol, maintenance, and other spend categories."
      endpoint="/api/expenses"
      fields={[
        {
          name: "employeeId",
          label: "Employee",
          type: "select",
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        {
          name: "atmSiteId",
          label: "ATM Site",
          type: "select",
          options: sites.map((site) => ({ label: site.siteName, value: site.id })),
        },
        {
          name: "expenseType",
          label: "Expense Type",
          type: "select",
          required: true,
          options: [
            { label: "Salary", value: "salary" },
            { label: "Advance", value: "advance" },
            { label: "Petrol", value: "petrol" },
            { label: "Maintenance", value: "maintenance" },
            { label: "Other", value: "other" },
          ],
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        { name: "expenseDate", label: "Expense Date", type: "date", required: true },
        { name: "proofUrl", label: "Proof Upload", type: "file" },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "siteName", header: "Site" },
        { key: "expenseType", header: "Type" },
        { key: "amount", header: "Amount" },
        { key: "expenseDate", header: "Date" },
      ]}
    />
  );
}
