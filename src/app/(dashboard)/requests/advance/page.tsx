import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { listEmployees } from "@/server/services/data.service";

export default async function AdvanceRequestsPage() {
  const session = await getCurrentSession();
  const employees = await listEmployees();
  const isAdmin = session?.role === "admin";

  const fields: FieldConfig[] = [
    ...(isAdmin
      ? [
          {
            name: "employeeId",
            label: "Employee",
            type: "select" as const,
            required: true,
            options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
          },
        ]
      : []),
    { name: "requestDate", label: "Request Date", type: "date", required: true },
    { name: "amount", label: "Advance Amount", type: "number", required: true },
    { name: "reason", label: "Reason", type: "textarea", required: true },
    ...(isAdmin
      ? [
          {
            name: "status",
            label: "Status",
            type: "select" as const,
            options: [
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
        ]
      : []),
  ];

  return (
    <ResourceModule
      title="Salary Advance Requests"
      description="Submit and track salary advance requests with approval status."
      endpoint={isAdmin ? "/api/requests/advance" : "/api/requests/advance?scope=mine"}
      fields={fields}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "requestDate", header: "Date" },
        { key: "amount", header: "Amount" },
        { key: "reason", header: "Reason" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
