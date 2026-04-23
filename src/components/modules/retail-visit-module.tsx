"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Eye, MapPin, Plus, Search, ShieldCheck, X } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { RetailPresenceProof, RetailVisitRecord } from "@/types/entities";

type SelectOption = {
  value: string;
  label: string;
};

type RetailVisitModuleProps = {
  retailers: SelectOption[];
  employees: SelectOption[];
  endpoint: string;
  isEmployee: boolean;
};

type RetailVisitFormState = {
  retailerId: string;
  employeeId: string;
  visitDate: string;
  visitTime: string;
  notes: string;
};

const getDefaultForm = (): RetailVisitFormState => {
  const now = new Date();
  return {
    retailerId: "",
    employeeId: "",
    visitDate: now.toISOString().slice(0, 10),
    visitTime: now.toTimeString().slice(0, 5),
    notes: "",
  };
};

export function RetailVisitModule({ retailers, employees, endpoint, isEmployee }: RetailVisitModuleProps) {
  const [rows, setRows] = useState<RetailVisitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RetailVisitFormState>(() => getDefaultForm());
  const [presenceProof, setPresenceProof] = useState<RetailPresenceProof | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);
  const [capturingProof, setCapturingProof] = useState(false);
  const [highlightRowId, setHighlightRowId] = useState<string | null>(null);
  const [previewRow, setPreviewRow] = useState<RetailVisitRecord | null>(null);
  const reduceMotion = useReducedMotion();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to fetch retail visits");
      }
      setRows(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch retail visits");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (isEmployee && employees[0]?.value) {
      setFormData((current) => ({ ...current, employeeId: employees[0].value }));
    }
  }, [employees, isEmployee]);

  useEffect(() => {
    if (!highlightRowId) return;
    const timer = setTimeout(() => setHighlightRowId(null), 1200);
    return () => clearTimeout(timer);
  }, [highlightRowId]);

  useEffect(() => {
    return () => {
      if (proofPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(proofPreviewUrl);
      }
    };
  }, [proofPreviewUrl]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;

    return rows.filter((row) =>
      [
        row.shopName,
        row.employeeName,
        row.notes,
        row.visitTime,
        row.proofStatus,
        row.presenceProof?.latitude,
        row.presenceProof?.longitude,
      ]
        .map((entry) => String(entry ?? "").toLowerCase())
        .some((entry) => entry.includes(normalized)),
    );
  }, [rows, query]);

  const resolveLocation = async () =>
    new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported on this device."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (geoError) => {
          if (geoError.code === 1) {
            reject(new Error("Location access is required. Please allow GPS and try again."));
            return;
          }
          if (geoError.code === 2) {
            reject(new Error("Unable to read GPS coordinates. Please move to open sky and retry."));
            return;
          }
          reject(new Error("Location request timed out. Please retry with better network/GPS signal."));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
      );
    });

  const onCaptureProof = async (file: File | null) => {
    if (!file) return;

    setCapturingProof(true);
    setError(null);
    try {
      const fileAgeMs = Math.abs(Date.now() - file.lastModified);
      const maxAgeMs = 5 * 60 * 1000;
      if (fileAgeMs > maxAgeMs) {
        throw new Error("Please capture a live photo now. Older gallery photos are not accepted.");
      }

      const position = await resolveLocation();

      const uploadForm = new FormData();
      uploadForm.set("file", file);
      const uploadResponse = await fetch("/api/uploads", {
        method: "POST",
        body: uploadForm,
      });
      const uploadJson = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadJson.success) {
        throw new Error(uploadJson.message || "Photo upload failed");
      }

      setProofPreviewUrl((existing) => {
        if (existing?.startsWith("blob:")) {
          URL.revokeObjectURL(existing);
        }
        return URL.createObjectURL(file);
      });

      setPresenceProof({
        photoUrl: uploadJson.data.url,
        capturedAt: new Date().toISOString(),
        latitude: Number(position.coords.latitude.toFixed(6)),
        longitude: Number(position.coords.longitude.toFixed(6)),
        accuracyMeters: Number(position.coords.accuracy.toFixed(2)),
        captureMethod: "camera_capture",
        locationVerified: true,
      });
    } catch (err) {
      setPresenceProof(null);
      setError(err instanceof Error ? err.message : "Unable to capture live proof");
    } finally {
      setCapturingProof(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!presenceProof || !presenceProof.locationVerified) {
        throw new Error("Capture a live photo with GPS before saving this visit.");
      }

      const payload = {
        ...formData,
        notes: formData.notes || undefined,
        photoUrls: [presenceProof.photoUrl],
        presenceProof,
      };

      const response = await fetch("/api/retail/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to save retail visit");
      }

      setHighlightRowId(String(json.data?.id ?? ""));
      setFormData((current) => ({
        ...getDefaultForm(),
        employeeId: isEmployee ? current.employeeId : "",
      }));
      setPresenceProof(null);
      setProofPreviewUrl((existing) => {
        if (existing?.startsWith("blob:")) {
          URL.revokeObjectURL(existing);
        }
        return null;
      });
      setOpenForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save retail visit");
    } finally {
      setSaving(false);
    }
  };

  const openPreview = (row: RetailVisitRecord) => {
    setPreviewRow(row);
  };

  const closePreview = () => {
    setPreviewRow(null);
  };

  return (
    <FadeIn>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Retail Visit Tracking</h2>
              <p className="text-sm text-slate-500">
                Capture retailer meetings with live camera evidence, GPS location, and timestamp verification.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[220px]">
                <Search size={15} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search retail visits"
                  className="pl-8"
                />
              </div>
              <Button onClick={() => setOpenForm((value) => !value)}>
                <Plus size={14} className="mr-1" />
                {openForm ? "Close" : "Add Visit"}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {openForm ? (
              <motion.form
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                onSubmit={onSubmit}
                className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-2"
              >
                <label className="space-y-1 text-sm text-slate-600">
                  <span>Shop</span>
                  <Select
                    required
                    value={formData.retailerId}
                    onChange={(event) => setFormData((current) => ({ ...current, retailerId: event.target.value }))}
                  >
                    <option value="">Select shop</option>
                    {retailers.map((retailer) => (
                      <option key={retailer.value} value={retailer.value}>
                        {retailer.label}
                      </option>
                    ))}
                  </Select>
                </label>

                {isEmployee ? (
                  <label className="space-y-1 text-sm text-slate-600">
                    <span>Employee</span>
                    <Input value={employees[0]?.label ?? "Current Employee"} readOnly />
                  </label>
                ) : (
                  <label className="space-y-1 text-sm text-slate-600">
                    <span>Employee</span>
                    <Select
                      required
                      value={formData.employeeId}
                      onChange={(event) => setFormData((current) => ({ ...current, employeeId: event.target.value }))}
                    >
                      <option value="">Select employee</option>
                      {employees.map((employee) => (
                        <option key={employee.value} value={employee.value}>
                          {employee.label}
                        </option>
                      ))}
                    </Select>
                  </label>
                )}

                <label className="space-y-1 text-sm text-slate-600">
                  <span>Visit Date</span>
                  <Input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(event) => setFormData((current) => ({ ...current, visitDate: event.target.value }))}
                  />
                </label>

                <label className="space-y-1 text-sm text-slate-600">
                  <span>Visit Time</span>
                  <Input
                    required
                    value={formData.visitTime}
                    onChange={(event) => setFormData((current) => ({ ...current, visitTime: event.target.value }))}
                  />
                </label>

                <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
                  <span>Notes</span>
                  <Textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(event) => setFormData((current) => ({ ...current, notes: event.target.value }))}
                    placeholder="Meeting summary, stock requirement, or product discussion"
                  />
                </label>

                <div className="space-y-3 rounded-xl border border-cyan-200 bg-cyan-50/70 p-3 md:col-span-2">
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={16} className="mt-0.5 text-cyan-700" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-900">Live Presence Proof</p>
                      <p className="text-xs text-cyan-700">
                        Capture a live storefront photo. GPS and timestamp are captured automatically.
                      </p>
                    </div>
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => onCaptureProof(event.target.files?.[0] ?? null)}
                  />

                  {capturingProof ? <p className="text-xs text-cyan-700">Capturing GPS and uploading photo...</p> : null}

                  {presenceProof ? (
                    <motion.div
                      initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      className="rounded-lg border bg-white p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="success">Location Verified</Badge>
                        <span className="text-xs text-slate-500">{formatDateTime(presenceProof.capturedAt)}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">
                        Lat {presenceProof.latitude}, Lng {presenceProof.longitude}, Accuracy{" "}
                        {Math.round(presenceProof.accuracyMeters ?? 0)}m
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${presenceProof.latitude},${presenceProof.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-700 hover:text-cyan-600"
                      >
                        <MapPin size={12} />
                        Open map proof
                        <ExternalLink size={12} />
                      </a>
                      {proofPreviewUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proofPreviewUrl}
                            alt="Live visit proof preview"
                            className="mt-2 h-40 w-full rounded-lg border object-cover"
                          />
                        </>
                      ) : null}
                    </motion.div>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" loading={saving || capturingProof}>
                    Save Retail Visit
                  </Button>
                </div>
              </motion.form>
            ) : null}
          </AnimatePresence>

          {error ? (
            <motion.p
              className="mt-3 text-sm text-rose-600"
              initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: [0, -2, 2, -1, 0] }}
            >
              {error}
            </motion.p>
          ) : null}
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Shop", "Employee", "Date", "Time", "Proof", "Location", "Photo", "Notes", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-slate-50/80">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                      Loading retail visits...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-3 py-4">
                      <EmptyState
                        title="No retail visits"
                        description="Capture your first retailer meeting with live proof to start tracking."
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              y: 0,
                              ...(highlightRowId && row.id === highlightRowId
                                ? { backgroundColor: ["rgba(56,189,248,0.22)", "rgba(56,189,248,0.06)"] }
                                : {}),
                            }
                      }
                      transition={{ delay: Math.min(index * 0.02, 0.2) }}
                      className="bg-transparent hover:bg-sky-500/10"
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">{row.shopName}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">{row.employeeName}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">{formatDate(row.visitDate)}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">{row.visitTime}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                        <Badge tone={row.proofStatus === "verified" ? "success" : "danger"}>{row.proofStatus}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                        {typeof row.presenceProof?.latitude === "number" &&
                        typeof row.presenceProof?.longitude === "number" ? (
                          <a
                            href={`https://maps.google.com/?q=${row.presenceProof.latitude},${row.presenceProof.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-700 transition hover:text-cyan-600"
                          >
                            <MapPin size={12} />
                            Map
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                        {row.photoUrls[0] ? (
                          <a
                            href={row.photoUrls[0]}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-700 transition hover:text-cyan-600"
                          >
                            View
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-700">{row.notes ?? "-"}</td>
                      <td className="px-3 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="inline-flex h-8 items-center justify-center gap-1 rounded-md px-2 text-sky-600 transition hover:bg-sky-500/15"
                            onClick={() => openPreview(row)}
                            aria-label="View record details"
                          >
                            <Eye size={14} />
                            <span className="text-xs font-medium">View Details</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <AnimatePresence>
          {previewRow ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              onClick={closePreview}
            >
              <motion.div
                className="panel w-full max-w-2xl rounded-2xl border p-4"
                initial={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Retail Visit Details</h3>
                    <p className="text-xs text-slate-500">Edit record to view details only.</p>
                  </div>
                  <Button type="button" variant="ghost" onClick={closePreview}>
                    <X size={14} />
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Shop</p>
                    <p className="mt-1 text-sm text-slate-700">{previewRow.shopName}</p>
                  </div>
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Employee</p>
                    <p className="mt-1 text-sm text-slate-700">{previewRow.employeeName}</p>
                  </div>
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Visit Date</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDate(previewRow.visitDate)}</p>
                  </div>
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Visit Time</p>
                    <p className="mt-1 text-sm text-slate-700">{previewRow.visitTime || "-"}</p>
                  </div>
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Proof Status</p>
                    <p className="mt-1 text-sm text-slate-700">{previewRow.proofStatus}</p>
                  </div>
                  <div className="panel-muted p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">GPS</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {previewRow.presenceProof
                        ? `${previewRow.presenceProof.latitude}, ${previewRow.presenceProof.longitude}`
                        : "-"}
                    </p>
                  </div>
                  <div className="panel-muted p-3 sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Notes</p>
                    <p className="mt-1 text-sm text-slate-700">{previewRow.notes || "-"}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}
