import Image from "next/image";
import { BulletHole } from "@/components/ui/bullet-hole";
import { Danfo } from "next/font/google";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { GrillStoryMotion } from "@/components/motion/grill-story-motion";
import type { SiteSettings } from "@/types/settings";
import styles from "./grill-story.module.css";

const display = Danfo({ subsets: ["latin"], display: "swap", variable: "--font-story-display" });

export function GrillStory({ content }: { content: SiteSettings["grillStory"] }) {
  return (
    <section className={`${styles.story} ${display.variable}`} aria-labelledby="grill-story-title" data-grill-story>
      <Container>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="grill-story-title">{content.title}</h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.stickyMedia} aria-hidden="true">
            <div className={styles.mediaFrame}>
              {content.stages.map((stage, index) => (
                <div key={stage.id} className={styles.mediaPanel} data-story-media>
                  <Image src={stage.imageSrc} alt="" fill sizes="(min-width: 1024px) 48vw, 1px" />
                  <div className={styles.caption}><span>0{index + 1} / 0{content.stages.length}</span><p>{stage.headline}</p></div>
                </div>
              ))}
              <BulletHole className={styles.photoBullet} />
            </div>
          </div>
          <ol className={styles.stages}>
            {content.stages.map((stage, index) => (
              <li key={stage.id} className={styles.stage} data-story-stage>
                <div className={styles.stageCopy}>
                  <span className={styles.number}>0{index + 1}</span>
                  <h3>{stage.headline}</h3>
                  <p>{stage.description}</p>
                </div>
                <div className={styles.fallbackMedia}><BulletHole className={styles.photoBullet} /><Image src={stage.imageSrc} alt={stage.imageAlt} fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.action}><ButtonLink href={content.actionHref}>{content.actionLabel}</ButtonLink></div>
      </Container>
      <GrillStoryMotion />
    </section>
  );
}
