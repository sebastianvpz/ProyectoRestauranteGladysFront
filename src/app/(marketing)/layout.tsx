import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className="relative overflow-hidden">{children}</div>;
}
