import { HeroAtmosphere } from "@/components/sections/hero/hero-atmosphere";
import { HeroGlowEntrance } from "@/components/sections/hero/hero-entrance";

export function HeroBackground() {
  return (
    <HeroGlowEntrance className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <HeroAtmosphere />
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_72%)]" />
        <div className="absolute left-1/2 top-28 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[color:var(--hero-glow-secondary)] blur-[110px] sm:h-[28rem] sm:w-[28rem] lg:top-24 lg:h-[34rem] lg:w-[34rem]" />
        <div className="absolute left-1/2 top-[27rem] h-[18rem] w-[30rem] -translate-x-1/2 rounded-full bg-[color:var(--hero-glow-primary)] blur-[95px] sm:top-[31rem] sm:h-[22rem] sm:w-[42rem] lg:top-[34rem] lg:h-[28rem] lg:w-[56rem]" />
        <div className="absolute left-1/2 top-[39rem] h-[16rem] w-[22rem] -translate-x-1/2 rounded-full bg-white/18 blur-[70px] lg:top-[43rem] lg:w-[30rem]" />
      </div>
    </HeroGlowEntrance>
  );
}
