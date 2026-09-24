// Central site config: edit names, links, and nav items here.
export const site = {
  name: "Your Name",
  title: "Your Name — Portfolio",
  description: "Personal portfolio: projects, coursework, and resume.",
  tagline: "Electrical Engineering Student · Builder",
  email: "you@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
};

export type NavItem = { label: string; href: string };

// Add a page: create src/app/<slug>/page.tsx, then add it here.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Coursework", href: "/coursework" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
