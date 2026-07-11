import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { getClientes } from "@/modules/clients/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format";

export const metadata = { title: "Clientes Registrados" };

export default async function ClientesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const isAdmin = session.rol === "ADMIN" || session.rol === "Administrador";
  if (!isAdmin) {
    redirect("/admin");
  }

  const clientes = await getClientes();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-8 h-8 text-[#C75D3A]" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Clientes</h1>
          <p className="text-sm text-[#8B7355]">Registro histórico de clientes (CRM)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Clientes</CardTitle>
          <CardDescription>Clientes agrupados por número celular</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#2D2013]/5 text-[#8B7355]">
                <tr>
                  <th className="px-4 py-3 font-medium">Celular</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Registro</th>
                  <th className="px-4 py-3 font-medium text-right">Pedidos</th>
                  <th className="px-4 py-3 font-medium text-right">Total Gastado</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clientes.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono font-medium">{c.celular}</td>
                    <td className="px-4 py-3">{c.nombre}</td>
                    <td className="px-4 py-3">{new Date(c.fechaRegistro).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">{c.cantidadPedidos}</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#C75D3A]">{formatPrice(c.totalGastado)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/clientes/${c.id}`}
                        className="text-xs font-semibold text-[#2D2013] underline hover:text-[#C75D3A]"
                      >
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No hay clientes registrados aún.
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
