import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProjectTile from "@/components/ProjectTile";
import { TileGrid } from "@/components/TileGrid";
import { getProjectCategories, getProjects, projectCategories } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectCategories.map((c) => ({ category: c.slug }));
}

const findCategory = async (slug: string) =>
  (await getProjectCategories()).find((c) => c.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/projects/[category]">): Promise<Metadata> {
  const { category } = await params;
  return { title: (await findCategory(category))?.title };
}

export default async function ProjectCategoryPage({ params }: PageProps<"/projects/[category]">) {
  const { category } = await params;
  const cat = await findCategory(category);
  if (!cat) notFound();
  const items = (await getProjects()).filter((p) => p.category === cat.slug);

  return (
    <>
      <PageHero
        title={cat.title}
        subtitle={cat.description}
        backHref="/projects"
      />
      <TileGrid>
        {items.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </TileGrid>
    </>
  );
}
