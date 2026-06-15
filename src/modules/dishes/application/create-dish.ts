import "server-only";
import { clientEnv } from "@/lib/env";
import { revalidatePath, revalidateTag } from "next/cache";
import { dishRepository, mockDishRepository } from "../infrastructure/dish-repository";
import type { DishDraft } from "../domain";

export async function createDish(draft: DishDraft): Promise<void> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockDishRepository : dishRepository;
  await repo.create(draft);

  revalidateTag("dishes", "max");
  revalidatePath("/");
  revalidatePath("/admin/platos");
}
