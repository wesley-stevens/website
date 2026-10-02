import Button from "@/components/Button";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { Media } from "@/components/ProjectBlocks";
import SectionHeading from "@/components/SectionHeading";
import type { SectionOf } from "@/lib/site";

// General-purpose sections that can go on any page.

export function Banner({ title, subtitle, size }: SectionOf<"banner">) {
  return <PageHero title={title} subtitle={subtitle || undefined} compact={size === "compact"} />;
}

export function Heading({ title, description, size }: SectionOf<"heading">) {
  return (
    <Container className="pt-6">
      <SectionHeading title={title} description={description || undefined} size={size} />
    </Container>
  );
}

// A blank line starts a new paragraph; line breaks inside a paragraph are ignored.
export function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-muted">
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i}>{para.replace(/\s+/g, " ").trim()}</p>
      ))}
    </div>
  );
}

export function Text({ text, style, width }: SectionOf<"text">) {
  return (
    <Container className="pb-10">
      <div className={width === "narrow" ? "mx-auto max-w-4xl" : ""}>
        {style === "panel" ? (
          <div className="brutal-panel p-8 sm:p-10">
            <Paragraphs text={text} />
          </div>
        ) : (
          <Paragraphs text={text} />
        )}
      </div>
    </Container>
  );
}

export function MediaSection({ type, src, label, caption, width }: SectionOf<"media">) {
  return (
    <Container className="pb-10">
      <div className={`mx-auto w-full ${width === "narrow" ? "max-w-3xl" : "max-w-6xl"}`}>
        <Media
          item={{ type, src, label: label || undefined, caption: caption || undefined }}
        />
      </div>
    </Container>
  );
}

export function Buttons({ buttons, align }: SectionOf<"buttons">) {
  return (
    <Container className="pb-10">
      <div className={`flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`}>
        {buttons.map((b) => (
          <Button key={`${b.label}-${b.href}`} href={b.href} variant={b.style}>
            {b.label}
          </Button>
        ))}
      </div>
    </Container>
  );
}

const spacerHeights = { small: "h-8", medium: "h-16", large: "h-32" };

export function Spacer({ size }: SectionOf<"spacer">) {
  return <div aria-hidden className={spacerHeights[size]} />;
}
