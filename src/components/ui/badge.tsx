import { cn } from "@/lib/utils/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

const TONE: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-[#2D2013]/5 text-[#2D2013] border-[#2D2013]/10",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  danger: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold",
        TONE[tone],
        className,
      )}
      {...props}
    />
  );
}
