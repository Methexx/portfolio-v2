import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AiShowcaseDemo } from "@/components/sections/ai-showcase/ai-showcase-demo";

export function AiShowcaseSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <AiShowcaseDemo />
      </Container>
    </Section>
  );
}
