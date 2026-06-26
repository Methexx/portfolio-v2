import { PreviewSelectedDayAccent } from "@/components/sections/hero/product-preview/product-preview-motion";
import { cn } from "@/lib/cn";
import {
  previewCalendarDays,
  previewCalendarWeekdays,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";

export function PreviewCalendar() {
  return <PreviewCalendarState selectedDay={null} />;
}

type PreviewCalendarStateProps = {
  selectedDay: string | null;
};

export function PreviewCalendarState({ selectedDay }: PreviewCalendarStateProps) {
  return (
    <div className="rounded-[1rem] border border-preview-border bg-white/[0.02] p-3">
      <div className="grid grid-cols-7 gap-1.5 text-center text-[0.56rem] font-medium uppercase tracking-[0.08em] text-white/34">
        {previewCalendarWeekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-7 gap-1.5 text-center text-[0.68rem] text-white/66">
        {previewCalendarDays.map((day, index) => (
          <PreviewSelectedDayAccent
            key={`${day.day}-${index}`}
            selected={selectedDay ? day.day === selectedDay : day.selected}
            className={cn(
              "flex h-6 items-center justify-center rounded-md",
              day.muted && "text-white/22",
              (selectedDay ? day.day === selectedDay : day.selected) &&
                "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
            )}
          >
            {day.day}
          </PreviewSelectedDayAccent>
        ))}
      </div>
    </div>
  );
}
