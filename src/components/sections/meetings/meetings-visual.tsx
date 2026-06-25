import { calendarAccounts, meetingsPanelLabels, meetingsStats } from "@/components/sections/meetings/meetings-data";
import { CalendarAccountCard } from "@/components/sections/meetings/calendar-account-card";
import { MeetingDetailPanel } from "@/components/sections/meetings/meeting-detail-panel";
import { MeetingList } from "@/components/sections/meetings/meeting-list";

export function MeetingsVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-14 overflow-hidden rounded-[2.6rem] border border-meetings-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.13),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(241,236,246,0.96))] p-4 shadow-[0_32px_80px_-52px_rgba(36,21,47,0.22),inset_0_1px_0_rgba(255,255,255,0.78)] sm:mt-16 sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35" />

      <div className="relative grid gap-4 lg:min-h-[41rem] lg:grid-cols-[0.24fr_0.3fr_0.46fr]">
        <div className="order-3 rounded-[1.9rem] border border-meetings-border bg-white/50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] lg:order-1">
          <div className="rounded-[1.45rem] border border-border/60 bg-white/68 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
            <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted">
              {meetingsPanelLabels.accountsHeading}
            </p>
          </div>

          <div className="mt-3 space-y-3">
            {calendarAccounts.map((account) => (
              <CalendarAccountCard
                key={account.id}
                account={account}
                className={account.mobileHidden ? "hidden sm:block" : undefined}
              />
            ))}
          </div>

          <div className="mt-3 rounded-[1.45rem] border border-meetings-border bg-meetings-panel-muted px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]">
            <p className="max-w-none text-[0.9rem] font-medium tracking-[-0.03em] text-foreground">
              {meetingsStats.connectedCalendars}
            </p>
            <p className="mt-2 max-w-none text-[0.85rem] text-muted">{meetingsStats.lastSync}</p>
          </div>
        </div>

        <div className="order-2 rounded-[1.9rem] border border-meetings-border bg-white/48 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] lg:order-2">
          <MeetingList />
        </div>

        <div className="order-1 rounded-[1.9rem] border border-meetings-border bg-white/44 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] lg:order-3">
          <MeetingDetailPanel />
        </div>
      </div>
    </div>
  );
}
