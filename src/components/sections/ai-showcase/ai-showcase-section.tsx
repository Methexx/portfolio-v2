import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AiCapabilities } from "@/components/sections/ai-showcase/ai-capabilities";
import { AiDemoPanel } from "@/components/sections/ai-showcase/ai-demo-panel";
import { AiShowcaseHeader } from "@/components/sections/ai-showcase/ai-showcase-header";

export function AiShowcaseSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <AiShowcaseHeader />
          <div className="mt-12 sm:mt-14 lg:mt-16">
            <AiDemoPanel />
          </div>
          <AiCapabilities />
        </div>
      </Container>
    </Section>
  );
}
