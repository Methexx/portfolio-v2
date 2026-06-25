import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MeetingsFeatures } from "@/components/sections/meetings/meetings-features";
import { MeetingsHeader } from "@/components/sections/meetings/meetings-header";
import { MeetingsVisual } from "@/components/sections/meetings/meetings-visual";

export function MeetingsSection() {
  return (
    <Section spacing="large" className="bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.24)_100%)] pt-[clamp(5.5rem,9vw,8rem)]">
      <Container>
        <div className="mx-auto max-w-[84rem]">
          <MeetingsHeader />
          <MeetingsVisual />
          <MeetingsFeatures />
        </div>
      </Container>
    </Section>
  );
}
