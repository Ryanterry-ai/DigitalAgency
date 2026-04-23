import { ResourceModule } from "@/components/modules/resource-module";
import type { FieldConfig } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getEmployeeById, listEmployees } from "@/server/services/data.service";

export default async function FlmTasksPage() {
  const session = await getCurrentSession();
  const employee = await getEmployeeById(session?.employeeId);
  if (session?.role === "employee" && employee?.category !== "atm") {
    redirect("/dashboard");
  }

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
            options: employees.map((entry) => ({ label: entry.fullName, value: entry.id })),
          },
        ]
      : []),
    { name: "taskDate", label: "Task Date", type: "date", required: true },
    { name: "taskTitle", label: "Task Title", required: true },
    { name: "siteOrArea", label: "Site / Area" },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
    },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  return (
    <ResourceModule
      title="FLM Daily Task Management"
      description="Track first-level daily tasks for ATM and Crompton field operations."
      endpoint={isAdmin ? "/api/flm/tasks" : "/api/flm/tasks?scope=mine"}
      fields={fields}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "taskDate", header: "Date" },
        { key: "taskTitle", header: "Task" },
        { key: "siteOrArea", header: "Site/Area" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
