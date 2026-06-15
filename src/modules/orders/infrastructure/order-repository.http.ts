import { http } from "@/lib/http/client";
import type { Order, OrderStatus } from "../domain";
import type { GetOrdersFilter } from "../application/get-orders";

export const orderRepository = {
  async findAll(filter: GetOrdersFilter = {}): Promise<Order[]> {
    const params = new URLSearchParams();
    if (filter.status) params.set("status", filter.status);
    if (filter.search) params.set("search", filter.search);
    const qs = params.toString();
    return http<Order[]>(`/orders${qs ? `?${qs}` : ""}`, {
      next: { tags: ["orders"] },
    });
  },

  async findById(id: string): Promise<Order | null> {
    try {
      return await http<Order>(`/orders/${id}`, {
        next: { tags: ["orders", `order:${id}`] },
      });
    } catch (err) {
      if (err instanceof Error && "status" in err && (err as { status: number }).status === 404) {
        return null;
      }
      throw err;
    }
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return http<Order>(`/orders/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },
};
