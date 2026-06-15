import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "../../_lib/session";
import { NewDishForm } from "../_components/new-dish-form";

export const metadata = { title: "Nuevo plato" };

export default async function NewDishPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/platos" className="text-sm text-[#8B7355] hover:text-[#2D2013]">
          ← Platos
        </Link>
      </div>

      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Nuevo plato</h1>
        <p className="text-sm text-[#8B7355]">Completa los datos para publicar un plato en el menú.</p>
      </div>

      <div className="rounded-2xl border border-[#D4A853]/20 bg-white p-6">
        <NewDishForm />
      </div>
    </div>
  );
}
