import Container from "./Container";
import SectionHeading from "./SectionHeading";

// Temporary body for pages that don't have content yet.
export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        title={title}
        description="This page is under construction. Content coming soon."
      />
      <div
        className={`brutal-panel p-10 text-center text-sm font-bold uppercase
          tracking-widest text-muted`}
      >
        TODO: add content
      </div>
    </Container>
  );
}
