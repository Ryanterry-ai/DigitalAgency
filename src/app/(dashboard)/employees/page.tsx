import { ResourceModule } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <ResourceModule
      title="Employee Management"
      description="Create and manage employee profiles, assignment details, and activity visibility."
      endpoint="/api/employees"
      allowDelete
      fields={[
        { name: "employeeCode", label: "Employee ID", required: true },
        { name: "fullName", label: "Full Name", required: true },
        { name: "email", label: "Email" },
        { name: "mobile", label: "Mobile", required: true },
        { name: "location", label: "Location" },
        { name: "joiningDate", label: "Joining Date", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
      ]}
      columns={[
        { key: "employeeCode", header: "ID" },
        { key: "fullName", header: "Name" },
        { key: "mobile", header: "Mobile" },
        { key: "location", header: "Location" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
