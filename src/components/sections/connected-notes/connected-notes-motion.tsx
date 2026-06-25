"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ConnectedNoteLink } from "@/components/sections/connected-notes/connected-note-link";
import { ConnectedNoteNode } from "@/components/sections/connected-notes/connected-note-node";
import {
  ConnectedNotesVisualShell,
} from "@/components/sections/connected-notes/connected-notes-visual";
import { ConnectedNotesFeatures } from "@/components/sections/connected-notes/connected-notes-features";
import { ConnectedNotesHeader } from "@/components/sections/connected-notes/connected-notes-header";
import {
  connectedNoteEdges,
  connectedNoteNodes,
  connectedNotesCopy,
  connectedNotesFeatures,
  type ConnectedNoteEdge,
  type ConnectedNoteNode as ConnectedNoteNodeType,
} from "@/components/sections/connected-notes/connected-notes-data";
import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

type HoveredNodeId = string | null;

const connectedNotesTiming = {
  labelDelay: 0,
  headingDelay: 0.12,
  headingStagger: 0.1,
  paragraphDelay: 0.42,
  graphDelay: 0.62,
  primaryEdgeDelay: 1.12,
  primaryEdgeStagger: 0.07,
  secondaryEdgeDelay: 1.34,
  secondaryEdgeStagger: 0.045,
  nodeDelay: 1.46,
  nodeStagger: 0.065,
  featureDelay: 2.18,
  featureStagger: 0.12,
} as const;

const sectionReveal = {
  amount: 0.22,
  margin: "0px 0px -14% 0px",
  once: true,
} as const;

const graphReveal: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.986 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.98,
      delay: connectedNotesTiming.graphDelay,
      ease: standardEase,
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: gentleEase,
    },
  },
};

const nodesById = Object.fromEntries(
  connectedNoteNodes.map((node) => [node.id, node]),
) as Readonly<Record<string, ConnectedNoteNodeType>>;

const visibleNodes: readonly ConnectedNoteNodeType[] = [...connectedNoteNodes].sort(
  (left, right) => left.revealOrder - right.revealOrder,
);
const primaryEdges: readonly ConnectedNoteEdge[] = connectedNoteEdges.filter(
  (edge) => edge.strength === "primary",
);
const secondaryEdges: readonly ConnectedNoteEdge[] = connectedNoteEdges.filter(
  (edge) => edge.strength !== "primary",
);

function buildConnections(
  nodes: readonly ConnectedNoteNodeType[],
  edges: readonly ConnectedNoteEdge[],
) {
  const connectedNodeIds = new Map<string, Set<string>>();
  const connectedEdgeIds = new Map<string, Set<string>>();

  nodes.forEach((node) => {
    connectedNodeIds.set(node.id, new Set([node.id]));
    connectedEdgeIds.set(node.id, new Set());
  });

  edges.forEach((edge) => {
    const edgeId = `${edge.from}-${edge.to}`;
    connectedNodeIds.get(edge.from)?.add(edge.to);
    connectedNodeIds.get(edge.to)?.add(edge.from);
    connectedEdgeIds.get(edge.from)?.add(edgeId);
    connectedEdgeIds.get(edge.to)?.add(edgeId);
  });

  return { connectedNodeIds, connectedEdgeIds };
}

const connectionLookup = buildConnections(connectedNoteNodes, connectedNoteEdges);

function getEdgeOpacity(
  edge: ConnectedNoteEdge,
  hoveredNodeId: HoveredNodeId,
  shouldReduceMotion: boolean,
) {
  const baseOpacity = edge.strength === "primary" ? 0.9 : 0.62;

  if (shouldReduceMotion || !hoveredNodeId) {
    return baseOpacity;
  }

  const edgeId = `${edge.from}-${edge.to}`;
  const isConnected = connectionLookup.connectedEdgeIds
    .get(hoveredNodeId)
    ?.has(edgeId);

  return isConnected ? Math.min(baseOpacity + 0.22, 1) : Math.max(baseOpacity - 0.24, 0.2);
}

