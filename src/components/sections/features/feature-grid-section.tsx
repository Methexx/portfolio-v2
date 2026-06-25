import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FeatureGrid } from "@/components/sections/features/feature-grid";

export function FeatureGridSection() {
  return (
    <Section
      aria-labelledby="capabilities-heading"
      spacing="compact"
      className="pt-8 pb-[clamp(4.75rem,8vw,7.5rem)] sm:pt-10 lg:pt-12"
    >
      <Container>
        <div className="mx-auto max-w-[82rem]">
          <h2 id="capabilities-heading" className="sr-only">
            Capabilities
          </h2>
          <FeatureGrid />
        </div>
      </Container>
    </Section>
  );
}
