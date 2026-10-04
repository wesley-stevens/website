import Link from "next/link";
import Tag from "./Tag";
import { tileClass, tileTitleClass } from "./TileGrid";

// Clickable card: tags (key tools) top-right, title right under them, then the summary,
// meta line pinned to the bottom, arrow on the right. Titles line up across a row no
// matter how long each summary is.
// Used for project cards and the homepage Featured row.
export default function FeatureTile({
  href,
  title,
  summary,
  meta,
  tags = [],
  id,
}: {
  href: string;
  title: string;
  summary: string;
  meta?: string; // small uppercase line, e.g. "E E 271 · 2026"
  tags?: string[];
  id?: string;
}) {
  return (
    <Link
      id={id}
      href={href}
      className={`press group relative scroll-mt-16 hover:bg-surface-hover target:bg-surface-hover
        ${tileClass}`}
    >
      {/* Tags top-right, then the title right under them. In a row of cards, AlignRows
          (in TileGrid) evens out the tag areas and titles, so every title starts at the
          same level and every summary does too. */}
      <div data-align="tags" className="flex items-start justify-end">
        {tags.length > 0 && (
          <ul className="flex flex-wrap justify-end gap-2">
            {tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 data-align="title" className={`mt-4 ${tileTitleClass}`}>
        {title}
      </h2>
      <p className="mt-4 pr-10 leading-relaxed text-muted">{summary}</p>
      {/* mt-auto pins the meta line to the bottom of the card. */}
      {meta && (
        <p className="mt-auto pr-10 pt-6 text-sm font-bold uppercase tracking-wider text-muted">
          {meta}
        </p>
      )}

      <span
        aria-hidden
        className={`absolute right-8 top-1/2 text-2xl text-foreground transition-transform
          group-hover:translate-x-1 sm:right-10`}
      >
        →
      </span>
    </Link>
  );
}
