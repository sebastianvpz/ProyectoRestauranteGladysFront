import { http } from "@/lib/http/client";
import type { Order, OrderStatus } from "../domain";
import type { GetOrdersFilter } from "../application/get-orders";

type BackendPedido = {
  idPedido: number;
  cliente: { nombre: string; celular: string };
  fechaHora: string;
  estado: string;
  pagado: boolean;
  total: number;
  direccionEntrega?: string;
  detalles: Array<{
    plato: { idPlato: number; nombre: string };
    cantidad: number;
    precioUnitario: number;
    notasEspeciales?: string;
  }>;
};

function mapToOrder(pedido: BackendPedido): Order {
  const statusMap: Record<string, any> = {
    "PENDIENTE": "pending",
    "CONFIRMADO": "confirmed",
    "PREPARANDO": "preparing",
    "LISTO": "ready",
    "ENTREGADO": "delivered",
    "CANCELADO": "cancelled"
  };
  const mappedStatus = statusMap[pedido.estado?.toUpperCase()] || "pending";

  return {
    id: String(pedido.idPedido),
    code: `ORD-${pedido.idPedido.toString().padStart(4, "0")}`,
    customerName: pedido.cliente?.nombre || "Desconocido",
    customerPhone: pedido.cliente?.celular || "",
    customerAddress: pedido.direccionEntrega || "",
    items: (pedido.detalles || []).map(d => ({
      dishId: String(d.plato?.idPlato),
      name: d.plato?.nombre || "",
      quantity: d.cantidad,
      unitPrice: d.precioUnitario,
      notes: d.notasEspeciales || ""
    })),
    total: pedido.total,
    status: mappedStatus,
    isPaid: Boolean(pedido.pagado),
    source: "whatsapp", // por defecto
    createdAt: pedido.fechaHora,
    updatedAt: pedido.fechaHora,
  };
}

export const orderRepository = {
  async findAll(filter: GetOrdersFilter = {}): Promise<Order[]> {
    const params = new URLSearchParams();
    if (filter.status) params.set("status", filter.status);
    if (filter.search) params.set("search", filter.search);
    try {
      const qs = params.toString();
      const data = await http<BackendPedido[]>(`/api/admin/pedidos${qs ? `?${qs}` : ""}`, {
        next: { tags: ["orders"], revalidate: 60 },
      });
      return data.map(mapToOrder);
    } catch (error) {
      console.warn("⚠️ Advertencia: No se pudo contactar al backend (pedidos). Retornando lista vacía.");
      return [];
    }
  },

  async findById(id: string): Promise<Order | null> {
    try {
      const data = await http<BackendPedido>(`/api/admin/pedidos/${id}`, {
        next: { tags: ["orders", `order:${id}`], revalidate: 0 },
      });
      return mapToOrder(data);
    } catch (err) {
      if (err instanceof Error && "status" in err && (err as { status: number }).status === 404) {
        return null;
      }
      throw err;
    }
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const statusMapInvertido: Record<string, string> = {
      "pending": "PENDIENTE",
      "confirmed": "CONFIRMADO",
      "preparing": "PREPARANDO",
      "ready": "LISTO",
      "delivered": "ENTREGADO",
      "cancelled": "CANCELADO"
    };
    
    // El backend actual espera /api/admin/pedidos/{id}/estado?nuevoEstado=VALOR
    const nuevoEstado = statusMapInvertido[status] || "PENDIENTE";
    await http<string>(`/api/admin/pedidos/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PUT",
    });
    
    // Retornar un mock actualizado ya que la API retorna String
    const updated = await this.findById(id);
    if (!updated) throw new Error("Order not found after update");
    return updated;
  },

  async registerPayment(id: string): Promise<Order> {
    await http<string>(`/api/admin/pedidos/${id}/pago`, {
      method: "PUT",
    });
    
    const updated = await this.findById(id);
    if (!updated) throw new Error("Order not found after payment");
    return updated;
  }
};
