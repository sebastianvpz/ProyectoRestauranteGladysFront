import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dish } from "@/modules/dishes/domain";

export type CartItem = {
  dish: Dish;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (dish) => {
        set((state) => {
          const existing = state.items.find((item) => item.dish.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.dish.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { dish, quantity: 1 }] };
        });
      },
      removeItem: (dishId) => {
        set((state) => ({
          items: state.items.filter((item) => item.dish.id !== dishId),
        }));
      },
      updateQuantity: (dishId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.dish.id === dishId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.dish.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "gladys-cart-storage",
    }
  )
);
