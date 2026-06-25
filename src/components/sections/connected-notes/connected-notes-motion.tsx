"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ConnectedNotesScene } from "@/components/sections/connected-notes/connected-notes-scene";
import { ConnectedNoteLink } from "@/components/sections/connected-notes/connected-note-link";
import { ConnectedNoteNode } from "@/components/sections/connected-notes/connected-note-node";
import { ConnectedNotesVisualShell } from "@/components/sections/connected-notes/connected-notes-visual";
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

type ActiveNodeId = string | null;

const connectedNotesTiming = {
  labelDelay: 0,
  headingDelay: 0.12,
  headingStagger: 0.1,
  paragraphDelay: 0.42,
  graphDelay: 0.62,
  nodeDelay: 1.08,
  nodeStagger: 0.06,
  featureDelay: 1.86,
  featureStagger: 0.12,
} as const;

const entranceReveal = {
  amount: 0.22,
  margin: "0px 0px -14% 0px",
  once: true,
} as const;

const activityReveal = {
  amount: 0.08,
  margin: "25% 0px 25% 0px",
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

const visibleNodes = [...connectedNoteNodes].sort(
  (left, right) => left.revealOrder - right.revealOrder,
);

const ambientNodeIds = [
  "portfolio-system",
  "architecture",
  "roadmap",
  "user-research",
  "api-design",
  "security-model",
] as const;

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
  activeNodeId: ActiveNodeId,
  shouldReduceMotion: boolean,
) {
  const baseOpacity = edge.strength === "primary" ? 0.28 : 0.12;

  if (shouldReduceMotion || !activeNodeId) {
    return baseOpacity;
  }

  const edgeId = `${edge.from}-${edge.to}`;
  const isConnected = connectionLookup.connectedEdgeIds.get(activeNodeId)?.has(edgeId);

  return isConnected
    ? edge.strength === "primary"
      ? 0.74
      : 0.42
    : baseOpacity * 0.72;
}

function getNodeClasses(
  node: ConnectedNoteNodeType,
  activeNodeId: ActiveNodeId,
  shouldReduceMotion: boolean,
) {
  if (shouldReduceMotion || !activeNodeId) {
    return {
      innerClassName: "",
      wrapperClassName: "",
    };
  }

  const connectedNodes = connectionLookup.connectedNodeIds.get(activeNodeId);
  const isFocused = node.id === activeNodeId;
  const isConnected = connectedNodes?.has(node.id);

  return {
    innerClassName: cn(
      isFocused &&
        "border-primary/32 bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.18),transparent_58%),linear-gradient(180deg,rgba(21,31,56,0.94),rgba(13,19,36,0.98))] shadow-[0_20px_40px_-28px_rgba(56,93,255,0.48),inset_0_1px_0_rgba(255,255,255,0.12)]",
      !isFocused && isConnected && "border-primary/18 bg-[linear-gradient(180deg,rgba(18,26,44,0.88),rgba(11,16,29,0.9))]",
      !isFocused && !isConnected && "opacity-68",
    ),
    wrapperClassName: "",
  };
}

