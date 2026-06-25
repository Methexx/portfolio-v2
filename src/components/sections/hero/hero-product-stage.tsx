import { HeroStageEntrance } from "@/components/sections/hero/hero-entrance";
import { ProductPreview } from "@/components/sections/hero/product-preview/product-preview";

export function HeroProductStage() {
  return (
    <HeroStageEntrance className="mt-2 w-full">
      <div
        aria-hidden="true"
        className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(146,110,255,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(124,73,255,0.16),transparent_32%),var(--product-stage)] px-3 pt-5 shadow-[0_42px_80px_-44px_rgba(39,20,50,0.58)] sm:mt-20 sm:rounded-[2.6rem] sm:px-5 sm:pt-7 lg:mt-24 lg:px-7 lg:pt-8"
      >
        <div className="pointer-events-none absolute inset-x-[14%] top-0 h-24 rounded-full bg-primary/10 blur-3xl sm:h-28" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-[55%] -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
        <ProductPreview />
      </div>
    </HeroStageEntrance>
  );
}
