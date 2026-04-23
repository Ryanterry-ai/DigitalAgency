"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, IdCard, KeyRound, Mail, MapPin, PencilLine, Phone, UserCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import type { EmployeeRecord } from "@/types/entities";

type EmployeeForm = {
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  completeAddress: string;
  aadhaarNumber: string;
  panNumber: string;
  photoUrl: string;
  category: "admin" | "atm" | "crompton";
  location: string;
  joiningDate: string;
  status: "active" | "inactive";
};

const mapToForm = (employee: EmployeeRecord): EmployeeForm => ({
  employeeCode: employee.employeeCode ?? "",
  fullName: employee.fullName ?? "",
  email: employee.email ?? "",
  mobile: employee.mobile ?? "",
  completeAddress: employee.completeAddress ?? "",
  aadhaarNumber: employee.aadhaarNumber ?? "",
  panNumber: employee.panNumber ?? "",
  photoUrl: employee.photoUrl ?? "",
  category: employee.category,
  location: employee.location ?? "",
  joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : "",
  status: employee.status,
});

const displayValue = (value?: string) => {
  if (!value || value.trim().length === 0) return "-";
  return value;
};

export function EmployeeProfileModule() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<EmployeeForm | null>(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/employees", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to fetch employees");
      }

      const data: EmployeeRecord[] = json.data;
      setEmployees(data);
      setSelectedEmployeeId((current) => {
        if (current && data.some((employee) => employee.id === current)) {
          return current;
        }
        return data[0]?.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return employees;

    return employees.filter((employee) =>
      [employee.fullName, employee.employeeCode, employee.mobile, employee.email]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [employees, query]);

  const selectedEmployee = useMemo(
    () => filteredEmployees.find((employee) => employee.id === selectedEmployeeId) ?? filteredEmployees[0] ?? null,
    [filteredEmployees, selectedEmployeeId],
  );

  useEffect(() => {
    if (!selectedEmployee) {
      setForm(null);
      setEditing(false);
      return;
    }
    setForm(mapToForm(selectedEmployee));
  }, [selectedEmployee]);

  const onUploadPhoto = async (file: File | null) => {
    if (!file || !form) return;

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

      setForm((current) => (current ? { ...current, photoUrl: json.data.url } : current));
      setMessage("Photo uploaded. Save changes to confirm.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    if (!selectedEmployee || !form) return;
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
      const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to update employee");
      }

      await loadEmployees();
      setEditing(false);
      setMessage("Employee details updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update employee");
    } finally {
      setSaving(false);
    }
  };

  const onResetPassword = async () => {
    if (!selectedEmployee) return;
    const nextPassword = window.prompt(
      `Set new password for ${selectedEmployee.fullName} (${selectedEmployee.employeeCode})`,
      "",
    );
    if (!nextPassword) return;

    if (nextPassword.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      setMessage(null);
      return;
    }

    setResettingPassword(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/employees/${selectedEmployee.id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: nextPassword.trim() }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to reset password");
      }

      setMessage(`Password reset successful for ${selectedEmployee.fullName}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset password");
    } finally {
      setResettingPassword(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Employee Details</h3>
          <p className="text-sm text-slate-500">Existing employee list with full details. Edit only when needed.</p>
        </div>
        <div className="flex w-full max-w-xl flex-wrap items-center justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              document.getElementById("create-employee-profile")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Create Employee Profile
          </Button>
          <div className="w-full max-w-xs">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees" />
          </div>
        </div>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading employee details...</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

      {!loading && !error ? (
        filteredEmployees.length === 0 ? (
          <EmptyState title="No employees found" description="Try a different search or create a new employee profile above." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <div className="space-y-2 rounded-xl border bg-slate-50 p-2">
              {filteredEmployees.map((employee) => {
                const active = selectedEmployee?.id === employee.id;
                return (
                  <button
                    key={employee.id}
                    onClick={() => {
                      setSelectedEmployeeId(employee.id);
                      setEditing(false);
                    }}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                      active ? "border-cyan-300 bg-cyan-50" : "bg-white hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">{employee.fullName}</p>
                    <p className="text-xs text-slate-500">{employee.employeeCode}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge tone={employee.status === "active" ? "success" : "danger"}>{employee.status}</Badge>
                      <span className="text-xs text-slate-500">{employee.mobile}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedEmployee && form ? (
              <div className="rounded-xl border bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-full border bg-slate-200">
                      {form.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.photoUrl} alt={selectedEmployee.fullName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-500">
                          <UserCircle2 size={16} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{selectedEmployee.fullName}</p>
                      <p className="text-xs text-slate-500">{selectedEmployee.employeeCode}</p>
                    </div>
                    <Badge tone={selectedEmployee.status === "active" ? "success" : "danger"}>{selectedEmployee.status}</Badge>
                  </div>

                  {!editing ? (
                    <div className="flex gap-2">
                      <Button variant="secondary" loading={resettingPassword} onClick={onResetPassword}>
                        <KeyRound size={14} className="mr-1" />
                        Reset Password
                      </Button>
                      <Button onClick={() => setEditing(true)}>
                        <PencilLine size={14} className="mr-1" />
                        Edit Details
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                      <Button loading={saving || uploading} onClick={onSave}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                {!editing ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Full Name</p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.fullName)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Employee ID</p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.employeeCode)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <Phone size={12} />
                        Mobile
                      </p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.mobile)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <Mail size={12} />
                        Email
                      </p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.email)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3 sm:col-span-2">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <MapPin size={12} />
                        Complete Address
                      </p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.completeAddress)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <IdCard size={12} />
                        Aadhaar Number
                      </p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.aadhaarNumber)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <IdCard size={12} />
                        PAN Number
                      </p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.panNumber)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Category</p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.category.toUpperCase())}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Location</p>
                      <p className="mt-1 text-sm text-slate-800">{displayValue(selectedEmployee.location)}</p>
                    </div>
                    <div className="rounded-lg border bg-slate-50 p-3 sm:col-span-2">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <CalendarDays size={12} />
                        Joining Date
                      </p>
                      <p className="mt-1 text-sm text-slate-800">
                        {selectedEmployee.joiningDate ? formatDate(selectedEmployee.joiningDate) : "-"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Employee ID</span>
                      <Input
                        value={form.employeeCode}
                        onChange={(event) => setForm((current) => (current ? { ...current, employeeCode: event.target.value } : current))}
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Full Name *</span>
                      <Input
                        value={form.fullName}
                        onChange={(event) => setForm((current) => (current ? { ...current, fullName: event.target.value } : current))}
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Mobile *</span>
                      <Input
                        value={form.mobile}
                        onChange={(event) => setForm((current) => (current ? { ...current, mobile: event.target.value } : current))}
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Email</span>
                      <Input
                        value={form.email}
                        onChange={(event) => setForm((current) => (current ? { ...current, email: event.target.value } : current))}
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600 sm:col-span-2">
                      <span>Complete Address *</span>
                      <Textarea
                        rows={3}
                        value={form.completeAddress}
                        onChange={(event) =>
                          setForm((current) => (current ? { ...current, completeAddress: event.target.value } : current))
                        }
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Aadhaar Number *</span>
                      <Input
                        value={form.aadhaarNumber}
                        onChange={(event) =>
                          setForm((current) => (current ? { ...current, aadhaarNumber: event.target.value } : current))
                        }
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>PAN Number *</span>
                      <Input
                        value={form.panNumber}
                        onChange={(event) =>
                          setForm((current) =>
                            current ? { ...current, panNumber: event.target.value.toUpperCase() } : current,
                          )
                        }
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Category</span>
                      <Select
                        value={form.category}
                        onChange={(event) =>
                          setForm((current) =>
                            current
                              ? { ...current, category: event.target.value as "admin" | "atm" | "crompton" }
                              : current,
                          )
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="atm">ATM</option>
                        <option value="crompton">Crompton</option>
                      </Select>
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Status</span>
                      <Select
                        value={form.status}
                        onChange={(event) =>
                          setForm((current) =>
                            current ? { ...current, status: event.target.value as "active" | "inactive" } : current,
                          )
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Location</span>
                      <Input
                        value={form.location}
                        onChange={(event) => setForm((current) => (current ? { ...current, location: event.target.value } : current))}
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Joining Date</span>
                      <Input
                        type="date"
                        value={form.joiningDate}
                        onChange={(event) =>
                          setForm((current) => (current ? { ...current, joiningDate: event.target.value } : current))
                        }
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600 sm:col-span-2">
                      <span>Photo *</span>
                      <Input type="file" accept="image/*" onChange={(event) => onUploadPhoto(event.target.files?.[0] ?? null)} />
                    </label>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )
      ) : null}
    </Card>
  );
}
