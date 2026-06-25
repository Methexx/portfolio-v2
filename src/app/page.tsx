import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero/hero-section";

export default function Home() {
  return (
    <PageShell>
      <SiteHeader />
      <main>
        <HeroSection />
      </main>
    </PageShell>
  );
}
