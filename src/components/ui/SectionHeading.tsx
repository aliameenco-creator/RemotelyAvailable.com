import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <span className="ra-eyebrow mb-4 block">
          {"// "}
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl tracking-[-0.02em] text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
