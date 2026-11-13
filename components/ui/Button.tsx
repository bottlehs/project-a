import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "border border-transparent bg-main text-white hover:bg-main-dark"
      : "border border-ink bg-white text-ink hover:bg-cream";

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-btn font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${variantClassName} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
