"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, PencilLine, UserCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import type { EmployeeRecord } from "@/types/entities";

type EmployeeProfileForm = {
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  location: string;
  joiningDate: string;
  status: "active" | "inactive";
};

const mapToForm = (employee: EmployeeRecord): EmployeeProfileForm => ({
  employeeCode: employee.employeeCode ?? "",
  fullName: employee.fullName ?? "",
  email: employee.email ?? "",
  mobile: employee.mobile ?? "",
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
    const checks = [form.employeeCode, form.fullName, form.mobile, form.email, form.location, form.joiningDate];
    const filled = checks.filter((value) => value.trim().length > 0).length;
    return Math.round((filled / checks.length) * 100);
  }, [form]);

  const onSave = async () => {
    if (!selectedEmployee || !form) return;
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
          <p className="text-sm text-slate-500">Select an employee to view and edit profile details for tracking.</p>
        </div>
        {form ? (
          <Badge tone={profileCompleteness >= 80 ? "success" : "warning"}>
            Profile Complete {profileCompleteness}%
          </Badge>
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
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-slate-50 p-3">
                    <UserCircle2 size={16} className="text-cyan-700" />
                    <span className="text-sm font-semibold text-slate-800">{selectedEmployee.fullName}</span>
                    <span className="text-xs text-slate-500">
                      Joined {selectedEmployee.joiningDate ? formatDate(selectedEmployee.joiningDate) : "-"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      {selectedEmployee.location || "Location not updated"}
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
                      <span>Full Name</span>
                      <Input
                        value={form.fullName}
                        onChange={(event) => setForm((current) => (current ? { ...current, fullName: event.target.value } : current))}
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm text-slate-600">
                      <span>Mobile</span>
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
                    <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
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
                    <Button loading={saving} onClick={onSave}>
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
