import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

const variants = {
  default: "border-bg-subtle bg-bg-surface text-text-secondary",
  primary: "border-primary-600/30 bg-primary-600/10 text-primary-400",
  accent: "border-accent-600/30 bg-accent-600/10 text-accent-400",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
