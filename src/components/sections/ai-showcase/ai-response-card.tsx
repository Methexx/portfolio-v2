import { Sparkles } from "lucide-react";

import { aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";

const [responseLead, responseTail] = aiShowcaseCopy.responseText.split(
  aiShowcaseCopy.responseHighlight,
);

export function AiResponseCard() {
  return (
    <div className="rounded-[1.6rem] border border-ai-panel-border bg-[linear-gradient(180deg,rgba(52,37,71,0.74),rgba(33,23,46,0.96))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
      <div className="flex items-center gap-3 text-sm text-ai-panel-muted">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ai-panel-border bg-white/[0.03] text-ai-panel-accent">
          <Sparkles aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </div>
        <span className="font-medium text-white/82">{aiShowcaseCopy.responseLabel}</span>
      </div>
      <div className="mt-4 space-y-4 text-[0.98rem] leading-7 text-white/84 sm:text-[1.02rem]">
        <p>
          {responseLead}
          <span className="font-medium text-ai-panel-accent">
            {aiShowcaseCopy.responseHighlight}
          </span>
          {responseTail}
        </p>
      </div>
    </div>
  );
}
