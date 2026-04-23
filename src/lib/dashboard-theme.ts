export const DASHBOARD_THEMES = [
  { id: "midnight_cyan", label: "Midnight Cyan" },
  { id: "carbon_amber", label: "Carbon Amber" },
  { id: "emerald_night", label: "Emerald Night" },
] as const;

export type DashboardThemeId = (typeof DASHBOARD_THEMES)[number]["id"];

export const DEFAULT_DASHBOARD_THEME: DashboardThemeId = "midnight_cyan";

export const DASHBOARD_THEME_STORAGE_KEY = "sai_dashboard_theme";

export const isDashboardThemeId = (value: string): value is DashboardThemeId =>
  DASHBOARD_THEMES.some((theme) => theme.id === value);
