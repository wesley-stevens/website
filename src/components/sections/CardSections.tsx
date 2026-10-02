import Link from "next/link";
import Container from "@/components/Container";
import CourseCard from "@/components/CourseCard";
import FeatureTile from "@/components/FeatureTile";
import ProjectTile from "@/components/ProjectTile";
import SectionHeading from "@/components/SectionHeading";
import { TileGrid, tileClass, tileTitleClass } from "@/components/TileGrid";
import { getCourses } from "@/lib/coursework";
import { getExperience } from "@/lib/experience";
import { getProjectCategories, getProjects } from "@/lib/projects";
import type { SectionOf } from "@/lib/site";

// Card-grid sections built from projects, coursework, and experience entries.

// Every project and role with a "Featured on homepage" position, in that order.
export async function Featured({ heading, columns }: SectionOf<"featured">) {
  const [projects, { clubs, work }] = await Promise.all([getProjects(), getExperience()]);
  const featured = [
    ...projects.map((project) => ({ kind: "project" as const, project, at: project.featured })),
    ...[...clubs, ...work].map((role) => ({
      kind: "experience" as const,
      role,
      at: role.featured,
    })),
  ]
    .filter((f) => f.at != null)
    .sort((a, b) => a.at! - b.at!);

  return (
    // Same cards and centered grid as the Projects tabs.
    <section>
      <Container>
        <SectionHeading title={heading} size="xl" />
      </Container>
      <TileGrid columns={columns}>
        {featured.map((f) =>
          f.kind === "project" ? (
            <ProjectTile key={f.project.slug} project={f.project} />
          ) : (
            <FeatureTile
              key={f.role.slug}
              href={f.role.id ? `/experience#${f.role.id}` : "/experience"}
              title={f.role.title}
              summary={(f.role.summary ?? "").replace(/\s+/g, " ").trim()}
              meta={[f.role.subtitle, f.role.dates].filter(Boolean).join(" · ")}
              tags={f.role.tags}
            />
          ),
        )}
      </TileGrid>
    </section>
  );
}

// One card per Projects tab, linking to /projects/<tab>.
export async function ProjectTabs({ columns }: SectionOf<"projectTabs">) {
  const [projects, projectCategories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);
  return (
    <TileGrid columns={columns}>
      {projectCategories.map((cat) => {
        const count = projects.filter((p) => p.category === cat.slug).length;
        return (
          <Link
            key={cat.slug}
            href={`/projects/${cat.slug}`}
            className={`press group hover:bg-surface-hover ${tileClass}`}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-muted">
              {count} project{count === 1 ? "" : "s"}
            </p>
            <div className="mt-auto pt-10">
              <h2 className={tileTitleClass}>{cat.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">
                {cat.description}
              </p>
              <span
                className={`mt-6 inline-block text-sm font-bold uppercase tracking-wider
                  transition-transform group-hover:translate-x-1`}
              >
                Explore →
              </span>
            </div>
          </Link>
        );
      })}
    </TileGrid>
  );
}

export async function ProjectCards({ category, columns }: SectionOf<"projectCards">) {
  const projects = (await getProjects()).filter(
    (p) => category === "all" || p.category === category,
  );
  return (
    <TileGrid columns={columns}>
      {projects.map((p) => (
        <ProjectTile key={p.slug} project={p} />
      ))}
    </TileGrid>
  );
}

export async function Courses({ columns }: SectionOf<"courses">) {
  const courses = await getCourses();
  return (
    <TileGrid columns={columns}>
      {courses.map((c) => (
        <CourseCard key={c.code} course={c} />
      ))}
    </TileGrid>
  );
}
