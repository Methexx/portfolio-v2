import { aiCapabilities, aiShowcaseCopy } from "@/components/sections/ai-showcase/ai-showcase-data";

export function AiCapabilities() {
  return (
    <div className="mt-10 rounded-[1.8rem] border border-border/75 bg-white/55 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:mt-12 sm:p-7">
      <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.55rem]">
        {aiShowcaseCopy.capabilitiesHeading}
      </h3>
      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3" role="list">
        {aiCapabilities.map(({ label, icon: Icon }) => (
          <li key={label} className="flex max-w-none items-start gap-3 border-t border-border/65 pt-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary/[0.045] text-primary">
              <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.85} />
            </div>
            <p className="max-w-none text-[0.98rem] leading-7 text-foreground/86">{label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
