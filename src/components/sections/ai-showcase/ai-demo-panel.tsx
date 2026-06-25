import type { ReactNode } from "react";

import { aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";
import { AiActionBar } from "@/components/sections/ai-showcase/ai-action-bar";
import { AiPromptCard } from "@/components/sections/ai-showcase/ai-prompt-card";
import { AiResponseCard } from "@/components/sections/ai-showcase/ai-response-card";

type AiDemoPanelProps = {
  headerSlot?: ReactNode;
  promptCard?: ReactNode;
  responseCard?: ReactNode;
  actionBar?: ReactNode;
  className?: string;
};

export function AiDemoPanel({
  headerSlot,
  promptCard,
  responseCard,
  actionBar,
  className,
}: AiDemoPanelProps) {
  return (
    <div
      className={className ?? "relative overflow-hidden rounded-[2rem] border border-ai-panel-border bg-[radial-gradient(circle_at_top,rgba(151,115,255,0.18),transparent_30%),radial-gradient(circle_at_80%_28%,rgba(116,74,255,0.15),transparent_24%),linear-gradient(180deg,rgba(40,27,56,0.96),rgba(25,18,36,0.99))] p-5 shadow-[0_42px_80px_-48px_rgba(39,20,50,0.55)] sm:p-7 lg:p-8"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-0 h-28 rounded-full bg-primary/12 blur-3xl" />
      <div className="relative min-h-[34rem] lg:min-h-[36rem]">
        {headerSlot ?? (
          <div className="max-w-[42rem]">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ai-panel-accent">
              {aiShowcaseCopy.promptContextLabel}
            </p>
            <h3 className="mt-3 text-[1.6rem] font-medium tracking-[-0.045em] text-white sm:text-[1.95rem] lg:text-[2.15rem]">
              {aiShowcaseCopy.promptHeading}
            </h3>
            <div className="mt-4 space-y-2 text-[0.98rem] leading-7 text-ai-panel-muted">
              {aiShowcaseCopy.promptSupportingLines.map((line) => (
                <p key={line} className="max-w-[40rem]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="mt-7 h-px w-full bg-white/8" />
        <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
          {promptCard ?? <AiPromptCard />}
          {responseCard ?? <AiResponseCard />}
        </div>
        <div className="mt-5">
          {actionBar ?? <AiActionBar />}
        </div>
      </div>
    </div>
  );
}
