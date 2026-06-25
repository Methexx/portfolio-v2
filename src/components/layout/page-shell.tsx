import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn(
        "homepage-shell relative min-h-screen overflow-x-clip bg-background text-foreground",
        className,
      )}
    >
      <div aria-hidden="true" className="homepage-atmosphere" />
      <div aria-hidden="true" className="homepage-dark-halo homepage-dark-halo-1" />
      <div aria-hidden="true" className="homepage-dark-halo homepage-dark-halo-2" />
      <div aria-hidden="true" className="homepage-section-glow homepage-section-glow-1" />
      <div aria-hidden="true" className="homepage-section-glow homepage-section-glow-2" />
      {children}
    </div>
  );
}
