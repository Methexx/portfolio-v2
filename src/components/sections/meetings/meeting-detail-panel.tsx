import type { ReactNode } from "react";

import { CalendarDays, Clock3 } from "lucide-react";

import {
  meetingsDetailBadges,
  meetingsPanelLabels,
  selectedMeetingDetail,
} from "@/components/sections/meetings/meetings-data";
import { MeetingNotesPanel } from "@/components/sections/meetings/meeting-notes-panel";
import { cn } from "@/lib/cn";

function ParticipantChip({ label, mobileHidden }: { label: string; mobileHidden?: boolean }) {
  return (
    <span
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(240,235,248,0.95))] text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-foreground shadow-[0_8px_16px_-14px_rgba(23,21,27,0.25)]",
        mobileHidden ? "hidden sm:inline-flex" : "",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

type MeetingDetailPanelProps = {
  className?: string;
  contentGridSlot?: ReactNode;
  metaSlot?: ReactNode;
  notesSlot?: ReactNode;
  participantsSlot?: ReactNode;
  statusSlot?: ReactNode;
  titleSlot?: ReactNode;
};

export function MeetingDetailPanel({
  className,
  contentGridSlot,
  metaSlot,
  notesSlot,
  participantsSlot,
  statusSlot,
  titleSlot,
}: MeetingDetailPanelProps) {
  const detail = selectedMeetingDetail;

  return (
    <div
      className={cn(
        "rounded-[1.9rem] border border-meetings-border bg-meetings-panel p-4 shadow-[0_24px_60px_-42px_rgba(36,21,47,0.24),inset_0_1px_0_rgba(255,255,255,0.68)] sm:p-5 lg:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/55 pb-5">
        <div className="max-w-[34rem]">
          {statusSlot ?? (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/[0.06] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{detail.status}</span>
            </div>
          )}
          {titleSlot ?? (
            <h3 className="mt-4 text-[1.85rem] font-medium tracking-[-0.05em] text-foreground sm:text-[2.15rem]">
              {detail.title}
            </h3>
          )}
          {metaSlot ?? (
            <div className="mt-4 flex flex-wrap gap-3 text-[0.92rem] text-muted">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/74 px-3 py-1.5">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" strokeWidth={1.9} />
                <span>{detail.dateLabel}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/74 px-3 py-1.5">
                <Clock3 aria-hidden="true" className="size-4 text-primary" strokeWidth={1.9} />
                <span>
                  {detail.time} {" · "} {detail.duration}
                </span>
              </div>
            </div>
          )}
        </div>

        {participantsSlot ?? (
          <div className="min-w-[12rem]">
            <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {meetingsPanelLabels.participantsHeading}
            </p>
            <div className="mt-3 flex items-center -space-x-2">
              {detail.participants.map((participant, index) => (
                <ParticipantChip key={participant} label={participant} mobileHidden={index > 1} />
              ))}
            </div>
          </div>
        )}
      </div>

      {contentGridSlot ?? (
        <div className="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-meetings-border bg-white/72 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5">
            <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {meetingsPanelLabels.purposeHeading}
            </p>
            <p className="mt-3 max-w-none text-[1rem] leading-7 text-foreground/84">
              {detail.purpose}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div>
                <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  Agenda
                </p>
                <div className="mt-3 space-y-3">
                  {detail.agenda.map((item) => (
                    <div key={item} className="flex gap-2.5 text-[0.94rem] leading-6 text-foreground/84">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                      <p className="max-w-none">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {meetingsPanelLabels.linkedContextHeading}
                </p>
                <div className="mt-3 space-y-2">
                  {detail.projectContext.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-[0.82rem] font-medium text-foreground/78"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-meetings-border bg-meetings-panel-muted px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5">
            <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Context snapshot
            </p>
            <div className="mt-4 space-y-3">
              {meetingsDetailBadges.map(({ icon: Icon, id, label }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-[1.15rem] border border-border/60 bg-white/72 px-3.5 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-primary/10 bg-primary/[0.06] text-primary">
                    <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.9} />
                  </div>
                  <p className="max-w-none text-[0.94rem] font-medium text-foreground/82">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {notesSlot ?? <MeetingNotesPanel detail={detail} />}
    </div>
  );
}
