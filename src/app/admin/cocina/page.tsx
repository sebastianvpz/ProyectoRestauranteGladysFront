import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { getOrders } from "@/modules/orders/server";
import { KitchenKanban } from "./_components/kitchen-kanban";
import { AutoRefresh } from "./_components/auto-refresh";
import { ChefHat } from "lucide-react";

export const metadata = { title: "Backoffice de Cocina" };

export default async function CocinaPage() {
  const session = await getAdminSession();
  
  if (!session) redirect("/admin/login");
  
  // RBAC: Solo Administrador o Cocinero pueden ver esto
  const isAdmin = session.rol === "ADMIN" || session.rol === "Administrador";
  const isCocinero = session.rol === "COCINERO" || session.rol === "Cocinero";

  if (!isAdmin && !isCocinero) {
    redirect("/admin"); // O una página de no autorizado
  }

  // Traemos todos los pedidos y dejamos que el Kanban los filtre, o podemos filtrarlos desde el backend
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <AutoRefresh intervalMs={15000} /> {/* Refresca cada 15 segundos */}
      
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-[#2D2013] flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-[#C75D3A]" />
          Monitor de Cocina
        </h1>
        <p className="text-sm text-[#8B7355]">
          Actualización en tiempo real
        </p>
      </div>

      <KitchenKanban orders={orders} />
    </div>
  );
}
