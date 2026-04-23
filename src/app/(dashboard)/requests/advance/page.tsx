import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getEmployeeById } from "@/server/services/data.service";

export default async function AdvanceRequestsPage() {
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
        { name: "requestDate", label: "Request Date", type: "date", required: true },
        { name: "amount", label: "Advance Amount", type: "number", required: true },
        { name: "reason", label: "Reason", type: "textarea", required: true },
      ];

  return (
    <ResourceModule
      title="Salary Advance Requests"
      description={
        isAdmin
          ? "Admin review queue for salary advance requests."
          : "Submit salary advance request. It will stay pending until admin approves/rejects it."
      }
      endpoint={isAdmin ? "/api/requests/advance" : "/api/requests/advance?scope=mine"}
      allowCreate={!isAdmin}
      allowEdit={false}
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
