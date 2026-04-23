import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 py-2.5 text-sm text-[var(--field-text)] outline-none transition placeholder:text-[var(--field-placeholder)] hover:bg-[var(--field-bg-hover)] focus:border-[var(--field-focus)] focus:ring-2 focus:ring-[var(--field-focus-ring)]",
        className,
      )}
      {...props}
    />
  );
});
