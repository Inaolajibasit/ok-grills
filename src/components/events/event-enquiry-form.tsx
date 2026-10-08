"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/currency";
import { createEventEnquirySchema, formatEventEnquiry, getEnquiryWhatsAppUrl, type EventEnquiryInput, type EventEnquiryValues } from "@/lib/event-enquiry";
import type { EventPackage } from "@/types/event";
import { EnquiryField } from "./enquiry-field";
import styles from "./events.module.css";

interface EventEnquiryFormProps { packages: EventPackage[]; eventTypes: string[]; businessName: string; whatsappNumber: string; enabled: boolean }
export function EventEnquiryForm({ packages, eventTypes, businessName, whatsappNumber, enabled }: EventEnquiryFormProps) {
  const schema = useMemo(() => createEventEnquirySchema(packages.map((entry) => entry.id), eventTypes), [packages, eventTypes]);
  const { register, handleSubmit, formState: { errors, isSubmitting, isReady } } = useForm<EventEnquiryInput, unknown, EventEnquiryValues>({
    resolver: zodResolver(schema), mode: "onBlur",
    defaultValues: { name: "", phone: "", eventType: "", eventDate: "", guestCount: "", deliveryArea: "", budget: "", foodPreferences: "", additionalNotes: "", packageId: "" },
  });
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const whatsappUrl = draft ? getEnquiryWhatsAppUrl(whatsappNumber, draft) : null;
  const attrs = (name: keyof EventEnquiryInput) => ({ id: `event-${name}`, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `event-${name}-error` : undefined });

  function prepare(values: EventEnquiryValues) {
    if (!enabled) return;
    setDraft(formatEventEnquiry(values, packages, businessName));
    setCopyStatus("");
  }
  async function copyEnquiry() {
    try { await navigator.clipboard.writeText(draft); setCopyStatus("Enquiry copied."); }
    catch { setCopyStatus("Select the enquiry below and copy it manually."); }
  }

  return (
    <form method="post" onSubmit={handleSubmit(prepare)} noValidate className={styles.form} onChange={() => { setDraft(""); setCopyStatus(""); }}>
      <noscript><p>Enable JavaScript to prepare your WhatsApp enquiry.</p></noscript>
      <fieldset className={styles.packages} disabled={!enabled || !isReady}>
        <legend>Find your kind of function<span>Choose a category, or let us recommend. Every event gets a tailored quote.</span></legend>
        <div className={styles.packageGrid}>
          {packages.map((entry) => <article key={entry.id} className={styles.package}>
            {entry.image && <div className={styles.packageImage}><Image src={entry.image} alt="" fill sizes="(max-width: 767px) 90vw, 33vw" /></div>}
            <h2>{entry.name}</h2><p>{entry.description}</p><strong>{entry.price === null ? "Tailored quote" : formatNaira(entry.price)}</strong>
            <label><input type="radio" value={entry.id} {...register("packageId")} /> Choose {entry.name}</label>
          </article>)}
        </div>
        <label className={styles.unsure}><input type="radio" value="" {...register("packageId")} /> Not sure yet — recommend a package</label>
        {errors.packageId && <p className={styles.error} role="alert">{errors.packageId.message}</p>}
      </fieldset>
      <section id="event-enquiry" className={styles.enquiry} aria-labelledby="event-enquiry-title">
        <div className={styles.formIntro}><p className={styles.eyebrow}>Let&apos;s make it a function</p><h2 id="event-enquiry-title">Tell us the plan<span>.</span></h2><p>Share the details. We&apos;ll talk menu, availability, and a quote on WhatsApp.</p></div>
        <fieldset disabled={!enabled || !isReady} className={styles.fields}>
          <legend className="sr-only">Your event details</legend>
          <EnquiryField id="event-name" label="Name *" error={errors.name?.message}><input {...attrs("name")} {...register("name")} autoComplete="name" required maxLength={100} /></EnquiryField>
          <EnquiryField id="event-phone" label="Phone *" error={errors.phone?.message}><input {...attrs("phone")} {...register("phone")} type="tel" autoComplete="tel" required placeholder="Include your country code" /></EnquiryField>
          <EnquiryField id="event-eventType" label="Event type *" error={errors.eventType?.message}><select {...attrs("eventType")} {...register("eventType")} required><option value="">Choose your event</option>{eventTypes.map((type) => <option key={type}>{type}</option>)}</select></EnquiryField>
          <EnquiryField id="event-eventDate" label="Event date *" error={errors.eventDate?.message}><input {...attrs("eventDate")} {...register("eventDate")} type="date" required /></EnquiryField>
          <EnquiryField id="event-guestCount" label="Guest count *" error={errors.guestCount?.message}><input {...attrs("guestCount")} {...register("guestCount")} type="number" min="1" step="1" inputMode="numeric" required /></EnquiryField>
          <EnquiryField id="event-deliveryArea" label="Delivery area *" error={errors.deliveryArea?.message}><input {...attrs("deliveryArea")} {...register("deliveryArea")} required maxLength={200} placeholder="Area or event venue" /></EnquiryField>
          <EnquiryField id="event-budget" label="Budget (optional)" error={errors.budget?.message} wide><input {...attrs("budget")} {...register("budget")} maxLength={150} placeholder="Your budget in naira, or 'not sure yet'" /></EnquiryField>
          <EnquiryField id="event-foodPreferences" label="Food preferences (optional)" error={errors.foodPreferences?.message} wide><textarea {...attrs("foodPreferences")} {...register("foodPreferences")} rows={3} maxLength={1000} placeholder="Grills, sides, dietary preferences, allergies…" /></EnquiryField>
          <EnquiryField id="event-additionalNotes" label="Additional notes (optional)" error={errors.additionalNotes?.message} wide><textarea {...attrs("additionalNotes")} {...register("additionalNotes")} rows={3} maxLength={1500} placeholder="Anything else about your event" /></EnquiryField>
        </fieldset>
        {!enabled && <p role="status">Event enquiries are currently paused.</p>}
        <Button type="submit" disabled={!enabled || !isReady || isSubmitting} className={styles.submit}>Prepare WhatsApp enquiry</Button>
        <p className={styles.help}>Fields marked * are required. Your details stay in this page until you choose to share them on WhatsApp.</p>
        {draft && <div className={styles.draft}>
          <p role="status">Your enquiry is ready. Review it before sending.</p>
          <label htmlFor="event-draft">WhatsApp enquiry</label><textarea id="event-draft" readOnly value={draft} rows={13} />
          <div className={styles.draftActions}>{whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>Open WhatsApp</a> : <p>Our WhatsApp contact is not available yet. You can copy your enquiry below.</p>}<Button type="button" variant="secondary" onClick={copyEnquiry}>Copy enquiry</Button></div>
          <p role="status">{copyStatus}</p>
        </div>}
      </section>
    </form>
  );
}
