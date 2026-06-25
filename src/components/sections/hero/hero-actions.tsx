import Link from "next/link";

import { cn } from "@/lib/cn";

const actionBase =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-medium transition-all duration-200 ease-[var(--ease-standard)] focus-visible:outline-offset-4";

export function HeroActions() {
  return (
    <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Link
        href="#work"
        className={cn(
          actionBase,
          "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_38px_-24px_rgba(109,61,245,0.68)] hover:-translate-y-0.5 hover:bg-primary-bright active:translate-y-0 active:scale-[0.99]",
        )}
      >
        Explore work
      </Link>
      <Link
        href="#about"
        className={cn(
          actionBase,
          "border border-border bg-white/74 text-foreground shadow-[0_14px_28px_-26px_rgba(39,20,50,0.28)] hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface",
        )}
      >
        About me
      </Link>
    </div>
  );
}
