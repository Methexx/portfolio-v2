import type { SecurityDataItem } from "@/components/sections/security/security-data";
import { cn } from "@/lib/cn";

type SecurityDataCardProps = {
  className?: string;
  item: SecurityDataItem;
};

export function SecurityDataCard({ className, item }: SecurityDataCardProps) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "rounded-[1.35rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        item.emphasis && "border-primary/18 bg-security-panel-muted",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/[0.08] text-security-accent">
          <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="max-w-none text-[0.96rem] font-medium tracking-[-0.03em] text-white">
            {item.title}
          </p>
          <p className="mt-2 max-w-none font-mono text-[0.76rem] tracking-[0.24em] text-security-ciphertext">
            {item.maskedValue}
          </p>
          <span className="mt-3 inline-flex rounded-full border border-primary/16 bg-primary/[0.08] px-2.5 py-1 text-[0.72rem] font-medium text-security-status">
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}
