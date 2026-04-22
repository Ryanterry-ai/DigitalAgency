import { Card } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth/current-user";
import { getSettings } from "@/server/services/data.service";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const settings = await getSettings();

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500">Environment-aware settings scaffold for deployment-time configuration.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-slate-900">Organization</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-2"><dt className="text-slate-500">Company</dt><dd>{settings.companyName}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-slate-500">Timezone</dt><dd>{settings.timezone}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-slate-500">Brand Color</dt><dd>{settings.brandColor}</dd></div>
          </dl>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-slate-900">Automation</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-2"><dt className="text-slate-500">Auto Reminders</dt><dd>{String(settings.autoReminders)}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-slate-500">OTP Provider</dt><dd>{settings.otpProvider}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-slate-500">Mode</dt><dd>Deployment-ready scaffold</dd></div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
