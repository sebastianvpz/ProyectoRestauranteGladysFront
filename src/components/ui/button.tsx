import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANT: Record<Variant, string> = {
  primary: "bg-[#C75D3A] text-white hover:bg-[#A84D2E] disabled:bg-[#C75D3A]/50",
  secondary: "bg-[#2D2013] text-white hover:bg-[#3D3023] disabled:bg-[#2D2013]/50",
  outline:
    "border border-[#D4A853]/40 text-[#2D2013] hover:bg-[#D4A853]/10 disabled:opacity-60",
  ghost: "text-[#2D2013] hover:bg-[#2D2013]/5 disabled:opacity-60",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-600/50",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C75D3A]/40 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  );
});
