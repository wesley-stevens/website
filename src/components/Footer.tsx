import { site } from "@/lib/site";
import Container from "./Container";

const linkClass = "font-bold uppercase tracking-wider underline-offset-4 hover:underline";

export default function Footer() {
  return (
    <footer className="brutal-bar mt-24 border-t-[3px] border-line">
      {/* Three equal columns so the copyright sits in the true center of the page. */}
      <Container
        className={`grid items-center justify-items-center gap-3 py-6 text-sm
          sm:grid-cols-3`}
      >
        <p className="text-muted sm:justify-self-start">{site.location}</p>
        <p className="text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-6 sm:justify-self-end">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
