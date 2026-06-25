import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { FeatureGridSection } from "@/components/sections/features/feature-grid-section";
import { HeroSection } from "@/components/sections/hero/hero-section";

export default function Home() {
  return (
    <PageShell>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureGridSection />
      </main>
    </PageShell>
  );
}
