import { cache } from "react";
import { optional, reader } from "./keystatic";

export type Course = {
  code: string;
  title: string;
  term: string;
  description: string;
  // Slug of a class project (content/projects/); adds a "Final project" link.
  finalProject?: string;
};

// Add or edit classes at /keystatic (stored in content/coursework/).
// Cards are numbered by each entry's "Order".
export const getCourses = cache(async (): Promise<Course[]> => {
  const entries = await reader.collections.coursework.all();
  return entries
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map(({ entry }) => ({
      code: entry.code,
      title: entry.title,
      term: entry.term,
      description: entry.description,
      finalProject: optional(entry.finalProject),
    }));
});
