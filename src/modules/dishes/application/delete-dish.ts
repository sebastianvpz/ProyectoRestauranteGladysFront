import "server-only";
import { clientEnv } from "@/lib/env";
import { revalidatePath, revalidateTag } from "next/cache";
import { dishRepository, mockDishRepository } from "../infrastructure/dish-repository";

export async function deleteDish(id: string): Promise<void> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockDishRepository : dishRepository;
  await repo.delete(id);

  revalidateTag("dishes", "max");
  revalidatePath("/");
  revalidatePath("/admin/platos");
}
