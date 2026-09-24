export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  year: string;
};

// Placeholder data. Replace with real projects.
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "A short description of the project, what problem it solves, and the approach you took.",
    tags: ["Python", "Signal Processing"],
    year: "2026",
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "A short description of the project, what problem it solves, and the approach you took.",
    tags: ["C", "Embedded"],
    year: "2025",
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "A short description of the project, what problem it solves, and the approach you took.",
    tags: ["TypeScript", "Web"],
    year: "2025",
  },
];
