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
    "bg-primary-600 text-[#1a1a1a] hover:bg-primary-400 active:bg-primary-700",
  secondary:
    "bg-transparent text-text-primary border border-[var(--border-strong)] hover:border-primary-600 hover:bg-[var(--ra-cream-08)]",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-[var(--ra-cream-08)]",
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
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-[var(--radius-pill)] cursor-pointer",
    "transition-[background,border-color,transform] duration-[120ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    "active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
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
