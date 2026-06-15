import { forwardRef } from "react";
import type { LabelHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  function Label({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={cn("block text-sm font-medium text-[#2D2013]", className)}
        {...props}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-xl border border-[#D4A853]/30 bg-white px-4 py-3 text-[#2D2013] outline-none transition-all focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
