"use client";

import { useEffect } from "react";

const HEADER_OFFSET = 12;
const MIN_DURATION = 650;
const MAX_DURATION = 1250;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothScroll() {
  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const stop = () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
    };

    const scrollTo = (target: number) => {
      const start = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const end = Math.max(0, Math.min(target, max));
      const distance = end - start;
      if (Math.abs(distance) < 2) return;

      const duration = Math.min(
        MAX_DURATION,
        Math.max(MIN_DURATION, Math.abs(distance) * 0.5),
      );
      const startedAt = performance.now();
      cancelled = false;

      const tick = (now: number) => {
        if (cancelled) return;
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo({
          top: start + distance * easeInOutCubic(progress),
          behavior: "instant" as ScrollBehavior,
        });
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const node = document.getElementById(href.slice(1));
      if (!node) return;

      event.preventDefault();

      const top =
        node.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      scrollTo(top);
    };

    if (window.location.hash) {
      window.setTimeout(() => {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }, 120);
    }

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    return () => {
      stop();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  return null;
}
