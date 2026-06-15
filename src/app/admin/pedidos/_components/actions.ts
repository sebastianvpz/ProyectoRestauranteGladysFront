"use server";

import { updateOrderStatus } from "@/modules/orders/server";
import { orderStatusSchema } from "@/modules/orders";

export async function updateOrderStatusAction(id: string, status: string) {
  const parsed = orderStatusSchema.safeParse(status);
  if (!parsed.success) {
    return { ok: false, error: "Estado inválido" };
  }
  await updateOrderStatus(id, parsed.data);
  return { ok: true };
}
