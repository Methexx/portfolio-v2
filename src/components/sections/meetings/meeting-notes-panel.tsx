import { Check, Dot } from "lucide-react";

import type { MeetingDetail } from "@/components/sections/meetings/meetings-data";

type MeetingNotesPanelProps = {
  detail: MeetingDetail;
};

function NotesColumn({
  items,
  title,
}: {
  items: readonly string[];
  title: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-meetings-border bg-white/72 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]">
      <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
        {title}
      </p>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5 text-[0.92rem] leading-6 text-foreground/84">
            {title === "Action items" ? (
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2} />
            ) : (
              <Dot aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary/80" />
            )}
            <p className="max-w-none">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MeetingNotesPanel({ detail }: MeetingNotesPanelProps) {
  return (
    <div className="mt-4 rounded-[1.7rem] border border-meetings-border bg-meetings-panel-muted p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] sm:p-5">
      <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted">
        Meeting notes
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <NotesColumn items={detail.preparation} title="Preparation" />
        <NotesColumn items={detail.decisions} title="Decisions" />
        <NotesColumn items={detail.actions} title="Action items" />
      </div>
    </div>
  );
}
