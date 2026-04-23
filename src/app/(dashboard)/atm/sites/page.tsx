import { ResourceModule } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import { listEmployees } from "@/server/services/data.service";

export default async function AtmSitesPage() {
  const session = await getCurrentSession();
  if (session?.role !== "admin") {
    redirect("/dashboard");
  }

  const employees = await listEmployees();

  return (
    <ResourceModule
      title="ATM Site Management"
      description="Manage site assignment, status, and location details for ATM operations."
      endpoint="/api/atm/sites"
      allowDelete
      fields={[
        { name: "siteName", label: "Site Name", required: true },
        { name: "siteCode", label: "Site Code", required: true },
        { name: "address", label: "Address", required: true },
        { name: "city", label: "City", required: true },
        {
          name: "assignedEmployeeId",
          label: "Assigned Employee",
          type: "select",
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
          required: true,
        },
      ]}
      columns={[
        { key: "siteName", header: "Site" },
        { key: "siteCode", header: "Code" },
        { key: "city", header: "City" },
        { key: "assignedEmployeeName", header: "Assigned Employee" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
