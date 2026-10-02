import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getExperiencePage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getExperiencePage()).title };
}

// Layout and text are edited at /keystatic → Pages.
export default async function ExperiencePage() {
  return <PageSections sections={(await getExperiencePage()).sections} />;
}
