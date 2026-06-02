import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-[var(--radius-card)] p-6",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/[0.14]",
        glow && "hover:shadow-lg hover:shadow-primary-600/10",
        className
      )}
    >
      {children}
    </div>
  );
}
