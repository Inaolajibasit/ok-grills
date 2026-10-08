"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { TextLoopProps } from "./TextLoop";
import styles from "./line-ticker.module.css";

export function LineTicker({ text = "", separator = "✦", uppercase = true, speed = 90, direction = "forward", fontSize = 46, fontWeight = 800, letterSpacing = 2, color = "#ffffff", ribbonColor = "#5227FF", ribbon = true, ribbonWidth = 86, pauseOnHover = true, className = "", style }: TextLoopProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLSpanElement>(null);
  const [duration, setDuration] = useState(30);
  const [paused, setPaused] = useState(false);
  const unit = `${uppercase ? text.toUpperCase() : text} ${separator} `;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const measure = () => setDuration(group.getBoundingClientRect().width / Math.max(speed, 1));
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();
    return () => observer.disconnect();
  }, [speed]);

  useEffect(() => {
    const hero = rootRef.current?.closest<HTMLElement>("[data-home-hero]");
    const sync = () => setPaused(hero?.dataset.playbackPaused === "true");
    hero?.addEventListener("hero-playback-change", sync);
    sync();
    return () => hero?.removeEventListener("hero-playback-change", sync);
  }, []);

  const trackStyle: CSSProperties = { animationDuration: `${duration}s`, animationDirection: direction === "reverse" ? "reverse" : "normal", animationPlayState: paused || speed <= 0 ? "paused" : "running" };
  return (
    <div ref={rootRef} className={`${styles.ribbon} ${className}`} data-pause-hover={pauseOnHover} style={{ color, background: ribbon ? ribbonColor : undefined, fontSize, fontWeight, letterSpacing, minHeight: ribbonWidth, ...style }} role="img" aria-label={text}>
      <div className={styles.track} style={trackStyle} aria-hidden="true">
        <span ref={groupRef} className={styles.group}>{unit.repeat(3)}</span>
        <span className={styles.group}>{unit.repeat(3)}</span>
      </div>
    </div>
  );
}
