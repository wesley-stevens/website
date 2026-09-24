import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return <PagePlaceholder label="resume" title="Resume" />;
}
