import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F3]/95 backdrop-blur-sm border-b border-[#D4A853]/20">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C75D3A] flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">G</span>
          </div>
          <span className="font-display text-2xl font-semibold text-[#2D2013]">Gladys</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-[#2D2013] hover:text-[#C75D3A] transition-colors font-medium">
            Inicio
          </a>
          <a href="#nosotros" className="text-[#2D2013] hover:text-[#C75D3A] transition-colors font-medium">
            Nosotros
          </a>
          <a href="#menu" className="text-[#2D2013] hover:text-[#C75D3A] transition-colors font-medium">
            Menú
          </a>
          <a href="#contacto" className="text-[#2D2013] hover:text-[#C75D3A] transition-colors font-medium">
            Contacto
          </a>
        </div>
        <a
          href="#menu"
          className="bg-[#C75D3A] text-white px-6 py-2 rounded-full font-medium hover:bg-[#A84D2E] transition-colors"
        >
          Hacer Pedido
        </a>
      </Container>
    </nav>
  );
}
