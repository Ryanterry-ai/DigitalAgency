"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime } from "@/lib/utils";
import { NotificationRecord } from "@/types/entities";

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
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

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Notification Center</h2>
            <p className="text-sm text-slate-500">Issue alerts, follow-up reminders, and attendance exceptions.</p>
          </div>
          <Button loading={sending} onClick={pushSystemNotice}>
            Trigger Test Notification
          </Button>
        </div>
      </Card>

      <Card className="p-2">
        {loading ? (
          <div className="p-4 text-sm text-slate-500">Loading notifications...</div>
        ) : items.length === 0 ? (
          <EmptyState title="All clear" description="No alerts are pending right now." />
        ) : (
          <AnimatePresence>
            <div className="space-y-2 p-2">
              {items.map((item) => (
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
                        <Badge tone={item.isRead ? "neutral" : "warning"}>{item.type}</Badge>
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
