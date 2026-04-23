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
        "w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-sky-300/60 focus:ring-2 focus:ring-sky-400/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
