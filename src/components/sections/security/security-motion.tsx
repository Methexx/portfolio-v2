"use client";

import { Database, Fingerprint, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  securityAccessItems,
  securityCipherLines,
  securityCopy,
  securityCoreTags,
  securityDataItems,
  securityFeatures,
} from "@/components/sections/security/security-data";
import { SecurityDataCard } from "@/components/sections/security/security-data-card";
import { SecurityFeatures } from "@/components/sections/security/security-features";
import { SecurityHeader } from "@/components/sections/security/security-header";
import { SecurityScramblePreview } from "@/components/sections/security/security-scramble-preview";
import { SecurityVisual } from "@/components/sections/security/security-visual";
import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

const scrambleCharset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-=?/";

const securityTiming = {
  accessDelay: 1.86,
  accessRowStagger: 0.06,
  accessSurfaceDelay: 1.74,
  cardStagger: 0.07,
  cipherBlockDelay: 0,
  cipherFrameMs: 44,
  cipherLineDurationMs: 900,
  cipherLineStaggerMs: 110,
  coreDelay: 1.56,
  coreInnerDelay: 1.72,
  dataDelay: 1.28,
  dataHeadingDelay: 1.18,
  featureDelay: 2.28,
  featureStagger: 0.12,
  headerDelay: 1.18,
  headerHeadingDelay: 1.26,
  headerLineStagger: 0.1,
  paragraphDelay: 1.52,
  pathDelay: 1.1,
  pathStagger: 0.08,
  visualDelay: 1.62,
} as const;

const mobileTiming = {
  ...securityTiming,
  accessDelay: 1.82,
  accessRowStagger: 0.05,
  accessSurfaceDelay: 1.74,
  cardStagger: 0.055,
  cipherFrameMs: 50,
  cipherLineDurationMs: 760,
  cipherLineStaggerMs: 90,
  coreDelay: 1.48,
  coreInnerDelay: 1.6,
  dataDelay: 1.62,
  dataHeadingDelay: 1.56,
  featureDelay: 2.12,
  featureStagger: 0.1,
  headerDelay: 0.98,
  headerHeadingDelay: 1.08,
  paragraphDelay: 1.34,
  pathDelay: 0,
  pathStagger: 0,
  visualDelay: 1.4,
} as const;

const sectionReveal = {
  amount: 0.22,
  margin: "0px 0px -16% 0px",
  once: true,
} as const;

const visualReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.984 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: standardEase,
    },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: gentleEase,
    },
  },
};

function hashSeed(lineIndex: number, characterIndex: number) {
  return (lineIndex + 1) * 131 + (characterIndex + 3) * 17;
}

function getScrambleCharacter(
  lineIndex: number,
  characterIndex: number,
  frame: number,
) {
  const seed = hashSeed(lineIndex, characterIndex);
  const nextIndex = (seed + frame * 7 + lineIndex * 11) % scrambleCharset.length;
  return scrambleCharset[nextIndex];
}

function buildCipherFrame(
  target: string,
  lineIndex: number,
  progress: number,
  frame: number,
) {
  const maxResolvedIndex = Math.floor(progress * target.length);

  return target
    .split("")
    .map((character, characterIndex) => {
      if (character === " ") {
        return " ";
      }

      const resolveOffset = hashSeed(lineIndex, characterIndex) % 3;
      const threshold = Math.min(characterIndex + resolveOffset, target.length);

      if (maxResolvedIndex >= threshold) {
        return character;
      }

      return getScrambleCharacter(lineIndex, characterIndex, frame);
    })
    .join("");
}

