import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDateTime, formatPrice } from "@/lib/utils/format";
import Link from "next/link";
import { DownloadPdfBtn } from "./_components/download-pdf-btn";

export const metadata = { title: "Historial de Comprobantes | Admin" };

type Comprobante = {
  idComprobante: number;
  tipoComprobante: string;
  correlativo: string;
  total: number;
  subtotal: number;
  igv: number;
  estadoSunat: string;
  pedido: {
    idPedido: number;
    fechaHora: string;
    cliente: {
      nombre: string;
      celular: string;
    };
  };
};

async function getComprobantes(token: string): Promise<Comprobante[]> {
  try {
    const res = await fetch("http://localhost:8080/api/admin/comprobantes", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ComprobantesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  // Solo ADMIN puede ver esto
  const isAdmin = session.rol === "ADMIN" || session.rol === "Administrador";
  if (!isAdmin) {
    redirect("/admin");
  }

  const comprobantes = await getComprobantes(session.token);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#2D2013]">Historial de Comprobantes</h1>
        <p className="mt-2 text-[#8B7355]">Registro de todas las boletas y facturas emitidas a clientes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comprobantes Emitidos</CardTitle>
          <CardDescription>Visualiza y descarga los comprobantes individualmente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#2D2013]/5 text-[#8B7355]">
                <tr>
                  <th className="px-4 py-3 font-medium">Correlativo</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comprobantes.map((comp) => (
                  <tr key={comp.idComprobante} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">
                      {comp.tipoComprobante} {comp.correlativo}
                    </td>
                    <td className="px-4 py-3">{formatDateTime(comp.pedido.fechaHora)}</td>
                    <td className="px-4 py-3">
                      <div>{comp.pedido.cliente.nombre}</div>
                      <div className="text-xs text-gray-500">{comp.pedido.cliente.celular}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(comp.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <DownloadPdfBtn idPedido={comp.pedido.idPedido} token={session.token} />
                    </td>
                  </tr>
                ))}
                {comprobantes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No hay comprobantes generados todavía.
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
