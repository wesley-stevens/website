import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ProjectBlocks from "@/components/ProjectBlocks";
import Tag from "@/components/Tag";
import { getProjects } from "@/lib/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ category: p.category, slug: p.slug }));
}

type Props = PageProps<"/projects/[category]/[slug]">;

async function findProject(params: Props["params"]) {
  const { category, slug } = await params;
  return (await getProjects()).find((p) => p.category === category && p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await findProject(params);
  return { title: project?.title, description: project?.summary };
}

export default async function ProjectPage({ params }: Props) {
  const project = await findProject(params);
  if (!project) notFound();

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.summary}
        backHref={`/projects/${project.category}`}
      />
      <Container className="py-16">
        {/* Same max-w-6xl column as the content blocks, so everything lines up. */}
        <div className="mx-auto max-w-6xl">
          <div
            className={`mb-10 flex flex-wrap items-center gap-3 border-b-2
              border-divider pb-8`}
          >
            {project.course && <Tag>{project.course}</Tag>}
            <span className="text-sm font-bold uppercase tracking-widest text-muted">
              {project.year}
            </span>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {project.details?.length ? (
            <ProjectBlocks blocks={project.details} />
          ) : (
            <p
              className="text-sm font-bold uppercase tracking-widest text-muted"
            >
              Full write-up coming soon.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
