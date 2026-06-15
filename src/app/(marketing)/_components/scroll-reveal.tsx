"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollReveal({ children, className = "", id }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const targetId = id ?? className.split(" ")[0] ?? "scroll-element";

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      id={targetId}
      className={cn("scroll-animate", isVisible && "visible", className)}
    >
      {children}
    </div>
  );
}