export function SecurityMotion() {
  const reducedMotionPreference = useReducedMotion();
  const shouldReduceMotion = Boolean(reducedMotionPreference);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, sectionReveal);
  const [isMobile, setIsMobile] = useState(false);
  const [allowHover, setAllowHover] = useState(false);
  const [cipherLines, setCipherLines] = useState<string[]>([...securityCipherLines]);

  const hasStartedRef = useRef(false);
  const runIdRef = useRef(0);
  const intervalIdsRef = useRef<number[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateQueries = () => {
      setIsMobile(mobileQuery.matches);
      setAllowHover(hoverQuery.matches);
    };

    updateQueries();
    mobileQuery.addEventListener("change", updateQueries);
    hoverQuery.addEventListener("change", updateQueries);

    return () => {
      mobileQuery.removeEventListener("change", updateQueries);
      hoverQuery.removeEventListener("change", updateQueries);
    };
  }, []);

  const timing = isMobile ? mobileTiming : securityTiming;
  const canHover = allowHover && !shouldReduceMotion;
  const isActive = shouldReduceMotion || isInView;

  const visibleCipherLines = useMemo(() => securityCipherLines, []);

  const visualTransition: Transition = {
    delay: timing.visualDelay,
    duration: isMobile ? 0.9 : 1.02,
    ease: standardEase,
  };

  useEffect(() => {
    return () => {
      intervalIdsRef.current.forEach((intervalId) => window.clearInterval(intervalId));
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      intervalIdsRef.current = [];
      timeoutIdsRef.current = [];
      runIdRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    runIdRef.current += 1;
    const currentRunId = runIdRef.current;

    intervalIdsRef.current.forEach((intervalId) => window.clearInterval(intervalId));
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    intervalIdsRef.current = [];
    timeoutIdsRef.current = [];

    visibleCipherLines.forEach((target, lineIndex) => {
      const lineStartDelay = lineIndex * timing.cipherLineStaggerMs;
      const timeoutId = window.setTimeout(() => {
        if (runIdRef.current !== currentRunId) {
          return;
        }

        const startedAt = window.performance.now();
        let frame = 0;

        const intervalId = window.setInterval(() => {
          if (runIdRef.current !== currentRunId) {
            window.clearInterval(intervalId);
            return;
          }

          const elapsed = window.performance.now() - startedAt;
          const progress = Math.min(elapsed / timing.cipherLineDurationMs, 1);

          setCipherLines((current) => {
            const next = [...current];
            next[lineIndex] = buildCipherFrame(target, lineIndex, progress, frame);
            return next;
          });

          frame += 1;

          if (progress >= 1) {
            window.clearInterval(intervalId);
            setCipherLines((current) => {
              const next = [...current];
              next[lineIndex] = target;
              return next;
            });
          }
        }, timing.cipherFrameMs);

        intervalIdsRef.current.push(intervalId);
      }, lineStartDelay);

      timeoutIdsRef.current.push(timeoutId);
    });
  }, [isInView, shouldReduceMotion, timing.cipherFrameMs, timing.cipherLineDurationMs, timing.cipherLineStaggerMs, visibleCipherLines]);

  return (
    <div ref={sectionRef} className="mx-auto max-w-[84rem]">
      {shouldReduceMotion ? (
        <SecurityScramblePreview lines={visibleCipherLines} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            delay: timing.cipherBlockDelay,
            duration: 0.48,
            ease: gentleEase,
          }}
        >
          <SecurityScramblePreview lines={cipherLines} />
        </motion.div>
      )}

      <SecurityHeader
        labelSlot={
          shouldReduceMotion ? (
            <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{securityCopy.label}</span>
            </div>
          ) : (
            <motion.div
              className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                delay: timing.headerDelay,
                duration: 0.5,
                ease: gentleEase,
              }}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>{securityCopy.label}</span>
            </motion.div>
          )
        }
        headingSlot={
          shouldReduceMotion ? (
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {securityCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {securityCopy.headingLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0.18, y: "108%" }}
                    animate={isActive ? { opacity: 1, y: "0%" } : { opacity: 0.18, y: "108%" }}
                    transition={{
                      delay: timing.headerHeadingDelay + index * timing.headerLineStagger,
                      duration: isMobile ? 0.76 : 0.88,
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
          shouldReduceMotion ? (
            <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]">
              {securityCopy.description}
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
              initial={{ opacity: 0, y: isMobile ? 10 : 14 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 14 }}
              transition={{
                delay: timing.paragraphDelay,
                duration: 0.56,
                ease: gentleEase,
              }}
            >
              {securityCopy.description}
            </motion.p>
          )
        }
      />

      {shouldReduceMotion ? (
        <SecurityVisual />
      ) : (
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={visualReveal}
          transition={visualTransition}
        >
          <SecurityVisual
            dataHeadingSlot={
              <motion.div
                initial={{ opacity: 0, x: isMobile ? -8 : -12, y: 6 }}
                animate={isActive ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isMobile ? -8 : -12, y: 6 }}
                transition={{
                  delay: timing.dataHeadingDelay,
                  duration: 0.46,
                  ease: gentleEase,
                }}
                className="rounded-[1.4rem] border border-security-border bg-security-panel px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <p className="max-w-none text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-security-status">
                  Encrypted records
                </p>
              </motion.div>
            }
            dataCardsSlot={securityDataItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isMobile ? -10 : -16, y: 8, scale: 0.988 }}
                animate={
                  isActive
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: isMobile ? -10 : -16, y: 8, scale: 0.988 }
                }
                transition={{
                  delay: timing.dataDelay + index * timing.cardStagger,
                  duration: 0.48,
                  ease: standardEase,
                }}
              >
                <SecurityDataCard
                  item={item}
                  className={cn(
                    canHover &&
                      "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/22 hover:bg-security-panel-muted/90",
                  )}
                />
              </motion.div>
            ))}
            centerPanelSlot={
              <div className="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-security-border bg-[radial-gradient(circle_at_center,rgba(109,61,245,0.16),transparent_32%),linear-gradient(180deg,rgba(34,24,48,0.94),rgba(21,15,31,0.94))] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-[28rem]">
                <svg
                  className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {[
                    { delay: timing.pathDelay, d: "M 0 45 Q 18 40 32 50", opacity: 0.22, width: 1 },
                    { delay: timing.pathDelay + timing.pathStagger, d: "M 68 50 Q 82 40 100 45", opacity: 0.22, width: 1 },
                    { delay: timing.pathDelay + timing.pathStagger * 2, d: "M 0 60 Q 18 58 32 52", opacity: 0.14, width: 0.8 },
                    { delay: timing.pathDelay + timing.pathStagger * 3, d: "M 68 52 Q 82 58 100 60", opacity: 0.14, width: 0.8 },
                  ].map((path) => (
                    <motion.path
                      key={path.d}
                      d={path.d}
                      fill="none"
                      stroke="rgba(194,178,255,1)"
                      strokeWidth={path.width}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        isActive
                          ? { pathLength: 1, opacity: path.opacity }
                          : { pathLength: 0, opacity: 0 }
                      }
                      transition={{
                        delay: path.delay,
                        duration: 0.62,
                        ease: standardEase,
                      }}
                    />
                  ))}
                </svg>

                <motion.div
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: isMobile ? 12 : 16, scale: 0.92 }}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: isMobile ? 12 : 16, scale: 0.92 }
                  }
                  transition={{
                    delay: timing.coreDelay,
                    duration: 0.74,
                    ease: standardEase,
                  }}
                >
                  <motion.div
                    className="absolute h-[15.5rem] w-[15.5rem] rounded-full border border-primary/16 sm:h-[18rem] sm:w-[18rem]"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                    transition={{
                      delay: timing.coreInnerDelay,
                      duration: 0.56,
                      ease: gentleEase,
                    }}
                  />
                  <motion.div
                    className="absolute h-[12.5rem] w-[12.5rem] rounded-full border border-primary/18 sm:h-[14.5rem] sm:w-[14.5rem]"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                    transition={{
                      delay: timing.coreInnerDelay + 0.08,
                      duration: 0.54,
                      ease: gentleEase,
                    }}
                  />
                  <motion.div
                    className="absolute h-[9rem] w-[9rem] rounded-full border border-primary/20 sm:h-[10.5rem] sm:w-[10.5rem]"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                    transition={{
                      delay: timing.coreInnerDelay + 0.14,
                      duration: 0.52,
                      ease: gentleEase,
                    }}
                  />

                  <motion.div
                    className="relative flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-[2rem] border border-primary/16 bg-[radial-gradient(circle_at_top,rgba(157,125,255,0.22),transparent_56%),rgba(30,21,44,0.96)] shadow-[0_16px_40px_-30px_rgba(157,125,255,0.65)] sm:h-[10rem] sm:w-[10rem]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{
                      delay: timing.coreInnerDelay + 0.12,
                      duration: 0.56,
                      ease: standardEase,
                    }}
                  >
                    <motion.div
                      className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-security-border bg-security-panel text-security-accent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{
                        delay: timing.coreInnerDelay + 0.2,
                        duration: 0.42,
                        ease: gentleEase,
                      }}
                    >
                      <KeyRound aria-hidden="true" className="size-4.5" strokeWidth={1.9} />
                    </motion.div>
                    <LockKeyhole aria-hidden="true" className="size-10 text-primary-soft sm:size-12" strokeWidth={1.75} />
                  </motion.div>

                  <div className="relative mt-8 space-y-4">
                    <motion.div
                      className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-primary/[0.08] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-security-status"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{
                        delay: timing.coreInnerDelay + 0.26,
                        duration: 0.42,
                        ease: gentleEase,
                      }}
                    >
                      <ShieldCheck aria-hidden="true" className="size-4" strokeWidth={1.8} />
                      <span>Protected core</span>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {securityCoreTags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[0.74rem] font-medium text-white/78"
                          initial={{ opacity: 0, y: 8 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                          transition={{
                            delay: timing.coreInnerDelay + 0.32 + index * 0.05,
                            duration: 0.38,
                            ease: gentleEase,
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid w-full max-w-[18rem] grid-cols-3 gap-3">
                    {[
                      Fingerprint,
                      Database,
                      ShieldCheck,
                    ].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className="rounded-[1rem] border border-security-border bg-white/[0.03] px-3 py-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{
                          delay: timing.coreInnerDelay + 0.42 + index * 0.05,
                          duration: 0.36,
                          ease: gentleEase,
                        }}
                      >
                        <Icon aria-hidden="true" className="mx-auto size-4.5 text-security-accent" strokeWidth={1.8} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            }
            accessPanelSlot={
              <>
                <motion.div
                  className="rounded-[1.5rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5"
                  initial={{ opacity: 0, x: isMobile ? 0 : 16 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 16 }}
                  transition={{
                    delay: timing.accessSurfaceDelay,
                    duration: 0.58,
                    ease: gentleEase,
                  }}
                >
                  <p className="max-w-none text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-security-status">
                    Access layers
                  </p>
                  <div className="mt-4 divide-y divide-white/6">
                    {securityAccessItems.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.id}
                          className={cn(
                            "flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0",
                            canHover && "transition duration-200 ease-[var(--ease-standard)] hover:text-white",
                          )}
                          initial={{ opacity: 0, y: 6 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                          transition={{
                            delay: timing.accessDelay + index * timing.accessRowStagger,
                            duration: 0.38,
                            ease: gentleEase,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-primary/14 bg-primary/[0.08] text-security-accent">
                              <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
                            </div>
                            <span className="text-[0.95rem] font-medium text-white">
                              {item.label}
                            </span>
                          </div>
                          <motion.span
                            className="text-[0.76rem] font-medium uppercase tracking-[0.14em] text-security-status"
                            initial={{ opacity: 0.7, scale: 0.94 }}
                            animate={
                              isActive
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0.7, scale: 0.94 }
                            }
                            transition={{
                              delay: timing.accessDelay + index * timing.accessRowStagger + 0.05,
                              duration: 0.26,
                              ease: gentleEase,
                            }}
                          >
                            {item.status}
                          </motion.span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    {
                      body: "Protected data stays isolated behind explicit ownership and scoped access checks.",
                      title: "Secure boundary",
                    },
                    {
                      body: "Identity, storage, and audit layers remain legible so trust boundaries are easier to inspect.",
                      title: "Verification path",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="rounded-[1.5rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        delay: timing.accessDelay + 0.18 + index * 0.08,
                        duration: 0.42,
                        ease: gentleEase,
                      }}
                    >
                      <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-security-status">
                        {item.title}
                      </p>
                      <p className="mt-3 max-w-none text-[1rem] leading-7 text-white/78">
                        {item.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </>
            }
          />
        </motion.div>
      )}

      {shouldReduceMotion ? (
        <SecurityFeatures />
      ) : (
        <SecurityFeatures
          itemsSlot={securityFeatures.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={featureItem}
              transition={{
                delay: timing.featureDelay + index * timing.featureStagger,
                duration: 0.58,
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
