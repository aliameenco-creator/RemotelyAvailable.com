import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

// The Remotely Available signature: a Georgia italic accent word in lavender
// inside an otherwise plain serif title, e.g. "Results, not retainers."
export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn("font-display italic text-accent-500", className)}
    >
      {children}
    </span>
  );
}
