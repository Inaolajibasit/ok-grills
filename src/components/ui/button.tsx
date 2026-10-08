import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "text";

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variantClassNames: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-bone",
  secondary: "border border-line bg-charcoal text-bone hover:border-brand hover:text-brand",
  text: "px-0 text-bone hover:text-brand",
};

function buttonClassName(variant: Variant, className: string) {
  return `${baseClassName} ${variantClassNames[variant]} ${className}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}
