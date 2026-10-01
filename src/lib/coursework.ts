import { cache } from "react";
import { reader } from "./keystatic";
import { getProjects } from "./projects";

export type Course = {
  code: string;
  title: string;
  term: string;
  description: string;
  // Slug of the project marked "Course final project" whose Course matches `code`;
  // adds a "Final project" link.
  finalProject?: string;
};

// Add or edit classes at /keystatic (stored in content/coursework/).
// Cards are numbered by each entry's "Order".
export const getCourses = cache(async (): Promise<Course[]> => {
  const [entries, projects] = await Promise.all([
    reader.collections.coursework.all(),
    getProjects(),
  ]);
  return entries
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map(({ entry }) => ({
      code: entry.code,
      title: entry.title,
      term: entry.term,
      description: entry.description,
      finalProject: projects.find((p) => p.finalProject && p.course === entry.code)?.slug,
    }));
});
