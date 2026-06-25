"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

type FlowPath = {
  color: "blue" | "cyan" | "violet";
  opacity: number;
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
  width: number;
};

type FlowParticle = {
  delay: number;
  duration: number;
  pathIndex: number;
  radius: number;
  tint: number;
  trail: number;
};

type RisingParticle = {
  delay: number;
  drift: number;
  duration: number;
  radius: number;
  xOffset: number;
};

type SceneMetrics = {
  height: number;
  width: number;
};

const MAX_PIXEL_RATIO = 2;
const MOBILE_BREAKPOINT = 768;
const BASE_PARTICLES = 42;
const MOBILE_PARTICLES = 22;
const BASE_FLOW_PARTICLES = 24;
const MOBILE_FLOW_PARTICLES = 12;
const BASE_RISING_PARTICLES = 18;
const MOBILE_RISING_PARTICLES = 10;

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

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function getCubicBezierPoint(
  t: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point {
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

function buildAmbientParticles(
  count: number,
  width: number,
  height: number,
  seed: number,
) {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, () => {
    const depth = random();

    return {
      depth,
      opacity: lerp(0.14, 0.42, random()),
      radius: lerp(0.5, 1.85, depth),
      twinklePhase: random() * Math.PI * 2,
      twinkleSpeed: lerp(0.28, 1.05, random()),
      velocityX: lerp(-0.014, 0.014, random()) * (0.45 + depth),
      velocityY: lerp(-0.06, -0.016, random()) * (0.55 + depth),
      x: random() * width,
      y: random() * height,
    } satisfies Particle;
  });
}

function buildFlowParticles(count: number, pathCount: number, seed: number) {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, (_, index) => ({
    delay: random() * 5.2 + index * 0.11,
    duration: lerp(2.4, 4.8, random()),
    pathIndex: Math.floor(random() * pathCount),
    radius: lerp(1.1, 2.5, random()),
    tint: random(),
    trail: lerp(0.03, 0.085, random()),
  })) satisfies FlowParticle[];
}

function buildRisingParticles(count: number, seed: number) {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, (_, index) => ({
    delay: random() * 4.2 + index * 0.09,
    drift: lerp(8, 24, random()),
    duration: lerp(2.8, 5.1, random()),
    radius: lerp(1, 2.25, random()),
    xOffset: lerp(-18, 18, random()),
  })) satisfies RisingParticle[];
}

