import type { CSSProperties } from "react";

import {
  connectedNodeIcons,
  type ConnectedNoteNode as ConnectedNoteNodeType,
} from "@/components/sections/connected-notes/connected-notes-data";
import { cn } from "@/lib/cn";

type ConnectedNoteNodeProps = {
  node: ConnectedNoteNodeType;
};

export function ConnectedNoteNode({ node }: ConnectedNoteNodeProps) {
  const Icon = connectedNodeIcons[node.id];

  const style = {
    left: `${node.x}%`,
    top: `${node.y}%`,
  } satisfies CSSProperties;

  return (
    <div
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2",
        node.mobileHidden && "hidden sm:block",
      )}
      style={style}
    >
      <div
        className={cn(
          "rounded-[1.4rem] border border-network-border bg-network-node px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[1px]",
          node.size === "primary" &&
            "min-w-[13rem] rounded-[1.7rem] border-primary/18 bg-network-node-primary px-5 py-4",
          node.size === "secondary" && "min-w-[10rem]",
          node.size === "tertiary" && "min-w-[8.5rem] px-3.5 py-2.5 opacity-88",
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary/[0.045] text-primary",
              node.size === "primary" && "h-9 w-9 bg-primary/12 text-primary-bright",
              node.size === "tertiary" && "h-7 w-7 rounded-[0.85rem]",
            )}
          >
            {Icon ? (
              <Icon
                aria-hidden="true"
                className={cn(
                  "size-4",
                  node.size === "primary" && "size-[1.05rem]",
                  node.size === "tertiary" && "size-3.5",
                )}
                strokeWidth={1.85}
              />
            ) : (
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/70" />
            )}
          </div>
          <div className="min-w-0">
            {node.category ? (
              <p
                className={cn(
                  "max-w-none text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-network-muted",
                  node.size === "primary" && "text-[0.72rem] text-primary/80",
                )}
              >
                {node.category}
              </p>
            ) : null}
            <p
              className={cn(
                "mt-1 max-w-none text-[0.92rem] font-medium leading-5 tracking-[-0.03em] text-foreground",
                node.size === "primary" && "text-[1.08rem] leading-6",
                node.size === "tertiary" && "text-[0.84rem] leading-5 text-foreground/86",
              )}
            >
              {node.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
