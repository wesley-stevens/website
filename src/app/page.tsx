import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import FeatureTile from "@/components/FeatureTile";
import ProjectTile from "@/components/ProjectTile";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { TileGrid } from "@/components/TileGrid";
import { clubsAndResearch, FEATURED_EXPERIENCE_ID } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { about, site } from "@/lib/site";

const skills = ["Java", "Verilog", "Python", "MATLAB", "Linux"];

// Homepage Featured row: the first two projects + the featured research role.
const featuredProjects = projects.slice(0, 2);
const research = clubsAndResearch.find((e) => e.id === FEATURED_EXPERIENCE_ID);

export default function Home() {
  return (
    <>
      {/* About me (text in src/lib/site.ts → `about`) */}
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
                {skills.map((s) => (
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
              <Button href="/projects" className="w-full">
                View My Projects
              </Button>
              <Button href="/experience" className="w-full">
                View My Experience
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured: same cards and centered grid as the Projects tabs. */}
      <section>
        <Container>
          <SectionHeading title="Featured" size="xl" />
        </Container>
        <TileGrid>
          {featuredProjects.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
          {research && (
            <FeatureTile
              href={`/experience#${research.id}`}
              title={research.title}
              summary={(research.summary ?? "").replace(/\s+/g, " ").trim()}
              meta={`UW Information Processing Lab · ${research.dates}`}
              tags={research.tags}
            />
          )}
        </TileGrid>
      </section>
    </>
  );
}
