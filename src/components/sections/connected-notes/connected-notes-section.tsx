import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ConnectedNotesMotion } from "@/components/sections/connected-notes/connected-notes-motion";

export function ConnectedNotesSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <ConnectedNotesMotion />
      </Container>
    </Section>
  );
}
