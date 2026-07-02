import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Badge } from "@/components/ui/Badge";
import {
  type Automation,
  automationCategoryLabels,
  automationCategoryTones,
} from "@/data/automations";

interface AutomationCardProps {
  automation: Automation;
}

export function AutomationCard({ automation }: AutomationCardProps) {
  const {
    slug,
    name,
    category,
    description,
    highlight,
    techStack,
    status,
    useCase,
    imageUrl,
  } = automation;

  return (
    <Link href={`/automations/${slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4">
        {imageUrl && (
          <div className="relative -mx-6 -mt-6 mb-1 h-40 overflow-hidden rounded-t-[var(--radius-card)]">
            <Image
              src={imageUrl}
              alt={`${name} interface preview`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <Pill tone={automationCategoryTones[category]}>
            {automationCategoryLabels[category]}
          </Pill>
          {status === "built" ? (
            <Pill tone="success" dot>
              Built
            </Pill>
          ) : (
            <Pill tone="neutral" style={{ background: "transparent" }}>
              In Progress
            </Pill>
          )}
        </div>

        <h3 className="font-display text-xl leading-snug text-text-primary">
          {name}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>

        <div className="flex items-start gap-2 rounded-lg border border-primary-600/20 bg-primary-600/10 p-3">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-primary-400" aria-hidden="true" />
          <p className="text-sm font-medium text-primary-400">{highlight}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <Badge key={tech} className="px-2 py-0.5 text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-auto border-t border-[var(--ra-cream-08)] pt-4">
          <p className="text-xs text-text-muted">{useCase}</p>
        </div>
      </Card>
    </Link>
  );
}
