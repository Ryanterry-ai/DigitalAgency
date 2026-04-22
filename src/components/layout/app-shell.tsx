"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { drawerMotion } from "@/lib/motion";
import { Role } from "@/types/entities";

export function AppShell({
  role,
  name,
  children,
}: {
  role: Role;
  name?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-72 border-r bg-white md:block">
        <Sidebar role={role} />
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            exit={reduceMotion ? undefined : "exit"}
            variants={reduceMotion ? undefined : drawerMotion.overlay}
          >
            <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl"
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
              variants={reduceMotion ? undefined : drawerMotion.panel}
            >
              <Sidebar role={role} onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="min-w-0 flex-1">
        <Topbar role={role} name={name} onOpenSidebar={() => setOpen(true)} />
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
