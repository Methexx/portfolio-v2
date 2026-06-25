"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { CalendarAccountCard } from "@/components/sections/meetings/calendar-account-card";
import {
  agendaDateLabel,
  calendarAccounts,
  meetingItems,
  meetingsFeatures,
  meetingsPanelLabels,
  meetingsStats,
  selectedMeetingDetail,
} from "@/components/sections/meetings/meetings-data";
import { MeetingDetailPanel } from "@/components/sections/meetings/meeting-detail-panel";
import { MeetingList } from "@/components/sections/meetings/meeting-list";
import { MeetingListItem } from "@/components/sections/meetings/meeting-list-item";
import { MeetingNotesPanel } from "@/components/sections/meetings/meeting-notes-panel";
import { MeetingsFeatures } from "@/components/sections/meetings/meetings-features";
import { MeetingsHeader } from "@/components/sections/meetings/meetings-header";
import { MeetingsVisual } from "@/components/sections/meetings/meetings-visual";
import { useAnimationActivity } from "@/hooks/use-animation-activity";
import { cn } from "@/lib/cn";
import { gentleEase, standardEase } from "@/lib/motion";

const sectionReveal = {
  amount: 0.22,
  margin: "0px 0px -16% 0px",
  once: true,
} as const;

const desktopTiming = {
  accountCardDelay: 1.1,
  accountHeadingDelay: 1.02,
  accountStagger: 0.07,
  accountSummaryDelay: 1.38,
  agendaDelay: 1.18,
  agendaHeaderDelay: 1.28,
  agendaRowDelay: 1.44,
  agendaRowStagger: 0.07,
  contentDelay: 1.98,
  detailDelay: 1.82,
  featureDelay: 2.64,
  featureStagger: 0.12,
  headerDelay: 0,
  headingDelay: 0.12,
  headingStagger: 0.1,
  metaDelay: 2.02,
  notesDelay: 2.18,
  notesSectionStagger: 0.12,
  paragraphDelay: 0.42,
  participantDelay: 1.94,
  participantStagger: 0.055,
  selectedDelay: 1.6,
  timelineDelay: 1.34,
  workspaceDelay: 0.6,
} as const;

const mobileTiming = {
  accountCardDelay: 1.74,
  accountHeadingDelay: 1.66,
  accountStagger: 0.05,
  accountSummaryDelay: 1.88,
  agendaDelay: 1.44,
  agendaHeaderDelay: 1.52,
  agendaRowDelay: 1.58,
  agendaRowStagger: 0.055,
  contentDelay: 1.2,
  detailDelay: 0.98,
  featureDelay: 2.08,
  featureStagger: 0.1,
  headerDelay: 0,
  headingDelay: 0.1,
  headingStagger: 0.08,
  metaDelay: 1.08,
  notesDelay: 1.32,
  notesSectionStagger: 0.1,
  paragraphDelay: 0.34,
  participantDelay: 1.12,
  participantStagger: 0.045,
  selectedDelay: 1.62,
  timelineDelay: 1.5,
  workspaceDelay: 0.5,
} as const;

const workspaceReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.986 },
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
      duration: 0.58,
      ease: gentleEase,
    },
  },
};

const detailTravel = {
  desktopX: 22,
  desktopY: 12,
  mobileX: 8,
  mobileY: 12,
} as const;

