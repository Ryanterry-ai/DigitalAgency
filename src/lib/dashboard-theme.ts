export const DASHBOARD_THEMES = [
  { id: "crm_midnight", label: "CRM Midnight" },
  { id: "linear_graphite", label: "Linear Graphite" },
  { id: "stripe_aurora", label: "Stripe Aurora" },
] as const;

export type DashboardThemeId = (typeof DASHBOARD_THEMES)[number]["id"];

export const DEFAULT_DASHBOARD_THEME: DashboardThemeId = "crm_midnight";

export const DASHBOARD_THEME_STORAGE_KEY = "sai_dashboard_theme";

export const isDashboardThemeId = (value: string): value is DashboardThemeId =>
  DASHBOARD_THEMES.some((theme) => theme.id === value);
