export const DASHBOARD_THEMES = [
  { id: "enterprise_amber", label: "Enterprise Amber" },
  { id: "graphite_cyan", label: "Graphite Cyan" },
  { id: "emerald_night", label: "Emerald Night" },
] as const;

export type DashboardThemeId = (typeof DASHBOARD_THEMES)[number]["id"];

export const DEFAULT_DASHBOARD_THEME: DashboardThemeId = "enterprise_amber";

export const DASHBOARD_THEME_STORAGE_KEY = "sai_dashboard_theme";

export const isDashboardThemeId = (value: string): value is DashboardThemeId =>
  DASHBOARD_THEMES.some((theme) => theme.id === value);
