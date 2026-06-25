import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing-default)]",
  large: "py-[var(--section-spacing-large)]",
} as const;

type SectionProps = {
  children: ReactNode;
  className?: string;
  spacing?: keyof typeof spacingClasses;
} & HTMLAttributes<HTMLElement>;

export function Section({
  children,
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative", spacingClasses[spacing], className)} {...props}>
      {children}
    </section>
  );
}
