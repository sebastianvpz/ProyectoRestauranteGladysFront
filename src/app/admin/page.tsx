import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSession } from "./_lib/session";
import { getDishes } from "@/modules/dishes/server";
import { getOrders } from "@/modules/orders/server";
import { SalesChart } from "./_components/sales-chart";

export const metadata = { title: "Panel" };

export default async function AdminHomePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [dishes, orders] = await Promise.all([getDishes(), getOrders()]);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayKey())).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Bienvenido, {session.email}</h1>
        <p className="text-sm text-[#8B7355]">Rol actual: {session.rol}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat title="Platos publicados" value={dishes.length} hint={`${dishes.filter((d) => d.featured).length} destacados`} />
        <Stat title="Pedidos hoy" value={todayOrders} hint={`${pendingOrders} pendientes`} />
        <Stat title="Total pedidos" value={orders.length} hint="Histórico" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accesos rápidos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {(session.rol === "Administrador" || session.rol === "ADMIN") && (
            <Link
              href="/admin/platos/nuevo"
              className="rounded-full bg-[#C75D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A84D2E]"
            >
              Nuevo plato
            </Link>
          )}
          <Link
            href="/admin/pedidos"
            className="rounded-full border border-[#D4A853]/40 px-4 py-2 text-sm font-semibold text-[#2D2013] hover:bg-[#D4A853]/10"
          >
            Ver pedidos
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reporte de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart token={session.token} />
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ title, value, hint }: { title: string; value: number; hint?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-[#8B7355] font-sans font-semibold uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-display text-4xl font-bold text-[#2D2013]">{value}</p>
        {hint ? <p className="text-xs text-[#8B7355] mt-1">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
