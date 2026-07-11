"use client";

import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Dish } from "../domain";
import { useCartStore } from "@/lib/store/cart";

type DishCardProps = {
  dish: Dish;
  variant?: "public" | "admin";
  className?: string;
  action?: React.ReactNode;
};

export function DishCard({ dish, variant = "public", className, action }: DishCardProps) {
  const { addItem } = useCartStore();

  if (variant === "admin") {
    return (
      <article
        className={cn(
          "flex items-center justify-between gap-4 rounded-2xl border border-[#D4A853]/20 bg-white p-4",
          className,
        )}
      >
        <div>
          <h3 className="font-display text-lg font-semibold text-[#2D2013]">{dish.name}</h3>
          <p className="text-sm text-[#8B7355] line-clamp-1">{dish.description}</p>
          <p className="mt-1 text-sm font-semibold text-[#C75D3A]">{formatPrice(dish.price)}</p>
        </div>
        {action}
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-[4/3] bg-gradient-to-br from-[#C75D3A]/20 to-[#D4A853]/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-[#C75D3A] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          {formatPrice(dish.price)}
        </div>
        {dish.imageUrl ? (
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <svg className="w-24 h-24 text-[#8B7355]/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-[#2D2013] mb-2">{dish.name}</h3>
        <p className="text-[#8B7355]">{dish.description}</p>
        <button 
          onClick={() => addItem(dish)}
          className="mt-4 w-full bg-[#2D2013] text-white py-3 rounded-full font-medium group-hover:bg-[#C75D3A] transition-colors"
        >
          Agregar al pedido
        </button>
      </div>
    </article>
  );
}
