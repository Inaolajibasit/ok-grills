"use client";

import { Flame, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import { useBuildBox } from "@/hooks/use-build-box";
import type { BuildBoxSection } from "@/types/build-your-box";
import type { SiteSettings } from "@/types/settings";
import { IngredientCard } from "./ingredient-card";
import { BoxSummary } from "./box-summary";
import { BoxTotal } from "./box-total";
import styles from "./build-box.module.css";

interface BuildBoxBuilderProps {
  sections: BuildBoxSection[];
  content: SiteSettings["buildBox"];
}

export function BuildBoxBuilder({ sections, content }: BuildBoxBuilderProps) {
  const box = useBuildBox(sections);
  const [activeStep, setActiveStep] = useState(sections[0]?.id ?? "review");
  const icons = [Flame, Leaf, Sparkles];
  return (
    <div data-build-box>
      <nav aria-label="Build your box steps" className={styles.steps}>
        <ol>
          {sections.map((section) => <li key={section.id}><a href={`#build-box-${section.id}`} aria-current={activeStep === section.id ? "step" : undefined} onClick={() => setActiveStep(section.id)}>{section.name}</a></li>)}
          <li><a href="#build-box-review" aria-current={activeStep === "review" ? "step" : undefined} onClick={() => setActiveStep("review")}>Review your box</a></li>
        </ol>
      </nav>
      <div className={styles.builderLayout}>
        <div className={styles.sections}>
          {sections.map((section, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <section key={section.id} id={`build-box-${section.id}`} className={styles.selectionSection} aria-labelledby={`build-box-${section.id}-title`}>
                <div className={styles.sectionHeading}>
                  {/* <span className={styles.stepNumber}>0{index + 1}</span> */}
                  <div><h2 id={`build-box-${section.id}-title`}>Pick your {section.name.toLowerCase()}<Icon size={23} aria-hidden="true" /></h2><p>{section.description}</p></div>
                </div>
                <ul className={styles.ingredientGrid}>
                  {section.items.map((item) => (
                    <IngredientCard
                      key={item.id}
                      item={item}
                      quantity={box.selections.find((selection) => selection.sectionId === section.id && selection.itemId === item.id)?.quantity ?? 0}
                      onChange={(change) => box.changeQuantity(section.id, item.id, change)}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <BoxSummary result={box.result} content={content} canOrder={box.canOrder} onRemove={box.removeIngredient} onReset={box.reset} onAdd={box.addToCart} />
      </div>
      <p className={styles.feedback} role="status">{box.feedback}</p>
      <div className={styles.mobileTotal}><BoxTotal result={box.result} canOrder={box.canOrder} onAdd={box.addToCart} priceNotice={content.priceNotice} /></div>
    </div>
  );
}
