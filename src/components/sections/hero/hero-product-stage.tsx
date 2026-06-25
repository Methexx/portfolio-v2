import { HeroStageEntrance } from "@/components/sections/hero/hero-entrance";
import { cn } from "@/lib/cn";

const placeholderLine = (width: string) =>
  cn("h-2 rounded-full bg-white/16", width);

export function HeroProductStage() {
  return (
    <HeroStageEntrance className="mt-2 w-full">
      <div
        aria-hidden="true"
        className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(146,110,255,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(124,73,255,0.16),transparent_32%),var(--product-stage)] px-3 pt-5 shadow-[0_42px_80px_-44px_rgba(39,20,50,0.58)] sm:mt-20 sm:rounded-[2.6rem] sm:px-5 sm:pt-7 lg:mt-24 lg:px-7 lg:pt-8"
      >
        <div className="pointer-events-none absolute inset-x-[14%] top-0 h-24 rounded-full bg-primary/10 blur-3xl sm:h-28" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-[55%] -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
        <div className="relative mx-auto aspect-[1.26/1] min-h-[21.5rem] w-full max-w-[78rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(77,53,101,0.92),rgba(43,28,58,0.98))] shadow-[0_26px_60px_-36px_rgba(10,6,18,0.92)] sm:aspect-[1.42/1] sm:min-h-[28rem] md:aspect-[1.52/1] md:min-h-[33rem] lg:min-h-[39rem]">
        <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between border-b border-white/8 bg-white/[0.03] px-4 sm:h-12 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
          </div>
          <div className="h-2.5 w-28 rounded-full bg-white/10 sm:w-36" />
        </div>
        <div className="grid h-full grid-cols-[4.5rem_minmax(0,1fr)] pt-11 sm:grid-cols-[5.75rem_minmax(0,1fr)] sm:pt-12 md:grid-cols-[12rem_minmax(0,1fr)_8rem] lg:grid-cols-[14rem_minmax(0,1fr)_10rem]">
          <div className="border-r border-white/7 bg-white/[0.03] p-3 sm:p-4 md:p-5">
            <div className="hidden gap-3 md:grid">
              <div className="h-8 w-8 rounded-2xl bg-white/9" />
              <div className="space-y-2">
                <div className={placeholderLine("w-16")} />
                <div className={placeholderLine("w-12")} />
              </div>
              <div className="space-y-2 pt-3">
                <div className={placeholderLine("w-full")} />
                <div className={placeholderLine("w-4/5")} />
                <div className={placeholderLine("w-3/5")} />
              </div>
              <div className="space-y-2 pt-4">
                <div className={placeholderLine("w-4/5")} />
                <div className={placeholderLine("w-full")} />
                <div className={placeholderLine("w-2/3")} />
              </div>
            </div>
            <div className="grid gap-2 md:hidden">
              <div className="h-8 rounded-2xl bg-white/8" />
              <div className="h-8 rounded-2xl bg-white/7" />
              <div className="h-8 rounded-2xl bg-white/6" />
            </div>
          </div>
          <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(89,62,118,0.26),rgba(57,37,74,0.12))] p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="pointer-events-none absolute left-[12%] top-[14%] h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 sm:gap-4 md:gap-5">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className={placeholderLine("w-28 sm:w-36")} />
                  <div className={placeholderLine("w-20 sm:w-24")} />
                </div>
                <div className="h-8 w-8 rounded-full border border-white/10 bg-white/6 sm:h-9 sm:w-9" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
                <div className="rounded-[1.2rem] border border-white/8 bg-[color:var(--product-panel)] p-3 sm:p-4">
                  <div className="h-14 rounded-2xl bg-white/7 sm:h-16" />
                  <div className="mt-3 space-y-2">
                    <div className={placeholderLine("w-3/4")} />
                    <div className={placeholderLine("w-1/2")} />
                  </div>
                </div>
                <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.05] p-3 sm:p-4">
                  <div className="h-14 rounded-2xl bg-primary/16 sm:h-16" />
                  <div className="mt-3 space-y-2">
                    <div className={placeholderLine("w-2/3")} />
                    <div className={placeholderLine("w-1/2")} />
                  </div>
                </div>
                <div className="hidden rounded-[1.2rem] border border-white/8 bg-white/[0.05] p-4 sm:block">
                  <div className="h-16 rounded-2xl bg-white/7" />
                  <div className="mt-3 space-y-2">
                    <div className={placeholderLine("w-4/5")} />
                    <div className={placeholderLine("w-3/5")} />
                  </div>
                </div>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-3 sm:p-4 md:p-5">
                <div className="grid gap-3 md:grid-cols-[1.25fr_0.75fr] lg:gap-4">
                  <div className="rounded-[1.1rem] border border-white/7 bg-[color:var(--product-panel)] p-4">
                    <div className="space-y-3">
                      <div className={placeholderLine("w-28")} />
                      <div className="h-28 rounded-[1rem] bg-white/7 sm:h-36 md:h-44" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className={placeholderLine("w-full")} />
                          <div className={placeholderLine("w-3/4")} />
                        </div>
                        <div className="space-y-2">
                          <div className={placeholderLine("w-full")} />
                          <div className={placeholderLine("w-2/3")} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden rounded-[1.1rem] border border-white/7 bg-white/[0.05] p-4 md:block">
                    <div className="space-y-3">
                      <div className={placeholderLine("w-20")} />
                      <div className="space-y-2">
                        <div className="h-16 rounded-[0.95rem] bg-white/8" />
                        <div className="h-16 rounded-[0.95rem] bg-[color:var(--product-panel-muted)]" />
                        <div className="h-20 rounded-[0.95rem] bg-white/7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden border-l border-white/7 bg-white/[0.035] p-5 md:block">
            <div className="space-y-4">
              <div className={placeholderLine("w-16")} />
              <div className="space-y-3">
                <div className="h-24 rounded-[1rem] bg-white/8" />
                <div className="h-24 rounded-[1rem] bg-[color:var(--product-panel-muted)]" />
                <div className="h-16 rounded-[1rem] bg-white/7" />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </HeroStageEntrance>
  );
}
