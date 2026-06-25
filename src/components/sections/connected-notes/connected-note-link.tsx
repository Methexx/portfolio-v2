import type { SVGProps } from "react";

import type {
  ConnectedNoteEdge,
  ConnectedNoteNode,
} from "@/components/sections/connected-notes/connected-notes-data";

type ConnectedNoteLinkProps = {
  edge: ConnectedNoteEdge;
  nodesById: Readonly<Record<string, ConnectedNoteNode>>;
  className?: string;
  style?: SVGProps<SVGPathElement>["style"];
  opacity?: number;
};

export function ConnectedNoteLink({
  edge,
  nodesById,
  className,
  style,
  opacity,
}: ConnectedNoteLinkProps) {
  const fromNode = nodesById[edge.from];
  const toNode = nodesById[edge.to];

  if (!fromNode || !toNode) {
    return null;
  }

  const controlX = (fromNode.x + toNode.x) / 2;
  const controlY = (fromNode.y + toNode.y) / 2 - (edge.curve ?? 0);
  const path = `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;

  return (
    <path
      d={path}
      fill="none"
      stroke="var(--network-line)"
      strokeLinecap="round"
      strokeWidth={edge.strength === "primary" ? 1.75 : 1.1}
      opacity={opacity ?? (edge.strength === "primary" ? 0.9 : 0.62)}
      className={edge.mobileHidden ? `hidden sm:block ${className ?? ""}`.trim() : className}
      style={style}
      vectorEffect="non-scaling-stroke"
    />
  );
}
