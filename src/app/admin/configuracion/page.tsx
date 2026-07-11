import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { ConfiguracionForm } from "./_components/configuracion-form";
import { ExportZipForm } from "./_components/export-zip-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Configuración del Local" };

export default async function ConfiguracionPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  // Solo admin puede ver esto
  if (session.rol !== "ADMIN" && session.rol !== "Administrador") {
    redirect("/admin");
  }

  // Fetch initial config
  const res = await fetch("http://localhost:8080/api/admin/configuracion", {
    cache: "no-store",
    headers: { Authorization: `Bearer ${session.token}` },
  });
  
  let initialConfig = {
    horaApertura: "10:00:00",
    horaCierre: "22:00:00",
    localAbierto: true,
  };

  if (res.ok) {
    initialConfig = await res.json();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">
          Configuración del Local
        </h1>
        <p className="text-sm text-[#8B7355]">
          Administra el horario de atención y las descargas masivas de comprobantes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Horario de Atención</CardTitle>
            <CardDescription>
              Configura a qué hora abres y cierras. Fuera de este horario, el sistema no aceptará pedidos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfiguracionForm token={session.token} initialConfig={initialConfig} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exportar Comprobantes (SUNAT)</CardTitle>
            <CardDescription>
              Descarga un archivo ZIP con todos los PDFs (Boletas/Facturas) emitidos en un mes específico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExportZipForm token={session.token} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
