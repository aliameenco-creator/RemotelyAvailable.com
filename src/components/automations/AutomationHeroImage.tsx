import Image from "next/image";
import { Workflow } from "lucide-react";

interface AutomationHeroImageProps {
  name: string;
  imageUrl?: string;
}

export function AutomationHeroImage({ name, imageUrl }: AutomationHeroImageProps) {
  if (imageUrl) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.1] bg-bg-card">
        <Image
          src={imageUrl}
          alt={`${name} interface preview`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 800px, 100vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.1] bg-bg-card"
      role="img"
      aria-label={`${name} preview placeholder — no screenshot added yet`}
    >
      <div className="ra-surface-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent" />
      <div className="relative flex flex-col items-center gap-3 text-text-faint">
        <Workflow size={36} aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em]">
          Preview coming soon
        </span>
      </div>
    </div>
  );
}
