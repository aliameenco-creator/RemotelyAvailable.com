import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
}

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 rounded-[var(--radius-pill)] shadow-lg shadow-primary-600/20 hover:shadow-primary-500/30",
  secondary:
    "bg-bg-card text-text-primary border border-bg-subtle hover:border-text-muted hover:bg-bg-elevated rounded-[var(--radius-button)]",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-[var(--radius-button)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  disabled = false,
  type = "button",
  className,
  icon,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {icon}
      {children}
    </button>
  );
}
