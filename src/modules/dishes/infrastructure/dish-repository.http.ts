import { http } from "@/lib/http/client";
import type { Dish, DishDraft, DishUpdate } from "../domain";

export const dishRepository = {
  async findAll(): Promise<Dish[]> {
    return http<Dish[]>("/api/platos", { next: { tags: ["dishes"] } });
  },

  async findById(id: string): Promise<Dish | null> {
    try {
      return await http<Dish>(`/api/platos/${id}`, {
        next: { tags: ["dishes", `dish:${id}`] },
      });
    } catch (err) {
      if (err instanceof Error && "status" in err && (err as { status: number }).status === 404) {
        return null;
      }
      throw err;
    }
  },

  async create(draft: DishDraft): Promise<Dish> {
    return http<Dish>("/api/platos", { method: "POST", body: draft });
  },

  async update(id: string, patch: DishUpdate): Promise<Dish> {
    return http<Dish>(`/api/platos/${id}`, { method: "PATCH", body: patch });
  },

  async delete(id: string): Promise<void> {
    return http<void>(`/api/platos/${id}`, { method: "DELETE" });
  },
};
