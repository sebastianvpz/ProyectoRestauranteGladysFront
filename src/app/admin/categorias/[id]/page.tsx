import { getAdminSession } from "../../_lib/session";
import { redirect } from "next/navigation";
import { getCategory } from "@/modules/categories/server";
import { CategoryForm } from "../_components/category-form";

export const metadata = { title: "Editar Categoría" };

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (session.rol !== "Administrador" && session.rol !== "ADMIN") {
    redirect("/admin");
  }

  const { id } = await params;
  const category = await getCategory(id);
  if (!category) {
    redirect("/admin/categorias");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Editar Categoría</h1>
        <p className="text-sm text-[#8B7355]">Modifica los datos de la categoría {category.nombre}.</p>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}
