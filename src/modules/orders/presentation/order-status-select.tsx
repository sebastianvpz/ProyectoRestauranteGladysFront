"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "@/app/admin/pedidos/_components/actions";
import { ORDER_STATUSES, ORDER_STATUS_LABEL, type OrderStatus } from "../domain";
import { cn } from "@/lib/utils/cn";

type OrderStatusSelectProps = {
  orderId: string;
  current: OrderStatus;
  className?: string;
};

export function OrderStatusSelect({ orderId, current, className }: OrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      aria-label="Cambiar estado del pedido"
      defaultValue={current}
      disabled={isPending}
      onChange={(event) => {
        const value = event.target.value as OrderStatus;
        startTransition(async () => {
          await updateOrderStatusAction(orderId, value);
        });
      }}
      className={cn(
        "rounded-lg border border-[#D4A853]/30 bg-white px-3 py-1.5 text-sm font-medium text-[#2D2013]",
        "focus:border-[#C75D3A] focus:outline-none focus:ring-2 focus:ring-[#C75D3A]/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {ORDER_STATUSES.map((status) => (
        <option key={status} value={status}>
          {ORDER_STATUS_LABEL[status]}
        </option>
      ))}
    </select>
  );
}
