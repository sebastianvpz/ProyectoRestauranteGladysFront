import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "../../_lib/session";
import { getOrder } from "@/modules/orders/server";
import { OrderStatusBadge } from "@/modules/orders/presentation/order-status-badge";
import { OrderStatusSelect } from "@/modules/orders/presentation/order-status-select";
import { WhatsAppButton } from "@/modules/orders/presentation/whatsapp-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, formatPhone, formatPrice } from "@/lib/utils/format";

export const metadata = { title: "Detalle del pedido" };

type Params = Promise<{ id: string }>;

export default async function OrderDetailPage({ params }: { params: Params }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  let order;
  try {
    order = await getOrder(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/pedidos" className="text-sm text-[#8B7355] hover:text-[#2D2013]">
          ← Pedidos
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-[#8B7355]">{order.code}</p>
          <h1 className="font-display text-3xl font-semibold text-[#2D2013]">
            {order.customerName}
          </h1>
          <p className="text-sm text-[#8B7355]">
            {formatPhone(order.customerPhone)}
            {order.customerAddress ? ` · ${order.customerAddress}` : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <OrderStatusBadge status={order.status} />
          <OrderStatusSelect orderId={order.id} current={order.status} />
          <WhatsAppButton order={order} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalle del pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {order.items.map((item) => (
            <div
              key={`${item.dishId}-${item.name}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-[#FDF8F3] px-3 py-2"
            >
              <div>
                <p className="font-medium text-[#2D2013]">
                  {item.quantity} × {item.name}
                </p>
                {item.notes ? (
                  <p className="text-xs text-[#8B7355] italic">{item.notes}</p>
                ) : null}
              </div>
              <span className="font-semibold text-[#2D2013]">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between border-t border-[#D4A853]/20 pt-3 text-base">
            <span className="font-semibold text-[#2D2013]">Total</span>
            <span className="font-display text-2xl font-bold text-[#C75D3A]">
              {formatPrice(order.total)}
            </span>
          </div>
        </CardContent>
      </Card>

      {order.notes ? (
        <Card>
          <CardHeader>
            <CardTitle>Notas del cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#2D2013]">{order.notes}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Historial</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-[#8B7355] space-y-1">
          <p>Creado: {formatDateTime(order.createdAt)}</p>
          <p>Actualizado: {formatDateTime(order.updatedAt)}</p>
          <p>Origen: {order.source}</p>
        </CardContent>
      </Card>
    </div>
  );
}
