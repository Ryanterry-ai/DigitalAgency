import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
};

export function Button({ className, variant = "primary", loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px]",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_10px_24px_rgba(14,165,233,.24)] hover:shadow-[0_14px_28px_rgba(14,165,233,.3)] active:scale-[.99]",
        variant === "secondary" && "border border-white/20 bg-white/10 text-slate-100 hover:bg-white/15",
        variant === "ghost" && "text-slate-200 hover:bg-white/10",
        variant === "danger" && "bg-rose-600 text-white hover:bg-rose-500",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />}
      {children}
    </button>
  );
}
