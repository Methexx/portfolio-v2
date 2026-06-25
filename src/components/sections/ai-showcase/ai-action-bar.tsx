import { aiActions, aiSecondaryActions } from "@/components/sections/ai-showcase/ai-showcase-data";

const actionGroups = [...aiActions, ...aiSecondaryActions];

export function AiActionBar() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actionGroups.map(({ label, shortcut, icon: Icon }) => (
        <div
          key={label}
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
      ))}
    </div>
  );
}
