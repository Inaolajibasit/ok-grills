import styles from "./bullet-hole.module.css";

export function BulletHole({ className = "" }: { className?: string }) {
  return <span className={`${styles.mark} ${className}`} aria-hidden="true" />;
}
