"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  connectedNoteEdges,
  connectedNoteNodes,
  type ConnectedNoteEdge,
  type ConnectedNoteNode,
} from "@/components/sections/connected-notes/connected-notes-data";

type Point = {
  x: number;
  y: number;
};

type Particle = {
  depth: number;
  opacity: number;
  radius: number;
  twinklePhase: number;
  twinkleSpeed: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

type StreamParticle = {
  delay: number;
  duration: number;
  edgeIndex: number;
  size: number;
  tint: number;
};

type SceneMetrics = {
  height: number;
  width: number;
};

const MAX_PIXEL_RATIO = 2;
const MOBILE_BREAKPOINT = 768;
const BASE_PARTICLES = 72;
const MOBILE_PARTICLES = 34;
const BASE_STREAM_PARTICLES = 18;
const MOBILE_STREAM_PARTICLES = 8;

const nodesById = Object.fromEntries(
  connectedNoteNodes.map((node) => [node.id, node]),
) as Readonly<Record<string, ConnectedNoteNode>>;

const streamEdges = connectedNoteEdges.filter((edge) => edge.from === "portfolio-system" || edge.to === "portfolio-system");

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getQuadraticControlPoint(edge: ConnectedNoteEdge) {
  const fromNode = nodesById[edge.from];
  const toNode = nodesById[edge.to];

  return {
    x: (fromNode.x + toNode.x) / 2,
    y: (fromNode.y + toNode.y) / 2 - (edge.curve ?? 0),
  };
}

function getCubicBezierPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const inverseCubed = inverseSquared * inverse;
  const tSquared = t * t;
  const tCubed = tSquared * t;

  return {
    x:
      inverseCubed * p0.x +
      3 * inverseSquared * t * p1.x +
      3 * inverse * tSquared * p2.x +
      tCubed * p3.x,
    y:
      inverseCubed * p0.y +
      3 * inverseSquared * t * p1.y +
      3 * inverse * tSquared * p2.y +
      tCubed * p3.y,
  };
}

function getEdgeCurve(edge: ConnectedNoteEdge, width: number, height: number) {
  const fromNode = nodesById[edge.from];
  const toNode = nodesById[edge.to];
  const control = getQuadraticControlPoint(edge);

  const p0 = { x: (fromNode.x / 100) * width, y: (fromNode.y / 100) * height };
  const p3 = { x: (toNode.x / 100) * width, y: (toNode.y / 100) * height };
  const controlPoint = { x: (control.x / 100) * width, y: (control.y / 100) * height };

  return {
    p0,
    p1: {
      x: lerp(p0.x, controlPoint.x, 0.46),
      y: lerp(p0.y, controlPoint.y, 0.46),
    },
    p2: {
      x: lerp(p3.x, controlPoint.x, 0.46),
      y: lerp(p3.y, controlPoint.y, 0.46),
    },
    p3,
  };
}

function buildAmbientParticles(count: number, width: number, height: number, seed: number) {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, () => {
    const depth = random();
    const centerBias = Math.abs(random() - 0.5) * 2;
    const x = random() * width;
    const y = random() * height;
    const radius = lerp(0.65, 2.15, depth);
    const opacity = lerp(0.18, 0.82, (1 - centerBias * 0.5) * (0.35 + depth * 0.65));

    return {
      depth,
      opacity,
      radius,
      twinklePhase: random() * Math.PI * 2,
      twinkleSpeed: lerp(0.35, 1.15, random()),
      velocityX: lerp(-0.018, 0.018, random()) * (0.5 + depth),
      velocityY: lerp(-0.065, -0.02, random()) * (0.55 + depth),
      x,
      y,
    } satisfies Particle;
  });
}

function buildStreamParticles(count: number, seed: number) {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, (_, index) => ({
    delay: random() * 4.6 + index * 0.08,
    duration: lerp(2.2, 4.4, random()),
    edgeIndex: Math.floor(random() * streamEdges.length),
    size: lerp(1.2, 2.6, random()),
    tint: random(),
  })) satisfies StreamParticle[];
}

type ConnectedNotesSceneProps = {
  active: boolean;
  className?: string;
  reducedMotion?: boolean;
};

