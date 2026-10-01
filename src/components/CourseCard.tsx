import Link from "next/link";
import type { Course } from "@/lib/coursework";
import { projectHref, projects } from "@/lib/projects";
import { TileHeader, tileClass, tileTitleClass } from "./TileGrid";

export default function CourseCard({ course }: { course: Course }) {
  const project = projects.find((p) => p.slug === course.finalProject);

  return (
    <article className={tileClass}>
      <TileHeader code={course.code} />

      {/* Fixed top-down layout so term, title, and description line up across a row. */}
      <p className="mt-8 text-sm text-muted">{course.term}</p>
      {/* Reserve two lines for the title (when cards sit side by side) so every
          description starts at the same height. */}
      <h2 className={`mt-2 md:min-h-[2lh] ${tileTitleClass}`}>
        {course.title}
      </h2>
      <p className="mt-4 leading-relaxed text-muted">{course.description}</p>

      {/* mt-auto pins the button to the bottom of the card; pt-8 keeps a gap above it. */}
      {project && (
        <div className="mt-auto pt-8">
          <Link
            href={projectHref(project)}
            className={`brutal-chip press-sm flex w-full flex-col items-start gap-1.5 px-4 py-2.5
              text-sm hover:bg-surface-hover @xs:flex-row @xs:items-center @xs:gap-3`}
          >
            <span
              className="shrink-0 whitespace-nowrap text-xs font-bold uppercase tracking-wider"
            >
              <span className="mr-1.5 text-[0.6rem]">▸</span>Final project
            </span>
            {/* Label and project name sit side by side in wide cards, stacked in narrow ones. */}
            <span className="hidden h-4 w-0.5 shrink-0 bg-divider @xs:block" />
            <span className="min-w-0 text-foreground">{project.title}</span>
          </Link>
        </div>
      )}
    </article>
  );
}
