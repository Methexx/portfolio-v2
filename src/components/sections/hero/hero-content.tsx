import { HeroHeadingReveal } from "@/components/sections/hero/hero-entrance";

const headingLines = [
  "Software experiences",
  "designed to feel effortless.",
] as const;

export function HeroHeading() {
  return (
    <HeroHeadingReveal
      lines={headingLines}
      className="mx-auto max-w-[13ch] text-[clamp(2.75rem,7vw,5.35rem)] font-medium tracking-[-0.055em] text-foreground sm:text-[clamp(3.2rem,7vw,5.9rem)]"
    />
  );
}

export function HeroParagraph() {
  return (
    <p className="max-w-[44rem] text-[1rem] leading-8 text-muted sm:text-[1.08rem] md:text-[1.18rem]">
      A motion-led portfolio foundation for product engineering, mobile
      development, and intelligent systems.
    </p>
  );
}

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-[58rem] flex-col items-center text-center">
      <HeroHeading />
      <div className="mt-6">
        <HeroParagraph />
      </div>
    </div>
  );
}
