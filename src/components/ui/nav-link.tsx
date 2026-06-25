import Link from "next/link";

import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile" | "secondary-action" | "primary-action";
};

const variantClasses = {
  desktop:
    "group relative inline-flex min-h-11 items-center justify-center rounded-full px-3 py-2 text-[0.92rem] font-medium text-muted transition-all duration-200 ease-[var(--ease-standard)] hover:-translate-y-px hover:text-foreground",
  mobile:
    "group flex min-h-12 w-full items-center justify-between rounded-[1.05rem] border border-transparent px-4 py-3 text-left text-[0.98rem] font-medium text-foreground transition-all duration-200 ease-[var(--ease-standard)] hover:border-border hover:bg-surface hover:-translate-y-px",
  "secondary-action":
    "inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white/66 px-4 py-2.5 text-[0.92rem] font-medium text-foreground transition-all duration-200 ease-[var(--ease-standard)] hover:-translate-y-px hover:border-border-strong hover:bg-surface",
  "primary-action":
    "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[0.92rem] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_32px_-24px_rgba(109,61,245,0.72)] transition-all duration-200 ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-primary-bright active:translate-y-0 active:scale-[0.99]",
} as const;

export function NavLink({
  href,
  label,
  active = false,
  className,
  onClick,
  variant = "desktop",
}: NavLinkProps) {
  const isDesktop = variant === "desktop";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        variantClasses[variant],
        active &&
          (isDesktop
            ? "text-foreground"
            : "border-border bg-surface text-foreground"),
        className,
      )}
    >
      <span className="relative z-10">{label}</span>
      {isDesktop ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-3 bottom-1.5 h-px origin-center rounded-full bg-primary/80 opacity-0 transition-all duration-200 ease-[var(--ease-standard)] group-hover:opacity-100",
            active && "opacity-100",
          )}
        />
      ) : variant === "mobile" ? (
        <span
          aria-hidden="true"
          className="text-muted transition-transform duration-200 ease-[var(--ease-standard)] group-hover:translate-x-0.5"
        >
          ↗
        </span>
      ) : null}
    </Link>
  );
}
