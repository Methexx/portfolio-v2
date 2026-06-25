import type { Feature } from "@/components/sections/features/feature-data";
import { FeatureItem } from "@/components/sections/features/feature-item";
import { cn } from "@/lib/cn";

type FeatureGridProps = {
  items: readonly Feature[];
  className?: string;
};

export function FeatureGrid({ items, className }: FeatureGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-8",
        className,
      )}
      role="list"
    >
      {items.map((item) => (
        <li key={item.title}>
          <FeatureItem {...item} />
        </li>
      ))}
    </ul>
  );
}
