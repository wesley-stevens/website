import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { TileGrid, tileClass, tileTitleClass } from "@/components/TileGrid";
import { getProjectCategories, getProjects } from "@/lib/projects";
import { getProjectsPage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getProjectsPage()).title };
}

export default async function ProjectsPage() {
  const [projects, projectCategories, page] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getProjectsPage(),
  ]);
  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
      />
      <TileGrid>
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
    </>
  );
}
