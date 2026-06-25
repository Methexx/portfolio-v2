import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroActions } from "@/components/sections/hero/hero-actions";
import { HeroAnnouncement } from "@/components/sections/hero/hero-announcement";
import { HeroBackground } from "@/components/sections/hero/hero-background";
import {
  HeroAnnouncementEntrance,
  HeroParagraphEntrance,
} from "@/components/sections/hero/hero-entrance";
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
          <HeroAnnouncementEntrance className="w-full text-center">
            <div className="mx-auto w-fit">
              <HeroAnnouncement />
            </div>
          </HeroAnnouncementEntrance>
          <div className="mt-7 w-full max-w-[58rem]">
            <div className="mx-auto flex w-full max-w-[58rem] justify-center text-center">
              <HeroHeading />
            </div>
          </div>
          <HeroParagraphEntrance className="mt-6 w-full max-w-[58rem] text-center">
            <div className="mx-auto flex w-full max-w-[44rem] justify-center">
              <HeroParagraph />
            </div>
          </HeroParagraphEntrance>
          <div className="w-full max-w-[58rem]">
            <HeroActions />
          </div>
          <div className="w-full">
            <HeroProductStage />
          </div>
        </div>
      </Container>
    </Section>
  );
}