function getNodeClasses(
  node: ConnectedNoteNodeType,
  hoveredNodeId: HoveredNodeId,
  shouldReduceMotion: boolean,
) {
  if (shouldReduceMotion || !hoveredNodeId) {
    return {
      wrapperClassName: "",
      innerClassName: "",
      innerStyle: undefined,
    };
  }

  const connectedNodes = connectionLookup.connectedNodeIds.get(hoveredNodeId);
  const isHovered = hoveredNodeId === node.id;
  const isConnected = connectedNodes?.has(node.id);

  return {
    wrapperClassName: "",
    innerClassName: cn(
      "will-change-transform",
      isHovered && "border-primary/30 bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_40px_-32px_rgba(109,61,245,0.28)]",
      !isHovered && isConnected && "border-primary/22 bg-white/92",
      !isHovered && !isConnected && "opacity-65",
    ),
    innerStyle: undefined,
  };
}

export function ConnectedNotesMotion() {
  const shouldReduceMotion = useReducedMotion();
  const prefersReducedMotion = Boolean(shouldReduceMotion);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, sectionReveal);
  const [hoveredNodeId, setHoveredNodeId] = useState<HoveredNodeId>(null);
  const [allowInteractiveGraph, setAllowInteractiveGraph] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 48rem) and (hover: hover)");
    const updateInteractionMode = () => {
      setAllowInteractiveGraph(mediaQuery.matches);
    };

    updateInteractionMode();
    mediaQuery.addEventListener("change", updateInteractionMode);

    return () => {
      mediaQuery.removeEventListener("change", updateInteractionMode);
    };
  }, []);

  const canHover = !prefersReducedMotion && allowInteractiveGraph;

  const renderedNodes = useMemo(
    () =>
      visibleNodes.map((node, index) => {
        const hoverState = getNodeClasses(node, hoveredNodeId, prefersReducedMotion);
        const nodeDistance =
          node.size === "primary"
            ? 0
            : node.size === "secondary"
              ? 12
              : 9;
        const ambientTransition =
          allowInteractiveGraph && node.mobileHidden !== true
            ? {
                duration: 6.5 + index * 0.45,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror" as const,
                ease: "easeInOut" as const,
                delay: 0.2 + index * 0.08,
              }
            : undefined;

        return prefersReducedMotion ? (
          <ConnectedNoteNode
            key={node.id}
            node={node}
            innerClassName={hoverState.innerClassName}
          />
        ) : (
          <motion.div
            key={node.id}
            className={cn("absolute inset-0", node.mobileHidden === true && "hidden sm:block")}
            initial={{ opacity: 0, scale: node.size === "primary" ? 0.94 : 0.9, y: nodeDistance }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: node.size === "primary" ? 0.94 : 0.9, y: nodeDistance }
            }
            transition={{
              delay: connectedNotesTiming.nodeDelay + node.revealOrder * connectedNotesTiming.nodeStagger,
              duration:
                node.size === "primary" ? 0.64 : node.size === "secondary" ? 0.54 : 0.44,
              ease: standardEase,
            }}
            onHoverStart={canHover ? () => setHoveredNodeId(node.id) : undefined}
            onHoverEnd={canHover ? () => setHoveredNodeId(null) : undefined}
          >
            <motion.div
              animate={
                ambientTransition
                  ? {
                      x: [0, index % 2 === 0 ? 2 : -2, 0],
                      y: [0, index % 3 === 0 ? -2 : 2, 0],
                    }
                  : undefined
              }
              transition={ambientTransition}
            >
              <ConnectedNoteNode
                node={node}
                innerClassName={hoverState.innerClassName}
              />
            </motion.div>
          </motion.div>
        );
      }),
    [allowInteractiveGraph, canHover, hoveredNodeId, isInView, prefersReducedMotion],
  );

  const renderedPrimaryEdges = useMemo(
    () =>
      primaryEdges.map((edge, index) =>
        prefersReducedMotion ? (
          <ConnectedNoteLink
            key={`${edge.from}-${edge.to}`}
            edge={edge}
            nodesById={nodesById}
            opacity={getEdgeOpacity(edge, hoveredNodeId, prefersReducedMotion)}
          />
        ) : (
          <motion.path
            key={`${edge.from}-${edge.to}`}
            d={(() => {
              const fromNode = nodesById[edge.from];
              const toNode = nodesById[edge.to];
              const controlX = (fromNode.x + toNode.x) / 2;
              const controlY = (fromNode.y + toNode.y) / 2 - (edge.curve ?? 0);
              return `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;
            })()}
            fill="none"
            stroke="var(--network-line)"
            strokeLinecap="round"
            strokeWidth={1.75}
            vectorEffect="non-scaling-stroke"
            className={edge.mobileHidden === true ? "hidden sm:block" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isInView ? 1 : 0,
              opacity: isInView ? getEdgeOpacity(edge, hoveredNodeId, false) : 0,
            }}
            transition={{
              pathLength: {
                delay: connectedNotesTiming.primaryEdgeDelay + index * connectedNotesTiming.primaryEdgeStagger,
                duration: 0.8,
                ease: standardEase,
              },
              opacity: {
                duration: 0.22,
                ease: gentleEase,
              },
            }}
          />
        ),
      ),
    [hoveredNodeId, isInView, prefersReducedMotion],
  );

  const renderedSecondaryEdges = useMemo(
    () =>
      secondaryEdges.map((edge, index) =>
        prefersReducedMotion ? (
          <ConnectedNoteLink
            key={`${edge.from}-${edge.to}`}
            edge={edge}
            nodesById={nodesById}
            opacity={getEdgeOpacity(edge, hoveredNodeId, prefersReducedMotion)}
          />
        ) : (
          <motion.path
            key={`${edge.from}-${edge.to}`}
            d={(() => {
              const fromNode = nodesById[edge.from];
              const toNode = nodesById[edge.to];
              const controlX = (fromNode.x + toNode.x) / 2;
              const controlY = (fromNode.y + toNode.y) / 2 - (edge.curve ?? 0);
              return `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;
            })()}
            fill="none"
            stroke="var(--network-line)"
            strokeLinecap="round"
            strokeWidth={1.1}
            vectorEffect="non-scaling-stroke"
            className={edge.mobileHidden === true ? "hidden sm:block" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isInView ? 1 : 0,
              opacity: isInView ? getEdgeOpacity(edge, hoveredNodeId, false) : 0,
            }}
            transition={{
              pathLength: {
                delay: connectedNotesTiming.secondaryEdgeDelay + index * connectedNotesTiming.secondaryEdgeStagger,
                duration: 0.6,
                ease: standardEase,
              },
              opacity: {
                duration: 0.22,
                ease: gentleEase,
              },
            }}
          />
        ),
      ),
    [hoveredNodeId, isInView, prefersReducedMotion],
  );

  return (
    <div ref={sectionRef} className="mx-auto max-w-[84rem]">
      <ConnectedNotesHeader
        labelSlot={
          prefersReducedMotion ? (
            <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{connectedNotesCopy.label}</span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                delay: connectedNotesTiming.labelDelay,
                duration: 0.54,
                ease: gentleEase,
              }}
              className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{connectedNotesCopy.label}</span>
            </motion.div>
          )
        }
        headingSlot={
          prefersReducedMotion ? (
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {connectedNotesCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {connectedNotesCopy.headingLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0.2, y: "108%" }}
                    animate={isInView ? { opacity: 1, y: "0%" } : { opacity: 0.2, y: "108%" }}
                    transition={{
                      delay: connectedNotesTiming.headingDelay + index * connectedNotesTiming.headingStagger,
                      duration: 0.9,
                      ease: standardEase,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          )
        }
        descriptionSlot={
          prefersReducedMotion ? (
            <p className="mt-6 max-w-[43rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
              {connectedNotesCopy.description}
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-[43rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                delay: connectedNotesTiming.paragraphDelay,
                duration: 0.58,
                ease: gentleEase,
              }}
            >
              {connectedNotesCopy.description}
            </motion.p>
          )
        }
      />

      {prefersReducedMotion ? (
        <ConnectedNotesVisualShell />
      ) : (
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={graphReveal}
        >
          <ConnectedNotesVisualShell
            svgSlot={
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {renderedPrimaryEdges}
                {renderedSecondaryEdges}
              </svg>
            }
            nodeSlot={renderedNodes}
          />
        </motion.div>
      )}

      {prefersReducedMotion ? (
        <ConnectedNotesFeatures />
      ) : (
        <ConnectedNotesFeatures
          itemsSlot={connectedNotesFeatures.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={featureVariants}
              transition={{
                delay: connectedNotesTiming.featureDelay + index * connectedNotesTiming.featureStagger,
                duration: 0.6,
                ease: gentleEase,
              }}
              className="flex gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-primary/12 bg-primary/[0.045] text-primary">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.85} />
              </div>
              <div>
                <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-foreground sm:text-[1.5rem]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-[0.98rem] leading-7 text-muted sm:text-[1.02rem]">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        />
      )}
    </div>
  );
}
