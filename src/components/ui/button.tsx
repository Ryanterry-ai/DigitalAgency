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
          "bg-[#e8822a] text-[#111] hover:bg-[#f0984d] active:scale-[.99]",
        variant === "secondary" && "border border-[#3a3a3a] bg-[#2a2a2a] text-[#f9fafb] hover:bg-[#333333]",
        variant === "ghost" && "text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-[#f9fafb]",
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
