import { cookies } from "next/headers";
import { http } from "@/lib/http/client";

export type Category = {
  idCategoria: number;
  nombre: string;
  estado: string;
};

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await http<Category[]>("/api/admin/categorias", {
      next: { tags: ["categories"], revalidate: 0 },
    });
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategory(id: string): Promise<Category | null> {
  try {
    const data = await http<Category>(`/api/admin/categorias/${id}`, {
      next: { tags: [`category:${id}`], revalidate: 0 },
    });
    return data;
  } catch (error) {
    return null;
  }
}
