import type { LucideIcon } from "lucide-react";

type IntegrationIconTileProps = {
  icon: LucideIcon;
  muted?: boolean;
};

export function IntegrationIconTile({
  icon: Icon,
  muted = false,
}: IntegrationIconTileProps) {
  return (
    <div
      className={[
        "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]",
        muted
          ? "border-primary/8 bg-white/70 text-foreground/62"
          : "border-primary/12 bg-primary/[0.07] text-primary",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
          muted ? "bg-primary/18" : "bg-primary/55",
        ].join(" ")}
      />
      <Icon aria-hidden="true" className="size-5" strokeWidth={1.9} />
    </div>
  );
}
