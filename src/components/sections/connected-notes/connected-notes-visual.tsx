import type { ReactNode } from "react";

import { ConnectedNoteLink } from "@/components/sections/connected-notes/connected-note-link";
import { ConnectedNoteNode } from "@/components/sections/connected-notes/connected-note-node";
import {
  connectedNoteEdges,
  connectedNoteNodes,
} from "@/components/sections/connected-notes/connected-notes-data";
import { cn } from "@/lib/cn";

const nodesById = Object.fromEntries(
  connectedNoteNodes.map((node) => [node.id, node]),
);

export function ConnectedNotesVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-14 overflow-hidden rounded-[2.25rem] border border-network-border bg-[radial-gradient(circle_at_top,rgba(157,125,255,0.12),transparent_30%),radial-gradient(circle_at_80%_32%,rgba(109,61,245,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.66),rgba(242,239,235,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:mt-16 sm:p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(109,61,245,0.08)_1px,transparent_1px)] bg-[size:1.4rem_1.4rem] opacity-25 sm:opacity-35" />
      <div className="pointer-events-none absolute left-[8%] top-[14%] rounded-full border border-primary/12 bg-white/65 px-3 py-1 text-[0.72rem] font-medium tracking-[0.08em] text-network-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        linked context
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[18%] hidden rounded-full border border-primary/12 bg-white/60 px-3 py-1 text-[0.72rem] font-medium tracking-[0.08em] text-network-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:block">
        recoverable knowledge
      </div>
      <div className="relative min-h-[26.5rem] sm:min-h-[31rem] lg:min-h-[38rem]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {connectedNoteEdges.map((edge) => (
            <ConnectedNoteLink key={`${edge.from}-${edge.to}`} edge={edge} nodesById={nodesById} />
          ))}
        </svg>
        {connectedNoteNodes.map((node) => (
          <ConnectedNoteNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

type ConnectedNotesVisualShellProps = {
  backgroundSlot?: ReactNode;
  className?: string;
  badgeSlot?: ReactNode;
  canvasSlot?: ReactNode;
  foregroundSlot?: ReactNode;
  svgSlot?: ReactNode;
  nodeSlot?: ReactNode;
};

export function ConnectedNotesVisualShell({
  backgroundSlot,
  className,
  badgeSlot,
  canvasSlot,
  foregroundSlot,
  svgSlot,
  nodeSlot,
}: ConnectedNotesVisualShellProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mt-14 overflow-hidden rounded-[2.4rem] bg-[linear-gradient(180deg,#040914_0%,#060c18_35%,#06101f_68%,#040914_100%)] p-4 shadow-[0_28px_72px_-58px_rgba(1,4,12,0.98),inset_0_1px_0_rgba(255,255,255,0.035)] sm:mt-16 sm:p-6",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,188,255,0.055)_1px,transparent_1px)] bg-[size:1.6rem_1.6rem] opacity-12 sm:opacity-16" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(73,124,255,0.28),transparent_26%),radial-gradient(circle_at_50%_44%,rgba(121,190,255,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,14,0.92),transparent_15%,transparent_85%,rgba(3,7,14,0.92))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,14,0.82),rgba(3,7,14,0.14)_18%,transparent_36%,transparent_68%,rgba(3,7,14,0.58)_100%)]" />
      {backgroundSlot}
      {badgeSlot}
      <div className="relative min-h-[30rem] sm:min-h-[36rem] lg:min-h-[42rem]">
        {canvasSlot}
        {svgSlot === undefined ? (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connectedNoteEdges.map((edge) => (
              <ConnectedNoteLink key={`${edge.from}-${edge.to}`} edge={edge} nodesById={nodesById} />
            ))}
          </svg>
        ) : (
          svgSlot
        )}
        {nodeSlot === undefined ? (
          connectedNoteNodes.map((node) => (
            <ConnectedNoteNode key={node.id} node={node} />
          ))
        ) : (
          nodeSlot
        )}
        {foregroundSlot}
      </div>
    </div>
  );
}
