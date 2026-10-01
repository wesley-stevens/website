import { cache } from "react";
import { optional, reader } from "./keystatic";
import { getExperiencePage } from "./site";

export type Experience = {
  slug: string; // file name in content/experience/
  title: string; // role or organization, e.g. "Undergraduate Researcher"
  subtitle?: string; // e.g. the lab, team, or project
  location: string;
  dates: string; // e.g. "January 2026 – Present"
  // Logo shown next to the title: the file name (no extension) of an image in
  // public/logos/, e.g. "uw-logo" for public/logos/uw-logo.png. Hidden until the file exists.
  logo?: string;
  logoOnWhite?: boolean; // true = show the logo on a white tile (for dark logos)
  // What you do there. Line breaks inside a bullet are ignored on the page.
  bullets?: string[];
  // Optional: link target on the Experience page, e.g. id "ipl-research" makes
  // /experience#ipl-research scroll to this entry.
  id?: string;
  // Optional: short blurb + tool tags for this role's card in the homepage Featured row.
  summary?: string;
  tags?: string[];
};

// Add or edit entries at /keystatic (stored in content/experience/). Each entry's
// "Section" picks the window: Clubs & Research Labs (left) or Work Experience (right).
export const getExperienceSections = cache(async () => {
  const [entries, page] = await Promise.all([
    reader.collections.experience.all(),
    getExperiencePage(),
  ]);
  entries.sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));
  const inSection = (section: "clubs" | "work"): Experience[] =>
    entries
      .filter(({ entry }) => entry.section === section)
      .map(({ slug, entry }) => ({
        slug,
        title: entry.title,
        subtitle: optional(entry.subtitle),
        location: entry.location,
        dates: entry.dates,
        logo: optional(entry.logo),
        logoOnWhite: entry.logoOnWhite,
        bullets: [...entry.bullets],
        id: optional(entry.id),
        summary: optional(entry.summary),
        tags: entry.tags.length ? [...entry.tags] : undefined,
      }));

  // The two windows on the Experience page, left to right.
  return [
    { title: page.clubsHeading, entries: inSection("clubs") },
    { title: page.workHeading, entries: inSection("work") },
  ];
});
