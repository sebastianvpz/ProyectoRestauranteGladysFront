import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const FIELD =
  "w-full rounded-xl border border-[#D4A853]/30 bg-white px-4 py-3 text-[#2D2013] outline-none transition-all placeholder:text-[#8B7355]/60 focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20 disabled:cursor-not-allowed disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(FIELD, className)} {...props} />;
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, rows = 3, ...props }, ref) {
    return <textarea ref={ref} rows={rows} className={cn(FIELD, "resize-none", className)} {...props} />;
  },
);
