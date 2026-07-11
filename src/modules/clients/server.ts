import { getAdminSession } from "@/app/admin/_lib/session";
import { http } from "@/lib/http/client";
import { Order } from "../orders/domain";

export interface ClienteResumen {
  id: number;
  nombre: string;
  celular: string;
  correo: string;
  fechaRegistro: string;
  totalGastado: number;
  cantidadPedidos: number;
}

export interface ClienteDetalle {
  id: number;
  nombre: string;
  celular: string;
  correo: string;
  fechaRegistro: string;
  pedidos: any[]; // The backend sends raw Pedido objects
}

export async function getClientes(): Promise<ClienteResumen[]> {
  const session = await getAdminSession();
  if (!session) return [];

  try {
    const data = await http<ClienteResumen[]>("/api/admin/clientes", {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export async function getClienteDetalle(id: string): Promise<ClienteDetalle | null> {
  const session = await getAdminSession();
  if (!session) return null;

  try {
    const data = await http<ClienteDetalle>(`/api/admin/clientes/${id}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching client detail:", error);
    return null;
  }
}
