"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/lib/site";
import Button from "./Button";
import Container from "./Container";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-accent">~/</span>
          {site.name.toLowerCase().replace(/\s+/g, "-")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" className="hidden sm:inline-flex">
            Contact Me
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted hover:text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {open && (
        <nav id="mobile-nav" className="border-t border-border md:hidden">
          <Container className="flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm ${
                  isActive(item.href) ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-3 sm:hidden">
              Contact Me
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
