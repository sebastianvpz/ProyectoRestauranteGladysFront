import "server-only";
import { clientEnv } from "@/lib/env";
import { revalidatePath, revalidateTag } from "next/cache";
import { dishRepository, mockDishRepository } from "../infrastructure/dish-repository";
import type { DishUpdate } from "../domain";

export async function updateDish(id: string, patch: DishUpdate): Promise<void> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockDishRepository : dishRepository;
  await repo.update(id, patch);

  revalidateTag("dishes", "max");
  revalidatePath("/");
  revalidatePath("/admin/platos");
  revalidatePath(`/admin/platos/${id}`);
}
