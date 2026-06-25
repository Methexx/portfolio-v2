import { integrationsCopy } from "@/components/sections/integrations/integrations-data";

export function IntegrationsHeader() {
  return (
    <div className="mx-auto flex max-w-[50rem] flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
        <span>{integrationsCopy.label}</span>
      </div>
      <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
        {integrationsCopy.headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-6 max-w-[43rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
        {integrationsCopy.description}
      </p>
    </div>
  );
}
