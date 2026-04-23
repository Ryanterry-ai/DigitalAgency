import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 py-2.5 text-sm text-[var(--field-text)] outline-none transition placeholder:text-[var(--field-placeholder)] hover:bg-[var(--field-bg-hover)] focus:border-[var(--field-focus)] focus:ring-2 focus:ring-[var(--field-focus-ring)]",
        className,
      )}
      {...props}
    />
  );
});
