"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import {
  DASHBOARD_THEME_STORAGE_KEY,
  DEFAULT_DASHBOARD_THEME,
  DashboardThemeId,
  isDashboardThemeId,
} from "@/lib/dashboard-theme";
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
  const [theme, setTheme] = useState<DashboardThemeId>(DEFAULT_DASHBOARD_THEME);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = window.localStorage.getItem(DASHBOARD_THEME_STORAGE_KEY);
    if (saved && isDashboardThemeId(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DASHBOARD_THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="dashboard-theme flex min-h-screen" data-dashboard-theme={theme}>
      <div className="hidden w-64 border-r border-white/10 bg-white/5 backdrop-blur-2xl md:block">
        <Sidebar role={role} name={name} />
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute inset-y-0 left-0 w-64 border-r border-white/10 bg-slate-900/90 backdrop-blur-2xl"
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
              variants={reduceMotion ? undefined : drawerMotion.panel}
            >
              <Sidebar role={role} name={name} onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="min-w-0 flex-1">
        <Topbar
          role={role}
          name={name}
          onOpenSidebar={() => setOpen(true)}
          theme={theme}
          onThemeChange={setTheme}
        />
        <div className="p-4 md:p-6 xl:p-7">{children}</div>
      </main>
    </div>
  );
}