export function ConnectedNotesMotion() {
  const reducedMotionPreference = useReducedMotion();
  const prefersReducedMotion = Boolean(reducedMotionPreference);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(sectionRef, entranceReveal);
  const isSceneActive = useInView(sectionRef, activityReveal);
  const [hoveredNodeId, setHoveredNodeId] = useState<ActiveNodeId>(null);
  const [allowInteractiveGraph, setAllowInteractiveGraph] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    const hoverQuery = window.matchMedia("(min-width: 48rem) and (hover: hover) and (pointer: fine)");

    const updateQueries = () => {
      setIsMobile(mobileQuery.matches);
      setAllowInteractiveGraph(hoverQuery.matches);
    };

    updateQueries();
    mobileQuery.addEventListener("change", updateQueries);
    hoverQuery.addEventListener("change", updateQueries);

    return () => {
      mobileQuery.removeEventListener("change", updateQueries);
      hoverQuery.removeEventListener("change", updateQueries);
    };
  }, []);

  const focusableNodeIds = useMemo(
    () =>
      ambientNodeIds.filter((nodeId) => {
        const node = nodesById[nodeId];
        return !isMobile || !("mobileHidden" in node && node.mobileHidden);
      }),
    [isMobile],
  );

  useEffect(() => {
    if (prefersReducedMotion || !isSceneActive || focusableNodeIds.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFocusIndex((current) => (current + 1) % focusableNodeIds.length);
    }, isMobile ? 2300 : 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [focusableNodeIds.length, isMobile, isSceneActive, prefersReducedMotion]);

  const ambientNodeId =
    focusableNodeIds.length > 0
      ? focusableNodeIds[focusIndex % focusableNodeIds.length]
      : null;
  const activeNodeId = hoveredNodeId ?? ambientNodeId;
  const canHover = !prefersReducedMotion && allowInteractiveGraph;

  const renderedNodes = useMemo(
    () =>
      visibleNodes.map((node, index) => {
        const hoverState = getNodeClasses(node, activeNodeId, prefersReducedMotion);
        const isMobileHidden = "mobileHidden" in node && node.mobileHidden;
        const nodeDistance = node.size === "primary" ? 0 : node.size === "secondary" ? 10 : 8;
        const ambientDuration = 7.2 + index * 0.42;
        const ambientShiftX =
          node.size === "primary" ? 0 : index % 2 === 0 ? 2.4 : -2.2;
        const ambientShiftY =
          node.size === "primary" ? -1.4 : index % 3 === 0 ? -2.4 : 1.8;

        return prefersReducedMotion ? (
          <ConnectedNoteNode key={node.id} node={node} innerClassName={hoverState.innerClassName} />
        ) : (
          <motion.div
            key={node.id}
            className={cn("absolute inset-0", isMobileHidden && "hidden sm:block")}
            initial={{ opacity: 0, scale: node.size === "primary" ? 0.94 : 0.9, y: nodeDistance }}
            animate={
              hasEntered
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: node.size === "primary" ? 0.94 : 0.9, y: nodeDistance }
            }
            transition={{
              delay: connectedNotesTiming.nodeDelay + node.revealOrder * connectedNotesTiming.nodeStagger,
              duration: node.size === "primary" ? 0.66 : node.size === "secondary" ? 0.54 : 0.44,
              ease: standardEase,
            }}
            onHoverStart={canHover ? () => setHoveredNodeId(node.id) : undefined}
            onHoverEnd={canHover ? () => setHoveredNodeId(null) : undefined}
          >
            <motion.div
              animate={
                isSceneActive && !isMobileHidden
                  ? {
                      x: [0, ambientShiftX, 0],
                      y: [0, ambientShiftY, 0],
                    }
                  : undefined
              }
              transition={
                isSceneActive && !isMobileHidden
                  ? {
                      duration: ambientDuration,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: index * 0.12,
                    }
                  : undefined
              }
            >
              <ConnectedNoteNode node={node} innerClassName={hoverState.innerClassName} />
            </motion.div>
          </motion.div>
        );
      }),
    [activeNodeId, canHover, hasEntered, isSceneActive, prefersReducedMotion],
  );

  const renderedEdges = useMemo(
    () =>
      connectedNoteEdges.map((edge, index) =>
        prefersReducedMotion ? (
          <ConnectedNoteLink
            key={`${edge.from}-${edge.to}`}
            edge={edge}
            nodesById={nodesById}
            opacity={getEdgeOpacity(edge, activeNodeId, prefersReducedMotion)}
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
            stroke={edge.strength === "primary" ? "rgba(129,196,255,1)" : "rgba(173,157,255,1)"}
            strokeLinecap="round"
            strokeWidth={edge.strength === "primary" ? 1.55 : 1.05}
            vectorEffect="non-scaling-stroke"
            className={("mobileHidden" in edge && edge.mobileHidden) ? "hidden sm:block" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: hasEntered ? 1 : 0,
              opacity: hasEntered ? getEdgeOpacity(edge, activeNodeId, false) : 0,
            }}
            transition={{
              pathLength: {
                delay: connectedNotesTiming.graphDelay + 0.24 + index * 0.045,
                duration: edge.strength === "primary" ? 0.82 : 0.62,
                ease: standardEase,
              },
              opacity: {
                duration: 0.46,
                ease: gentleEase,
              },
            }}
          />
        ),
      ),
    [activeNodeId, hasEntered, prefersReducedMotion],
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
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
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
                    animate={hasEntered ? { opacity: 1, y: "0%" } : { opacity: 0.2, y: "108%" }}
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
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
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
        <ConnectedNotesVisualShell
          canvasSlot={<ConnectedNotesScene active={false} reducedMotion className="absolute inset-0" />}
          svgSlot={
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {connectedNoteEdges.map((edge) => (
                <ConnectedNoteLink
                  key={`${edge.from}-${edge.to}`}
                  edge={edge}
                  nodesById={nodesById}
                  opacity={getEdgeOpacity(edge, null, true)}
                />
              ))}
            </svg>
          }
          foregroundSlot={
            <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.38),rgba(8,12,24,0.62))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] sm:inset-x-7 sm:bottom-7 sm:px-5">
              <p className="max-w-none text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-primary-soft/84">
                Connected context
              </p>
              <p className="mt-2 max-w-[26rem] text-[0.92rem] leading-6 text-white/74">
                Keep projects, decisions, research, and implementation notes flowing into one connected workspace.
              </p>
            </div>
          }
        />
      ) : (
        <motion.div initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={graphReveal}>
          <ConnectedNotesVisualShell
            canvasSlot={<ConnectedNotesScene active={isSceneActive} className="absolute inset-0" />}
            svgSlot={
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {renderedEdges}
              </svg>
            }
            nodeSlot={renderedNodes}
            foregroundSlot={
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{
                  delay: connectedNotesTiming.graphDelay + 0.48,
                  duration: 0.72,
                  ease: gentleEase,
                }}
                className="pointer-events-none absolute inset-x-5 bottom-5 rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.34),rgba(8,12,24,0.64))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] sm:inset-x-7 sm:bottom-7 sm:px-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="max-w-none text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-primary-soft/84">
                    {activeNodeId ? `${nodesById[activeNodeId].title} active` : "Connected context"}
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-soft/74" />
                  <p className="max-w-none text-[0.74rem] uppercase tracking-[0.14em] text-white/46">
                    persistent knowledge flow
                  </p>
                </div>
                <p className="mt-2 max-w-[28rem] text-[0.92rem] leading-6 text-white/74">
                  Keep projects, decisions, research, and implementation notes flowing into one connected workspace.
                </p>
              </motion.div>
            }
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
              animate={hasEntered ? "visible" : "hidden"}
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
