import type { Metadata } from "next";
import { Anton, Danfo } from "next/font/google";
import { Container } from "@/components/ui/container";
import { BuildBoxBuilder } from "@/components/build-your-box/build-box-builder";
import { getBuildBoxSections } from "@/services/build-your-box";
import { getSiteSettings } from "@/services/settings";
import styles from "@/components/build-your-box/build-box.module.css";

const display = Danfo({ subsets: ["latin"], display: "swap", variable: "--font-box-display" });
const tabs = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-box-tabs" });

export const metadata: Metadata = { title: "Build your box", description: "Pick your grills, sides, and extras to create your own OK Grills box." };

export default async function BuildBoxPage() {
  const [sections, settings] = await Promise.all([getBuildBoxSections(), getSiteSettings()]);
  return (
    <div className={`${styles.page} ${display.variable} ${tabs.variable}`}>
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}><span />Build a box</p>
          <h1 className={styles.title}>Your box.<br /><span>Your rules.</span></h1>
          <p className={styles.subtitle}>Big on grills. Built around you. Pick your portions, load up your sides, and make it a feast.</p>
        </div>
        <BuildBoxBuilder sections={sections} content={settings.buildBox} />
      </Container>
    </div>
  );
}
