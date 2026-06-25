export function HeroHeading() {
  return (
    <h1 className="max-w-[13ch] text-[clamp(2.75rem,7vw,5.35rem)] font-medium tracking-[-0.055em] text-foreground sm:text-[clamp(3.2rem,7vw,5.9rem)]">
      Software experiences designed to feel effortless.
    </h1>
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
