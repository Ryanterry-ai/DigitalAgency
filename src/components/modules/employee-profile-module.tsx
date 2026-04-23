"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, IdCard, Mail, MapPin, Phone, UserCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { EmployeeRecord } from "@/types/entities";

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

  useEffect(() => {
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
        setSelectedEmployeeId(data[0]?.id ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to fetch employees");
      } finally {
        setLoading(false);
      }
    };

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

  return (
    <Card className="p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Employee Details</h3>
          <p className="text-sm text-slate-500">Existing employee list with complete profile and KYC details.</p>
        </div>
        <div className="w-full max-w-xs">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees" />
        </div>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading employee details...</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

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

            {selectedEmployee ? (
              <div className="rounded-xl border bg-white p-4">
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-slate-50 p-3">
                  <div className="h-14 w-14 overflow-hidden rounded-full border bg-slate-200">
                    {selectedEmployee.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={selectedEmployee.photoUrl} alt={selectedEmployee.fullName} className="h-full w-full object-cover" />
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
              </div>
            ) : null}
          </div>
        )
      ) : null}
    </Card>
  );
}
