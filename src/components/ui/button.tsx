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
        variant === "primary" && "bg-cyan-700 text-white hover:bg-cyan-600 active:scale-[.99]",
        variant === "secondary" && "border bg-white text-slate-700 hover:bg-slate-50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-500",
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
