import Link from "next/link";

import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Link
      href="/"
      aria-label="Portfolio home"
      className={cn(
        "inline-flex items-center gap-3 rounded-full px-1 py-1 text-sm font-semibold tracking-[-0.02em] text-foreground transition-transform duration-200 ease-[var(--ease-standard)] hover:-translate-y-0.5 focus-visible:outline-offset-4",
        className,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-[1rem] border border-primary/18 bg-primary-soft/80 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-[1.1rem] w-[1.1rem]"
          fill="none"
        >
          <rect
            x="7.5"
            y="7.5"
            width="17"
            height="17"
            rx="5.5"
            className="fill-current opacity-95"
          />
          <path
            d="M11 17.75L16 12.75L21 17.75"
            stroke="white"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[0.98rem] text-foreground">Portfolio</span>
    </Link>
  );
}
