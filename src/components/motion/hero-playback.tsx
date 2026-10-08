"use client";

import { useEffect, useRef, useState } from "react";

export function HeroPlayback() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = buttonRef.current?.closest<HTMLElement>("[data-home-hero]");
    const video = root?.querySelector<HTMLVideoElement>("video");
    if (!root || !video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      root.dataset.playbackPaused = String(paused || preference.matches);
      root.dispatchEvent(new Event("hero-playback-change"));
      if (paused || preference.matches || !visible || document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return <button ref={buttonRef} type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)} className="relative z-10 mr-5 mb-4 inline-flex min-h-11 self-end items-center rounded-full border border-white/60 bg-ink/80 px-4 text-sm text-white motion-reduce:hidden">{paused ? "Resume video & ticker" : "Pause video & ticker"}</button>;
}
