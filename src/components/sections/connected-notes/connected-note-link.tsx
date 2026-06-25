import type { ConnectedNoteEdge, ConnectedNoteNode } from "@/components/sections/connected-notes/connected-notes-data";

type ConnectedNoteLinkProps = {
  edge: ConnectedNoteEdge;
  nodesById: Readonly<Record<string, ConnectedNoteNode>>;
};

export function ConnectedNoteLink({
  edge,
  nodesById,
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
      opacity={edge.strength === "primary" ? 0.9 : 0.62}
      className={edge.mobileHidden ? "hidden sm:block" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}
