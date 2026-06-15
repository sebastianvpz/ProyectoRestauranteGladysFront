import type { Order, OrderStatus } from "../domain";
import type { GetOrdersFilter } from "../application/get-orders";

const NOW = () => new Date().toISOString();

const STORE: Order[] = [
  {
    id: "o-1001",
    code: "GLA-1001",
    customerName: "María Rodríguez",
    customerPhone: "51987654321",
    customerAddress: "Av. La Marina 234, San Miguel",
    items: [
      { dishId: "1", name: "Ceviche Clásico", quantity: 2, unitPrice: 35 },
      { dishId: "5", name: "Anticuchos", quantity: 1, unitPrice: 25 },
    ],
    total: 95,
    status: "pending",
    source: "whatsapp",
    notes: "Sin ají muy picante por favor",
    createdAt: "2026-06-04T18:30:00.000Z",
    updatedAt: "2026-06-04T18:30:00.000Z",
  },
  {
    id: "o-1002",
    code: "GLA-1002",
    customerName: "Carlos Mendoza",
    customerPhone: "51912345678",
    items: [
      { dishId: "2", name: "Lomo Saltado", quantity: 1, unitPrice: 38 },
    ],
    total: 38,
    status: "preparing",
    source: "whatsapp",
    createdAt: "2026-06-04T17:10:00.000Z",
    updatedAt: "2026-06-04T17:35:00.000Z",
  },
  {
    id: "o-1003",
    code: "GLA-1003",
    customerName: "Lucía Pérez",
    customerPhone: "51955512345",
    customerAddress: "Jr. Puno 456, Cercado de Lima",
    items: [
      { dishId: "6", name: "Arroz con Mariscos", quantity: 1, unitPrice: 42 },
      { dishId: "4", name: "Causa Limeña", quantity: 2, unitPrice: 28 },
    ],
    total: 98,
    status: "delivered",
    source: "whatsapp",
    createdAt: "2026-06-03T20:00:00.000Z",
    updatedAt: "2026-06-03T21:15:00.000Z",
  },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const mockOrderRepository = {
  async findAll(filter: GetOrdersFilter = {}): Promise<Order[]> {
    let result = STORE.slice();
    if (filter.status) result = result.filter((o) => o.status === filter.status);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.code.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q),
      );
    }
    return clone(result);
  },

  async findById(id: string): Promise<Order | null> {
    const found = STORE.find((o) => o.id === id);
    return found ? clone(found) : null;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const index = STORE.findIndex((o) => o.id === id);
    if (index === -1) throw new Error("Order not found");
    const updated: Order = { ...STORE[index], status, updatedAt: NOW() };
    STORE[index] = updated;
    return clone(updated);
  },
};
