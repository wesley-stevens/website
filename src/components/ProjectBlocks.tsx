import Image from "next/image";
import type { MediaItem, ProjectBlock } from "@/lib/projects";

// Turns a YouTube watch/share link into an embeddable URL, or returns undefined.
function youtubeEmbed(src: string) {
  const pattern = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
  const id = src.match(pattern)?.[1];
  return id && `https://www.youtube-nocookie.com/embed/${id}`;
}

// One shared column width for every block, so headings, text, and media all line up.
const column = "mx-auto w-full max-w-6xl";

// One photo or video, with an optional label above and caption below. The figure
// shrinks to the media's width and is centered; the label and caption take that
// same width ([contain:inline-size] stops them widening it), so they line up with
// the media's edges instead of the column's.
function Media({ item }: { item: MediaItem }) {
  const embed = item.type === "video" ? youtubeEmbed(item.src) : undefined;

  return (
    <figure className="mx-auto flex w-fit max-w-full flex-col">
      {item.label && (
        <h3 className="mb-4 text-lg tracking-tight [contain:inline-size]">{item.label}</h3>
      )}

      {item.type === "image" ? (
        // Click to open the full-size image (handy for screenshots).
        <a
          href={item.src}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-panel press block overflow-hidden"
        >
          <Image
            src={item.src}
            alt={item.caption ?? item.label ?? ""}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 1024px, 100vw"
            quality={90}
            className="h-auto w-full"
          />
        </a>
      ) : embed ? (
        <div className="brutal-panel aspect-video overflow-hidden">
          <iframe
            src={embed}
            title={item.label ?? item.caption ?? "Project video"}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        // Keeps the video's own shape (portrait phone clips stay portrait), capped
        // to 80% of the screen height. "#t=0.1" shows the first frame before play.
        <video
          src={`${item.src}#t=0.1`}
          controls
          playsInline
          preload="metadata"
          className="brutal-panel max-h-[80vh] w-auto max-w-full"
        />
      )}

      {item.caption && (
        <figcaption className="mt-3 text-sm text-muted [contain:inline-size]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Renders a project's detail content: headings, paragraphs, lists, photos, videos.
export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className={`${column} pt-6 text-2xl tracking-tight`}>
                {block.text}
              </h2>
            );
          case "text":
            return (
              <div
                key={i}
                className={`${column} space-y-4 text-lg leading-relaxed text-foreground/85`}
              >
                {block.text.split(/\n\s*\n/).map((para, j) => (
                  <p key={j}>{para.replace(/\s+/g, " ").trim()}</p>
                ))}
              </div>
            );
          case "list":
            return (
              <ul
                key={i}
                className={`${column} list-disc space-y-3 pl-6 text-lg leading-relaxed
                  text-foreground/85 marker:text-foreground`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item.replace(/\s+/g, " ").trim()}</li>
                ))}
              </ul>
            );
          case "image":
          case "video":
            return (
              <div key={i} className={column}>
                <Media item={block} />
              </div>
            );
          case "gallery":
            return (
              <div
                key={i}
                className={`${column} grid items-start gap-8 sm:grid-cols-2`}
              >
                {block.items.map((item) => (
                  <Media key={item.src} item={item} />
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
