import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export function Card({ children, className, hover = true, glow = false, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-[var(--radius-card)] p-6 bg-bg-card border border-[var(--border-subtle)] shadow-[var(--shadow-md)]",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-copper)]",
        glow && "border-[var(--border-copper)] shadow-[var(--glow-copper)]",
        className
      )}
    >
      {children}
    </div>
  );
}
