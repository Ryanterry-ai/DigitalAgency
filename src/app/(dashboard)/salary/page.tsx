import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { listEmployees } from "@/server/services/data.service";

export default async function SalaryPage() {
  const session = await getCurrentSession();
  const employees = await listEmployees();
  const isAdmin = session?.role === "admin";

  const fields: FieldConfig[] = isAdmin
    ? [
        {
          name: "employeeId",
          label: "Employee",
          type: "select",
          required: true,
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        { name: "month", label: "Month (YYYY-MM)", required: true },
        { name: "baseSalary", label: "Base Salary", type: "number", required: true },
        { name: "adjustment", label: "Adjustment (+/-)", type: "number", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Pending", value: "pending" },
            { label: "Paid", value: "paid" },
            { label: "Hold", value: "hold" },
          ],
        },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]
    : [
        { name: "month", label: "Month" },
        { name: "baseSalary", label: "Base Salary" },
        { name: "adjustment", label: "Adjustment" },
        { name: "netSalary", label: "Net Salary" },
        { name: "status", label: "Status" },
        { name: "remarks", label: "Remarks" },
      ];

  return (
    <ResourceModule
      title="Salary View & Adjustments"
      description={
        isAdmin
          ? "Admin can adjust salary records and publish payroll status month-wise."
          : "View your salary status and adjustment records."
      }
      endpoint={isAdmin ? "/api/salary" : "/api/salary?scope=mine"}
      allowCreate={isAdmin}
      allowEdit={isAdmin}
      fields={fields}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "month", header: "Month" },
        { key: "baseSalary", header: "Base" },
        { key: "adjustment", header: "Adjust" },
        { key: "netSalary", header: "Net" },
        { key: "status", header: "Status" },
        { key: "updatedAt", header: "Updated" },
      ]}
    />
  );
}
