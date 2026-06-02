import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  animation?: 1 | 2;
}

const colors = {
  primary: "bg-primary-600/15",
  accent: "bg-accent-600/15",
};

const sizes = {
  sm: "h-48 w-48",
  md: "h-72 w-72",
  lg: "h-96 w-96",
};

export function GradientOrb({
  className,
  color = "primary",
  size = "lg",
  animation = 1,
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-[100px]",
        colors[color],
        sizes[size],
        animation === 1 ? "animate-orb-1" : "animate-orb-2",
        className
      )}
      aria-hidden="true"
    />
  );
}
