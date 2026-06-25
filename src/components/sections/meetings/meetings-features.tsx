import type { ReactNode } from "react";

import { meetingsFeatures } from "@/components/sections/meetings/meetings-data";

type MeetingsFeaturesProps = {
  itemsSlot?: ReactNode;
};

export function MeetingsFeatures({ itemsSlot }: MeetingsFeaturesProps) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-border/70 pt-8 md:grid-cols-2 md:pt-10">
      {itemsSlot ??
        meetingsFeatures.map(({ description, icon: Icon, title }) => (
          <div key={title} className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-primary/12 bg-primary/[0.045] text-primary">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.85} />
            </div>
            <div>
              <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.5rem]">
                {title}
              </h3>
              <p className="mt-3 max-w-[30rem] text-[0.98rem] leading-7 text-muted sm:text-[1.02rem]">
                {description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
