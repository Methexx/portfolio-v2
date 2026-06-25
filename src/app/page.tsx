import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { AiShowcaseSection } from "@/components/sections/ai-showcase/ai-showcase-section";
import { ConnectedNotesSection } from "@/components/sections/connected-notes/connected-notes-section";
import { FeatureGridSection } from "@/components/sections/features/feature-grid-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { MeetingsSection } from "@/components/sections/meetings/meetings-section";
import { ResearchReadingSection } from "@/components/sections/research-reading/research-reading-section";
import { SecuritySection } from "@/components/sections/security/security-section";

export default function Home() {
  return (
    <PageShell>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureGridSection />
        <AiShowcaseSection />
        <ConnectedNotesSection />
        <ResearchReadingSection />
        <SecuritySection />
        <MeetingsSection />
      </main>
    </PageShell>
  );
}
