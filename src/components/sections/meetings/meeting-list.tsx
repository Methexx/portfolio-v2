import type { ReactNode } from "react";

import { agendaDateLabel, meetingItems, meetingsPanelLabels } from "@/components/sections/meetings/meetings-data";
import { MeetingListItem } from "@/components/sections/meetings/meeting-list-item";
import { cn } from "@/lib/cn";

type MeetingListProps = {
  className?: string;
  headerSlot?: ReactNode;
  itemsSlot?: ReactNode;
  timelineSlot?: ReactNode;
};

export function MeetingList({
  className,
  headerSlot,
  itemsSlot,
  timelineSlot,
}: MeetingListProps) {
  return (
    <div
      className={cn(
        "rounded-[1.7rem] border border-meetings-border bg-meetings-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] sm:px-5",
        className,
      )}
    >
      {headerSlot ?? (
        <div className="flex items-end justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted">
              {meetingsPanelLabels.agendaHeading}
            </p>
            <p className="mt-2 max-w-none text-[1.02rem] font-medium tracking-[-0.03em] text-foreground">
              {agendaDateLabel}
            </p>
          </div>
          <div className="rounded-full border border-primary/10 bg-primary/[0.05] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">
            5 scheduled
          </div>
        </div>
      )}

      <div className="relative mt-4 space-y-3 pl-4">
        {timelineSlot ?? <div className="absolute bottom-2 left-1.5 top-2 w-px bg-meetings-timeline" />}
        {itemsSlot ??
          meetingItems.map((item) => (
            <div key={item.id} className={item.mobileHidden ? "hidden sm:block" : undefined}>
              <MeetingListItem item={item} />
            </div>
          ))}
      </div>
    </div>
  );
}
