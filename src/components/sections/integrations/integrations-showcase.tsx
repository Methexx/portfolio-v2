import { Boxes } from "lucide-react";

import { integrationItems, integrationsHub } from "@/components/sections/integrations/integrations-data";
import { IntegrationCard } from "@/components/sections/integrations/integration-card";
import { IntegrationFlow } from "@/components/sections/integrations/integration-flow";

const desktopPlacements = [
  "lg:col-[1] lg:row-[1]",
  "lg:col-[3] lg:row-[1]",
  "lg:col-[1] lg:row-[3]",
  "lg:col-[3] lg:row-[3]",
] as const;

export function IntegrationsShowcase() {
  return (
    <div
      className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-integrations-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(242,238,246,0.96))] p-4 shadow-[0_26px_72px_-48px_rgba(36,21,47,0.18),inset_0_1px_0_rgba(255,255,255,0.82)] sm:mt-16 sm:p-6"
      aria-labelledby="integrations-showcase-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(109,61,245,0.08)_1px,transparent_1px)] bg-[size:1.65rem_1.65rem] opacity-22 sm:opacity-28" />
      <IntegrationFlow />

      <div className="relative">
        <div className="mx-auto max-w-[18rem] rounded-[1.85rem] border border-integrations-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.24),transparent_56%),linear-gradient(180deg,rgba(66,43,98,0.96),rgba(33,22,48,0.98))] px-5 py-5 text-center shadow-[0_24px_60px_-36px_rgba(36,21,47,0.45),inset_0_1px_0_rgba(255,255,255,0.16)] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-[16rem] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/[0.08] text-primary-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <Boxes aria-hidden="true" className="size-6" strokeWidth={1.8} />
          </div>
          <p
            id="integrations-showcase-title"
            className="mt-4 max-w-none text-[1.12rem] font-medium tracking-[-0.04em] text-white"
          >
            {integrationsHub.label}
          </p>
          <p className="mt-2 max-w-none text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-primary-soft/86">
            {integrationsHub.supportingText}
          </p>
          <p className="mt-4 max-w-none text-[0.9rem] leading-6 text-white/72">
            {integrationsHub.microcopy}
          </p>
        </div>

        <ul className="mt-6 grid list-none gap-4 p-0 lg:mt-0 lg:min-h-[35rem] lg:grid-cols-[1fr_13rem_1fr] lg:grid-rows-[1fr_auto_1fr] lg:items-center lg:gap-x-8 lg:gap-y-6">
          {integrationItems.map((item, index) => (
            <li key={item.id} className={desktopPlacements[index]}>
              <IntegrationCard item={item} />
            </li>
          ))}
        </ul>

        <div aria-hidden="true" className="mt-8 hidden lg:block">
          <div className="grid grid-cols-4 gap-4 opacity-68">
            {integrationItems.map((item) => (
              <IntegrationCard key={`duplicate-${item.id}`} item={item} muted />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
