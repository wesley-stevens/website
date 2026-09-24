import Container from "./Container";
import SectionHeading from "./SectionHeading";

// Temporary body for pages that don't have content yet.
export default function PagePlaceholder({ label, title }: { label: string; title: string }) {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading label={label} title={title} description="This page is under construction. Content coming soon." />
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center font-mono text-sm text-muted">
        TODO: add content
      </div>
    </Container>
  );
}
