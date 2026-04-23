import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "success" | "warning" | "danger" | "neutral";
  children: React.ReactNode;
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "success" && "bg-emerald-500/15 text-emerald-300",
        tone === "warning" && "bg-amber-500/15 text-amber-300",
        tone === "danger" && "bg-rose-500/15 text-rose-300",
        tone === "neutral" && "bg-slate-500/15 text-slate-300",
      )}
    >
      {children}
    </span>
  );
}
