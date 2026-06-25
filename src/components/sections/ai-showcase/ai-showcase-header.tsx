import { aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";

export function AiShowcaseHeader() {
  return (
    <div className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
        <span>{aiShowcaseCopy.label}</span>
      </div>
      <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
        <span className="block">Build with an</span>
        <span className="block">intelligent assistant.</span>
      </h2>
      <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
        {aiShowcaseCopy.description}
      </p>
    </div>
  );
}
