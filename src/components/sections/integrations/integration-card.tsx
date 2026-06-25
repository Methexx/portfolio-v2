import { cn } from "@/lib/cn";

import type { IntegrationItem } from "@/components/sections/integrations/integrations-data";
import { IntegrationIconTile } from "@/components/sections/integrations/integration-icon-tile";

type IntegrationCardProps = {
  className?: string;
  item: IntegrationItem;
  muted?: boolean;
};

export function IntegrationCard({
  className,
  item,
  muted = false,
}: IntegrationCardProps) {
  return (
    <article
      className={cn(
        "rounded-[1.5rem] border px-4 py-4 shadow-[0_18px_44px_-36px_rgba(36,21,47,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] sm:px-5 sm:py-5",
        muted
          ? "border-integrations-border/70 bg-integrations-card-muted"
          : "border-integrations-border bg-integrations-card",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <IntegrationIconTile icon={item.icon} muted={muted} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                muted
                  ? "border-border/70 bg-white/78 text-muted"
                  : "border-primary/10 bg-primary/[0.05] text-primary",
              )}
            >
              {item.category}
            </span>
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted">
              {item.status}
            </span>
          </div>
          <h3 className="mt-3 text-[1.08rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.18rem]">
            {item.title}
          </h3>
          <p className="mt-2 max-w-none text-[0.94rem] leading-6 text-muted">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}
