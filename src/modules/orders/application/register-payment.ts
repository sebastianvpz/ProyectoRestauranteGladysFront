import { orderRepository } from "../infrastructure/order-repository";
import type { Order } from "../domain";

export async function registerPayment(id: string): Promise<Order> {
  return await orderRepository.registerPayment(id);
}
