import type { ReactNode } from "react";

import { connectedNotesFeatures } from "@/components/sections/connected-notes/connected-notes-data";
import { cn } from "@/lib/cn";

type ConnectedNotesFeaturesProps = {
  className?: string;
  itemsSlot?: ReactNode;
};

export function ConnectedNotesFeatures({
  className,
  itemsSlot,
}: ConnectedNotesFeaturesProps) {
  return (
    <div
      className={cn(
        "mt-10 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-border/70 pt-8 md:grid-cols-2 md:pt-10",
        className,
      )}
    >
      {itemsSlot ??
        connectedNotesFeatures.map(({ title, description, icon: Icon }) => (
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
