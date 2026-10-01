import Link from "next/link";
import Container from "./Container";

// Banner at the top of section pages: a centered title and subtitle.
export default function PageHero({
  title,
  subtitle,
  backHref = "/",
  compact = false,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  compact?: boolean; // shorter banner so the page content starts higher
}) {
  return (
    <section className={`flex ${compact ? "min-h-[24vh]" : "min-h-[30vh]"}`}>
      <Container className="flex flex-col py-8">
        <Link
          href={backHref}
          className={`brutal-chip press-sm self-start px-3 py-1.5 text-xs font-bold uppercase
            tracking-widest`}
        >
          ← Back
        </Link>
        <div className="my-auto flex flex-col items-center py-6 text-center">
          <h1
            className="text-shadow-hard max-w-6xl text-4xl tracking-tight sm:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-4xl text-lg text-foreground/85">{subtitle}</p>}
        </div>
      </Container>
    </section>
  );
}
