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

import { PreviewCalendar } from "@/components/sections/hero/product-preview/preview-calendar";
import {
  PreviewInspectorGroups,
  PreviewInspectorItem,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import {
  previewActions,
  previewMeetings,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";

const actionIcons = {
  pin: Pin,
  link: Link2,
  history: History,
} as const;

export function PreviewInspector() {
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
          <PreviewCalendar />
        </PreviewInspectorItem>

        <PreviewInspectorItem className="mt-5">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
          Note actions
          </div>
          <div className="mt-2.5 space-y-1.5">
            {previewActions.map((action) => {
              const Icon = actionIcons[action.icon];

              return (
                <div
                  key={action.label}
                  className="flex min-h-8 items-center gap-2 rounded-xl px-2 py-1.5 text-[0.68rem] text-white/68"
                >
                  <Icon size={13} className="text-white/36" />
                  <span className="truncate">{action.label}</span>
                </div>
              );
            })}
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
                className="flex min-h-8 items-center gap-2 rounded-xl px-2 py-1.5 text-[0.67rem]"
              >
                <Clock3 size={12} className="shrink-0 text-white/30" />
                <span className="min-w-0 flex-1 truncate text-white/72">
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
