import "server-only";
import { clientEnv } from "@/lib/env";
import { orderRepository, mockOrderRepository } from "../infrastructure/order-repository";
import type { Order, OrderStatus } from "../domain";

export type GetOrdersFilter = {
  status?: OrderStatus;
  search?: string;
};

export async function getOrders(filter: GetOrdersFilter = {}): Promise<Order[]> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockOrderRepository : orderRepository;
  const orders = await repo.findAll(filter);
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
