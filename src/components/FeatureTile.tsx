import Link from "next/link";
import Tag from "./Tag";
import { tileClass } from "./TileGrid";

// Clickable card: tags (key tools) top-right, title + summary + meta line at the
// bottom, arrow on the right. Used for project cards and the homepage Featured row.
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
      <div className="flex items-start justify-end">
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

      <div className="mt-auto pr-10 pt-10">
        <h2 className="text-3xl tracking-tight">{title}</h2>
        <p className="mt-4 leading-relaxed text-muted">{summary}</p>
        {meta && (
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-muted">{meta}</p>
        )}
      </div>

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
