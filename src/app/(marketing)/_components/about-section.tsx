import { Container } from "@/components/layout/container";
import { DecorativePattern } from "./decorative-pattern";
import { ScrollReveal } from "./scroll-reveal";

export function AboutSection() {
  return (
    <section id="nosotros" className="relative py-32 px-6 bg-[#2D2013]">
      <div className="absolute inset-0 opacity-5">
        <DecorativePattern />
      </div>
      <Container className="relative" size="lg">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="nosotros-text" id="nosotros-text">
            <span className="text-[#D4A853] text-sm font-medium tracking-wider uppercase">
              Nuestra Historia
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#FDF8F3] mt-4 mb-6">
              Una tradición familiar
            </h2>
            <p className="text-[#C4B5A5] text-lg leading-relaxed mb-6">
              Durante más de 25 años, el Restaurante Gladys ha sido un referente de la cocina
              peruana en nuestra ciudad. Fundado por doña Gladys, cada plato que sale de nuestra
              cocina lleva el mismo amor y dedicación que ella puso desde el primer día.
            </p>
            <p className="text-[#C4B5A5] text-lg leading-relaxed mb-8">
              Nuestra misión es simple: ofrecer comida peruana auténtica preparada con los
              ingredientes más frescos y las técnicas tradicionales que hacen de cada plato una
              experiencia única.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="font-display text-5xl font-bold text-[#D4A853]">25+</span>
                <p className="text-[#C4B5A5] mt-2">Años de experiencia</p>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-[#D4A853]">50+</span>
                <p className="text-[#C4B5A5] mt-2">Platos tradicionales</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="nosotros-image" id="nosotros-image">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C75D3A] to-[#D4A853] rounded-3xl transform rotate-3" />
              <div className="relative bg-[#3D3023] rounded-3xl aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://media.istockphoto.com/id/500674888/es/foto/senior-mujer-hornear.jpg?s=612x612&w=0&k=20&c=OREFQF0uvppKeQOs8h_2jfO7OmGoPkVOZ2RYfzBjOng="
                  alt="Gladys Huamaní"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2013] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-3xl text-[#FDF8F3] italic">
                    &quot;La comida es el lenguaje del amor&quot;
                  </p>
                  <p className="text-[#D4A853] mt-4">— Gladys Huamaní, Fundadora</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
