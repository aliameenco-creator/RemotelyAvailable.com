"use client";

import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { AutomationCard } from "@/components/automations/AutomationCard";
import {
  type Automation,
  type AutomationCategory,
  automationCategories,
  automationCategoryLabels,
} from "@/data/automations";
import { cn } from "@/lib/utils";

type FilterValue = "All" | AutomationCategory;

interface AutomationsGridProps {
  automations: Automation[];
}

export function AutomationsGrid({ automations }: AutomationsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filters: FilterValue[] = useMemo(
    () => ["All", ...automationCategories],
    []
  );

  const filtered =
    activeFilter === "All"
      ? automations
      : automations.filter((a) => a.category === activeFilter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter automations by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          const label =
            filter === "All" ? "All" : automationCategoryLabels[filter];
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-white/[0.12] bg-white/[0.08] text-text-primary"
                  : "border-[var(--border-subtle)] text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((automation, i) => (
          <ScrollReveal key={automation.slug} delay={i * 0.06}>
            <AutomationCard automation={automation} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
