import "server-only";
import { clientEnv } from "@/lib/env";
import { NotFoundError } from "@/lib/http/errors";
import { orderRepository, mockOrderRepository } from "../infrastructure/order-repository";
import type { Order } from "../domain";

export async function getOrder(id: string): Promise<Order> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockOrderRepository : orderRepository;
  const order = await repo.findById(id);
  if (!order) throw new NotFoundError("Order");
  return order;
}
