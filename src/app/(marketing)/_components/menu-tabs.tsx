"use client";

import { useState } from "react";
import type { Dish } from "@/modules/dishes/domain";
import { DishGrid } from "@/modules/dishes/presentation/dish-grid";

type MenuTabsProps = {
  dishes: Dish[];
};

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "entrada", label: "Entradas" },
  { id: "principal", label: "Fondos" },
  { id: "bebida", label: "Bebidas" },
  { id: "postre", label: "Postres" },
];

export function MenuTabs({ dishes }: MenuTabsProps) {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredDishes =
    activeCategory === "todos"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-[#C75D3A] text-white shadow-md scale-105"
                : "bg-white text-[#8B7355] border border-[#D4A853]/20 hover:bg-[#C75D3A]/10 hover:text-[#C75D3A]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <DishGrid
        dishes={filteredDishes}
        emptyMessage={`No tenemos platos en la categoría "${
          CATEGORIES.find((c) => c.id === activeCategory)?.label
        }" por el momento.`}
      />
    </div>
  );
}
