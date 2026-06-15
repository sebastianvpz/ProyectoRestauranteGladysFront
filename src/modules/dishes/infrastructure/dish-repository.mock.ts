import type { Dish, DishDraft, DishUpdate } from "../domain";

const STORE: Dish[] = [
  {
    id: "1",
    name: "Ceviche Clásico",
    description: "Pescado fresco marinado en limón, cebolla morada, ají y cilantro",
    price: 35,
    category: "principal",
    available: true,
    featured: true,
    imageUrl: "",
  },
  {
    id: "2",
    name: "Lomo Saltado",
    description: "Tiras de res salteadas con cebolla, tomate y papas fritas",
    price: 38,
    category: "principal",
    available: true,
    featured: true,
    imageUrl: "",
  },
  {
    id: "3",
    name: "Ají de Gallina",
    description: "Pollo deshilachado en salsa de ají amarillo con nueces y pan",
    price: 32,
    category: "principal",
    available: true,
    featured: true,
    imageUrl: "",
  },
  {
    id: "4",
    name: "Causa Limeña",
    description: "Puré de papa amarilla con pollo, aceitunas y huevo duro",
    price: 28,
    category: "entrada",
    available: true,
    featured: true,
    imageUrl: "",
  },
  {
    id: "5",
    name: "Anticuchos",
    description: "Corazón de res a la parrilla con salsa de ají panca",
    price: 25,
    category: "entrada",
    available: true,
    featured: true,
    imageUrl: "",
  },
  {
    id: "6",
    name: "Arroz con Mariscos",
    description: "Arroz cocido con langostinos, calamares y conchas",
    price: 42,
    category: "principal",
    available: true,
    featured: true,
    imageUrl: "",
  },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const mockDishRepository = {
  async findAll(): Promise<Dish[]> {
    return clone(STORE);
  },

  async findById(id: string): Promise<Dish | null> {
    const found = STORE.find((d) => d.id === id);
    return found ? clone(found) : null;
  },

  async create(draft: DishDraft): Promise<Dish> {
    const dish: Dish = {
      ...draft,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    STORE.push(dish);
    return clone(dish);
  },

  async update(id: string, patch: DishUpdate): Promise<Dish> {
    const index = STORE.findIndex((d) => d.id === id);
    if (index === -1) throw new Error("Dish not found");
    const updated: Dish = {
      ...STORE[index],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    STORE[index] = updated;
    return clone(updated);
  },

  async delete(id: string): Promise<void> {
    const index = STORE.findIndex((d) => d.id === id);
    if (index === -1) return;
    STORE.splice(index, 1);
  },
};
