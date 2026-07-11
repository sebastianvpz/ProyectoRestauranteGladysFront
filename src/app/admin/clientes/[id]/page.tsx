import { redirect } from "next/navigation";
import { getAdminSession } from "../../_lib/session";
import { getClienteDetalle } from "@/modules/clients/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OrderStatusBadge } from "@/modules/orders/presentation/order-status-badge";
import { formatDateTime, formatPrice } from "@/lib/utils/format";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export const metadata = { title: "Detalle del Cliente" };

export default async function ClienteDetallePage({ params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const isAdmin = session.rol === "ADMIN" || session.rol === "Administrador";
  if (!isAdmin) {
    redirect("/admin");
  }

  const { id } = await params;
  const cliente = await getClienteDetalle(id);

  if (!cliente) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Cliente no encontrado.</p>
        <Link href="/admin/clientes" className="mt-4 inline-block text-[#C75D3A] underline">
          Volver a clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clientes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B7355] hover:text-[#C75D3A]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a clientes
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D2013] text-white">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[#2D2013]">{cliente.nombre}</h1>
          <p className="text-sm text-gray-500">Celular: {cliente.celular} | Registro: {new Date(cliente.fechaRegistro).toLocaleDateString()}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pedidos</CardTitle>
          <CardDescription>Todas las órdenes asociadas a este número de celular</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#2D2013]/5 text-[#8B7355]">
                <tr>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Pagado</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cliente.pedidos?.map((pedido) => {
                  const statusMap: Record<string, any> = {
                    "PENDIENTE": "pending",
                    "PREPARANDO": "preparing",
                    "LISTO": "ready",
                    "ENTREGADO": "delivered",
                    "CANCELADO": "cancelled"
                  };
                  const uiStatus = statusMap[pedido.estado?.toUpperCase()] || "pending";
                  
                  return (
                  <tr key={pedido.idPedido} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">{formatDateTime(pedido.fechaHora)}</td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={uiStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${pedido.pagado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {pedido.pagado ? "Sí" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatPrice(pedido.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/pedidos/${pedido.idPedido}`}
                        className="text-xs font-semibold text-[#C75D3A] underline"
                      >
                        Ver Orden
                      </Link>
                    </td>
                  </tr>
                )})}
                {(!cliente.pedidos || cliente.pedidos.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No hay pedidos en el historial.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
