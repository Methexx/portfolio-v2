import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ResearchReadingMotion } from "@/components/sections/research-reading/research-reading-motion";

export function ResearchReadingSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <ResearchReadingMotion />
        </div>
      </Container>
    </Section>
  );
}