const meetingDetailStates = [
  selectedMeetingDetail,
  {
    ...selectedMeetingDetail,
    title: "Product planning",
    status: "Focused",
    time: "9:00 AM - 9:45 AM",
    duration: "45 min",
    purpose:
      "Align the next product milestone, review dependencies, and confirm what ships in the next working session.",
    agenda: [
      "Review current scope",
      "Prioritize follow-up tasks",
      "Confirm delivery sequence",
      "Lock next checkpoint",
    ],
    projectContext: [
      "AI showcase demo",
      "Integrations motion pass",
      "Hero polish checklist",
    ],
    preparation: [
      "Collect active risks",
      "Confirm scope changes",
      "Review demo priorities",
    ],
    decisions: [
      "Sequence integrations after meetings polish",
      "Keep mobile density lower than desktop",
    ],
    actions: [
      "Update feature grid copy states",
      "Review AI loop timings",
      "Capture final QA notes",
    ],
  },
  {
    ...selectedMeetingDetail,
    title: "Mobile experience review",
    status: "In review",
    time: "10:30 AM - 11:00 AM",
    duration: "30 min",
    purpose:
      "Check readability, motion density, and simplified stacked workflows for smaller screens before release.",
    agenda: [
      "Audit narrow viewport spacing",
      "Reduce decorative loops on mobile",
      "Confirm touch-safe interactions",
    ],
    projectContext: [
      "Research capture flow",
      "Meetings mobile stack",
      "Connected Notes density",
    ],
    preparation: [
      "Capture 375px screenshots",
      "Review mobile headings",
      "Check overflow boundaries",
    ],
    decisions: [
      "Remove decorative track from mobile integrations",
      "Keep a single active workflow on mobile",
    ],
    actions: [
      "Verify 320px hero wrapping",
      "Reduce mobile particle counts",
      "Check CTA tap targets",
    ],
  },
] as const;

