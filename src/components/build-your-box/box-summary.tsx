import Image from "next/image";
import { PackageOpen, X } from "lucide-react";
import { formatNaira } from "@/lib/currency";
import { buildBoxSelectionKey, type BuildBoxResult } from "@/lib/build-your-box";
import type { SiteSettings } from "@/types/settings";
import { BoxTotal } from "./box-total";
import styles from "./build-box.module.css";
import motion from "./motion.module.css";

interface BoxSummaryProps {
  result: BuildBoxResult;
  content: SiteSettings["buildBox"];
  canOrder: boolean;
  onRemove: (sectionId: string, itemId: string) => void;
  onReset: () => void;
  onAdd: () => void;
}

export function BoxSummary({ result, content, canOrder, onRemove, onReset, onAdd }: BoxSummaryProps) {
  return (
    <aside id="build-box-review" className={styles.summary} aria-labelledby="box-summary-title">
      <div className={styles.summaryHeading}>
        <div><p>04 / The final lineup</p><h2 id="box-summary-title">Your box<span>.</span></h2></div>
        <button type="button" onClick={onReset} disabled={result.isEmpty} className={styles.reset}>Reset</button>
      </div>
      <div className={styles.preview}>
        <Image src={content.previewImageSrc} alt="A grill box for serving inspiration" fill sizes="(max-width: 1023px) 90vw, 420px" />
        <span className={styles.previewLabel}>Serving inspiration</span>
        <span className={styles.boxStamp}>Built<br />by you</span>
      </div>
      <div className={styles.boxContents} data-lenis-prevent>
        {result.isEmpty ? (
          <div className={styles.emptyBox}><PackageOpen size={34} strokeWidth={1.4} aria-hidden="true" /><p>Make this box yours.</p><span>Your picks will appear here as you add them.</span></div>
        ) : (
          <ul aria-label="Ingredients in your box">
            {result.lines.map((line) => (
              <li key={buildBoxSelectionKey(line.sectionId, line.itemId)} className={motion.ingredientEnter}>
                <span key={line.quantity} className={`${styles.selectedQuantity} ${motion.quantityPulse}`}>{line.quantity}×</span>
                <div><p>{line.name}</p><span>{line.sectionName}</span></div>
                <strong>{line.lineTotal === null ? "Pending" : formatNaira(line.lineTotal)}</strong>
                <button type="button" onClick={() => onRemove(line.sectionId, line.itemId)} aria-label={`Remove ${line.name} from your box`}><X size={16} aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!result.isEmpty && result.errors.length > 0 && <p className={styles.validation} role="alert">{result.errors.join(" ")}</p>}
      <div className={styles.desktopTotal}><BoxTotal result={result} canOrder={canOrder} onAdd={onAdd} priceNotice={content.priceNotice} /></div>
      <p className={styles.mobileNotice}>{content.priceNotice}</p>
    </aside>
  );
}
