import { cn } from "@/lib/utils/cn";
import { ORDER_STATUS_LABEL, ORDER_STATUS_TONE, type OrderStatus } from "../domain";

type OrderStatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        ORDER_STATUS_TONE[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}
