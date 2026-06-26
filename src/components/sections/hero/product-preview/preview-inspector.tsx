import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  History,
  Link2,
  Moon,
  Pin,
} from "lucide-react";

import { PreviewCalendarState } from "@/components/sections/hero/product-preview/preview-calendar";
import {
  PreviewInspectorGroups,
  PreviewInspectorItem,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import {
  previewActions,
  previewMeetings,
  type PreviewWorkspaceState,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";
import { cn } from "@/lib/cn";

const actionIcons = {
  pin: Pin,
  link: Link2,
  history: History,
} as const;

type PreviewInspectorProps = {
  state?: PreviewWorkspaceState;
};

export function PreviewInspector({ state }: PreviewInspectorProps) {
  return (
    <aside className="h-full min-h-0 flex-col bg-preview-inspector px-3 py-4 text-white/72 md:flex md:px-4 lg:px-5">
      <PreviewInspectorGroups className="flex h-full min-h-0 flex-col">
        <PreviewInspectorItem className="flex items-center justify-between">
          <div className="text-[0.78rem] font-medium tracking-[-0.02em] text-white/82">
          April 2023
          </div>
          <div className="flex items-center gap-1 text-white/42">
            <ChevronLeft size={13} />
            <CalendarDays size={13} />
            <ChevronRight size={13} />
          </div>
        </PreviewInspectorItem>

        <PreviewInspectorItem className="mt-3">
          <PreviewCalendarState selectedDay={state?.selectedDay ?? null} />
        </PreviewInspectorItem>

        <PreviewInspectorItem className="mt-5">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
          Note actions
          </div>
          <div className="mt-2.5 space-y-1.5">
            {previewActions.map((action) => {
              const Icon = actionIcons[action.icon];
              const isActive = state?.activeAction === action.icon;

              return (
                <div
                  key={action.label}
                  className={cn(
                    "flex min-h-8 items-center gap-2 rounded-xl px-2 py-1.5 text-[0.68rem] transition duration-300 ease-[var(--ease-standard)]",
                    isActive
                      ? "bg-primary/[0.12] text-white shadow-[0_18px_28px_-24px_rgba(109,61,245,0.54)]"
                      : "text-white/68",
                  )}
                >
                  <Icon size={13} className={isActive ? "text-primary-soft" : "text-white/36"} />
                  <span className="truncate">{action.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-[0.95rem] border border-primary/12 bg-primary/[0.06] px-2.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-primary-soft">
            {state?.actionLabel ?? "Linked project note saved"}
          </div>
        </PreviewInspectorItem>

        <PreviewInspectorItem className="mt-5">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
          Meetings
          </div>
          <div className="mt-2.5 space-y-1.5">
            {previewMeetings.map((meeting) => (
              <div
                key={meeting.title}
                className={cn(
                  "flex min-h-8 items-center gap-2 rounded-xl px-2 py-1.5 text-[0.67rem] transition duration-300 ease-[var(--ease-standard)]",
                  state?.activeMeeting === meeting.title && "bg-white/[0.05]",
                )}
              >
                <Clock3 size={12} className="shrink-0 text-white/30" />
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate",
                    state?.activeMeeting === meeting.title ? "text-white/88" : "text-white/72",
                  )}
                >
                  {meeting.title}
                </span>
                <span className="shrink-0 text-white/34">{meeting.time}</span>
              </div>
            ))}
          </div>
        </PreviewInspectorItem>

        <PreviewInspectorItem className="mt-auto flex justify-end pt-4 text-white/34">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-preview-border bg-white/[0.03]">
            <Moon size={13} />
          </div>
        </PreviewInspectorItem>
      </PreviewInspectorGroups>
    </aside>
  );
}
