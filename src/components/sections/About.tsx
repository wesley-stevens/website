import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import { getSite, type SectionOf } from "@/lib/site";

// Column widths for each photo position (intro card is the wider column).
const gridClasses = {
  right: "grid items-start gap-10 py-16 lg:grid-cols-[1.8fr_1fr] lg:gap-12",
  left: "grid items-start gap-10 py-16 lg:grid-cols-[1fr_1.8fr] lg:gap-12",
  none: "grid items-start gap-10 py-16",
};

// Intro card (status tag, heading, intro, skills, socials) beside a photo + buttons.
export default async function About(about: SectionOf<"about">) {
  const site = await getSite();

  const buttons = (
    // Side by side when the photo column is wide enough, stacked otherwise.
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {about.buttons.map((b) => (
        <Button key={b.href} href={b.href} className="w-full">
          {b.label}
        </Button>
      ))}
    </div>
  );

  const intro = (
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
        {about.showSocials && (
          <div className="flex flex-wrap gap-3">
            <Button href={site.github} variant="secondary">
              GitHub
            </Button>
            <Button href={site.linkedin} variant="secondary">
              LinkedIn
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Photo column: top edge level with the intro card, buttons underneath.
  const photo = (
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
      {buttons}
    </div>
  );

  return (
    <section id="about">
      <Container className={gridClasses[about.photoPosition]}>
        {about.photoPosition === "left" && photo}
        {intro}
        {about.photoPosition === "right" && photo}
        {about.photoPosition === "none" && about.buttons.length > 0 && buttons}
      </Container>
    </section>
  );
}
