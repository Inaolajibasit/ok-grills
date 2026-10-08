import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/currency";
import type { BuildBoxResult } from "@/lib/build-your-box";
import styles from "./build-box.module.css";

interface BoxTotalProps {
  result: BuildBoxResult;
  canOrder: boolean;
  onAdd: () => void;
  priceNotice: string;
}

export function BoxTotal({ result, canOrder, onAdd, priceNotice }: BoxTotalProps) {
  const noticeId = useId();
  return (
    <div className={styles.totalPanel}>
      <div className={styles.totalRow}>
        <div>
          <p className={styles.totalLabel}>Your box total</p>
          <p className={styles.totalAmount} aria-live="polite" aria-atomic="true">{result.total === null ? "Check selections" : formatNaira(result.total)}</p>
        </div>
        <span className={styles.portionCount}>{result.ingredientCount} {result.ingredientCount === 1 ? "portion" : "portions"}</span>
      </div>
      <Button disabled={!canOrder} onClick={onAdd} className={styles.addButton} aria-describedby={noticeId}>
        Add your box <ArrowUpRight size={19} aria-hidden="true" />
      </Button>
      <p id={noticeId} className={styles.priceNotice}>{result.isEmpty ? "Pick at least one ingredient to start your box. " : ""}{priceNotice}</p>
    </div>
  );
}
