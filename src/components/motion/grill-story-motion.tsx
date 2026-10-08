"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GrillStoryMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-grill-story]");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-story-stage]"));
      const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-story-media]"));
      if (stages.length === 0 || stages.length !== panels.length) return;
      root.dataset.storyEnhanced = "true";
      let active = -1;
      gsap.set(panels, { autoAlpha: 0 });

      function activate(index: number, immediate = false) {
        if (active === index) return;
        active = index;
        stages.forEach((stage, position) => { stage.dataset.active = String(position === index); });
        panels.forEach((panel, position) => {
          gsap.to(panel, { autoAlpha: position === index ? 1 : 0, duration: immediate ? 0 : 0.35, ease: "power1.out", overwrite: true });
        });
      }

      // Restore the correct frame when arriving via browser history or a deep scroll.
      const initial = stages.reduce((current, stage, index) => stage.getBoundingClientRect().top <= window.innerHeight * .55 ? index : current, 0);
      activate(initial, true);
      const triggers = stages.map((stage, index) => ScrollTrigger.create({
        trigger: stage,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => activate(index),
        onEnterBack: () => activate(index),
      }));

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        gsap.killTweensOf(panels);
        gsap.set(panels, { clearProps: "opacity,visibility" });
        delete root.dataset.storyEnhanced;
        stages.forEach((stage) => { delete stage.dataset.active; });
      };
    }, root);

    return () => media.revert();
  }, []);
  return null;
}
