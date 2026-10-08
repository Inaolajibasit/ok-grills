import type { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

const headingClasses = {
  h1: "text-[clamp(3.25rem,11vw,8rem)] leading-[0.9]",
  h2: "text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]",
  h3: "text-[clamp(1.75rem,4vw,3rem)] leading-[1]",
};

export function Heading({ as: Tag = "h2", className = "", ...props }: HeadingProps) {
  return (
    <Tag
      className={`font-sans font-black uppercase tracking-[-0.055em] text-bone ${headingClasses[Tag]} ${className}`}
      {...props}
    />
  );
}

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

export function Eyebrow({ className = "", ...props }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand ${className}`}
      {...props}
    />
  );
}
