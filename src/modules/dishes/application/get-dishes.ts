import "server-only";
import { clientEnv } from "@/lib/env";
import { dishRepository, mockDishRepository } from "../infrastructure/dish-repository";
import type { Dish } from "../domain";

export async function getDishes(): Promise<Dish[]> {
  if (clientEnv.useMocks || !clientEnv.apiUrl) {
    return mockDishRepository.findAll();
  }
  return dishRepository.findAll();
}

export async function getFeaturedDishes(limit = 6): Promise<Dish[]> {
  const dishes = await getDishes();
  const featured = dishes.filter((d) => d.featured);
  const source = featured.length > 0 ? featured : dishes;
  return source.slice(0, limit);
}
