"use client";

import {
  Workflow,
  Globe,
  Phone,
  MessageSquareText,
  Lightbulb,
  FileText,
  Code2,
  Megaphone,
  Palette,
  Search,
} from "lucide-react";
import type { ServiceIconName } from "@/data/services";

const iconMap: Record<ServiceIconName, typeof Workflow> = {
  workflow: Workflow,
  globe: Globe,
  phone: Phone,
  "message-square-text": MessageSquareText,
  lightbulb: Lightbulb,
  "file-text": FileText,
  code: Code2,
  megaphone: Megaphone,
  palette: Palette,
  search: Search,
};

interface ServiceIconProps {
  name: ServiceIconName;
  size?: number;
  className?: string;
}

export function ServiceIcon({ name, size = 24, className }: ServiceIconProps) {
  const Icon = iconMap[name];
  return <Icon size={size} className={className} />;
}
