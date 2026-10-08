import type { HTMLAttributes } from "react";
import { Container } from "./container";

type SectionProps = HTMLAttributes<HTMLElement> & {
  contained?: boolean;
};

export function Section({
  children,
  className = "",
  contained = true,
  ...props
}: SectionProps) {
  return (
    <section className={`py-[var(--section-space)] ${className}`} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
