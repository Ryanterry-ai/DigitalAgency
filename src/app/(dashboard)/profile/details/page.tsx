import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth/current-user";
import { getEmployeeById } from "@/server/services/data.service";

export default async function ProfileDetailsPage() {
  const session = await getCurrentSession();
  const employee = await getEmployeeById(session?.employeeId);

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-slate-900">Employee Details</h2>
      <p className="mt-1 text-sm text-slate-500">Profile snapshot for ATM and Crompton user panel access.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Name</p>
          <p className="mt-1 text-sm text-slate-800">{session?.name || employee?.fullName || "-"}</p>
        </div>
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Mobile</p>
          <p className="mt-1 text-sm text-slate-800">{session?.mobile || employee?.mobile || "-"}</p>
        </div>
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Employee Code</p>
          <p className="mt-1 text-sm text-slate-800">{employee?.employeeCode || "-"}</p>
        </div>
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Category</p>
          <div className="mt-1">
            <Badge tone="neutral">{employee?.category || session?.role || "-"}</Badge>
          </div>
        </div>
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</p>
          <p className="mt-1 text-sm text-slate-800">{employee?.location || "-"}</p>
        </div>
        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Joining Date</p>
          <p className="mt-1 text-sm text-slate-800">{employee?.joiningDate || "-"}</p>
        </div>
      </div>
    </Card>
  );
}
