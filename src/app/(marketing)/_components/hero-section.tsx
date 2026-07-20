import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { StarRating } from "./star-rating";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE3] to-[#E8D5C4]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C75D3A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4A853]/10 rounded-full blur-3xl" />

      <Container className="relative z-10 text-center" size="lg">
        <div className="animate-fade-in-up opacity-0 mb-6">
          <span className="inline-block bg-[#D4A853]/20 text-[#8B7355] px-4 py-2 rounded-full text-sm font-medium tracking-wider uppercase">
            Tradición Peruana desde 1998
          </span>
        </div>

        <h1 className="animate-fade-in-up opacity-0 animation-delay-100 font-display text-6xl md:text-8xl font-bold text-[#2D2013] mb-6 leading-tight">
          {siteConfig.name}
          <span className="block text-[#C75D3A]">{siteConfig.shortName}</span>
        </h1>

        <p className="animate-fade-in-up opacity-0 animation-delay-200 text-xl md:text-2xl text-[#8B7355] mb-10 max-w-2xl mx-auto leading-relaxed">
          {siteConfig.description}
        </p>

        <div className="animate-fade-in-up opacity-0 animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-[#C75D3A] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#A84D2E] transition-all hover:scale-105 shadow-lg shadow-[#C75D3A]/30"
          >
            Ver Menú
          </a>
        </div>

        <div className="animate-fade-in-up opacity-0 animation-delay-400 mt-16 flex items-center justify-center gap-2">
          <StarRating />
          <span className="text-[#8B7355] ml-2">+500 clientes satisfechos</span>
        </div>
      </Container>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
