import { EmployeeProfileModule } from "@/components/modules/employee-profile-module";
import { ResourceModule } from "@/components/modules/resource-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-4">
      <div id="create-employee-profile">
        <ResourceModule
          title="Create Employee Profile"
          description="Fill all required fields to create employee profiles. New employee creation also prepares their login account."
          endpoint="/api/employees"
          allowDelete
          allowEdit
          createButtonLabel="Create Employee Profile"
          fields={[
            { name: "employeeCode", label: "Employee ID", required: true },
            { name: "fullName", label: "Full Name", required: true },
            { name: "email", label: "Email", required: true },
            { name: "mobile", label: "Mobile", required: true },
            { name: "completeAddress", label: "Complete Address", type: "textarea", required: true },
            { name: "aadhaarNumber", label: "Aadhaar Number", required: true },
            { name: "panNumber", label: "PAN Number", required: true },
            { name: "photoUrl", label: "Employee Photo", type: "file", required: true },
            {
              name: "category",
              label: "Employee Category",
              type: "select",
              required: true,
              options: [
                { label: "ATM", value: "atm" },
                { label: "Crompton", value: "crompton" },
                { label: "Admin", value: "admin" },
              ],
            },
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
            { key: "email", header: "Email" },
            { key: "mobile", header: "Mobile" },
            { key: "aadhaarNumber", header: "Aadhaar" },
            { key: "panNumber", header: "PAN" },
            { key: "category", header: "Category" },
            { key: "location", header: "Location" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
      <EmployeeProfileModule />
    </div>
  );
}
