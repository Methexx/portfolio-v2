import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ResearchReadingFeatures } from "@/components/sections/research-reading/research-reading-features";
import { ResearchReadingHeader } from "@/components/sections/research-reading/research-reading-header";
import { ResearchReadingVisual } from "@/components/sections/research-reading/research-reading-visual";

export function ResearchReadingSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <ResearchReadingHeader />
          <ResearchReadingVisual />
          <ResearchReadingFeatures />
        </div>
      </Container>
    </Section>
  );
}
