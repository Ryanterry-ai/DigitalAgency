import * as React from "react";

import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 py-2.5 text-sm text-[var(--field-text)] outline-none transition hover:bg-[var(--field-bg-hover)] focus:border-[var(--field-focus)] focus:ring-2 focus:ring-[var(--field-focus-ring)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
