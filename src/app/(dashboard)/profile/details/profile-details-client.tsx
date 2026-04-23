"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EmployeeRecord, UserSession } from "@/types/entities";

type ProfileDetailsClientProps = {
  session: UserSession | null;
  employee: EmployeeRecord | null;
};

type ProfileForm = {
  fullName: string;
  mobile: string;
  completeAddress: string;
  aadhaarNumber: string;
  panNumber: string;
  photoUrl: string;
};

export function ProfileDetailsClient({ session, employee }: ProfileDetailsClientProps) {
  const [form, setForm] = useState<ProfileForm>({
    fullName: employee?.fullName ?? session?.name ?? "",
    mobile: employee?.mobile ?? session?.mobile ?? "",
    completeAddress: employee?.completeAddress ?? "",
    aadhaarNumber: employee?.aadhaarNumber ?? "",
    panNumber: employee?.panNumber ?? "",
    photoUrl: employee?.photoUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canEdit = Boolean(session?.employeeId);

  const onUploadPhoto = async (file: File | null) => {
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Photo upload failed");
      }

      setForm((current) => ({ ...current, photoUrl: json.data.url }));
      setMessage("Photo uploaded. Save to confirm profile details.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    if (!session?.employeeId) return;

    if (
      !form.fullName.trim() ||
      !form.mobile.trim() ||
      !form.completeAddress.trim() ||
      !form.aadhaarNumber.trim() ||
      !form.panNumber.trim() ||
      !form.photoUrl.trim()
    ) {
      setError("Name, Mobile, Complete Address, Aadhaar, PAN and Photo are required.");
      setMessage(null);
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/employees/${session.employeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to save details");
      }

      setMessage("Employee details updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save details");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-slate-900">Employee Details</h2>
      <p className="mt-1 text-sm text-slate-500">Fill required profile and KYC fields below.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-600">
          <span>Full Name *</span>
          <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
        </label>
        <label className="space-y-1 text-sm text-slate-600">
          <span>Mobile *</span>
          <Input value={form.mobile} onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))} />
        </label>
        <label className="space-y-1 text-sm text-slate-600">
          <span>Aadhaar Number *</span>
          <Input
            value={form.aadhaarNumber}
            onChange={(event) => setForm((current) => ({ ...current, aadhaarNumber: event.target.value }))}
            placeholder="12 digit Aadhaar"
          />
        </label>
        <label className="space-y-1 text-sm text-slate-600">
          <span>PAN Number *</span>
          <Input
            value={form.panNumber}
            onChange={(event) => setForm((current) => ({ ...current, panNumber: event.target.value.toUpperCase() }))}
            placeholder="ABCDE1234F"
          />
        </label>
        <label className="space-y-1 text-sm text-slate-600 sm:col-span-2">
          <span>Complete Address *</span>
          <Textarea
            rows={3}
            value={form.completeAddress}
            onChange={(event) => setForm((current) => ({ ...current, completeAddress: event.target.value }))}
            placeholder="Flat/House, street, area, city, state"
          />
        </label>
        <label className="space-y-1 text-sm text-slate-600 sm:col-span-2">
          <span>Photo *</span>
          <Input type="file" accept="image/*" onChange={(event) => onUploadPhoto(event.target.files?.[0] ?? null)} />
          {form.photoUrl ? <Badge tone="success">Photo uploaded</Badge> : <Badge tone="warning">Photo required</Badge>}
        </label>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button onClick={onSave} loading={saving || uploading} disabled={!canEdit}>
          <Save size={14} className="mr-1" />
          Save Details
        </Button>
      </div>

      {!canEdit ? <p className="mt-3 text-sm text-rose-600">Employee mapping missing for this account.</p> : null}
      {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </Card>
  );
}
