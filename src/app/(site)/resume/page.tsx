import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getResumePage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getResumePage()).title };
}

// Layout and text are edited at /keystatic → Pages.
export default async function ResumePage() {
  return <PageSections sections={(await getResumePage()).sections} />;
}
