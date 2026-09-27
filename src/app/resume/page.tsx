import type { Metadata } from "next";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Resume"
          description="A one-page overview of my education, experience, and skills."
          note={`Updated ${site.resumeUpdated}`}
          size="lg"
        />
        <Button
          href={site.resume}
          download={site.resumeFileName}
          className="mb-8 px-6 py-3 text-base"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
          </svg>
          Download Resume
        </Button>
      </div>

      {/* Embedded PDF viewer; #view=FitH fits the page to the box width. */}
      <div
        className="brutal-panel mx-auto aspect-[8.5/11] w-full max-w-3xl overflow-hidden"
      >
        <iframe src={`${site.resume}#view=FitH`} title="Resume" className="h-full w-full" />
      </div>
    </Container>
  );
}
