import type { ReactNode } from "react";
import AlignRows from "./AlignRows";
import Container from "./Container";
import Tag from "./Tag";

// Card widths for each column count (chosen per section at /keystatic).
const columnClasses = {
  "3": `md:[&>*]:w-[calc(50%-1rem)]
          xl:[&>*]:w-[calc((100%-4rem)/3)]`,
  "2": "md:[&>*]:w-[calc(50%-1rem)]",
  "1": "[&>*]:max-w-3xl",
};

// Grid of glass panels: 1 per row on phones, 2 from 768px (tablets), 3 from 1280px
// (or at most `columns` per row). Rows are centered, so a row with fewer panels sits in
// the middle of the screen.
export function TileGrid({
  children,
  columns = "3",
}: {
  children: ReactNode;
  columns?: keyof typeof columnClasses;
}) {
  return (
    <Container className="pb-16 pt-6">
      <AlignRows
        className={`flex flex-wrap justify-center gap-8 [&>*]:w-full ${columnClasses[columns]}`}
      >
        {children}
      </AlignRows>
    </Container>
  );
}

// @container: card titles size themselves from the card's own width (cqw units),
// so long words always fit inside the card on every screen.
export const tileClass = "@container brutal-panel flex min-h-[18rem] flex-col p-8 sm:p-10";

// Card title size: scales with the card width, between 18px and 30px.
export const tileTitleClass = "text-[length:clamp(1.125rem,7.5cqw,1.875rem)] tracking-tight";

// Boxed code (e.g. "E E 233") shown at the top of a tile.
export function TileHeader({ code }: { code?: string }) {
  return <div className="flex items-start">{code && <Tag>{code}</Tag>}</div>;
}
