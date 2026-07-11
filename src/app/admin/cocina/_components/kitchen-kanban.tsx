"use client";

import { useState } from "react";
import { updateOrderStatusAction } from "@/app/admin/pedidos/_components/actions";
import { Order } from "@/modules/orders/domain";
import { Loader2, CheckCircle, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/format";

export function KitchenKanban({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const pendingOrders = orders.filter(o => o.status === "pending" && o.isPaid); // Solo pagados pasan a cocina si es estricto, o todos. Asumamos que todos los pagados y pendientes van a cocina. Wait, maybe just pending?
  const preparingOrders = orders.filter(o => o.status === "preparing");

  const changeStatus = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const res = await updateOrderStatusAction(id, newStatus);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Error al actualizar");
    }
    setLoadingId(null);
  };

  const OrderCard = ({ order, actionLabel, nextStatus, icon: Icon, colorClass }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-[#D4A853]/30 p-4 space-y-3">
      <div className="flex justify-between items-start border-b border-gray-100 pb-2">
        <div>
          <span className="font-mono text-xs font-bold text-[#8B7355]">{order.code}</span>
          <h3 className="font-semibold text-lg text-[#2D2013]">{order.customerName}</h3>
        </div>
        <div className="text-right text-xs text-gray-500">
          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <ul className="text-sm space-y-1">
        {order.items.map((item: any, i: number) => (
          <li key={i} className="flex justify-between">
            <span className="font-medium">{item.quantity}x {item.name}</span>
            {item.notes && <span className="text-red-500 text-xs italic ml-2">({item.notes})</span>}
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <button
          onClick={() => changeStatus(order.id, nextStatus)}
          disabled={loadingId === order.id}
          className={`w-full py-2 rounded-md font-bold text-white flex items-center justify-center gap-2 ${colorClass}`}
        >
          {loadingId === order.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
          {actionLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      {/* Columna Pendientes */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-[#C75D3A] flex items-center gap-2 border-b-2 border-[#C75D3A] pb-2">
          ⏳ Por Preparar ({pendingOrders.length})
        </h2>
        {pendingOrders.length === 0 && <p className="text-sm text-gray-500">No hay pedidos pendientes.</p>}
        {pendingOrders.map(o => (
          <OrderCard 
            key={o.id} 
            order={o} 
            actionLabel="Empezar a Preparar" 
            nextStatus="preparing" 
            icon={ChefHat} 
            colorClass="bg-[#E6A822] hover:bg-[#d49a1f]" 
          />
        ))}
      </div>

      {/* Columna En Preparación */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-[#25D366] flex items-center gap-2 border-b-2 border-[#25D366] pb-2">
          🍳 En Preparación ({preparingOrders.length})
        </h2>
        {preparingOrders.length === 0 && <p className="text-sm text-gray-500">No hay pedidos en cocina.</p>}
        {preparingOrders.map(o => (
          <OrderCard 
            key={o.id} 
            order={o} 
            actionLabel="¡Plato Listo!" 
            nextStatus="ready" 
            icon={CheckCircle} 
            colorClass="bg-[#25D366] hover:bg-[#20bd5a]" 
          />
        ))}
      </div>
    </div>
  );
}
