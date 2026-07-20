import { getAdminSession } from "../../_lib/session";
import { redirect } from "next/navigation";
import { CategoryForm } from "../_components/category-form";

export const metadata = { title: "Nueva Categoría" };

export default async function NewCategoryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (session.rol !== "Administrador" && session.rol !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Nueva Categoría</h1>
        <p className="text-sm text-[#8B7355]">Crea una nueva categoría para organizar el menú.</p>
      </div>

      <CategoryForm />
    </div>
  );
}
