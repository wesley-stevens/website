import Image from "next/image";
import Container from "@/components/Container";
import { getExperience } from "@/lib/experience";
import { logoImage } from "@/lib/images";
import type { SectionOf } from "@/lib/site";

// Side by side from 1024px (stacked on phones and portrait tablets), or always stacked.
const arrangementClasses = {
  side: "grid items-start gap-8 pb-16 pt-6 lg:grid-cols-2",
  stacked: "grid items-start gap-8 pb-16 pt-6",
};

// The two Experience windows; entries live in content/experience/ (edit at /keystatic).
export default async function ExperienceWindows(props: SectionOf<"experience">) {
  const { clubs, work } = await getExperience();
  const windows = [
    { title: props.clubsHeading, entries: clubs },
    { title: props.workHeading, entries: work },
  ];
  if (props.first === "work") windows.reverse();

  return (
    <Container className={arrangementClasses[props.arrangement]}>
      {windows.map((section) => (
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
  );
}
