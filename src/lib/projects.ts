import { cache } from "react";
import { optional, reader } from "./keystatic";
import { projectCategories, type ProjectCategory } from "./project-categories";
import { getProjectsPage } from "./site";

export { projectCategories, type ProjectCategory } from "./project-categories";

// The Projects tabs with their title + description (edited at /keystatic → Projects page).
export const getProjectCategories = cache(async () => {
  const { categories } = await getProjectsPage();
  return projectCategories.map((c) => ({ slug: c.slug, ...categories[c.slug] }));
});

// A photo or video on a project page. Put files in public/project-media/<slug>/
// and reference them as "/project-media/<slug>/<file>". Videos can also be a
// YouTube link. Use .mp4 (H.264) for videos so they play in every browser.
export type MediaItem = {
  type: "image" | "video";
  src: string;
  label?: string; // short title shown above, e.g. "Win condition"
  caption?: string; // sentence shown below
};

// Content blocks for a project's detail page, shown top to bottom.
// - heading: a section title (e.g. "Overview").
// - text: write freely across lines; a blank line starts a new paragraph.
// - list: bullet points.
// - image / video: one item at text width.
// - gallery: items side by side (stacked on phones).
export type ProjectBlock =
  | { type: "heading"; text: string }
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | (MediaItem & { type: "image" | "video" })
  | { type: "gallery"; items: MediaItem[] };

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  summary: string;
  tags: string[]; // key software/hardware, shown in the card's top-right corner
  year: string;
  course?: string; // e.g. "E E 233" for class projects
  finalProject: boolean; // linked from the Coursework card whose code matches `course`
  featured?: number; // position in the homepage Featured row
  details?: ProjectBlock[];
};

type MediaFields = { src: string; label: string; caption: string };
const media = (type: MediaItem["type"], m: MediaFields): MediaItem => ({
  type,
  src: m.src,
  label: optional(m.label),
  caption: optional(m.caption),
});

// Add or edit projects at /keystatic (stored in content/projects/), ordered by "Order".
export const getProjects = cache(async (): Promise<Project[]> => {
  const entries = await reader.collections.projects.all();
  return entries
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map(({ slug, entry }) => ({
      slug,
      category: entry.category,
      title: entry.title,
      summary: entry.summary,
      tags: [...entry.tags],
      year: entry.year,
      course: optional(entry.course),
      finalProject: entry.finalProject,
      featured: entry.featured ?? undefined,
      details: entry.details.map((block): ProjectBlock => {
        switch (block.discriminant) {
          case "heading":
            return { type: "heading", text: block.value };
          case "text":
            return { type: "text", text: block.value };
          case "list":
            return { type: "list", items: [...block.value] };
          case "image":
          case "video":
            return media(block.discriminant, block.value) as ProjectBlock;
          case "gallery":
            return { type: "gallery", items: block.value.map((m) => media(m.type, m)) };
        }
      }),
    }));
});

export const projectHref = (p: Project) => `/projects/${p.category}/${p.slug}`;
