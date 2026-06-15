import type { Dish } from "../domain";
import { DishCard } from "./dish-card";

type DishGridProps = {
  dishes: Dish[];
  emptyMessage?: string;
};

export function DishGrid({ dishes, emptyMessage }: DishGridProps) {
  if (dishes.length === 0) {
    return (
      <p className="text-center text-[#8B7355] py-12">
        {emptyMessage ?? "Aún no hay platos disponibles."}
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} variant="public" />
      ))}
    </div>
  );
}
