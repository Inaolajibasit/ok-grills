import Image from "next/image";
import TextLoop from "@/components/TextLoop";
import { Danfo } from "next/font/google";
import { HeroMotion } from "@/components/motion/hero-motion";
import { HeroPlayback } from "@/components/motion/hero-playback";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/types/settings";
import styles from "./home-hero.module.css";

type HeroContent = SiteSettings["hero"];

const danfo = Danfo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-danfo",
});

export function HomeHero({ content }: { content: HeroContent }) {
  return (
    <section className={`${styles.hero} ${danfo.variable}`} aria-labelledby="home-hero-title" data-home-hero>
      <div className={styles.media} data-hero-media aria-hidden="true">
        <Image
          src={content.posterSrc}
          alt=""
          fill
          preload
          unoptimized
          sizes="100vw"
          className={styles.poster}
        />
        {content.videoSrc && (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={content.posterSrc}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source
              src={content.videoSrc}
              media="(prefers-reduced-motion: no-preference)"
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <Container className={styles.content}>
        <div className={styles.contentInner}>
          <h1
            id="home-hero-title"
            className={styles.headline}
            aria-label={content.headlineLines.join(" ")}
          >
            {content.headlineLines.map((line) => (
              <span key={line} className={styles.revealMask} aria-hidden="true">
                <span data-hero-reveal>{line}</span>
              </span>
            ))}
          </h1>

          <div className={styles.details} data-hero-details>
            <p className={styles.supportingCopy}>{content.supportingCopy}</p>
            <div className={styles.actions}>
              <ButtonLink href="/build-a-box" className={styles.orderButton}>
                {content.orderLabel}
              </ButtonLink>
              <ButtonLink href="/menu" variant="secondary" className={styles.menuButton}>
                {content.menuLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      {content.videoSrc && <HeroPlayback />}
      <TextLoop
        text={content.ticker.join(" ✦ ")}
        shape="line"
        separator="✦"
        speed={90}
        curviness={10}
        fontSize={28}
        fontWeight={900}
        letterSpacing={1}
        color="#0D0D0D"
        ribbonColor="#FCEE23"
        ribbon
        ribbonWidth={64}
        className={styles.tickerLoop}
      />
      <HeroMotion />
    </section>
  );
}
