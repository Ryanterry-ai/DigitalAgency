import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getCurrentSession } from "@/lib/auth/current-user";
import { getEmployeeById } from "@/server/services/data.service";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }
  const employee = await getEmployeeById(session.employeeId);

  return (
    <AppShell role={session.role} name={session.name} employeeCategory={employee?.category}>
      {children}
    </AppShell>
  );
}
