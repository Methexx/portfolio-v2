import { PreviewWindowEntrance } from "@/components/sections/hero/product-preview/product-preview-motion";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PreviewShellProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

export function PreviewShell({
  children,
  className,
  ...props
}: PreviewShellProps) {
  return (
    <PreviewWindowEntrance
      className={cn(
        "relative mx-auto aspect-[1.38/1] min-h-[21.5rem] w-full max-w-[78rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(50,36,69,0.96),rgba(24,17,34,0.98))] shadow-[0_26px_60px_-36px_rgba(10,6,18,0.92)] sm:aspect-[1.5/1] sm:min-h-[28rem] md:aspect-[1.58/1] md:min-h-[33rem] lg:aspect-[1.68/1] lg:min-h-[39rem]",
        className,
      )}
      {...props}
    >
      {children}
    </PreviewWindowEntrance>
  );
}
