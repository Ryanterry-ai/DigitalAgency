"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IdCard, MapPin, PencilLine, UserCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import type { EmployeeRecord } from "@/types/entities";

type EmployeeProfileForm = {
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

const mapToForm = (employee: EmployeeRecord): EmployeeProfileForm => ({
  employeeCode: employee.employeeCode ?? "",
  fullName: employee.fullName ?? "",
  email: employee.email ?? "",
  mobile: employee.mobile ?? "",
  completeAddress: employee.completeAddress ?? "",
  aadhaarNumber: employee.aadhaarNumber ?? "",
  panNumber: employee.panNumber ?? "",
  photoUrl: employee.photoUrl ?? "",
  category: employee.category ?? "atm",
  location: employee.location ?? "",
  joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : "",
  status: employee.status ?? "active",
});

export function EmployeeProfileModule() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [form, setForm] = useState<EmployeeProfileForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

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
        if (current && data.some((entry) => entry.id === current)) {
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

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId) ?? null,
    [employees, selectedEmployeeId],
  );

  useEffect(() => {
    if (!selectedEmployee) {
      setForm(null);
      return;
    }
    setForm(mapToForm(selectedEmployee));
  }, [selectedEmployee]);

  const profileCompleteness = useMemo(() => {
    if (!form) return 0;
    const checks = [
      form.employeeCode,
      form.fullName,
      form.mobile,
      form.completeAddress,
      form.aadhaarNumber,
      form.panNumber,
      form.photoUrl,
    ];
    const filled = checks.filter((value) => value.trim().length > 0).length;
    return Math.round((filled / checks.length) * 100);
  }, [form]);

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
      return;
    }

    setSaving(true);
    setError(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update employee");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Employee Profiles</h3>
          <p className="text-sm text-slate-500">Edit required KYC and profile details for each employee.</p>
        </div>
        {form ? (
          <Badge tone={profileCompleteness >= 80 ? "success" : "warning"}>Profile Complete {profileCompleteness}%</Badge>
        ) : null}
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading employee profiles...</p>
      ) : employees.length === 0 ? (
        <EmptyState
          title="No employee profiles"
          description="Add employees from the management module above to manage profile details."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          <div className="space-y-2 rounded-xl border bg-slate-50 p-2">
            {employees.map((employee) => {
              const active = employee.id === selectedEmployeeId;
              return (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployeeId(employee.id)}
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

          <div className="rounded-xl border bg-white p-4">
            <AnimatePresence mode="wait">
              {form && selectedEmployee ? (
                <motion.div
                  key={selectedEmployee.id}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-slate-50 p-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border bg-slate-200">
                      {form.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.photoUrl} alt={selectedEmployee.fullName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-500">
                          <UserCircle2 size={16} />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{selectedEmployee.fullName}</span>
                    <span className="text-xs text-slate-500">
                      Joined {selectedEmployee.joiningDate ? formatDate(selectedEmployee.joiningDate) : "-"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      {selectedEmployee.location || "Location not updated"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <IdCard size={12} />
                      {selectedEmployee.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Employee ID</span>
                      <Input
                        value={form.employeeCode}
                        onChange={(event) => setForm((current) => (current ? { ...current, employeeCode: event.target.value } : current))}
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Full Name *</span>
                      <Input
                        value={form.fullName}
                        onChange={(event) => setForm((current) => (current ? { ...current, fullName: event.target.value } : current))}
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Mobile *</span>
                      <Input
                        value={form.mobile}
                        onChange={(event) => setForm((current) => (current ? { ...current, mobile: event.target.value } : current))}
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Email</span>
                      <Input
                        value={form.email}
                        onChange={(event) => setForm((current) => (current ? { ...current, email: event.target.value } : current))}
                        placeholder="employee@saiassociates.in"
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Aadhaar Number *</span>
                      <Input
                        value={form.aadhaarNumber}
                        onChange={(event) => setForm((current) => (current ? { ...current, aadhaarNumber: event.target.value } : current))}
                        placeholder="12 digit Aadhaar"
                        required
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
                        placeholder="ABCDE1234F"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
                      <span>Complete Address *</span>
                      <Textarea
                        rows={3}
                        value={form.completeAddress}
                        onChange={(event) =>
                          setForm((current) => (current ? { ...current, completeAddress: event.target.value } : current))
                        }
                        placeholder="Full current address with area, city and state"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
                      <span>Employee Photo *</span>
                      <Input type="file" accept="image/*" onChange={(event) => onUploadPhoto(event.target.files?.[0] ?? null)} />
                      {uploading ? <p className="text-xs text-cyan-600">Uploading photo...</p> : null}
                      {form.photoUrl ? <p className="text-xs text-emerald-600">Photo linked</p> : null}
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Current Location</span>
                      <Input
                        value={form.location}
                        onChange={(event) => setForm((current) => (current ? { ...current, location: event.target.value } : current))}
                        placeholder="Mathura / Agra / Site cluster"
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Joining Date</span>
                      <Input
                        type="date"
                        value={form.joiningDate}
                        onChange={(event) => setForm((current) => (current ? { ...current, joiningDate: event.target.value } : current))}
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
                        <option value="atm">ATM</option>
                        <option value="crompton">Crompton</option>
                        <option value="admin">Admin</option>
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
                  </div>

                  <div className="flex items-center gap-2">
                    <Button loading={saving || uploading} onClick={onSave}>
                      <PencilLine size={14} className="mr-1" />
                      Save Profile
                    </Button>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Card>
  );
}
