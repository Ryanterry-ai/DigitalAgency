"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, Eye, LocateFixed, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { AttendanceRecord } from "@/types/entities";

type EmployeeOption = {
  id: string;
  fullName: string;
};

type AttendanceModuleProps = {
  isAdmin: boolean;
  employees: EmployeeOption[];
  sessionEmployeeId?: string;
};

type AttendanceFormState = {
  employeeId: string;
  attendanceDate: string;
  punchType: "in" | "out";
  location: string;
  selfieUrl: string;
  latitude?: number;
  longitude?: number;
  locationAccuracy?: number;
};

const todayValue = () => new Date().toISOString().slice(0, 10);

const formatLocationFromCoords = (latitude: number, longitude: number, accuracy?: number) => {
  if (typeof accuracy === "number") {
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)} (+/-${Math.round(accuracy)}m)`;
  }
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};

const toPayloadDate = (dateValue: string) => {
  if (!dateValue) return new Date().toISOString();
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
};

export function AttendanceModule({ isAdmin, employees, sessionEmployeeId }: AttendanceModuleProps) {
  const reduceMotion = useReducedMotion();
  const [rows, setRows] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [capturingLocation, setCapturingLocation] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [form, setForm] = useState<AttendanceFormState>({
    employeeId: isAdmin ? employees[0]?.id ?? "" : sessionEmployeeId ?? "",
    attendanceDate: todayValue(),
    punchType: "in",
    location: "",
    selfieUrl: "",
  });

  useEffect(() => {
    if (!isAdmin) return;
    if (form.employeeId || employees.length === 0) return;
    setForm((current) => ({ ...current, employeeId: employees[0].id }));
  }, [employees, form.employeeId, isAdmin]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(isAdmin ? "/api/attendance" : "/api/attendance?scope=mine", {
        cache: "no-store",
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to fetch attendance");
      }
      setRows(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      [
        row.employeeName,
        row.status,
        row.punchInLocation,
        row.punchOutLocation,
        row.attendanceDate,
        row.punchIn,
        row.punchOut,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [query, rows]);

  const onCaptureLocation = async () => {
    setError(null);
    setMessage(null);
    if (typeof window === "undefined" || !window.navigator.geolocation) {
      setError("Location access is not available on this device/browser.");
      return;
    }

    setCapturingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });
      const { latitude, longitude, accuracy } = position.coords;
      setForm((current) => ({
        ...current,
        latitude,
        longitude,
        locationAccuracy: accuracy,
        location: formatLocationFromCoords(latitude, longitude, accuracy),
      }));
      setMessage("Current location captured.");
    } catch (err) {
      const reason =
        err instanceof GeolocationPositionError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Unable to capture location.";
      setError(reason);
    } finally {
      setCapturingLocation(false);
    }
  };

  const onUploadSelfie = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const upload = new FormData();
      upload.set("file", file);
      const response = await fetch("/api/uploads", { method: "POST", body: upload });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to upload selfie");
      }

      setForm((current) => ({ ...current, selfieUrl: json.data.url }));
      setMessage("Selfie uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload selfie");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isAdmin) {
      if (!form.selfieUrl) {
        setError("Selfie is required for attendance submission.");
        return;
      }
      if (!form.location.trim()) {
        setError("Location is required. Use capture location or type manually.");
        return;
      }
    }

    if (isAdmin && !form.employeeId) {
      setError("Select employee before saving attendance.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: form.employeeId,
          attendanceDate: toPayloadDate(form.attendanceDate),
          punchType: form.punchType,
          location: form.location.trim(),
          selfieUrl: form.selfieUrl || undefined,
          capturedAt: new Date().toISOString(),
          latitude: form.latitude,
          longitude: form.longitude,
          locationAccuracy: form.locationAccuracy,
        }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to save attendance");
      }

      setMessage("Attendance recorded successfully.");
      setForm((current) => ({
        ...current,
        attendanceDate: todayValue(),
        punchType: current.punchType === "in" ? "out" : "in",
        location: "",
        selfieUrl: "",
        latitude: undefined,
        longitude: undefined,
        locationAccuracy: undefined,
      }));
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save attendance");
    } finally {
      setSaving(false);
    }
  };

  const punchProofSummary = (record: AttendanceRecord) => {
    if (record.punchInProof && record.punchOutProof) return "in + out";
    if (record.punchInProof) return "in";
    if (record.punchOutProof) return "out";
    return "-";
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Attendance System</h2>
            <p className="text-sm text-slate-500">
              Employee attendance with selfie proof, timestamped punch, and location capture.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={15} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records"
              className="pl-8"
            />
          </div>
        </div>

        <form className="mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2" onSubmit={onSubmit}>
          {isAdmin ? (
            <label className="space-y-1 text-sm text-slate-600">
              <span>Employee</span>
              <Select
                value={form.employeeId}
                onChange={(event) => setForm((current) => ({ ...current, employeeId: event.target.value }))}
                required
              >
                <option value="">Select employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName}
                  </option>
                ))}
              </Select>
            </label>
          ) : null}

          <label className="space-y-1 text-sm text-slate-600">
            <span>Date</span>
            <Input
              type="date"
              value={form.attendanceDate}
              onChange={(event) => setForm((current) => ({ ...current, attendanceDate: event.target.value }))}
              required
            />
          </label>

          <label className="space-y-1 text-sm text-slate-600">
            <span>Punch</span>
            <Select
              value={form.punchType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  punchType: event.target.value as "in" | "out",
                }))
              }
              required
            >
              <option value="in">Punch In</option>
              <option value="out">Punch Out</option>
            </Select>
          </label>

          <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
            <span>Location {isAdmin ? "(optional)" : "(required for employees)"}</span>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={form.location}
                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                placeholder="Capture current location or enter manually"
                required={!isAdmin}
              />
              <Button
                type="button"
                variant="secondary"
                loading={capturingLocation}
                onClick={onCaptureLocation}
                className="whitespace-nowrap"
              >
                <LocateFixed size={14} className="mr-1" />
                Capture Location
              </Button>
            </div>
          </label>

          <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
            <span>Selfie Proof {isAdmin ? "(optional)" : "(required for employees)"}</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(event) => onUploadSelfie(event.target.files?.[0] ?? null)}
              />
              <Badge tone={form.selfieUrl ? "success" : "warning"}>
                {form.selfieUrl ? "Selfie uploaded" : "Awaiting selfie"}
              </Badge>
            </div>
          </label>

          <div className="md:col-span-2">
            <Button type="submit" loading={saving || uploading}>
              <Camera size={14} className="mr-1" />
              Save Attendance
            </Button>
          </div>
        </form>

        {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
        {message ? <p className="mt-3 text-sm text-emerald-500">{message}</p> : null}
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Employee", "Date", "Punch In", "Punch Out", "In Location", "Out Location", "Proof", "Status", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-slate-50/70">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-slate-500">
                    Loading attendance...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-slate-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.2) }}
                    className="transition hover:bg-sky-500/10"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-slate-800">{record.employeeName}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-700">{formatDate(record.attendanceDate)}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                      {record.punchIn ? formatDateTime(record.punchIn) : "-"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                      {record.punchOut ? formatDateTime(record.punchOut) : "-"}
                    </td>
                    <td className="max-w-[220px] truncate px-3 py-3 text-slate-700">{record.punchInLocation || "-"}</td>
                    <td className="max-w-[220px] truncate px-3 py-3 text-slate-700">{record.punchOutLocation || "-"}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-700">{punchProofSummary(record)}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <Badge tone={record.status === "present" ? "success" : "neutral"}>{record.status}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-sky-600 transition hover:bg-sky-500/15"
                        onClick={() => setSelectedRecord(record)}
                        aria-label="View attendance details"
                      >
                        <Eye size={13} />
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {selectedRecord ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              className="panel w-full max-w-3xl rounded-2xl border p-4"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Attendance Proof Details</h3>
                  <p className="text-xs text-slate-500">{selectedRecord.employeeName}</p>
                </div>
                <Button type="button" variant="ghost" onClick={() => setSelectedRecord(null)}>
                  <X size={14} />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="panel-muted p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Punch In</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {selectedRecord.punchIn ? formatDateTime(selectedRecord.punchIn) : "-"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{selectedRecord.punchInLocation || "-"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedRecord.punchInProof?.capturedAt
                      ? `Proof captured ${formatDateTime(selectedRecord.punchInProof.capturedAt)}`
                      : "No selfie proof"}
                  </p>
                  {selectedRecord.punchInProof?.selfieUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedRecord.punchInProof.selfieUrl}
                      alt="Punch in selfie"
                      className="mt-2 h-24 w-full rounded-lg border border-slate-200 object-cover"
                    />
                  ) : null}
                </div>

                <div className="panel-muted p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Punch Out</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {selectedRecord.punchOut ? formatDateTime(selectedRecord.punchOut) : "-"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{selectedRecord.punchOutLocation || "-"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedRecord.punchOutProof?.capturedAt
                      ? `Proof captured ${formatDateTime(selectedRecord.punchOutProof.capturedAt)}`
                      : "No selfie proof"}
                  </p>
                  {selectedRecord.punchOutProof?.selfieUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedRecord.punchOutProof.selfieUrl}
                      alt="Punch out selfie"
                      className="mt-2 h-24 w-full rounded-lg border border-slate-200 object-cover"
                    />
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