export function MeetingsMotion() {
  const reducedMotionPreference = useReducedMotion();
  const shouldReduceMotion = Boolean(reducedMotionPreference);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, sectionReveal);
  const [isMobile, setIsMobile] = useState(false);
  const [allowHover, setAllowHover] = useState(false);
  const [activeMeetingIndex, setActiveMeetingIndex] = useState(2);

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

  const timing = isMobile ? mobileTiming : desktopTiming;
  const isActive = shouldReduceMotion || isInView;
  const { canAnimate } = useAnimationActivity({
    inView: isInView,
    reducedMotion: shouldReduceMotion,
  });
  const canHover = allowHover && !shouldReduceMotion;
  const visibleAccounts = useMemo(
    () => calendarAccounts.filter((account) => !isMobile || !account.mobileHidden),
    [isMobile],
  );
  const visibleMeetings = useMemo(
    () => meetingItems.filter((item) => !isMobile || !item.mobileHidden),
    [isMobile],
  );
  useEffect(() => {
    if (!canAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveMeetingIndex((current) => (current + 1) % Math.max(visibleMeetings.length, 1));
    }, isMobile ? 2600 : 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canAnimate, isMobile, visibleMeetings.length]);

  const selectedMeetingId =
    visibleMeetings[activeMeetingIndex % Math.max(visibleMeetings.length, 1)]?.id ??
    "architecture-discussion";
  const visualTransition: Transition = {
    delay: timing.workspaceDelay,
    duration: isMobile ? 0.88 : 1.02,
    ease: standardEase,
  };

  const detail = meetingDetailStates[activeMeetingIndex % meetingDetailStates.length];

  return (
    <div ref={sectionRef} className="mx-auto max-w-[84rem]">
      <MeetingsHeader
        labelSlot={
          shouldReduceMotion ? (
            <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>Meetings</span>
            </div>
          ) : (
            <motion.div
              className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: timing.headerDelay, duration: 0.5, ease: gentleEase }}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary/80" />
              <span>Meetings</span>
            </motion.div>
          )
        }
        headingSlot={
          shouldReduceMotion ? (
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {["Turn every meeting", "into useful context."].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground">
              {["Turn every meeting", "into useful context."].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0.18, y: "108%" }}
                    animate={isActive ? { opacity: 1, y: "0%" } : { opacity: 0.18, y: "108%" }}
                    transition={{
                      delay: timing.headingDelay + index * timing.headingStagger,
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
              Keep schedules, preparation notes, decisions, and follow-up tasks together so important conversations remain useful after the call ends.
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-muted sm:text-[1.125rem]"
              initial={{ opacity: 0, y: isMobile ? 10 : 14 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 14 }}
              transition={{ delay: timing.paragraphDelay, duration: 0.56, ease: gentleEase }}
            >
              Keep schedules, preparation notes, decisions, and follow-up tasks together so important conversations remain useful after the call ends.
            </motion.p>
          )
        }
      />

      {shouldReduceMotion ? (
        <>
          <MeetingsVisual />
          <MeetingsFeatures />
        </>
      ) : (
        <>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={workspaceReveal}
            transition={visualTransition}
          >
            <MeetingsVisual
              accountsHeadingSlot={
                <motion.div
                  className="rounded-[1.45rem] border border-border/60 bg-white/68 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
                  initial={{ opacity: 0, x: isMobile ? 0 : -12, y: 6 }}
                  animate={isActive ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isMobile ? 0 : -12, y: 6 }}
                  transition={{ delay: timing.accountHeadingDelay, duration: 0.46, ease: gentleEase }}
                >
                  <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {meetingsPanelLabels.accountsHeading}
                  </p>
                </motion.div>
              }
              accountsCardsSlot={
                <div className="mt-3 space-y-3">
                  {visibleAccounts.map((account, index) => (
                    <motion.div
                      key={account.id}
                      initial={{ opacity: 0, x: isMobile ? 0 : -14, y: 6, scale: 0.99 }}
                      animate={
                        isActive
                          ? { opacity: 1, x: 0, y: 0, scale: 1 }
                          : { opacity: 0, x: isMobile ? 0 : -14, y: 6, scale: 0.99 }
                      }
                      transition={{
                        delay: timing.accountCardDelay + index * timing.accountStagger,
                        duration: 0.46,
                        ease: standardEase,
                      }}
                    >
                      <CalendarAccountCard
                        account={account}
                        className={cn(
                          canHover &&
                            "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/18 hover:bg-white/92",
                        )}
                        statusClassName="transition duration-200 ease-[var(--ease-standard)]"
                      />
                    </motion.div>
                  ))}
                </div>
              }
              accountsSummarySlot={
                <motion.div
                  className="mt-3 rounded-[1.45rem] border border-meetings-border bg-meetings-panel-muted px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ delay: timing.accountSummaryDelay, duration: 0.42, ease: gentleEase }}
                >
                  <p className="max-w-none text-[0.9rem] font-medium tracking-[-0.03em] text-foreground">
                    {meetingsStats.connectedCalendars}
                  </p>
                  <p className="mt-2 max-w-none text-[0.85rem] text-muted">{meetingsStats.lastSync}</p>
                </motion.div>
              }
              agendaPanelSlot={
                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 14 : 18 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 14 : 18 }}
                  transition={{ delay: timing.agendaDelay, duration: 0.62, ease: standardEase }}
                >
                  <MeetingList
                    className={cn(
                      canHover &&
                        "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/12",
                    )}
                    headerSlot={
                      <motion.div
                        className="flex items-end justify-between gap-4 border-b border-border/60 pb-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: timing.agendaHeaderDelay, duration: 0.42, ease: gentleEase }}
                      >
                        <div>
                          <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted">
                            {meetingsPanelLabels.agendaHeading}
                          </p>
                          <p className="mt-2 max-w-none text-[1.02rem] font-medium tracking-[-0.03em] text-foreground">
                            {agendaDateLabel}
                          </p>
                        </div>
                        <div className="rounded-full border border-primary/10 bg-primary/[0.05] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">
                          5 scheduled
                        </div>
                      </motion.div>
                    }
                    timelineSlot={
                      <motion.div
                        className="absolute bottom-2 left-1.5 top-2 w-px origin-top bg-meetings-timeline"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                        transition={{ delay: timing.timelineDelay, duration: 0.62, ease: standardEase }}
                      />
                    }
                    itemsSlot={visibleMeetings.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          x: isMobile ? 6 : 10,
                          y: isMobile ? 8 : 12,
                          scale: item.id === selectedMeetingId ? 0.995 : 1,
                        }}
                        animate={
                          isActive
                            ? {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                scale: item.id === selectedMeetingId ? 1 : 1,
                              }
                            : {
                                opacity: 0,
                                x: isMobile ? 6 : 10,
                                y: isMobile ? 8 : 12,
                                scale: item.id === selectedMeetingId ? 0.995 : 1,
                              }
                        }
                        transition={{
                          delay:
                            timing.agendaRowDelay +
                            index * timing.agendaRowStagger +
                            (item.id === selectedMeetingId ? timing.selectedDelay - timing.agendaRowDelay - index * timing.agendaRowStagger : 0),
                          duration: item.id === selectedMeetingId ? 0.48 : 0.42,
                          ease: standardEase,
                        }}
                    >
                      <MeetingListItem
                        item={{ ...item, selected: item.id === selectedMeetingId }}
                        className={cn(
                          canHover &&
                              "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/12 hover:bg-white/74",
                            item.id === selectedMeetingId &&
                              "transition duration-300 ease-[var(--ease-standard)]",
                          )}
                        />
                      </motion.div>
                    ))}
                  />
                </motion.div>
              }
              detailPanelSlot={
                <motion.div
                  key={selectedMeetingId}
                  initial={{
                    opacity: 0,
                    x: isMobile ? detailTravel.mobileX : detailTravel.desktopX,
                    y: isMobile ? detailTravel.mobileY : detailTravel.desktopY,
                    scale: 0.99,
                  }}
                  animate={
                    isActive
                      ? { opacity: 1, x: 0, y: 0, scale: 1 }
                      : {
                          opacity: 0,
                          x: isMobile ? detailTravel.mobileX : detailTravel.desktopX,
                          y: isMobile ? detailTravel.mobileY : detailTravel.desktopY,
                          scale: 0.99,
                        }
                  }
                  transition={{ delay: timing.detailDelay, duration: 0.78, ease: standardEase }}
                >
                  <MeetingDetailPanel
                    className={cn(
                      canHover &&
                        "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/14",
                    )}
                    statusSlot={
                      <motion.div
                        className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/[0.06] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary"
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: timing.detailDelay + 0.06, duration: 0.34, ease: gentleEase }}
                      >
                        <span className="h-2 w-2 rounded-full bg-primary/80" />
                        <span>{detail.status}</span>
                      </motion.div>
                    }
                    titleSlot={
                      <motion.h3
                        className="mt-4 text-[1.85rem] font-medium tracking-[-0.05em] text-foreground sm:text-[2.15rem]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: timing.detailDelay + 0.12, duration: 0.42, ease: gentleEase }}
                      >
                        {detail.title}
                      </motion.h3>
                    }
                    metaSlot={
                      <motion.div
                        className="mt-4 flex flex-wrap gap-3 text-[0.92rem] text-muted"
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: timing.metaDelay, duration: 0.4, ease: gentleEase }}
                      >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/74 px-3 py-1.5">
                          <span>{detail.dateLabel}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/74 px-3 py-1.5">
                          <span>
                            {detail.time} · {detail.duration}
                          </span>
                        </div>
                      </motion.div>
                    }
                    participantsSlot={
                      <div className="min-w-[12rem]">
                        <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                          {meetingsPanelLabels.participantsHeading}
                        </p>
                        <div className="mt-3 flex items-center -space-x-2">
                          {detail.participants.map((participant, index) => (
                            <motion.span
                              key={participant}
                              className={cn(
                                "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(240,235,248,0.95))] text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-foreground shadow-[0_8px_16px_-14px_rgba(23,21,27,0.25)]",
                                index > 1 && "hidden sm:inline-flex",
                              )}
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                              transition={{
                                delay: timing.participantDelay + index * timing.participantStagger,
                                duration: 0.28,
                                ease: gentleEase,
                              }}
                            >
                              {participant}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    }
                    contentGridSlot={
                      <div className="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                        <motion.div
                          className="rounded-[1.5rem] border border-meetings-border bg-white/72 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5"
                          initial={{ opacity: 0, y: 8 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                          transition={{ delay: timing.contentDelay, duration: 0.42, ease: gentleEase }}
                        >
                          <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                            {meetingsPanelLabels.purposeHeading}
                          </p>
                          <p className="mt-3 max-w-none text-[1rem] leading-7 text-foreground/84">
                            {detail.purpose}
                          </p>

                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            <div>
                              <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                                Agenda
                              </p>
                              <div className="mt-3 space-y-3">
                                {detail.agenda.map((item, index) => (
                                  <motion.div
                                    key={item}
                                    className="flex gap-2.5 text-[0.94rem] leading-6 text-foreground/84"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                                    transition={{
                                      delay: timing.contentDelay + 0.08 + index * 0.045,
                                      duration: 0.28,
                                      ease: gentleEase,
                                    }}
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                                    <p className="max-w-none">{item}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                                {meetingsPanelLabels.linkedContextHeading}
                              </p>
                              <div className="mt-3 space-y-2">
                                {detail.projectContext.map((item, index) => (
                                  <motion.div
                                    key={item}
                                    className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-[0.82rem] font-medium text-foreground/78"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                                    transition={{
                                      delay: timing.contentDelay + 0.12 + index * 0.04,
                                      duration: 0.28,
                                      ease: gentleEase,
                                    }}
                                  >
                                    {item}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className={cn(
                            "rounded-[1.5rem] border border-meetings-border bg-meetings-panel-muted px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5",
                            canHover &&
                              "transition duration-200 ease-[var(--ease-standard)] hover:border-primary/14",
                          )}
                          initial={{ opacity: 0, y: 8 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                          transition={{ delay: timing.contentDelay + 0.08, duration: 0.4, ease: gentleEase }}
                        >
                          <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                            Context snapshot
                          </p>
                          <div className="mt-4 space-y-3">
                            {[
                              { id: "milestone", label: "Next milestone" },
                              { id: "owners", label: "Shared ownership" },
                            ].map((item, index) => (
                              <motion.div
                                key={item.id}
                                className="flex items-center gap-3 rounded-[1.15rem] border border-border/60 bg-white/72 px-3.5 py-3"
                                initial={{ opacity: 0, y: 6 }}
                                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                                transition={{
                                  delay: timing.contentDelay + 0.16 + index * 0.05,
                                  duration: 0.28,
                                  ease: gentleEase,
                                }}
                              >
                                <p className="max-w-none text-[0.94rem] font-medium text-foreground/82">
                                  {item.label}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    }
                    notesSlot={
                      <MeetingNotesPanel
                        detail={detail}
                        titleSlot={
                          <motion.p
                            className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted"
                            initial={{ opacity: 0, y: 8 }}
                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                            transition={{ delay: timing.notesDelay, duration: 0.34, ease: gentleEase }}
                          >
                            {meetingsPanelLabels.notesHeading}
                          </motion.p>
                        }
                        sectionsSlot={
                          <div className="mt-4 grid gap-3 lg:grid-cols-3">
                            {[
                              { title: "Preparation", items: detail.preparation },
                              { title: "Decisions", items: detail.decisions },
                              { title: "Action items", items: detail.actions },
                            ].map((section, sectionIndex) => (
                              <motion.div
                                key={section.title}
                                className="rounded-[1.35rem] border border-meetings-border bg-white/72 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{
                                  delay: timing.notesDelay + 0.08 + sectionIndex * timing.notesSectionStagger,
                                  duration: 0.4,
                                  ease: gentleEase,
                                }}
                              >
                                <p className="max-w-none text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-muted">
                                  {section.title}
                                </p>
                                <div className="mt-3 space-y-3">
                                  {section.items.map((item, index) => (
                                    <motion.div
                                      key={item}
                                      className="flex gap-2.5 text-[0.92rem] leading-6 text-foreground/84"
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                                      transition={{
                                        delay:
                                          timing.notesDelay +
                                          0.14 +
                                          sectionIndex * timing.notesSectionStagger +
                                          index * 0.03,
                                        duration: 0.22,
                                        ease: gentleEase,
                                      }}
                                    >
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                                      <p className="max-w-none">{item}</p>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        }
                      />
                    }
                  />
                </motion.div>
              }
            />
          </motion.div>

          <MeetingsFeatures
            itemsSlot={meetingsFeatures.map(({ description, icon: Icon, title }, index) => (
              <motion.div
                key={title}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={featureItem}
                transition={{
                  delay: timing.featureDelay + index * timing.featureStagger,
                  duration: 0.56,
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
        </>
      )}
    </div>
  );
}
