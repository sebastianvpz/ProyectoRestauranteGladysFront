import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { getDishes } from "@/modules/dishes/server";
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
import { formatPrice } from "@/lib/utils/format";
import { DeleteDishButton } from "./_components/delete-dish-button";

export const metadata = { title: "Platos" };

export default async function DishesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (session.rol !== "Administrador" && session.rol !== "ADMIN") {
    redirect("/admin");
  }

  const dishes = await getDishes();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Platos</h1>
          <p className="text-sm text-[#8B7355]">
            Gestiona los platos que se muestran en el sitio público.
          </p>
        </div>
        <Link href="/admin/platos/nuevo">
          <Button>+ Nuevo plato</Button>
        </Link>
      </div>

      {dishes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-2xl border border-[#D4A853]/20 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow key={dish.id}>
                  <TableCell>
                    <div className="font-medium text-[#2D2013]">{dish.name}</div>
                    <div className="text-xs text-[#8B7355] line-clamp-1">{dish.description}</div>
                  </TableCell>
                  <TableCell className="capitalize text-[#8B7355]">{dish.category}</TableCell>
                  <TableCell className="font-semibold text-[#2D2013]">
                    {formatPrice(dish.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {dish.featured ? <Badge tone="warning">Destacado</Badge> : null}
                      <Badge tone={dish.available ? "success" : "danger"}>
                        {dish.available ? "Disponible" : "No disponible"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/platos/${dish.id}`}
                        className="rounded-full border border-[#D4A853]/40 px-3 py-1 text-xs font-semibold text-[#2D2013] hover:bg-[#D4A853]/10"
                      >
                        Editar
                      </Link>
                      <DeleteDishButton id={dish.id} name={dish.name} />
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
      <p className="font-display text-xl text-[#2D2013]">Aún no hay platos</p>
      <p className="mt-1 text-sm text-[#8B7355]">Crea el primero para verlo en el landing.</p>
      <Link href="/admin/platos/nuevo" className="mt-6 inline-block">
        <Button>Crear plato</Button>
      </Link>
    </div>
  );
}
