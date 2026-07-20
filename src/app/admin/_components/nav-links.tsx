"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const ITEMS = [
  { href: "/admin", label: "Resumen", exact: true, roles: ["ADMIN", "Administrador"] },
  { href: "/admin/platos", label: "Platos", roles: ["ADMIN", "Administrador"] },
  { href: "/admin/categorias", label: "Categorías", roles: ["ADMIN", "Administrador"] },
  { href: "/admin/pedidos", label: "Pedidos", roles: ["ADMIN", "Administrador", "Empleado", "EMPLEADO"] },
  { href: "/admin/clientes", label: "Clientes", roles: ["ADMIN", "Administrador"] },
  { href: "/admin/cocina", label: "Cocina", roles: ["ADMIN", "Administrador", "Cocinero", "COCINERO"] },
  { href: "/admin/comprobantes", label: "Comprobantes", roles: ["ADMIN", "Administrador"] },
  { href: "/admin/configuracion", label: "Configuración", roles: ["ADMIN", "Administrador"] },
];

export function AdminNavLinks({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {ITEMS.filter(item => item.roles.includes(userRole)).map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#C75D3A] text-white"
                : "text-[#2D2013] hover:bg-[#2D2013]/5",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
