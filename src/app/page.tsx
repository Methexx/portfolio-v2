import { FadeIn } from "@/components/animations/fade-in";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <PageShell>
      <SiteHeader />
      <Section className="relative flex min-h-[calc(100vh-var(--navbar-height))] items-center pt-[calc(var(--navbar-height)+2rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,61,245,0.24)_0%,rgba(109,61,245,0.1)_36%,transparent_72%)] blur-3xl sm:h-96 sm:w-96"
        />
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 text-left">
            <FadeIn
              className="inline-flex rounded-full border border-border bg-primary-soft px-4 py-2 text-sm font-medium tracking-[0.18em] text-primary uppercase"
              duration={0.45}
            >
              Portfolio foundation
            </FadeIn>
            <Reveal className="max-w-4xl" childClassName="block">
              <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7.25rem)] font-medium text-foreground">
                Thoughtful software, shaped with motion.
              </h1>
            </Reveal>
            <FadeIn
              className="max-w-2xl text-lg text-muted sm:text-xl"
              delay={0.12}
            >
              A temporary foundation for a polished, animation-led portfolio
              experience.
            </FadeIn>
            <FadeIn delay={0.18}>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-strong bg-surface px-6 py-3 text-base font-medium text-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary focus-visible:outline-offset-4"
              >
                Explore soon
              </button>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
