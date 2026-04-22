"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime } from "@/lib/utils";
import { NotificationRecord } from "@/types/entities";

type NotificationFilter = "all" | "unread" | NotificationRecord["type"];

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const reduceMotion = useReducedMotion();

  const load = async () => {
    setLoading(true);
    const response = await fetch("/api/notifications", { cache: "no-store" });
    const json = await response.json();
    if (response.ok && json.success) {
      setItems(json.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    await load();
  };

  const markAllRead = async () => {
    const unread = items.filter((item) => !item.isRead);
    if (unread.length === 0) return;

    setMarkingAllRead(true);
    await Promise.all(unread.map((entry) => fetch(`/api/notifications/${entry.id}/read`, { method: "PATCH" })));
    setMarkingAllRead(false);
    await load();
  };

  const pushSystemNotice = async () => {
    setSending(true);
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "System digest",
        message: "Daily operations digest has been generated successfully.",
        type: "system",
      }),
    });
    setSending(false);
    await load();
  };

  const unreadCount = useMemo(() => items.filter((item) => !item.isRead).length, [items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    if (activeFilter === "unread") return items.filter((item) => !item.isRead);
    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  const filterPills: Array<{ key: NotificationFilter; label: string }> = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "issue", label: "Issues" },
    { key: "follow_up", label: "Follow-up" },
    { key: "expense", label: "Expenses" },
    { key: "attendance", label: "Attendance" },
    { key: "system", label: "System" },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Notification Center</h2>
            <p className="text-sm text-slate-500">
              Clear operational alerts with timestamps and action-ready owner visibility.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {unreadCount} unread of {items.length} total notifications
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" loading={markingAllRead} onClick={markAllRead}>
              Mark All Read
            </Button>
            <Button loading={sending} onClick={pushSystemNotice}>
              Trigger Test Notification
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t pt-3">
          {filterPills.map((pill) => (
            <button
              key={pill.key}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                activeFilter === pill.key
                  ? "bg-cyan-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              onClick={() => setActiveFilter(pill.key)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-2">
        {loading ? (
          <div className="p-4 text-sm text-slate-500">Loading notifications...</div>
        ) : filteredItems.length === 0 ? (
          <EmptyState title="All clear" description="No alerts are pending right now." />
        ) : (
          <AnimatePresence>
            <div className="space-y-2 p-2">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  className="rounded-lg border bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <Badge
                          tone={
                            item.type === "issue"
                              ? "danger"
                              : item.type === "follow_up" || item.type === "attendance"
                                ? "warning"
                                : item.type === "expense"
                                  ? "success"
                                  : "neutral"
                          }
                        >
                          {item.type.replace("_", " ")}
                        </Badge>
                        {!item.isRead ? <Badge tone="warning">unread</Badge> : null}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{formatDateTime(item.createdAt)}</p>
                    </div>
                    {!item.isRead ? (
                      <Button variant="secondary" onClick={() => markRead(item.id)}>
                        Mark Read
                      </Button>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </Card>
    </div>
  );
}
