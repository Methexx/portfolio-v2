import { cn } from "@/lib/cn";

import type { MeetingItem } from "@/components/sections/meetings/meetings-data";

type MeetingListItemProps = {
  className?: string;
  item: MeetingItem;
};

export function MeetingListItem({ className, item }: MeetingListItemProps) {
  return (
    <div
      className={cn(
        "relative rounded-[1.35rem] border border-transparent bg-white/58 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
        item.selected && "border-primary/16 bg-meetings-selected shadow-[0_16px_32px_-24px_rgba(109,61,245,0.35),inset_0_1px_0_rgba(255,255,255,0.7)]",
        className,
      )}
    >
      <div className="absolute bottom-3 left-0 top-3 w-px bg-meetings-timeline" />
      <div className="absolute left-[-0.34rem] top-[1.4rem] h-2.5 w-2.5 rounded-full border border-primary/18 bg-white" />

      <div className="pl-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {item.time}
            </p>
            <h3 className="mt-1 text-[1.02rem] font-medium tracking-[-0.04em] text-foreground">
              {item.title}
            </h3>
          </div>
          <span className="rounded-full border border-border/70 bg-white/78 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">
            {item.duration}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-primary/10 bg-primary/[0.05] px-2.5 py-1 text-[0.72rem] font-medium text-foreground/82">
            {item.category}
          </span>
          {item.participantLabel ? (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-border/70 bg-white/82 px-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {item.participantLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
