import { cache } from "react";
import { reader } from "./keystatic";

// Site settings: name, contact info, and links. Edit at /keystatic → Site settings
// (stored in content/pages/settings.yaml).
export const getSite = cache(async () => {
  const s = await reader.singletons.settings.readOrThrow();
  return { ...s, github: s.github ?? "", linkedin: s.linkedin ?? "" };
});

// Text for each page, edited at /keystatic → Pages (stored in content/pages/).
export const getHome = cache(() => reader.singletons.home.readOrThrow());
export const getProjectsPage = cache(() => reader.singletons.projectsPage.readOrThrow());
export const getExperiencePage = cache(() => reader.singletons.experiencePage.readOrThrow());
export const getCourseworkPage = cache(() => reader.singletons.courseworkPage.readOrThrow());
export const getResumePage = cache(() => reader.singletons.resumePage.readOrThrow());
export const getContactPage = cache(() => reader.singletons.contactPage.readOrThrow());

// One section of a page (every page uses the same section types).
export type Section = Awaited<ReturnType<typeof getHome>>["sections"][number];

// The fields of one kind of section, e.g. SectionOf<"banner">.
export type SectionOf<K extends Section["discriminant"]> = Extract<
  Section,
  { discriminant: K }
>["value"];
