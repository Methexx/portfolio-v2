import { securityCopy } from "@/components/sections/security/security-data";

export function SecurityHeader() {
  return (
    <div className="mx-auto mt-10 flex max-w-[50rem] flex-col items-center text-center sm:mt-12">
      <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
        <span>{securityCopy.label}</span>
      </div>
      <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
        {securityCopy.headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
        {securityCopy.description}
      </p>
    </div>
  );
}
