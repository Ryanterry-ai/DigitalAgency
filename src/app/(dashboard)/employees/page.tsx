import { ResourceModule } from "@/components/modules/resource-module";

export default function EmployeesPage() {
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
