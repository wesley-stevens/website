import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { getExperienceSections } from "@/lib/experience";
import { getExperiencePage } from "@/lib/site";
import { logoImage } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getExperiencePage()).title };
}

// Content for both windows lives in content/experience/ (edit at /keystatic).
export default async function ExperiencePage() {
  const [experienceSections, page] = await Promise.all([
    getExperienceSections(),
    getExperiencePage(),
  ]);
  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        compact
      />
      {/* Two side-by-side windows, each half the screen (stacked on phones). */}
      {/* Side by side from 1024px; stacked on phones and portrait tablets. */}
      <Container className="grid items-start gap-8 pb-16 pt-6 lg:grid-cols-2">
        {experienceSections.map((section) => (
          <section
            key={section.title}
            className="brutal-panel p-8 sm:p-10"
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">{section.title}</h2>
            <ol className="mt-4 divide-y-2 divide-divider">
              {section.entries.map((job) => {
                const logo = job.logo && logoImage(job.logo);
                return (
                  // scroll-mt leaves room above a linked entry (/experience#<id>) so its
                  // panel heading stays in view.
                  <li
                    key={`${job.title}-${job.dates}`}
                    id={job.id}
                    className="scroll-mt-28 py-8"
                  >
                    <p className="text-sm font-bold uppercase tracking-wider text-muted">
                      {job.dates} · {job.location}
                    </p>
                    <div
                      className={`mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center
                        sm:gap-4`}
                    >
                      {/* Fixed 128x64 slot so titles line up; the logo scales to fit (above the
                          title on phones). logoOnWhite adds a white tile behind dark logos. */}
                      {logo && (
                        <span
                          className={`h-16 w-32 shrink-0 ${
                            job.logoOnWhite ? "rounded-brutal bg-logo-tile p-2" : ""
                          }`}
                        >
                          <span className="relative block h-full w-full">
                            <Image
                              src={logo}
                              alt=""
                              fill
                              unoptimized
                              loading="eager"
                              className="object-contain"
                            />
                          </span>
                        </span>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-xl tracking-tight sm:text-2xl">{job.title}</h3>
                        {job.subtitle && (
                          <p className="mt-1 font-semibold text-foreground">{job.subtitle}</p>
                        )}
                      </div>
                    </div>
                    {job.bullets && job.bullets.length > 0 && (
                      <ul className="mt-4 list-disc space-y-3 pl-5 text-muted">
                        {job.bullets.map((b) => (
                          <li key={b} className="leading-relaxed marker:text-foreground">
                            {b.replace(/\s+/g, " ").trim()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </Container>
    </>
  );
}
