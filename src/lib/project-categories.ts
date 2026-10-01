// Project tabs; each gets a page at /projects/<slug>. Their titles and descriptions
// are edited at /keystatic → Projects page. To add a tab, append it here, add a
// matching entry to `categories` in keystatic.config.ts, and optionally drop a photo
// at public/heroes/<slug>.jpg.
export const projectCategories = [
  { slug: "personal", label: "Personal Projects" },
  { slug: "class", label: "Class Projects" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["slug"];
