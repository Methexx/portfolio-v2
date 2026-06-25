import type { Feature } from "@/components/sections/features/feature-data";
import { cn } from "@/lib/cn";

type FeatureItemProps = Feature & {
  active?: boolean;
};

export function FeatureItem({
  title,
  description,
  ambientLabel,
  icon: Icon,
  active = false,
}: FeatureItemProps) {
  return (
    <div className={cn("group border-t border-border/70 pt-5 transition-colors duration-300 ease-[var(--ease-standard)] hover:border-border sm:pt-6", active && "border-primary/22")}>
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/12 bg-primary/[0.045] text-primary transition duration-300 ease-[var(--ease-standard)] group-hover:border-primary/20 group-hover:bg-primary/[0.06] group-hover:text-primary-bright group-hover:-translate-y-0.5 motion-reduce:transform-none", active && "border-primary/22 bg-primary/[0.09] text-primary-bright shadow-[0_18px_34px_-24px_rgba(109,61,245,0.38)]")}>
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.9} />
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full border border-primary/12 bg-primary/[0.04] px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-primary/72 transition duration-300 ease-[var(--ease-standard)]", active && "border-primary/18 bg-primary/[0.09] text-primary")}>
            {ambientLabel}
          </span>
          <span className={cn("h-1.5 w-1.5 rounded-full bg-primary/28 transition duration-300 ease-[var(--ease-standard)]", active && "bg-primary/76 shadow-[0_0_18px_rgba(109,61,245,0.55)]")} />
        </div>
        <h3 className="text-[1.0625rem] font-medium tracking-[-0.03em] text-foreground transition duration-200 ease-[var(--ease-standard)] group-hover:-translate-y-px motion-reduce:transform-none sm:text-lg">
          {title}
        </h3>
        <p className="max-w-[24ch] text-[0.9375rem] leading-6 text-muted transition-colors duration-200 ease-[var(--ease-standard)] group-hover:text-[color:color-mix(in_srgb,var(--muted)_72%,var(--foreground))] sm:text-[0.975rem]">
          {description}
        </p>
      </div>
    </div>
  );
}
