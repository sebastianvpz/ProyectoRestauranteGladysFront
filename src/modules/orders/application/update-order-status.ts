import "server-only";
import { clientEnv } from "@/lib/env";
import { revalidatePath, revalidateTag } from "next/cache";
import { orderRepository, mockOrderRepository } from "../infrastructure/order-repository";
import type { OrderStatus } from "../domain";

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockOrderRepository : orderRepository;
  await repo.updateStatus(id, status);

  revalidateTag("orders", "max");
  revalidatePath("/admin/pedidos");
  revalidatePath(`/admin/pedidos/${id}`);
}
