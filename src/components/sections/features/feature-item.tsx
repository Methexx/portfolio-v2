import type { Feature } from "@/components/sections/features/feature-data";

export function FeatureItem({ title, description, icon: Icon }: Feature) {
  return (
    <div className="group border-t border-border/70 pt-5 transition-colors duration-200 ease-[var(--ease-standard)] hover:border-border sm:pt-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/12 bg-primary/[0.045] text-primary transition duration-200 ease-[var(--ease-standard)] group-hover:border-primary/20 group-hover:bg-primary/[0.06] group-hover:text-primary-bright group-hover:-translate-y-0.5 motion-reduce:transform-none">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.9} />
      </div>
      <div className="mt-5 space-y-2.5">
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
