import "server-only";
import { clientEnv } from "@/lib/env";
import { NotFoundError } from "@/lib/http/errors";
import { dishRepository, mockDishRepository } from "../infrastructure/dish-repository";
import type { Dish } from "../domain";

export async function getDish(id: string): Promise<Dish> {
  const repo = clientEnv.useMocks || !clientEnv.apiUrl ? mockDishRepository : dishRepository;
  const dish = await repo.findById(id);
  if (!dish) throw new NotFoundError("Dish");
  return dish;
}
