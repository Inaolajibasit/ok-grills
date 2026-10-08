import type { ReactNode } from "react";
import styles from "./events.module.css";

interface EnquiryFieldProps { id: string; label: string; error?: string; children: ReactNode; wide?: boolean }
export function EnquiryField({ id, label, error, children, wide }: EnquiryFieldProps) {
  return <div className={`${styles.field} ${wide ? styles.wide : ""}`}><label htmlFor={id}>{label}</label>{children}{error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}</div>;
}
