import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "success" | "warning" | "danger" | "neutral";
  children: React.ReactNode;
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        tone === "success" && "border-emerald-400/30 bg-emerald-400/12 text-emerald-300",
        tone === "warning" && "border-amber-400/30 bg-amber-400/12 text-amber-300",
        tone === "danger" && "border-rose-400/30 bg-rose-400/12 text-rose-300",
        tone === "neutral" && "border-slate-300/20 bg-slate-300/10 text-slate-300",
      )}
    >
      {children}
    </span>
  );
}
