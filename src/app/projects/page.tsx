import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { TileGrid, tileClass } from "@/components/TileGrid";
import { projectCategories, projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        subtitle="Things I've designed, built, and refined."
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
                <h2 className="text-3xl tracking-tight">{cat.title}</h2>
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
