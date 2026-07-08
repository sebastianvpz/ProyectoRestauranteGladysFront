import { http } from "@/lib/http/client";
import type { Dish, DishDraft, DishUpdate } from "../domain";

type BackendPlato = {
  idPlato: number;
  categoria?: { nombre: string };
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  estado: string;
};

function mapToDish(plato: BackendPlato): Dish {
  const categoryMap: Record<string, any> = {
    entradas: "entrada",
    fondos: "principal",
    bebidas: "bebida",
    postres: "postre",
  };
  const rawCat = plato.categoria?.nombre?.toLowerCase() || "";
  const mappedCategory = categoryMap[rawCat] || "principal";

  return {
    id: String(plato.idPlato),
    name: plato.nombre,
    description: plato.descripcion || "",
    price: plato.precio,
    category: mappedCategory,
    imageUrl: plato.imagenUrl || "",
    available: plato.estado === "Activo",
    featured: true, // Todos destacados por ahora
  };
}

function mapToBackendPlato(draft: Partial<DishDraft & DishUpdate>): any {
  const reverseCategoryMap: Record<string, number> = {
    entrada: 2,
    principal: 1,
    bebida: 3,
    postre: 4,
  };
  
  const payload: any = {};
  if (draft.name !== undefined) payload.nombre = draft.name;
  if (draft.description !== undefined) payload.descripcion = draft.description;
  if (draft.price !== undefined) payload.precio = draft.price;
  if (draft.imageUrl !== undefined) payload.imagenUrl = draft.imageUrl;
  if (draft.available !== undefined) payload.estado = draft.available ? "Activo" : "Inactivo";
  if (draft.category !== undefined) {
    payload.categoria = { idCategoria: reverseCategoryMap[draft.category] || 1 };
  }
  return payload;
}

export const dishRepository = {
  async findAll(): Promise<Dish[]> {
    try {
      const data = await http<BackendPlato[]>("/api/platos", { next: { tags: ["dishes"], revalidate: 60 } });
      return data.map(mapToDish);
    } catch (error) {
      console.warn("⚠️ Advertencia: No se pudo contactar al backend (platos). Retornando menú vacío.");
      return [];
    }
  },

  async findById(id: string): Promise<Dish | null> {
    try {
      const plato = await http<BackendPlato>(`/api/platos/${id}`, {
        next: { tags: ["dishes", `dish:${id}`] },
      });
      return mapToDish(plato);
    } catch (err) {
      if (err instanceof Error && "status" in err && (err as { status: number }).status === 404) {
        return null;
      }
      throw err;
    }
  },

  async create(draft: DishDraft): Promise<Dish> {
    const payload = mapToBackendPlato(draft);
    const plato = await http<BackendPlato>("/api/platos", { method: "POST", body: payload });
    return mapToDish(plato);
  },

  async update(id: string, patch: DishUpdate): Promise<Dish> {
    const payload = mapToBackendPlato(patch);
    const plato = await http<BackendPlato>(`/api/platos/${id}`, { method: "PATCH", body: payload });
    return mapToDish(plato);
  },

  async delete(id: string): Promise<void> {
    return http<void>(`/api/platos/${id}`, { method: "DELETE" });
  },
};
