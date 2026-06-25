import type { ReactNode } from "react";

import { Sparkles } from "lucide-react";

import { aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";
import { cn } from "@/lib/cn";

const [responseLead, responseTail] = aiShowcaseCopy.responseText.split(
  aiShowcaseCopy.responseHighlight,
);

type AiResponseCardProps = {
  displayedResponse?: string;
  statusSlot?: ReactNode;
  active?: boolean;
  fullResponseAriaText?: string;
};

export function AiResponseCard({
  displayedResponse,
  statusSlot,
  active = false,
  fullResponseAriaText = aiShowcaseCopy.responseText,
}: AiResponseCardProps) {
  const visualResponse = displayedResponse ?? aiShowcaseCopy.responseText;
  const hasFullHighlight = visualResponse.includes(aiShowcaseCopy.responseHighlight);
  const visualParts = hasFullHighlight
    ? visualResponse.split(aiShowcaseCopy.responseHighlight)
    : [visualResponse];

  return (
    <div
      className={cn(
        "rounded-[1.6rem] border border-ai-panel-border bg-[linear-gradient(180deg,rgba(52,37,71,0.74),rgba(33,23,46,0.96))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 ease-[var(--ease-standard)] sm:p-6",
        active && "border-primary/18 bg-[linear-gradient(180deg,rgba(58,41,79,0.78),rgba(36,24,51,0.98))]",
      )}
    >
      <div className="flex items-center gap-3 text-sm text-ai-panel-muted">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ai-panel-border bg-white/[0.03] text-ai-panel-accent">
          <Sparkles aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </div>
        <span className="font-medium text-white/82">{aiShowcaseCopy.responseLabel}</span>
        {statusSlot}
      </div>
      <div className="sr-only">{fullResponseAriaText}</div>
      <div
        aria-hidden="true"
        className="mt-4 min-h-[12rem] space-y-4 text-[0.98rem] leading-7 text-white/84 sm:min-h-[10.5rem] sm:text-[1.02rem]"
      >
        <p>
          {hasFullHighlight && visualParts.length > 1 ? (
            <>
              {visualParts[0]}
              <span className="font-medium text-ai-panel-accent">
                {aiShowcaseCopy.responseHighlight}
              </span>
              {visualParts[1]}
            </>
          ) : visualResponse.includes(responseLead) ? (
            <>
              {responseLead}
              <span className="font-medium text-ai-panel-accent">
                {aiShowcaseCopy.responseHighlight}
              </span>
              {responseTail}
            </>
          ) : (
            visualResponse
          )}
        </p>
      </div>
    </div>
  );
}
