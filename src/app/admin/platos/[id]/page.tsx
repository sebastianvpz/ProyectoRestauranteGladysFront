import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "../../_lib/session";
import { getDish } from "@/modules/dishes/server";
import { EditDishForm } from "../_components/edit-dish-form";

export const metadata = { title: "Editar plato" };

type Params = Promise<{ id: string }>;

export default async function EditDishPage({ params }: { params: Params }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  let dish;
  try {
    dish = await getDish(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/platos" className="text-sm text-[#8B7355] hover:text-[#2D2013]">
          ← Platos
        </Link>
      </div>

      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">{dish.name}</h1>
        <p className="text-sm text-[#8B7355]">Edita los datos y guarda los cambios.</p>
      </div>

      <div className="rounded-2xl border border-[#D4A853]/20 bg-white p-6">
        <EditDishForm dish={dish} />
      </div>
    </div>
  );
}
