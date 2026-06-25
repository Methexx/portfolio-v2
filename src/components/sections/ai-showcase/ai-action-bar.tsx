import type { AiAction } from "@/components/sections/ai-showcase/ai-showcase-data";

import { aiActions, aiSecondaryActions } from "@/components/sections/ai-showcase/ai-showcase-data";
import { cn } from "@/lib/cn";

const actionGroups = [...aiActions, ...aiSecondaryActions];

type AiActionBarProps = {
  actions?: readonly AiAction[];
  interactive?: boolean;
  enabled?: boolean;
  activeActionId?: AiAction["id"] | null;
  feedbackLabels?: Partial<Record<AiAction["id"], string>>;
  disabledActions?: Partial<Record<AiAction["id"], boolean>>;
  onAction?: (id: AiAction["id"]) => void;
};

export function AiActionBar({
  actions = actionGroups,
  interactive = false,
  enabled = true,
  activeActionId = null,
  feedbackLabels,
  disabledActions,
  onAction,
}: AiActionBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actions.map(({ id, label, shortcut, icon: Icon }) => {
        const buttonLabel = feedbackLabels?.[id] ?? label;
        const disabled = !enabled || disabledActions?.[id] === true;
        const isActive = activeActionId === id;

        return interactive ? (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => onAction?.(id)}
            className={cn(
              "flex min-h-12 items-center justify-between gap-3 rounded-[1rem] border border-ai-panel-border bg-white/[0.025] px-4 py-3 text-sm text-ai-panel-muted transition duration-200 ease-[var(--ease-standard)]",
              enabled && !disabled
                ? "text-white/82 hover:border-primary/18 hover:bg-white/[0.04]"
                : "opacity-55",
              isActive && enabled && !disabled && "border-primary/22 bg-primary/[0.12] shadow-[0_18px_36px_-26px_rgba(109,61,245,0.42)]",
            )}
          >
            <div className="flex items-center gap-2.5">
              <Icon aria-hidden="true" className={cn("size-4 text-white/68", isActive && "text-primary-soft")} strokeWidth={1.8} />
              <span className="min-w-[4.8rem] text-left font-medium">{buttonLabel}</span>
            </div>
            <span className={cn("rounded-full border border-white/8 px-2 py-0.5 text-[0.72rem] text-ai-panel-muted", isActive && "border-primary/20 text-primary-soft")}>
              {shortcut}
            </span>
          </button>
        ) : (
          <div
            key={id}
            className="flex items-center justify-between gap-3 rounded-[1rem] border border-ai-panel-border bg-white/[0.025] px-4 py-3 text-sm text-ai-panel-muted"
          >
            <div className="flex items-center gap-2.5">
              <Icon aria-hidden="true" className="size-4 text-white/68" strokeWidth={1.8} />
              <span className="font-medium text-white/84">{label}</span>
            </div>
            <span className="rounded-full border border-white/8 px-2 py-0.5 text-[0.72rem] text-ai-panel-muted">
              {shortcut}
            </span>
          </div>
        );
      })}
    </div>
  );
}
