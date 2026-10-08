"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { headerNavigationLinks } from "./navigation-links";
import styles from "./mobile-navigation.module.css";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const trigger = toggleRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      desktop.removeEventListener("change", onResize);
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button ref={toggleRef} type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-bone transition-colors hover:border-brand hover:text-brand">
        <Menu aria-hidden="true" size={22} />
      </button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="mobile-menu-title" data-lenis-prevent onCancel={(event) => { event.preventDefault(); setOpen(false); }} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 id="mobile-menu-title">Menu</h2>
            <button type="button" onClick={() => setOpen(false)} className={styles.close} aria-label="Close menu" autoFocus><X size={26} aria-hidden="true" /></button>
          </div>
          <nav id="mobile-navigation" aria-label="Mobile navigation" className={styles.links}>
            {headerNavigationLinks.map((link, index) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={styles.link} style={{ animationDelay: index * 65 + 100 + "ms" }}>{link.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)} className={styles.link} style={{ animationDelay: headerNavigationLinks.length * 65 + 100 + "ms" }}>Your cart</Link>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
