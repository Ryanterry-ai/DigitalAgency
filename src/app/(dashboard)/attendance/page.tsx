import { ResourceModule } from "@/components/modules/resource-module";
import { listEmployees } from "@/server/services/data.service";

export default async function AttendancePage() {
  const employees = await listEmployees();

  return (
    <ResourceModule
      title="Attendance System"
      description="Punch-in / punch-out records with optional location capture for employee shifts."
      endpoint="/api/attendance"
      fields={[
        {
          name: "employeeId",
          label: "Employee",
          type: "select",
          required: true,
          options: employees.map((employee) => ({ label: employee.fullName, value: employee.id })),
        },
        { name: "attendanceDate", label: "Date", type: "date", required: true },
        {
          name: "punchType",
          label: "Punch",
          type: "select",
          required: true,
          options: [
            { label: "Punch In", value: "in" },
            { label: "Punch Out", value: "out" },
          ],
        },
        { name: "location", label: "Location (optional)" },
      ]}
      columns={[
        { key: "employeeName", header: "Employee" },
        { key: "attendanceDate", header: "Date" },
        { key: "punchIn", header: "Punch In" },
        { key: "punchOut", header: "Punch Out" },
        { key: "workingMinutes", header: "Minutes" },
        { key: "status", header: "Status" },
      ]}
    />
  );
}
