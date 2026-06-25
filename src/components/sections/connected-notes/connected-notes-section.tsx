import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ConnectedNotesFeatures } from "@/components/sections/connected-notes/connected-notes-features";
import { ConnectedNotesHeader } from "@/components/sections/connected-notes/connected-notes-header";
import { ConnectedNotesVisual } from "@/components/sections/connected-notes/connected-notes-visual";

export function ConnectedNotesSection() {
  return (
    <Section spacing="large" className="pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <ConnectedNotesHeader />
          <ConnectedNotesVisual />
          <ConnectedNotesFeatures />
        </div>
      </Container>
    </Section>
  );
}
