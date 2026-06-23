import { Container } from "@/components/layout/container";
import { getDishes } from "@/modules/dishes/server";
import { DishGrid } from "@/modules/dishes/presentation/dish-grid";
import { ScrollReveal } from "./scroll-reveal";

export async function MenuSection() {
  const dishes = await getDishes();

  return (
    <section id="menu" className="relative py-32 px-6">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#2D2013] to-transparent" />
      <Container className="relative" size="lg">
        <ScrollReveal className="menu-header text-center mb-16" id="menu-header">
          <span className="text-[#C75D3A] text-sm font-medium tracking-wider uppercase">
            Nuestros Platos
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-[#2D2013] mt-4">
            Sabores del Perú
          </h2>
          <p className="text-[#8B7355] text-xl mt-4 max-w-2xl mx-auto">
            Descubre nuestra selección de platos tradicionales peruanos, preparados con recetas
            secretas heredadas de generación en generación
          </p>
        </ScrollReveal>

        <DishGrid
          dishes={dishes}
          emptyMessage="Pronto publicaremos nuestro menú. ¡Vuelve pronto!"
        />
      </Container>
    </section>
  );
}
