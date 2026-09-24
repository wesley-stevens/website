import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <PagePlaceholder label="projects" title="Projects" />;
}
