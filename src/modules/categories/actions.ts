"use server";

import { revalidateTag } from "next/cache";
import { http } from "@/lib/http/client";
import { Category } from "./server";

export async function createCategoryAction(data: { nombre: string; estado: string }) {
  try {
    await http<Category>("/api/admin/categorias", {
      method: "POST",
      body: data,
    });
    revalidateTag("categories");
    return { ok: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { ok: false, error: "Failed to create category" };
  }
}

export async function updateCategoryAction(id: number, data: { nombre: string; estado: string }) {
  try {
    await http<Category>(`/api/admin/categorias/${id}`, {
      method: "PUT",
      body: data,
    });
    revalidateTag("categories");
    revalidateTag(`category:${id}`);
    return { ok: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { ok: false, error: "Failed to update category" };
  }
}

export async function disableCategoryAction(id: number) {
  try {
    await http(`/api/admin/categorias/${id}`, {
      method: "DELETE",
    });
    revalidateTag("categories");
    revalidateTag(`category:${id}`);
    return { ok: true };
  } catch (error) {
    console.error("Error disabling category:", error);
    return { ok: false, error: "Failed to disable category" };
  }
}
