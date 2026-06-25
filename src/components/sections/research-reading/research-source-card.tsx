import type { ResearchSource } from "@/components/sections/research-reading/research-reading-data";
import { cn } from "@/lib/cn";

type ResearchSourceCardProps = {
  className?: string;
  source: ResearchSource;
};

export function ResearchSourceCard({ className, source }: ResearchSourceCardProps) {
  const Icon = source.icon;

  return (
    <div
      className={cn(
        "rounded-[1.2rem] border border-research-border bg-research-panel px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
        source.mobileHidden && "hidden sm:block",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary/[0.045] text-primary">
          <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.85} />
        </div>
        <div className="min-w-0">
          <p className="max-w-none text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
            {source.type}
          </p>
          <p className="mt-1 max-w-none text-[0.96rem] font-medium leading-6 tracking-[-0.03em] text-foreground">
            {source.title}
          </p>
          {source.tag ? (
            <span className="mt-3 inline-flex rounded-full border border-primary/14 bg-primary/[0.05] px-2.5 py-1 text-[0.72rem] font-medium text-primary">
              {source.tag}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
