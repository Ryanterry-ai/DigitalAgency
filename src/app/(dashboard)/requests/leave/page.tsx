import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { listEmployees } from "@/server/services/data.service";

export default async function LeaveRequestsPage() {
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
    {
      name: "leaveType",
      label: "Leave Type",
      type: "select" as const,
      required: true,
      options: [
        { label: "Casual", value: "casual" },
        { label: "Sick", value: "sick" },
        { label: "Emergency", value: "emergency" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "fromDate", label: "From Date", type: "date", required: true },
    { name: "toDate", label: "To Date", type: "date", required: true },
    { name: "reason", label: "Reason", type: "textarea" },
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
      title="Leave Requests"
      description={isAdmin ? "Accept or deny leave requests and update status." : "Create and track your leave requests."}
      endpoint={isAdmin ? "/api/requests/leave" : "/api/requests/leave?scope=mine"}
      allowEdit={isAdmin}
      fields={fields}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "leaveType", header: "Type" },
        { key: "fromDate", header: "From" },
        { key: "toDate", header: "To" },
        { key: "totalDays", header: "Days" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
