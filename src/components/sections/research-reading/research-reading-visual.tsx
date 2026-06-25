import type { ReactNode } from "react";

import {
  deviceSyncItems,
  exportIndicators,
  recentCaptureActivity,
  researchReadingCopy,
  researchSources,
  researchStats,
} from "@/components/sections/research-reading/research-reading-data";
import { DeviceSyncRow } from "@/components/sections/research-reading/device-sync-row";
import { ReadingHighlightsPanel } from "@/components/sections/research-reading/reading-highlights-panel";
import { ResearchSourceCard } from "@/components/sections/research-reading/research-source-card";
import { cn } from "@/lib/cn";

type ResearchReadingVisualProps = {
  className?: string;
  exportPanelSlot?: ReactNode;
  readingPanelSlot?: ReactNode;
  recentPanelSlot?: ReactNode;
  sourceCardsSlot?: ReactNode;
  sourceHeadingSlot?: ReactNode;
  statsPanelSlot?: ReactNode;
  syncPanelSlot?: ReactNode;
};

export function ResearchReadingVisual({
  className,
  exportPanelSlot,
  readingPanelSlot,
  recentPanelSlot,
  sourceCardsSlot,
  sourceHeadingSlot,
  statsPanelSlot,
  syncPanelSlot,
}: ResearchReadingVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mt-14 overflow-hidden rounded-[2.25rem] border border-research-border bg-[radial-gradient(circle_at_top,rgba(143,108,255,0.12),transparent_30%),radial-gradient(circle_at_80%_24%,rgba(109,61,245,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(242,239,236,0.98))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:mt-16 sm:p-6",
        className,
      )}
    >
      <div className="relative grid gap-5 lg:grid-cols-[0.27fr_0.49fr_0.24fr]">
        <div className="order-2 space-y-4 lg:order-1">
          {sourceHeadingSlot ?? (
            <div className="rounded-[1.35rem] border border-research-border bg-research-panel-muted px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {researchReadingCopy.sourcesHeading}
              </h3>
            </div>
          )}
          {sourceCardsSlot ?? (
            <div className="space-y-3">
              {researchSources.map((source) => (
                <ResearchSourceCard key={source.id} source={source} />
              ))}
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2">{readingPanelSlot ?? <ReadingHighlightsPanel />}</div>

        <div className="order-3 space-y-4">
          {syncPanelSlot ?? (
            <div className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
              <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {researchReadingCopy.syncHeading}
              </h3>
              <div className="mt-4 space-y-3">
                {deviceSyncItems.map((item) => (
                  <DeviceSyncRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {statsPanelSlot ?? (
            <div className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
              <div className="grid grid-cols-1 gap-3">
                {researchStats.map((stat) => (
                  <div key={stat.id} className="rounded-[1rem] border border-border/65 bg-white/72 px-3.5 py-3">
                    <p className="max-w-none text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recentPanelSlot ?? (
            <div className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
              <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Recent capture activity
              </h3>
              <div className="mt-4 space-y-3">
                {recentCaptureActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/65 bg-white/72 px-3.5 py-3"
                  >
                    <span className="text-[0.92rem] font-medium text-foreground">
                      {activity.label}
                    </span>
                    <span className="text-[0.76rem] font-medium uppercase tracking-[0.12em] text-muted">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exportPanelSlot ?? (
            <div className="rounded-[1.5rem] border border-research-border bg-research-panel p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
              <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Export and access
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {exportIndicators.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full border border-primary/14 bg-primary/[0.05] px-3 py-1 text-[0.76rem] font-medium text-primary"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
