import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <Container className="text-center">
        <p className="font-display text-7xl font-bold text-[#C75D3A]">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-[#2D2013]">
          Página no encontrada
        </h1>
        <p className="mt-2 text-[#8B7355]">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-[#C75D3A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#A84D2E] transition-colors"
        >
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
