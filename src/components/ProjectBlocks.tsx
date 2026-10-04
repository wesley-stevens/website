import Image from "next/image";
import { mediaSize } from "@/lib/media";
import type { MediaItem, ProjectBlock } from "@/lib/projects";

// Turns a YouTube watch/share link into an embeddable URL, or returns undefined.
function youtubeEmbed(src: string) {
  const pattern = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
  const id = src.match(pattern)?.[1];
  return id && `https://www.youtube-nocookie.com/embed/${id}`;
}

// One shared column width for every block, so headings, text, and media all line up.
const column = "mx-auto w-full max-w-6xl";

// Image row: every image in one row from 768px up (2 per row on phones), centered
// vertically so screenshots of different shapes line up through the middle.
const rowColumns: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

// One photo or video, with an optional label above and caption below.
// Sizes come from the actual files (read at build time), so every browser lays the
// media out the same way without having to measure it first:
// - photos fill the column width;
// - local videos keep their real shape and are as wide as possible while staying
//   within 80% of the screen height (portrait phone clips stay portrait).
// The label and caption share the figure's width, so they line up with the media.
export function Media({
  item,
  sizes = "(min-width: 1280px) 1152px, 100vw",
}: {
  item: MediaItem;
  sizes?: string; // how wide the image displays, so browsers download a fitting size
}) {
  const embed = item.type === "video" ? youtubeEmbed(item.src) : undefined;
  const size = embed ? undefined : mediaSize(item.src);
  const w = size?.width ?? (item.type === "video" ? 9 : 16);
  const h = size?.height ?? (item.type === "video" ? 16 : 10);
  const figureWidth =
    item.type === "video" && !embed ? `min(100%, calc(80vh * ${w} / ${h}))` : "100%";

  return (
    <figure className="mx-auto max-w-full" style={{ width: figureWidth }}>
      {item.label && <h3 className="mb-4 text-lg tracking-tight">{item.label}</h3>}

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
            width={w}
            height={h}
            sizes={sizes}
            quality={90}
            className="block h-auto w-full"
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
        // "#t=0.1" shows the first frame before play (incl. iOS Safari).
        <video
          src={`${item.src}#t=0.1`}
          width={w}
          height={h}
          controls
          playsInline
          preload="metadata"
          className="brutal-panel block h-auto w-full object-cover"
          style={{ aspectRatio: `${w} / ${h}` }}
        />
      )}

      {item.caption && <figcaption className="mt-3 text-sm text-muted">{item.caption}</figcaption>}
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
                className={`${column} grid items-start gap-8 md:grid-cols-2`}
              >
                {block.items.map((item) => (
                  <Media key={item.src} item={item} />
                ))}
              </div>
            );
          case "row":
            return (
              <div
                key={i}
                className={`${column} grid grid-cols-2 items-center gap-4
                  ${rowColumns[block.items.length]}`}
              >
                {block.items.map((item) => (
                  <Media
                    key={item.src}
                    item={item}
                    sizes={`(min-width: 768px) ${Math.ceil(100 / block.items.length)}vw, 50vw`}
                  />
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
