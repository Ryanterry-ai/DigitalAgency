import { ResourceModule } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { getEmployeeById, listAtmSites, listEmployees } from "@/server/services/data.service";

export default async function AtmVisitsPage() {
  const session = await getCurrentSession();
  const isAdmin = session?.role === "admin";
  const employee = await getEmployeeById(session?.employeeId);
  if (session?.role === "employee" && employee?.category !== "atm") {
    redirect("/dashboard");
  }

  const [sites, employees] = await Promise.all([listAtmSites(), listEmployees()]);

  return (
    <ResourceModule
      title="ATM Site Visits & Issue Tracking"
      description="Track field issue types, supporting photos, and resolution status in real time."
      endpoint={isAdmin ? "/api/atm/visits" : "/api/atm/visits?scope=mine"}
      fields={[
        {
          name: "atmSiteId",
          label: "ATM Site",
          type: "select",
          options: sites.map((site) => ({ label: site.siteName, value: site.id })),
          required: true,
        },
        ...(isAdmin
          ? [
              {
                name: "employeeId",
                label: "Employee",
                type: "select" as const,
                options: employees.map((entry) => ({ label: entry.fullName, value: entry.id })),
                required: true,
              },
            ]
          : []),
        {
          name: "issueType",
          label: "Issue Type",
          type: "select",
          options: [
            { label: "Down", value: "down" },
            { label: "Dispenser Problem", value: "dispenser_problem" },
            { label: "Cash Issue", value: "cash_issue" },
            { label: "Network Issue", value: "network_issue" },
            { label: "Power Issue", value: "power_issue" },
            { label: "Other", value: "other" },
          ],
          required: true,
        },
        { name: "expenseAmount", label: "Expense Amount", type: "number", required: true },
        { name: "visitedAt", label: "Visit Time", type: "datetime-local", required: true },
        { name: "photoUrl", label: "Issue Photo", type: "file", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Resolved", value: "resolved" },
          ],
          required: true,
        },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      columns={[
        { key: "siteName", header: "Site" },
        { key: "employeeName", header: "Employee" },
        { key: "issueType", header: "Issue" },
        { key: "expenseAmount", header: "Expense" },
        { key: "status", header: "Status" },
        { key: "visitedAt", header: "Visited At" },
      ]}
    />
  );
}
