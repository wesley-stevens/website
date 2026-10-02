import type { Metadata } from "next";
import PageSections from "@/components/PageSections";
import { getContactPage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getContactPage()).title };
}

// Layout and text are edited at /keystatic → Pages.
export default async function ContactPage() {
  return <PageSections sections={(await getContactPage()).sections} />;
}
