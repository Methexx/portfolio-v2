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
        "relative mt-14 overflow-hidden rounded-[2.4rem] border border-network-border bg-[radial-gradient(circle_at_50%_24%,rgba(102,171,255,0.18),transparent_18%),radial-gradient(circle_at_50%_78%,rgba(125,98,255,0.18),transparent_24%),linear-gradient(180deg,#07101b_0%,#090f1c_42%,#060b14_100%)] p-4 shadow-[0_30px_80px_-50px_rgba(5,8,18,0.95),inset_0_1px_0_rgba(255,255,255,0.05)] sm:mt-16 sm:p-6",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(142,189,255,0.08)_1px,transparent_1px)] bg-[size:1.6rem_1.6rem] opacity-18 sm:opacity-22" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,164,255,0.16),transparent_38%),radial-gradient(circle_at_50%_88%,rgba(116,90,255,0.2),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,20,0.82),transparent_14%,transparent_86%,rgba(6,11,20,0.82))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,20,0.32),transparent_18%,transparent_82%,rgba(6,11,20,0.52))]" />
      {backgroundSlot}
      {badgeSlot ?? (
        <>
          <div className="pointer-events-none absolute left-[8%] top-[14%] rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.72rem] font-medium tracking-[0.08em] text-white/56 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[3px]">
            linked context
          </div>
          <div className="pointer-events-none absolute right-[10%] top-[18%] hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.72rem] font-medium tracking-[0.08em] text-white/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[3px] md:block">
            recoverable knowledge
          </div>
        </>
      )}
      <div className="relative min-h-[28rem] sm:min-h-[34rem] lg:min-h-[40rem]">
        {canvasSlot}
        {svgSlot ?? (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connectedNoteEdges.map((edge) => (
              <ConnectedNoteLink key={`${edge.from}-${edge.to}`} edge={edge} nodesById={nodesById} />
            ))}
          </svg>
        )}
        {nodeSlot ??
          connectedNoteNodes.map((node) => (
            <ConnectedNoteNode key={node.id} node={node} />
          ))}
        {foregroundSlot}
      </div>
    </div>
  );
}
