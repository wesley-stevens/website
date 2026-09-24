import Link from "next/link";
import type { Project } from "@/lib/projects";
import Tag from "./Tag";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects#${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60 hover:bg-surface-hover"
    >
      {/* Placeholder thumbnail */}
      <div className="mb-4 aspect-video rounded-lg border border-border bg-background/60" />
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{project.year}</span>
        <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
          view →
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}
