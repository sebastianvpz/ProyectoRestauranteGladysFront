"use server";

import { updateOrderStatus, registerPayment } from "@/modules/orders/server";
import { orderStatusSchema } from "@/modules/orders";

export async function updateOrderStatusAction(id: string, status: string) {
  const parsed = orderStatusSchema.safeParse(status);
  if (!parsed.success) {
    return { ok: false, error: "Estado inválido" };
  }
  await updateOrderStatus(id, parsed.data);
  return { ok: true };
}

export async function registerPaymentAction(id: string) {
  try {
    await registerPayment(id);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "No se pudo registrar el pago" };
  }
}
