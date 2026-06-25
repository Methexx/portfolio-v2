"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useRef } from "react";

import { ConnectedNotesScene } from "@/components/sections/connected-notes/connected-notes-scene";
import { ConnectedNotesVisualShell } from "@/components/sections/connected-notes/connected-notes-visual";
import { ConnectedNotesFeatures } from "@/components/sections/connected-notes/connected-notes-features";
import { ConnectedNotesHeader } from "@/components/sections/connected-notes/connected-notes-header";
import {
  connectedNotesCopy,
  connectedNotesFeatures,
} from "@/components/sections/connected-notes/connected-notes-data";
import { gentleEase, standardEase } from "@/lib/motion";

const connectedNotesTiming = {
  labelDelay: 0,
  headingDelay: 0.12,
  headingStagger: 0.1,
  paragraphDelay: 0.42,
  graphDelay: 0.58,
  badgeDelay: 0.9,
  featureDelay: 1.18,
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
  hidden: { opacity: 0, y: 42, scale: 0.988 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.96,
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

export function ConnectedNotesMotion() {
  const reducedMotionPreference = useReducedMotion();
  const prefersReducedMotion = Boolean(reducedMotionPreference);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasEntered = useInView(sectionRef, entranceReveal);
  const isSceneActive = useInView(sectionRef, activityReveal);

  const sceneBadgeSlot = prefersReducedMotion ? null : (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: connectedNotesTiming.badgeDelay,
          duration: 0.72,
          ease: gentleEase,
        }}
        className="pointer-events-none absolute left-[8%] top-[13%] hidden rounded-full border border-white/6 bg-white/[0.03] px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/34 backdrop-blur-[2px] md:block"
      >
        linked memory
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: connectedNotesTiming.badgeDelay + 0.08,
          duration: 0.72,
          ease: gentleEase,
        }}
        className="pointer-events-none absolute right-[10%] top-[18%] hidden rounded-full border border-white/6 bg-white/[0.03] px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/30 backdrop-blur-[2px] xl:block"
      >
        signal paths
      </motion.div>
    </>
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
          badgeSlot={null}
          canvasSlot={
            <ConnectedNotesScene
              active={false}
              reducedMotion
              className="absolute inset-0"
            />
          }
          svgSlot={null}
          nodeSlot={null}
          foregroundSlot={null}
        />
      ) : (
        <motion.div initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={graphReveal}>
          <ConnectedNotesVisualShell
            badgeSlot={sceneBadgeSlot}
            canvasSlot={<ConnectedNotesScene active={isSceneActive} className="absolute inset-0" />}
            svgSlot={null}
            nodeSlot={null}
            foregroundSlot={null}
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
