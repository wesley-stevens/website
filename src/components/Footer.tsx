import { site } from "@/lib/site";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-5">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
