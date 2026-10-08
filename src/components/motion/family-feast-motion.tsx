"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FamilyFeastMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-family-feast]");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add({ desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      const photo = root.querySelector<HTMLElement>("[data-feast-image]");
      const headlines = root.querySelectorAll<HTMLElement>("[data-feast-headline]");
      const reveal = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: desktop ? "center 40%" : "center 65%",
          scrub: .45,
          invalidateOnRefresh: true,
        },
      });

      if (photo) reveal.fromTo(photo, { scale: desktop ? .94 : .98, y: desktop ? 18 : 8 }, { scale: desktop ? 1.02 : 1, y: 0, duration: 1 }, 0);
      if (desktop) reveal.fromTo(headlines, { y: 12 }, { y: -8, stagger: .08, duration: 1 }, 0);

      return () => { reveal.scrollTrigger?.kill(); reveal.kill(); };
    }, root);

    return () => media.revert();
  }, []);
  return null;
}
