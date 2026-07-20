import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { getCategories } from "@/modules/categories/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteCategoryButton } from "./_components/delete-category-button";

export const metadata = { title: "Categorías" };

export default async function CategoriesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (session.rol !== "Administrador" && session.rol !== "ADMIN") {
    redirect("/admin");
  }

  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Categorías</h1>
          <p className="text-sm text-[#8B7355]">
            Gestiona las categorías de los platos (Activas e Inactivas).
          </p>
        </div>
        <Link href="/admin/categorias/nuevo">
          <Button>+ Nueva categoría</Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-2xl border border-[#D4A853]/20 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.idCategoria}>
                  <TableCell className="font-mono text-xs text-[#8B7355]">
                    {cat.idCategoria}
                  </TableCell>
                  <TableCell className="font-medium text-[#2D2013]">
                    {cat.nombre}
                  </TableCell>
                  <TableCell>
                    <Badge tone={cat.estado === "Activo" ? "success" : "danger"}>
                      {cat.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <Link
                        href={`/admin/categorias/${cat.idCategoria}`}
                        className="rounded-full border border-[#D4A853]/40 px-3 py-1 text-xs font-semibold text-[#2D2013] hover:bg-[#D4A853]/10"
                      >
                        Editar
                      </Link>
                      {cat.estado === "Activo" && (
                        <DeleteCategoryButton id={cat.idCategoria} name={cat.nombre} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#D4A853]/40 bg-white p-12 text-center">
      <p className="font-display text-xl text-[#2D2013]">Aún no hay categorías</p>
      <p className="mt-1 text-sm text-[#8B7355]">Crea la primera para organizar tus platos.</p>
      <Link href="/admin/categorias/nuevo" className="mt-6 inline-block">
        <Button>Crear categoría</Button>
      </Link>
    </div>
  );
}
