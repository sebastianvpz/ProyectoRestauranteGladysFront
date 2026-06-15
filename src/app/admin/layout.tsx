import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { getAdminSession } from "./_lib/session";
import { LogoutButton } from "./_components/logout-button";
import { AdminNavLinks } from "./_components/nav-links";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#F5EDE3]">
      <header className="bg-[#2D2013] text-white">
        <Container size="lg" className="flex items-center justify-between py-3">
          <Link href="/admin" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#C75D3A]">
              G
            </span>
            {siteConfig.name} · Admin
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xs text-white/70 hover:text-white">
                Ver sitio
              </Link>
              <span className="text-sm text-white/80 hidden sm:inline">{session.email}</span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/admin/login" className="text-sm font-semibold text-white/90 hover:text-white">
              Iniciar sesión
            </Link>
          )}
        </Container>
      </header>

      {session ? (
        <Container size="lg" className="py-8">
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            <aside className="space-y-1">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
                Panel
              </p>
              <AdminNavLinks />
            </aside>
            <main className="min-w-0">{children}</main>
          </div>
        </Container>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
