"use client";

import type React from "react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Search, Trash2 } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";

type FieldType = "text" | "number" | "date" | "datetime-local" | "select" | "textarea" | "file";

type FieldConfig = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
};

type ColumnConfig = {
  key: string;
  header: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
};

export function ResourceModule({
  title,
  description,
  endpoint,
  columns,
  fields,
  allowDelete,
}: {
  title: string;
  description: string;
  endpoint: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  allowDelete?: boolean;
}) {
  const isDateLikeString = (value: string) => {
    if (!value) return false;
    const hasDatePattern = /^\d{4}-\d{2}-\d{2}/.test(value);
    if (!hasDatePattern) return false;
    return !Number.isNaN(Date.parse(value));
  };

  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [highlightRowId, setHighlightRowId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to load records");
      }

      setRows(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!highlightRowId) return;
    const timer = setTimeout(() => setHighlightRowId(null), 1200);
    return () => clearTimeout(timer);
  }, [highlightRowId]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;

    return rows.filter((row) =>
      Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(normalized)),
    );
  }, [rows, query]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const transformed: Record<string, unknown> = { ...formData };
      fields.forEach((field) => {
        if (field.type === "number" && transformed[field.name] !== undefined) {
          transformed[field.name] = Number(transformed[field.name]);
        }
      });
      if ("photoUrl" in transformed && !("photoUrls" in transformed)) {
        transformed.photoUrls = transformed.photoUrl ? [transformed.photoUrl] : [];
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformed),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Unable to save record");
      }

      setFormData({});
      setOpenForm(false);
      setHighlightRowId(String(json.data?.id ?? ""));
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!allowDelete) return;
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadData();
    }
  };

  const onUpload = async (name: string, file: File | null) => {
    if (!file) return;
    setUploading(name);
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await fetch("/api/uploads", { method: "POST", body: form });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.message || "Upload failed");
      }

      setFormData((current) => ({ ...current, [name]: json.data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  return (
    <FadeIn>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[220px]">
                <Search size={15} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search records"
                  className="pl-8"
                />
              </div>
              <Button onClick={() => setOpenForm((value) => !value)}>
                <Plus size={14} className="mr-1" />
                {openForm ? "Close" : "Add Record"}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {query ? (
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                className="mt-3 rounded-lg border bg-slate-50 px-3 py-2 text-xs text-slate-600"
              >
                Showing {filtered.length} result(s) for <span className="font-semibold text-slate-800">{query}</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {openForm ? (
              <motion.form
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                onSubmit={onSubmit}
                layout
                className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-2"
              >
                {fields.map((field) => {
                  const value = formData[field.name] ?? "";
                  const common = {
                    id: field.name,
                    value,
                    required: field.required,
                    onChange: (
                      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
                    ) => setFormData((current) => ({ ...current, [field.name]: event.target.value })),
                  };

                  return (
                    <label key={field.name} className="space-y-1 text-sm text-slate-600">
                      <span>{field.label}</span>
                      {field.type === "select" ? (
                        <Select {...common}>
                          <option value="">Select</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      ) : field.type === "textarea" ? (
                        <Textarea {...common} rows={3} />
                      ) : field.type === "file" ? (
                        <Input
                          id={field.name}
                          type="file"
                          onChange={(event) => onUpload(field.name, event.target.files?.[0] ?? null)}
                        />
                      ) : (
                        <Input {...common} type={field.type ?? "text"} />
                      )}
                      {field.type === "file" && value ? (
                        <p className="text-xs text-emerald-600">Uploaded</p>
                      ) : null}
                    </label>
                  );
                })}

                <div className="md:col-span-2">
                  <Button type="submit" loading={saving || Boolean(uploading)}>
                    Save Record
                  </Button>
                  {uploading ? (
                    <motion.div
                      className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cyan-100"
                      initial={reduceMotion ? undefined : { opacity: 0 }}
                      animate={reduceMotion ? undefined : { opacity: 1 }}
                    >
                      <motion.div
                        className="h-full w-1/3 bg-cyan-600"
                        animate={reduceMotion ? undefined : { x: ["-110%", "360%"] }}
                        transition={reduceMotion ? undefined : { repeat: Infinity, duration: 1.1, ease: "linear" }}
                      />
                    </motion.div>
                  ) : null}
                </div>
              </motion.form>
            ) : null}
          </AnimatePresence>

          {error ? (
            <motion.p
              className="mt-3 text-sm text-rose-600"
              initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: [0, -3, 3, -2, 0] }}
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
                  {columns.map((column) => (
                    <th key={column.key} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                      {column.header}
                    </th>
                  ))}
                  {allowDelete ? (
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                  ) : null}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + (allowDelete ? 1 : 0)} className="px-4 py-8 text-center text-slate-500">
                      Loading records...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (allowDelete ? 1 : 0)} className="px-3 py-4">
                      <EmptyState title="No records" description="Create your first record to start tracking this module." />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, index) => (
                    <motion.tr
                      key={String(row.id ?? index)}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              y: 0,
                              backgroundColor:
                                highlightRowId && String(row.id) === highlightRowId
                                  ? ["rgba(207,250,254,0.9)", "rgba(255,255,255,1)"]
                                  : "rgba(255,255,255,1)",
                            }
                      }
                      transition={{ delay: Math.min(index * 0.02, 0.2) }}
                      className="hover:bg-slate-50/80"
                    >
                      {columns.map((column) => {
                        const raw = row[column.key];
                        const rendered = column.render ? column.render(raw, row) : raw;
                        return (
                          <td key={column.key} className="whitespace-nowrap px-3 py-3 text-slate-700">
                            {typeof rendered === "string" && /(status|active|pending|resolved|confirmed|delivered|canceled)/i.test(rendered) ? (
                              <Badge
                                tone={
                                  rendered === "resolved" || rendered === "active" || rendered === "delivered"
                                    ? "success"
                                    : rendered === "pending" || rendered === "new"
                                      ? "warning"
                                      : rendered === "canceled" || rendered === "inactive"
                                        ? "danger"
                                        : "neutral"
                                }
                              >
                                {rendered}
                              </Badge>
                            ) : typeof rendered === "string" && isDateLikeString(rendered) ? (
                              formatDate(rendered)
                            ) : (
                              String(rendered ?? "-")
                            )}
                          </td>
                        );
                      })}
                      {allowDelete ? (
                        <td className="px-3 py-3 text-right">
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-rose-600 hover:bg-rose-50"
                            onClick={() => onDelete(String(row.id))}
                            aria-label="Delete record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      ) : null}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
