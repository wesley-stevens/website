// Navbar links. Kept separate from site.ts because the Navbar runs in the browser,
// and site.ts reads content files on the server.
export type NavItem = { label: string; href: string };

// Add a page: create src/app/(site)/<slug>/page.tsx, then add it here.
export const navItems: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Coursework", href: "/coursework" },
  { label: "Resume", href: "/resume" },
];
