import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getEmployeeById } from "@/server/services/data.service";

export default async function LeaveRequestsPage() {
  const session = await getCurrentSession();
  const employee = await getEmployeeById(session?.employeeId);
  if (session?.role === "employee" && employee?.category !== "atm") {
    redirect("/dashboard");
  }
  const isAdmin = session?.role === "admin";

  const fields: FieldConfig[] = isAdmin
    ? [
        {
          name: "status",
          label: "Approval Status",
          type: "select",
          required: true,
          options: [
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ],
        },
      ]
    : [
        {
          name: "leaveType",
          label: "Leave Type",
          type: "select",
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
      ];

  return (
    <ResourceModule
      title="Leave Requests"
      description={
        isAdmin
          ? "Admin review queue: open each leave request and approve/reject using status."
          : "Submit leave request. It will stay pending until admin approves/rejects it."
      }
      endpoint={isAdmin ? "/api/requests/leave" : "/api/requests/leave?scope=mine"}
      allowCreate={!isAdmin}
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
