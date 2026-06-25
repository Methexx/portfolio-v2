import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SecurityFeatures } from "@/components/sections/security/security-features";
import { SecurityHeader } from "@/components/sections/security/security-header";
import { SecurityScramblePreview } from "@/components/sections/security/security-scramble-preview";
import { SecurityVisual } from "@/components/sections/security/security-visual";

export function SecuritySection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <SecurityScramblePreview />
          <SecurityHeader />
          <SecurityVisual />
          <SecurityFeatures />
        </div>
      </Container>
    </Section>
  );
}
