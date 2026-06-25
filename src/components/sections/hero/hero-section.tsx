import { FadeIn } from "@/components/animations/fade-in";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroActions } from "@/components/sections/hero/hero-actions";
import { HeroAnnouncement } from "@/components/sections/hero/hero-announcement";
import { HeroBackground } from "@/components/sections/hero/hero-background";
import {
  HeroHeading,
  HeroParagraph,
} from "@/components/sections/hero/hero-content";
import { HeroProductStage } from "@/components/sections/hero/hero-product-stage";

export function HeroSection() {
  return (
    <Section
      spacing="compact"
      className="relative flex min-h-[92svh] items-start pt-[calc(var(--navbar-height)+3.5rem)] sm:pt-[calc(var(--navbar-height)+4rem)] lg:min-h-[105svh] lg:pt-[calc(var(--navbar-height)+5rem)]"
    >
      <HeroBackground />
      <Container className="relative">
        <div className="mx-auto flex w-full max-w-[82rem] flex-col items-center">
          <FadeIn className="w-full text-center" duration={0.45}>
            <div className="mx-auto w-fit">
              <HeroAnnouncement />
            </div>
          </FadeIn>
          <Reveal
            className="mt-7 w-full max-w-[58rem]"
            childClassName="block"
            delay={0.08}
            duration={0.76}
            mode="mount"
          >
            <div className="mx-auto flex w-full max-w-[58rem] justify-center text-center">
              <HeroHeading />
            </div>
          </Reveal>
          <FadeIn className="mt-6 w-full max-w-[58rem] text-center" delay={0.16} duration={0.52}>
            <div className="mx-auto flex w-full max-w-[44rem] justify-center">
              <HeroParagraph />
            </div>
          </FadeIn>
          <FadeIn className="w-full max-w-[58rem]" delay={0.2} duration={0.52}>
            <HeroActions />
          </FadeIn>
          <Reveal
            className="mt-2 w-full"
            childClassName="block"
            delay={0.24}
            duration={0.86}
            mode="mount"
          >
            <HeroProductStage />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
