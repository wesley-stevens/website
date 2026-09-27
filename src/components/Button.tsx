import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

// primary: solid white with black text; secondary: glass with a white outline.
const styles: Record<Variant, string> = {
  primary: "brutal-solid press",
  secondary: "brutal-panel press text-foreground hover:bg-surface-hover",
};

// Renders a Next.js Link for internal routes and a plain <a> for external URLs or downloads.
export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  download?: boolean | string; // true, or the file name to save as
}) {
  const classes =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold uppercase " +
    `tracking-wider ${styles[variant]} ${className}`;

  if (download) {
    return (
      <a href={href} download={download === true ? "" : download} className={classes}>
        {children}
      </a>
    );
  }
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
