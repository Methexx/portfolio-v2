import { aiPromptIcon, aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";

const PromptIcon = aiPromptIcon;

export function AiPromptCard() {
  return (
    <div className="rounded-[1.5rem] border border-ai-panel-border bg-ai-panel-surface/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-ai-panel-border bg-white/[0.04] text-ai-panel-accent">
          <PromptIcon aria-hidden="true" className="size-[1.05rem]" strokeWidth={1.85} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="rounded-[1rem] border border-ai-panel-border bg-white/[0.03] px-4 py-3 text-sm text-ai-panel-muted">
            {aiShowcaseCopy.promptPlaceholder}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-ai-panel-border bg-white/[0.035] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ai-panel-muted">
              {aiShowcaseCopy.customActionLabel}
            </span>
            <span className="text-[0.95rem] text-white/88">
              {aiShowcaseCopy.customActionText}
            </span>
            <span className="rounded-full border border-primary/18 bg-primary/10 px-2.5 py-1 text-[0.76rem] font-medium text-ai-panel-accent">
              {aiShowcaseCopy.customActionShortcut}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
