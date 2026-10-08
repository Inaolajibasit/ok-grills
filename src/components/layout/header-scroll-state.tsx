"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function HeaderScrollState() {
  const markerRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const header = markerRef.current?.closest("header");
    if (!header) return;
    let frame = 0;
    let previousY = Math.max(0, window.scrollY);
    header.dataset.hidden = "false";
    const update = () => {
      frame = 0;
      const currentY = Math.max(0, window.scrollY);
      const change = currentY - previousY;
      const focused = Boolean(header.querySelector(":focus-visible"));
      const modalOpen = Boolean(document.querySelector("dialog[open]"));
      if (currentY <= header.offsetHeight || focused || modalOpen) {
        header.dataset.hidden = "false";
        previousY = currentY;
      } else if (Math.abs(change) >= 8) {
        header.dataset.hidden = String(change > 0);
        previousY = currentY;
      }
      const hero = document.querySelector<HTMLElement>("[data-home-hero]");
      header.dataset.scrolled = String(Boolean(pathname === "/" && hero && hero.getBoundingClientRect().bottom <= header.offsetHeight));
    };
    const reveal = () => { header.dataset.hidden = "false"; previousY = Math.max(0, window.scrollY); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    header.addEventListener("focusin", reveal);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      header.removeEventListener("focusin", reveal);
      delete header.dataset.scrolled;
      delete header.dataset.hidden;
    };
  }, [pathname]);

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
