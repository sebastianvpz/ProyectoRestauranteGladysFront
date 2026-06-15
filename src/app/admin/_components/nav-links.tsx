"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const ITEMS = [
  { href: "/admin", label: "Resumen", exact: true },
  { href: "/admin/platos", label: "Platos" },
  { href: "/admin/pedidos", label: "Pedidos" },
];

export function AdminNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {ITEMS.map((item) => {
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
