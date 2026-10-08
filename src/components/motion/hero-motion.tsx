"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export function HeroMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");
    if (!hero) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-reveal]", {
          yPercent: 110,
          duration: 1.05,
          stagger: 0.12,
          clearProps: "transform",
        })
        .from("[data-hero-details]", {
          autoAlpha: 0,
          y: 18,
          duration: 0.65,
          clearProps: "all",
        }, "-=0.48");

      gsap.fromTo("[data-hero-media]", {
        scale: 1.06,
        yPercent: 1.5,
      }, {
        scale: 1,
        yPercent: 0,
        duration: 2.1,
        ease: "power2.out",
        clearProps: "transform",
      });
    }, hero);

    return () => media.revert();
  }, []);

  return null;
}
