import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { IntegrationsHeader } from "@/components/sections/integrations/integrations-header";
import { IntegrationsShowcase } from "@/components/sections/integrations/integrations-showcase";

export function IntegrationsSection() {
  return (
    <Section spacing="large" className="bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.2)_100%)] pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <IntegrationsHeader />
          <IntegrationsShowcase />
        </div>
      </Container>
    </Section>
  );
}
