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
        "w-full rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-2.5 text-sm text-[#f3f4f6] outline-none transition placeholder:text-[#666666] focus:border-[#e8822a] focus:ring-2 focus:ring-[#e8822a]/20",
        className,
      )}
      {...props}
    />
  );
});
