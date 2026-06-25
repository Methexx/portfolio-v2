import type { ReactNode } from "react";

import { aiPromptIcon, aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";
import { cn } from "@/lib/cn";

const PromptIcon = aiPromptIcon;

type AiPromptCardProps = {
  active?: boolean;
  processing?: boolean;
  statusSlot?: ReactNode;
};

export function AiPromptCard({
  active = false,
  processing = false,
  statusSlot,
}: AiPromptCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-ai-panel-border bg-ai-panel-surface/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 ease-[var(--ease-standard)] sm:p-5",
        active && "border-primary/28 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_36px_-28px_rgba(109,61,245,0.35)]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-ai-panel-border bg-white/[0.04] text-ai-panel-accent transition duration-300 ease-[var(--ease-standard)]",
            active && "border-primary/24 bg-primary/10 text-primary-bright",
            processing && "scale-[1.02]",
          )}
        >
          <PromptIcon aria-hidden="true" className="size-[1.05rem]" strokeWidth={1.85} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "rounded-[1rem] border border-ai-panel-border bg-white/[0.03] px-4 py-3 text-sm text-ai-panel-muted transition duration-300 ease-[var(--ease-standard)]",
              active && "border-primary/18 bg-white/[0.05] text-white/72",
            )}
          >
            {aiShowcaseCopy.promptPlaceholder}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span
              className={cn(
                "rounded-full border border-ai-panel-border bg-white/[0.035] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ai-panel-muted transition duration-300 ease-[var(--ease-standard)]",
                active && "border-primary/18 bg-primary/10 text-ai-panel-accent",
              )}
            >
              {aiShowcaseCopy.customActionLabel}
            </span>
            <span
              className={cn(
                "text-[0.95rem] text-white/76 transition duration-300 ease-[var(--ease-standard)]",
                active && "text-white/92",
              )}
            >
              {aiShowcaseCopy.customActionText}
            </span>
            <span
              className={cn(
                "rounded-full border border-primary/18 bg-primary/10 px-2.5 py-1 text-[0.76rem] font-medium text-ai-panel-accent transition duration-300 ease-[var(--ease-standard)]",
                active && "border-primary/28 bg-primary/14 text-primary-soft",
              )}
            >
              {aiShowcaseCopy.customActionShortcut}
            </span>
            {statusSlot}
          </div>
        </div>
      </div>
    </div>
  );
}
