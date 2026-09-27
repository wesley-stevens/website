import { projectHref, type Project } from "@/lib/projects";
import FeatureTile from "./FeatureTile";

// A project's card (Projects tabs and homepage Featured row).
export default function ProjectTile({ project }: { project: Project }) {
  return (
    <FeatureTile
      id={project.slug}
      href={projectHref(project)}
      title={project.title}
      summary={project.summary}
      meta={[project.course, project.year].filter(Boolean).join(" · ")}
      tags={project.tags}
    />
  );
}
