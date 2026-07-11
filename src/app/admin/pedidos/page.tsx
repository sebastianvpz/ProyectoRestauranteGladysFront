import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { getOrders } from "@/modules/orders/server";
import { ORDER_STATUS_LABEL, ORDER_STATUSES, type GetOrdersFilter, type OrderStatus } from "@/modules/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/modules/orders/presentation/order-status-badge";
import { OrderStatusSelect } from "@/modules/orders/presentation/order-status-select";
import { WhatsAppButton } from "@/modules/orders/presentation/whatsapp-button";
import { formatDateTime, formatPhone, formatPrice } from "@/lib/utils/format";

export const metadata = { title: "Pedidos" };

type SearchParams = Promise<{ status?: string; q?: string }>;

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const isAdmin = session.rol === "ADMIN" || session.rol === "Administrador";
  const isEmpleado = session.rol === "EMPLEADO" || session.rol === "Empleado";
  
  if (!isAdmin && !isEmpleado) {
    redirect("/admin");
  }

  const params = await searchParams;
  const filter: GetOrdersFilter = {
    status: isOrderStatus(params.status) ? params.status : undefined,
    search: params.q?.trim() || undefined,
  };

  const orders = await getOrders(filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Pedidos</h1>
        <p className="text-sm text-[#8B7355]">
          Pedidos recibidos por WhatsApp. Cambia el estado y contacta al cliente.
        </p>
      </div>

      <form className="flex flex-wrap items-center gap-2" method="get">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Buscar por código, nombre o teléfono"
          className="h-10 flex-1 min-w-[200px] rounded-xl border border-[#D4A853]/30 bg-white px-4 text-sm outline-none focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20"
        />
        <select
          name="status"
          defaultValue={filter.status ?? ""}
          className="h-10 rounded-xl border border-[#D4A853]/30 bg-white px-3 text-sm outline-none focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20"
        >
          <option value="">Todos los estados</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 rounded-full bg-[#2D2013] px-5 text-sm font-semibold text-white hover:bg-[#3D3023]"
        >
          Filtrar
        </button>
        {(filter.status || filter.search) ? (
          <Link
            href="/admin/pedidos"
            className="text-sm font-semibold text-[#8B7355] hover:text-[#2D2013]"
          >
            Limpiar
          </Link>
        ) : null}
      </form>

      {orders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-2xl border border-[#D4A853]/20 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Recibido</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/admin/pedidos/${order.id}`} className="font-mono text-sm font-semibold text-[#2D2013] hover:text-[#C75D3A]">
                      {order.code}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#2D2013]">{order.customerName}</div>
                    <div className="text-xs text-[#8B7355]">{formatPhone(order.customerPhone)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-[#2D2013]">
                      {formatPrice(order.total)}
                    </div>
                    {order.isPaid ? (
                      <span className="text-xs font-semibold text-green-600">Pagado</span>
                    ) : (
                      <span className="text-xs font-semibold text-orange-500">Por pagar</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <OrderStatusBadge status={order.status} />
                      <OrderStatusSelect orderId={order.id} current={order.status} />
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-[#8B7355]">
                    {formatDateTime(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <WhatsAppButton order={order} variant="ghost" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && (ORDER_STATUSES as string[]).includes(value);
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#D4A853]/40 bg-white p-12 text-center">
      <p className="font-display text-xl text-[#2D2013]">No hay pedidos</p>
      <p className="mt-1 text-sm text-[#8B7355]">
        Cuando recibas pedidos por WhatsApp aparecerán aquí.
      </p>
    </div>
  );
}