function buildFlowPaths(width: number, height: number, isMobile: boolean): FlowPath[] {
  const specs = isMobile
    ? [
        [0.08, 0.9, 0.18, 0.82, 0.33, 0.69, 0.48, 0.66, 2.1, 0.22, "blue"],
        [0.16, 0.82, 0.24, 0.74, 0.38, 0.64, 0.5, 0.62, 1.4, 0.18, "cyan"],
        [0.92, 0.9, 0.81, 0.81, 0.68, 0.7, 0.53, 0.66, 2, 0.21, "blue"],
        [0.82, 0.82, 0.72, 0.74, 0.61, 0.64, 0.5, 0.62, 1.35, 0.17, "violet"],
      ]
    : [
        [0.04, 0.93, 0.15, 0.87, 0.32, 0.72, 0.48, 0.66, 2.5, 0.24, "blue"],
        [0.12, 0.88, 0.21, 0.78, 0.36, 0.68, 0.49, 0.63, 1.95, 0.19, "cyan"],
        [0.18, 0.83, 0.28, 0.75, 0.4, 0.64, 0.5, 0.6, 1.5, 0.16, "blue"],
        [0.26, 0.78, 0.34, 0.71, 0.44, 0.62, 0.51, 0.58, 1.1, 0.12, "violet"],
        [0.96, 0.93, 0.84, 0.87, 0.67, 0.73, 0.52, 0.66, 2.45, 0.23, "blue"],
        [0.88, 0.87, 0.78, 0.78, 0.64, 0.67, 0.51, 0.63, 1.9, 0.18, "cyan"],
        [0.8, 0.81, 0.7, 0.73, 0.6, 0.63, 0.5, 0.6, 1.45, 0.15, "blue"],
        [0.72, 0.77, 0.64, 0.69, 0.56, 0.61, 0.5, 0.58, 1.05, 0.11, "violet"],
      ];

  return specs.map(
    ([x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, opacity, color]) => ({
      color: color as FlowPath["color"],
      opacity: opacity as number,
      p0: { x: (x0 as number) * width, y: (y0 as number) * height },
      p1: { x: (x1 as number) * width, y: (y1 as number) * height },
      p2: { x: (x2 as number) * width, y: (y2 as number) * height },
      p3: { x: (x3 as number) * width, y: (y3 as number) * height },
      width: lineWidth as number,
    }),
  );
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
  const flowSeed = useMemo(() => 24811, []);
  const risingSeed = useMemo(() => 51391, []);

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
    let flowPaths: FlowPath[] = [];
    let flowParticles: FlowParticle[] = [];
    let risingParticles: RisingParticle[] = [];

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
      flowPaths = buildFlowPaths(width, height, isMobile);
      ambientParticles = buildAmbientParticles(
        isMobile ? MOBILE_PARTICLES : BASE_PARTICLES,
        width,
        height,
        particleSeed + (isMobile ? 100 : 0),
      );
      flowParticles = buildFlowParticles(
        isMobile ? MOBILE_FLOW_PARTICLES : BASE_FLOW_PARTICLES,
        flowPaths.length,
        flowSeed + (isMobile ? 100 : 0),
      );
      risingParticles = buildRisingParticles(
        isMobile ? MOBILE_RISING_PARTICLES : BASE_RISING_PARTICLES,
        risingSeed + (isMobile ? 100 : 0),
      );

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawBackgroundPanels = (time: number, width: number, height: number) => {
      const panels = [
        { alpha: 0.075, offset: 0.2, widthRatio: 0.045, x: 0.16 },
        { alpha: 0.085, offset: 0.56, widthRatio: 0.055, x: 0.34 },
        { alpha: 0.07, offset: 0.9, widthRatio: 0.04, x: 0.54 },
        { alpha: 0.08, offset: 0.36, widthRatio: 0.048, x: 0.74 },
      ];

      panels.forEach((panel, index) => {
        const pulse = reducedMotion
          ? 1
          : 0.88 + Math.sin(time * 0.00012 + panel.offset + index) * 0.12;
        const panelWidth = width * panel.widthRatio;
        const x = width * panel.x - panelWidth / 2;
        const gradient = context.createLinearGradient(0, height * 0.04, 0, height * 0.96);
        gradient.addColorStop(0, "rgba(49, 73, 122, 0)");
        gradient.addColorStop(0.18, `rgba(42, 60, 104, ${panel.alpha * pulse})`);
        gradient.addColorStop(0.55, `rgba(28, 43, 80, ${panel.alpha * 0.86 * pulse})`);
        gradient.addColorStop(1, "rgba(8, 14, 28, 0)");
        context.fillStyle = gradient;
        context.fillRect(x, height * 0.06, panelWidth, height * 0.88);
      });
    };

    const drawBottomBloom = (time: number, width: number, height: number) => {
      const breath = reducedMotion ? 1 : 0.96 + Math.sin(time * 0.00054) * 0.04;
      const centerX = width * 0.5;
      const spreadY = height * 0.68;
      const baseY = height * 0.94;

      context.save();
      context.globalCompositeOperation = "screen";

      const fieldGlow = context.createRadialGradient(
        centerX,
        height * 0.8,
        0,
        centerX,
        height * 0.8,
        width * 0.42,
      );
      fieldGlow.addColorStop(0, `rgba(110, 174, 255, ${0.34 * breath})`);
      fieldGlow.addColorStop(0.38, `rgba(67, 115, 255, ${0.18 * breath})`);
      fieldGlow.addColorStop(1, "rgba(5, 10, 22, 0)");
      context.fillStyle = fieldGlow;
      context.fillRect(0, height * 0.55, width, height * 0.45);

      const layers = [
        { alpha: 0.22, blur: 24, left: -0.12, right: 1.12, crest: 0.76, color: "92, 156, 255" },
        { alpha: 0.16, blur: 18, left: -0.06, right: 1.06, crest: 0.72, color: "124, 110, 255" },
        { alpha: 0.19, blur: 14, left: 0.02, right: 0.98, crest: 0.69, color: "148, 204, 255" },
      ];

      layers.forEach((layer, index) => {
        context.save();
        context.filter = `blur(${layer.blur}px)`;
        context.beginPath();
        context.moveTo(width * layer.left, baseY);
        context.bezierCurveTo(
          width * (0.08 + index * 0.02),
          height * 0.9,
          width * 0.22,
          height * layer.crest,
          centerX,
          spreadY,
        );
        context.bezierCurveTo(
          width * 0.78,
          height * layer.crest,
          width * (0.92 - index * 0.02),
          height * 0.9,
          width * layer.right,
          baseY,
        );
        context.lineTo(width * layer.right, height * 1.04);
        context.bezierCurveTo(
          width * 0.82,
          height * 1.02,
          width * 0.18,
          height * 1.02,
          width * layer.left,
          height * 1.04,
        );
        context.closePath();

        const gradient = context.createLinearGradient(centerX, spreadY, centerX, height);
        gradient.addColorStop(0, `rgba(${layer.color}, ${layer.alpha * breath})`);
        gradient.addColorStop(0.6, `rgba(${layer.color}, ${layer.alpha * 0.46 * breath})`);
        gradient.addColorStop(1, "rgba(12, 22, 46, 0)");
        context.fillStyle = gradient;
        context.fill();
        context.restore();
      });

      context.restore();
    };

    const drawFlowStrands = (time: number) => {
      context.save();
      context.globalCompositeOperation = "screen";

      flowPaths.forEach((path, index) => {
        const pulse = reducedMotion
          ? 1
          : 0.82 + Math.sin(time * 0.00042 + index * 0.78) * 0.18;
        const colors =
          path.color === "violet"
            ? ["rgba(120, 144, 255, 0)", `rgba(155, 136, 255, ${path.opacity * pulse})`, "rgba(234, 244, 255, 0)"]
            : path.color === "cyan"
              ? ["rgba(129, 212, 255, 0)", `rgba(160, 231, 255, ${path.opacity * pulse})`, "rgba(234, 244, 255, 0)"]
              : ["rgba(84, 126, 255, 0)", `rgba(118, 182, 255, ${path.opacity * pulse})`, "rgba(234, 244, 255, 0)"];

        const gradient = context.createLinearGradient(
          path.p0.x,
          path.p0.y,
          path.p3.x,
          path.p3.y,
        );
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.54, colors[1]);
        gradient.addColorStop(1, colors[2]);

        context.beginPath();
        context.moveTo(path.p0.x, path.p0.y);
        context.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
        context.strokeStyle = gradient;
        context.lineWidth = path.width;
        context.lineCap = "round";
        context.stroke();

        context.beginPath();
        context.moveTo(path.p0.x, path.p0.y);
        context.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
        context.strokeStyle = `rgba(230, 244, 255, ${path.opacity * 0.16 * pulse})`;
        context.lineWidth = Math.max(0.6, path.width * 0.3);
        context.lineCap = "round";
        context.stroke();
      });

      context.restore();
    };

    const drawCentralBeam = (time: number, width: number, height: number) => {
      const centerX = width * 0.5;
      const topY = height * 0.035;
      const convergeY = height * 0.66;
      const lowerY = height * 0.88;
      const breath = reducedMotion ? 1 : 0.96 + Math.sin(time * 0.00085) * 0.04;

      const fillBeamLayer = ({
        alpha,
        blur,
        colorStops,
        flareWidth,
        lowerWidth,
        midWidth,
        topWidth,
      }: {
        alpha: number;
        blur: number;
        colorStops: readonly [string, string, string];
        flareWidth: number;
        lowerWidth: number;
        midWidth: number;
        topWidth: number;
      }) => {
        context.save();
        context.globalCompositeOperation = "screen";
        context.filter = blur > 0 ? `blur(${blur}px)` : "none";

        const gradient = context.createLinearGradient(centerX, topY, centerX, lowerY);
        gradient.addColorStop(0, colorStops[0]);
        gradient.addColorStop(0.5, colorStops[1].replace("{alpha}", `${alpha * breath}`));
        gradient.addColorStop(1, colorStops[2].replace("{alpha}", `${alpha * 0.92 * breath}`));

        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(centerX - topWidth, topY);
        context.bezierCurveTo(
          centerX - topWidth * 1.8,
          height * 0.14,
          centerX - midWidth,
          height * 0.38,
          centerX - lowerWidth,
          convergeY,
        );
        context.bezierCurveTo(
          centerX - flareWidth,
          height * 0.79,
          centerX - flareWidth * 0.9,
          lowerY,
          centerX - flareWidth * 0.76,
          lowerY,
        );
        context.lineTo(centerX + flareWidth * 0.76, lowerY);
        context.bezierCurveTo(
          centerX + flareWidth * 0.9,
          lowerY,
          centerX + flareWidth,
          height * 0.79,
          centerX + lowerWidth,
          convergeY,
        );
        context.bezierCurveTo(
          centerX + midWidth,
          height * 0.38,
          centerX + topWidth * 1.8,
          height * 0.14,
          centerX + topWidth,
          topY,
        );
        context.closePath();
        context.fill();
        context.restore();
      };

      const verticalGlow = context.createRadialGradient(
        centerX,
        height * 0.44,
        0,
        centerX,
        height * 0.44,
        width * 0.14,
      );
      verticalGlow.addColorStop(0, `rgba(178, 226, 255, ${0.26 * breath})`);
      verticalGlow.addColorStop(0.5, `rgba(104, 162, 255, ${0.12 * breath})`);
      verticalGlow.addColorStop(1, "rgba(8, 14, 28, 0)");
      context.fillStyle = verticalGlow;
      context.fillRect(centerX - width * 0.16, height * 0.04, width * 0.32, height * 0.76);

      fillBeamLayer({
        alpha: 0.2,
        blur: 22,
        colorStops: [
          "rgba(160, 162, 255, 0)",
          "rgba(116, 116, 255, {alpha})",
          "rgba(96, 76, 255, {alpha})",
        ],
        flareWidth: width * 0.17,
        lowerWidth: width * 0.085,
        midWidth: width * 0.055,
        topWidth: width * 0.005,
      });
      fillBeamLayer({
        alpha: 0.26,
        blur: 14,
        colorStops: [
          "rgba(190, 232, 255, 0)",
          "rgba(116, 186, 255, {alpha})",
          "rgba(98, 146, 255, {alpha})",
        ],
        flareWidth: width * 0.13,
        lowerWidth: width * 0.064,
        midWidth: width * 0.038,
        topWidth: width * 0.0036,
      });
      fillBeamLayer({
        alpha: 0.34,
        blur: 8,
        colorStops: [
          "rgba(218, 245, 255, 0)",
          "rgba(168, 238, 255, {alpha})",
          "rgba(120, 202, 255, {alpha})",
        ],
        flareWidth: width * 0.086,
        lowerWidth: width * 0.04,
        midWidth: width * 0.021,
        topWidth: width * 0.0022,
      });
      fillBeamLayer({
        alpha: 0.42,
        blur: 3,
        colorStops: [
          "rgba(255, 255, 255, 0)",
          "rgba(244, 251, 255, {alpha})",
          "rgba(208, 242, 255, {alpha})",
        ],
        flareWidth: width * 0.038,
        lowerWidth: width * 0.014,
        midWidth: width * 0.008,
        topWidth: width * 0.0012,
      });

      context.save();
      context.globalCompositeOperation = "screen";
      const convergenceGlow = context.createRadialGradient(
        centerX,
        convergeY,
        0,
        centerX,
        convergeY,
        width * 0.16,
      );
      convergenceGlow.addColorStop(0, `rgba(228, 247, 255, ${0.34 * breath})`);
      convergenceGlow.addColorStop(0.18, `rgba(144, 208, 255, ${0.26 * breath})`);
      convergenceGlow.addColorStop(0.58, `rgba(88, 132, 255, ${0.12 * breath})`);
      convergenceGlow.addColorStop(1, "rgba(8, 14, 28, 0)");
      context.fillStyle = convergenceGlow;
      context.fillRect(centerX - width * 0.18, height * 0.48, width * 0.36, height * 0.36);
      context.restore();
    };

    const drawAmbientParticles = (time: number, width: number, height: number) => {
      ambientParticles.forEach((particle, index) => {
        if (!reducedMotion && active && visibleRef.current) {
          particle.x += particle.velocityX * (0.7 + particle.depth);
          particle.y += particle.velocityY * (0.75 + particle.depth);

          if (particle.x < -20) {
            particle.x = width + 20;
          } else if (particle.x > width + 20) {
            particle.x = -20;
          }

          if (particle.y < -20) {
            particle.y = height + 20 + ((index * 17) % 44);
          }
        }

        const twinkle = reducedMotion
          ? 1
          : 0.72 +
            Math.sin(time * 0.00135 * particle.twinkleSpeed + particle.twinklePhase) * 0.28;
        const alpha = particle.opacity * twinkle;

        context.beginPath();
        context.fillStyle = `rgba(202, 223, 255, ${alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawFlowParticles = (time: number) => {
      if (reducedMotion) {
        return;
      }

      const seconds = time * 0.001;

      flowParticles.forEach((particle, index) => {
        const path = flowPaths[particle.pathIndex % flowPaths.length];
        const loop = (seconds + particle.delay + index * 0.04) % particle.duration;
        const progress = loop / particle.duration;
        const eased = easeOutCubic(progress);
        const point = getCubicBezierPoint(eased, path.p0, path.p1, path.p2, path.p3);
        const previous = getCubicBezierPoint(
          Math.max(0, eased - particle.trail),
          path.p0,
          path.p1,
          path.p2,
          path.p3,
        );
        const fade = Math.sin(progress * Math.PI);
        const brightness = 0.32 + fade * 0.68;
        const hue =
          particle.tint > 0.72
            ? "206, 238, 255"
            : particle.tint > 0.36
              ? "148, 204, 255"
              : "158, 142, 255";

        context.save();
        context.globalCompositeOperation = "screen";
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(point.x, point.y);
        context.strokeStyle = `rgba(${hue}, ${0.14 + brightness * 0.26})`;
        context.lineWidth = particle.radius * 1.35;
        context.lineCap = "round";
        context.stroke();

        context.beginPath();
        context.fillStyle = `rgba(${hue}, ${0.24 + brightness * 0.58})`;
        context.arc(point.x, point.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const drawRisingParticles = (time: number, width: number, height: number) => {
      const centerX = width * 0.5;
      const startY = height * 0.67;
      const topY = height * 0.05;

      risingParticles.forEach((particle, index) => {
        const progress = reducedMotion
          ? 0.55
          : ((time * 0.001 + particle.delay + index * 0.05) % particle.duration) /
            particle.duration;
        const eased = easeOutCubic(progress);
        const trailProgress = Math.max(0, eased - 0.08);
        const drift = Math.sin(index * 1.4 + progress * Math.PI * 2) * particle.drift * (1 - eased);
        const x = centerX + particle.xOffset * (1 - eased) * 0.45 + drift * 0.22;
        const y = lerp(startY, topY, eased);
        const trailY = lerp(startY, topY, trailProgress);
        const radius = particle.radius * (1 - eased * 0.6);
        const alpha = reducedMotion ? 0.36 : 0.12 + Math.sin(progress * Math.PI) * 0.42;

        context.save();
        context.globalCompositeOperation = "screen";
        context.beginPath();
        context.moveTo(x, trailY);
        context.lineTo(x, y);
        context.strokeStyle = `rgba(204, 238, 255, ${alpha * 0.66})`;
        context.lineWidth = Math.max(0.8, radius * 1.1);
        context.lineCap = "round";
        context.stroke();

        context.beginPath();
        context.fillStyle = `rgba(230, 246, 255, ${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
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
      drawBottomBloom(time, width, height);
      drawFlowStrands(time);
      drawCentralBeam(time, width, height);
      drawAmbientParticles(time, width, height);
      drawFlowParticles(time);
      drawRisingParticles(time, width, height);
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
  }, [active, flowSeed, isMobile, particleSeed, reducedMotion, risingSeed]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
