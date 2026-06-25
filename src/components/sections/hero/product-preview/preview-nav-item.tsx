import {
  CircleCheck,
  FilePenLine,
  Files,
  Network,
} from "lucide-react";

import type { PreviewNavItem as PreviewNavItemType } from "@/components/sections/hero/product-preview/preview-placeholder-data";
import { cn } from "@/lib/cn";

const iconMap = {
  daily: FilePenLine,
  notes: Files,
  tasks: CircleCheck,
  map: Network,
} as const;

type PreviewNavItemProps = {
  item: PreviewNavItemType;
};

export function PreviewNavItem({ item }: PreviewNavItemProps) {
  const Icon = iconMap[item.icon];

  return (
    <div
      className={cn(
        "flex min-h-8 items-center gap-2.5 rounded-xl px-2.5 py-2 text-[0.7rem] font-medium tracking-[-0.01em]",
        item.active
          ? "bg-primary/14 text-primary"
          : "text-white/62",
      )}
    >
      <Icon size={13} strokeWidth={2} />
      <span className="truncate">{item.label}</span>
    </div>
  );
}
