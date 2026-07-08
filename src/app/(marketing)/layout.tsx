import type { ReactNode } from "react";
import { CartDrawer } from "./_components/cart-drawer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <CartDrawer />
    </div>
  );
}
