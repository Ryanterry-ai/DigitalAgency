import { AttendanceModule } from "@/components/modules/attendance-module";
import { getCurrentSession } from "@/lib/auth/current-user";
import { listEmployees } from "@/server/services/data.service";
import { redirect } from "next/navigation";

export default async function AttendancePage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }
  const isAdmin = session?.role === "admin";
  const employees = isAdmin ? await listEmployees() : [];

  return (
    <AttendanceModule
      isAdmin={isAdmin}
      employees={employees.map((employee) => ({ id: employee.id, fullName: employee.fullName }))}
      sessionEmployeeId={session.employeeId}
    />
  );
}
