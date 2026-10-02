import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getCourseworkPage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getCourseworkPage()).title };
}

// Layout and text are edited at /keystatic → Pages.
export default async function CourseworkPage() {
  return <PageSections sections={(await getCourseworkPage()).sections} />;
}
