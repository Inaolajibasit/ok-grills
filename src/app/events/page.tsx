import type { Metadata } from "next";
import Image from "next/image";
import { Danfo } from "next/font/google";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { EventEnquiryForm } from "@/components/events/event-enquiry-form";
import { getEventPackages } from "@/services/events";
import { getSiteSettings } from "@/services/settings";
import styles from "@/components/events/events.module.css";

const display = Danfo({ subsets: ["latin"], display: "swap", variable: "--font-events-display" });
export const metadata: Metadata = { title: "Events & catering", description: "Food for birthdays, house parties, office functions, weddings, and large linkups. Enquire about your OK Grills event." };

export default async function EventsPage() {
  const [settings, packages] = await Promise.all([getSiteSettings(), getEventPackages()]);
  return <div className={`${styles.page} ${display.variable}`}>
    <Container>
      <section className={styles.hero} aria-labelledby="events-title">
        <div><p className={styles.eyebrow}>{settings.events.eyebrow}</p><h1 id="events-title" aria-label={settings.events.headlineLines.join(" ")}>{settings.events.headlineLines.map((line) => <span key={line} aria-hidden="true">{line}</span>)}</h1><p className={styles.supporting}>{settings.events.supportingCopy}</p><ButtonLink href="#event-enquiry" className={styles.heroAction}>Plan your event</ButtonLink></div>
        <div className={styles.heroImage}><Image src={settings.events.heroImage} alt="A loaded OK Grills box of meats, sandwiches, and sauces" fill sizes="(max-width: 767px) 90vw, 45vw" /></div>
      </section>
      <EventEnquiryForm packages={packages} eventTypes={settings.events.eventTypes} businessName={settings.businessName} whatsappNumber={settings.whatsappNumber} enabled={settings.eventEnquiryEnabled} />
    </Container>
  </div>;
}
