import type { DeviceSyncItem } from "@/components/sections/research-reading/research-reading-data";

type DeviceSyncRowProps = {
  item: DeviceSyncItem;
};

export function DeviceSyncRow({ item }: DeviceSyncRowProps) {
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/65 bg-white/72 px-3.5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary/[0.045] text-primary">
          <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.85} />
        </div>
        <span className="text-[0.95rem] font-medium text-foreground">{item.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/75" />
        <span className="text-[0.82rem] font-medium text-muted">{item.status}</span>
      </div>
    </div>
  );
}
