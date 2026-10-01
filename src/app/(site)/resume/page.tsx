import type { Metadata } from "next";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getResumePage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getResumePage()).title };
}

export default async function ResumePage() {
  const resume = await getResumePage();
  return (
    <Container className="py-16 sm:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title={resume.title}
          description={resume.description}
          note={`Updated ${resume.updated}`}
          size="lg"
        />
        <Button
          href={resume.file}
          download={resume.downloadName}
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
        <iframe src={`${resume.file}#view=FitH`} title="Resume" className="h-full w-full" />
      </div>
      {/* Phones/tablets often show only page 1 (or nothing) of an embedded PDF. */}
      <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted">
        Viewer not loading on your device?{" "}
        <a
          href={resume.file}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-foreground underline underline-offset-4"
        >
          Open the PDF in a new tab
        </a>
        .
      </p>
    </Container>
  );
}