export function ConnectedNotesScene({
  active,
  className,
  reducedMotion = false,
}: ConnectedNotesSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const metricsRef = useRef<SceneMetrics>({ height: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const visibleRef = useRef(true);

  const particleSeed = useMemo(() => 12491, []);
  const streamSeed = useMemo(() => 49211, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const node = containerRef.current;
    const canvas = canvasRef.current;

    if (!node || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let destroyed = false;
    let ambientParticles: Particle[] = [];
    const streamParticles = buildStreamParticles(
      isMobile ? MOBILE_STREAM_PARTICLES : BASE_STREAM_PARTICLES,
      streamSeed + (isMobile ? 100 : 0),
    );
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawFrame(performance.now());
    });

    const resizeCanvas = () => {
      const bounds = node.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);

      metricsRef.current = { height, width };
      ambientParticles = buildAmbientParticles(
        isMobile ? MOBILE_PARTICLES : BASE_PARTICLES,
        width,
        height,
        particleSeed + (isMobile ? 100 : 0),
      );
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawBackgroundPanels = (time: number, width: number, height: number) => {
      const panelPositions = [
        { x: 0.16, width: 0.11, alpha: 0.08, offset: 0.35 },
        { x: 0.38, width: 0.14, alpha: 0.12, offset: 0.62 },
        { x: 0.57, width: 0.12, alpha: 0.1, offset: 0.48 },
        { x: 0.76, width: 0.1, alpha: 0.07, offset: 0.18 },
      ];

      panelPositions.forEach((panel, index) => {
        const pulse = 0.86 + Math.sin(time * 0.00018 + panel.offset + index) * 0.14;
        const panelWidth = width * panel.width;
        const x = width * panel.x - panelWidth / 2;
        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, `rgba(173, 204, 255, 0)`);
        gradient.addColorStop(0.24, `rgba(173, 204, 255, ${panel.alpha * pulse})`);
        gradient.addColorStop(0.78, `rgba(115, 146, 255, ${panel.alpha * 0.62 * pulse})`);
        gradient.addColorStop(1, "rgba(173, 204, 255, 0)");
        context.fillStyle = gradient;
        context.fillRect(x, height * 0.08, panelWidth, height * 0.84);
      });
    };

    const drawCentralLight = (time: number, width: number, height: number) => {
      const breath = reducedMotion ? 1 : 0.94 + Math.sin(time * 0.0011) * 0.06;
      const centerX = width * 0.5;
      const baseY = height * 0.79;
      const topY = height * 0.14;

      const outerGlow = context.createRadialGradient(centerX, height * 0.56, 0, centerX, height * 0.56, width * 0.28);
      outerGlow.addColorStop(0, `rgba(162, 196, 255, ${0.22 * breath})`);
      outerGlow.addColorStop(0.36, `rgba(110, 151, 255, ${0.12 * breath})`);
      outerGlow.addColorStop(1, "rgba(18, 26, 46, 0)");
      context.fillStyle = outerGlow;
      context.fillRect(0, 0, width, height);

      const baseGlow = context.createRadialGradient(centerX, baseY, 0, centerX, baseY, width * 0.34);
      baseGlow.addColorStop(0, `rgba(120, 182, 255, ${0.32 * breath})`);
      baseGlow.addColorStop(0.4, `rgba(98, 125, 255, ${0.16 * breath})`);
      baseGlow.addColorStop(1, "rgba(18, 26, 46, 0)");
      context.fillStyle = baseGlow;
      context.fillRect(0, height * 0.58, width, height * 0.36);

      context.save();
      context.globalCompositeOperation = "screen";

      const columnGradient = context.createLinearGradient(centerX, topY, centerX, baseY);
      columnGradient.addColorStop(0, "rgba(176, 225, 255, 0)");
      columnGradient.addColorStop(0.12, `rgba(166, 217, 255, ${0.42 * breath})`);
      columnGradient.addColorStop(0.48, `rgba(115, 196, 255, ${0.32 * breath})`);
      columnGradient.addColorStop(0.88, `rgba(108, 110, 255, ${0.26 * breath})`);
      columnGradient.addColorStop(1, "rgba(170, 215, 255, 0)");
      context.fillStyle = columnGradient;

      context.beginPath();
      context.moveTo(centerX - width * 0.018 * breath, baseY);
      context.bezierCurveTo(
        centerX - width * 0.12 * breath,
        height * 0.58,
        centerX - width * 0.056 * breath,
        height * 0.26,
        centerX,
        topY,
      );
      context.bezierCurveTo(
        centerX + width * 0.056 * breath,
        height * 0.26,
        centerX + width * 0.12 * breath,
        height * 0.58,
        centerX + width * 0.018 * breath,
        baseY,
      );
      context.closePath();
      context.fill();

      const coreGradient = context.createLinearGradient(centerX, topY, centerX, baseY);
      coreGradient.addColorStop(0, "rgba(234, 247, 255, 0)");
      coreGradient.addColorStop(0.22, `rgba(228, 249, 255, ${0.78 * breath})`);
      coreGradient.addColorStop(0.76, `rgba(160, 229, 255, ${0.42 * breath})`);
      coreGradient.addColorStop(1, "rgba(233, 247, 255, 0)");
      context.fillStyle = coreGradient;
      context.fillRect(centerX - width * 0.0095, topY + 10, width * 0.019, baseY - topY);

      context.restore();
    };

    const drawStreamCurves = (time: number, width: number, height: number) => {
      streamEdges.forEach((edge, index) => {
        const curve = getEdgeCurve(edge, width, height);
        const pulse = reducedMotion ? 1 : 0.86 + Math.sin(time * 0.0007 + index * 0.9) * 0.18;

        context.beginPath();
        context.moveTo(curve.p0.x, curve.p0.y);
        context.bezierCurveTo(curve.p1.x, curve.p1.y, curve.p2.x, curve.p2.y, curve.p3.x, curve.p3.y);
        context.strokeStyle =
          edge.strength === "primary"
            ? `rgba(124, 196, 255, ${0.16 * pulse})`
            : `rgba(170, 146, 255, ${0.11 * pulse})`;
        context.lineWidth = edge.strength === "primary" ? 2 : 1.2;
        context.lineCap = "round";
        context.stroke();
      });
    };

    const drawAmbientParticles = (time: number, width: number, height: number) => {
      ambientParticles.forEach((particle, index) => {
        if (!reducedMotion && active && visibleRef.current) {
          particle.x += particle.velocityX * (0.8 + particle.depth);
          particle.y += particle.velocityY * (0.8 + particle.depth);

          if (particle.x < -24) {
            particle.x = width + 24;
          } else if (particle.x > width + 24) {
            particle.x = -24;
          }

          if (particle.y < -24) {
            particle.y = height + 24 + ((index * 11) % 38);
          }
        }

        const centerBias = 1 - Math.min(Math.abs(particle.x - width * 0.5) / (width * 0.5), 1);
        const twinkle = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0016 * particle.twinkleSpeed + particle.twinklePhase) * 0.28;
        const alpha = particle.opacity * twinkle * (0.55 + centerBias * 0.7);

        context.beginPath();
        context.fillStyle = `rgba(195, 223, 255, ${alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawStreamParticles = (time: number, width: number, height: number) => {
      if (reducedMotion) {
        return;
      }

      streamParticles.forEach((particle, index) => {
        const edge = streamEdges[particle.edgeIndex % streamEdges.length];
        const curve = getEdgeCurve(edge, width, height);
        const elapsed = (time * 0.001 + particle.delay + index * 0.12) % particle.duration;
        const progress = elapsed / particle.duration;
        const eased = 1 - Math.pow(1 - progress, 2.2);
        const point = getCubicBezierPoint(eased, curve.p0, curve.p1, curve.p2, curve.p3);
        const brightness = 0.28 + Math.pow(progress, 1.8) * 0.72;
        const hue = particle.tint > 0.56 ? "168, 214, 255" : particle.tint > 0.28 ? "134, 183, 255" : "196, 171, 255";

        context.save();
        context.globalCompositeOperation = "screen";
        context.beginPath();
        context.fillStyle = `rgba(${hue}, ${0.1 + brightness * 0.42})`;
        context.arc(point.x, point.y, particle.size * 2.8, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = `rgba(${hue}, ${0.28 + brightness * 0.58})`;
        context.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const drawFrame = (time: number) => {
      const { width, height } = metricsRef.current;

      if (width === 0 || height === 0) {
        return;
      }

      context.clearRect(0, 0, width, height);
      drawBackgroundPanels(time, width, height);
      drawCentralLight(time, width, height);
      drawStreamCurves(time, width, height);
      drawAmbientParticles(time, width, height);
      drawStreamParticles(time, width, height);
    };

    const animate = (time: number) => {
      if (destroyed) {
        return;
      }

      if (active && visibleRef.current) {
        drawFrame(time);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    drawFrame(performance.now());
    resizeObserver.observe(node);

    if (!reducedMotion) {
      frameRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      destroyed = true;
      resizeObserver.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [active, isMobile, particleSeed, reducedMotion, streamSeed]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
