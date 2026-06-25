import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SecurityMotion } from "@/components/sections/security/security-motion";

export function SecuritySection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <SecurityMotion />
        </div>
      </Container>
    </Section>
  );
}
