import Button from "@/components/Button";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const skills = ["Python", "C/C++", "MATLAB", "Signal Processing", "Embedded Systems", "TypeScript", "Git"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <Container className="flex flex-col items-center gap-10 py-16 text-center sm:py-24 md:flex-row md:items-center md:gap-14 md:text-left">
          {/* Photo placeholder: swap for <Image src="/me.jpg" ... className="rounded-full" /> */}
          <div className="relative shrink-0">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs text-muted sm:h-48 sm:w-48">
              photo
            </div>
            <div className="pointer-events-none absolute -inset-2 rounded-full border border-accent/30" />
          </div>

          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{"// hello, world"}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{site.name}</h1>
            <p className="mt-2 font-mono text-sm text-muted">{site.tagline}</p>
            <p className="mt-5 leading-relaxed text-muted">
              A short intro paragraph about who you are, what you study, and what you like to build.
              Mention a focus area or two and what kind of opportunities you&apos;re looking for.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button href="/projects">View Projects</Button>
              <Button href={site.github} variant="secondary">
                GitHub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Project previews */}
      <section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading label="featured" title="Selected Projects" />
            <Button href="/projects" variant="secondary" className="mb-8 hidden sm:inline-flex">
              All projects →
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
