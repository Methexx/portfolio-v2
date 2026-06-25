"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Container } from "@/components/layout/container";
import { LogoMark } from "@/components/ui/logo-mark";
import { cn } from "@/lib/cn";
import { fadeTransition } from "@/lib/motion";
import { siteConfig } from "@/config/site";

const SCROLL_THRESHOLD = 24;

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion();
  const menuId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScrolledState = () => {
      frameId = 0;
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;

      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    const onScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const closeMenu = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    closeMenu();
    mediaQuery.addEventListener("change", closeMenu);

    return () => {
      mediaQuery.removeEventListener("change", closeMenu);
    };
  }, []);

  return (
    <motion.header
      ref={rootRef}
      initial={shouldReduceMotion ? false : { opacity: 0.78, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...fadeTransition, duration: 0.65 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container className="relative">
        <div
          className={cn(
            "mt-3 rounded-[1.8rem] border border-transparent transition-all duration-300 ease-[var(--ease-standard)]",
            isScrolled
              ? "bg-[color:var(--header-surface)] shadow-[0_18px_38px_-32px_rgba(39,20,50,0.3)] backdrop-blur-[var(--header-blur)] border-border/80"
              : "bg-transparent",
          )}
        >
          <div className="grid min-h-[var(--navbar-height)] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 sm:px-4 lg:grid-cols-[1fr_auto_1fr] lg:px-5">
            <LogoMark />
            <DesktopNavigation
              items={siteConfig.navigation.main}
              actions={siteConfig.navigation.actions}
            />
            <MobileNavigation
              items={siteConfig.navigation.main}
              actions={siteConfig.navigation.actions}
              menuId={menuId}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onToggle={() => setIsMenuOpen((open) => !open)}
              panelRef={panelRef}
            />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
