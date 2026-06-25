import { cn } from "@/lib/cn";

import type { CalendarAccount } from "@/components/sections/meetings/meetings-data";

type CalendarAccountCardProps = {
  account: CalendarAccount;
  className?: string;
  statusClassName?: string;
};

export function CalendarAccountCard({
  account,
  className,
  statusClassName,
}: CalendarAccountCardProps) {
  const AccountIcon = account.icon;
  const StatusIcon = account.statusIcon;

  return (
    <div
      className={cn(
        "rounded-[1.35rem] border border-meetings-border bg-meetings-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-primary/10 bg-primary/[0.06] text-primary">
          <AccountIcon aria-hidden="true" className="size-4.5" strokeWidth={1.85} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="max-w-none text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {account.provider}
              </p>
              <p className="mt-1 max-w-none text-[1rem] font-medium tracking-[-0.03em] text-foreground">
                {account.label}
              </p>
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-white/70 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary",
                statusClassName,
              )}
            >
              <StatusIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
              <span>{account.status}</span>
            </div>
          </div>
          <p className="mt-3 max-w-none truncate text-[0.88rem] text-muted">{account.identifier}</p>
        </div>
      </div>
    </div>
  );
}
