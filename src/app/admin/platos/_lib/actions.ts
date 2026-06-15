"use server";

import { redirect } from "next/navigation";
import { dishDraftSchema, dishUpdateSchema } from "@/modules/dishes";
import { createDish, deleteDish, updateDish } from "@/modules/dishes/server";

export async function createDishAction(_prev: unknown, formData: FormData) {
  const parsed = dishDraftSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl") || undefined,
    available: formData.get("available") === "on",
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return { error: "Datos inválidos", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await createDish(parsed.data);
  redirect("/admin/platos");
}

export async function updateDishAction(id: string, _prev: unknown, formData: FormData) {
  const parsed = dishUpdateSchema.safeParse({
    name: formData.get("name") || undefined,
    description: formData.get("description") || undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    category: formData.get("category") || undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    available: formData.get("available") === "on",
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return { error: "Datos inválidos", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await updateDish(id, parsed.data);
  redirect("/admin/platos");
}

export async function deleteDishAction(id: string) {
  await deleteDish(id);
  redirect("/admin/platos");
}
