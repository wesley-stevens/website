import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import FeatureTile from "@/components/FeatureTile";
import ProjectTile from "@/components/ProjectTile";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { TileGrid } from "@/components/TileGrid";
import { getExperienceSections } from "@/lib/experience";
import { getProjects } from "@/lib/projects";
import { getHome, getSite } from "@/lib/site";

export default async function Home() {
  const [about, site, projects, sections] = await Promise.all([
    getHome(),
    getSite(),
    getProjects(),
    getExperienceSections(),
  ]);
  // Homepage Featured row: every project and role with a "Featured on homepage"
  // position, in that order.
  const featured = [
    ...projects.map((project) => ({ kind: "project" as const, project, at: project.featured })),
    ...sections
      .flatMap((s) => s.entries)
      .map((role) => ({ kind: "experience" as const, role, at: role.featured })),
  ]
    .filter((f) => f.at != null)
    .sort((a, b) => a.at! - b.at!);

  return (
    <>
      {/* About me (text at /keystatic → Homepage) */}
      <section id="about">
        <Container
          className="grid items-start gap-10 py-16 lg:grid-cols-[1.8fr_1fr] lg:gap-12"
        >
          <div className="brutal-panel p-8 sm:p-10">
            <Tag>{about.status}</Tag>
            <h1 className="mt-6 text-3xl leading-tight tracking-tight sm:text-5xl">
              {about.heading}
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {about.body.split(/\n\s*\n/).map((para, i) => (
                <p key={i}>{para.replace(/\s+/g, " ").trim()}</p>
              ))}
            </div>
            {/* Bottom row: skills on the left, GitHub/LinkedIn in the bottom-right corner. */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {about.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={site.github} variant="secondary">
                  GitHub
                </Button>
                <Button href={site.linkedin} variant="secondary">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>

          {/* Photo column: top edge level with the intro card, buttons underneath. */}
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 lg:max-w-none">
            <div className="brutal-panel p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-brutal">
                <Image
                  src={about.photo}
                  alt={`Photo of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 35vw, (min-width: 448px) 448px, 100vw"
                  quality={90}
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
            {/* Side by side when the photo column is wide enough, stacked otherwise. */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {about.buttons.map((b) => (
                <Button key={b.href} href={b.href} className="w-full">
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured: same cards and centered grid as the Projects tabs. */}
      <section>
        <Container>
          <SectionHeading title={about.featuredHeading} size="xl" />
        </Container>
        <TileGrid>
          {featured.map((f) =>
            f.kind === "project"
              ? <ProjectTile key={f.project.slug} project={f.project} />
              : (
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
    </>
  );
}
