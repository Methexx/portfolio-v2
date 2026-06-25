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
        "relative min-h-screen overflow-x-clip bg-background text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
