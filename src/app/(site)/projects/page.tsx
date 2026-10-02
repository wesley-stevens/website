import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getProjectsPage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getProjectsPage()).title };
}

// Layout and text are edited at /keystatic → Pages.
export default async function ProjectsPage() {
  return <PageSections sections={(await getProjectsPage()).sections} />;
}
