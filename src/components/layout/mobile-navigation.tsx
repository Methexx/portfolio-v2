"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { RefObject } from "react";

import type { NavAction, NavItem } from "@/types/site";

import { NavLink } from "@/components/ui/nav-link";
import {
  fadeTransition,
  staggerChildVariants,
  staggerParentVariants,
} from "@/lib/motion";

type MobileNavigationProps = {
  actions: readonly NavAction[];
  items: readonly NavItem[];
  menuId: string;
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
};

export function MobileNavigation({
  actions,
  items,
  menuId,
  open,
  onClose,
  onToggle,
  panelRef,
}: MobileNavigationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-end lg:hidden">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={onToggle}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-foreground transition-all duration-200 ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface focus-visible:outline-offset-4"
      >
        <span className="sr-only">
          {open ? "Close navigation menu" : "Open navigation menu"}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -12, scale: 0.92 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, rotate: 12, scale: 0.92 }}
            transition={{ ...fadeTransition, duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={menuId}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ ...fadeTransition, duration: 0.24 }}
            className="absolute inset-x-0 top-[calc(var(--navbar-height)-0.25rem)] px-5 sm:px-6"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerParentVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
              className="mx-auto w-full max-w-[var(--container-width)] overflow-hidden rounded-[1.7rem] border border-border bg-[color:var(--header-surface-strong)] p-3 shadow-[0_24px_54px_-32px_rgba(39,20,50,0.32)] backdrop-blur-[var(--header-blur)]"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={shouldReduceMotion ? undefined : staggerChildVariants}
                  >
                    <NavLink
                      href={item.href}
                      label={item.label}
                      variant="mobile"
                      onClick={onClose}
                    />
                  </motion.div>
                ))}
              </nav>
              <motion.div
                variants={shouldReduceMotion ? undefined : staggerChildVariants}
                className="mt-3 grid gap-2 border-t border-border/80 pt-3"
              >
                {actions.map((action) => (
                  <NavLink
                    key={action.href}
                    href={action.href}
                    label={action.label}
                    variant={
                      action.kind === "primary"
                        ? "primary-action"
                        : "secondary-action"
                    }
                    className="w-full"
                    onClick={onClose}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
