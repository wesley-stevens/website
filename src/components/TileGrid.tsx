import type { ReactNode } from "react";
import Container from "./Container";
import Tag from "./Tag";

// Grid of glass panels, up to 3 per row. Rows are centered, so a row with 1 or
// 2 panels sits in the middle of the screen.
export function TileGrid({ children }: { children: ReactNode }) {
  return (
    <Container className="pb-16 pt-6">
      <div
        className={`flex flex-wrap justify-center gap-8 [&>*]:w-full sm:[&>*]:w-[calc(50%-1rem)]
          lg:[&>*]:w-[calc((100%-4rem)/3)]`}
      >
        {children}
      </div>
    </Container>
  );
}

export const tileClass = "brutal-panel flex min-h-[18rem] flex-col p-8 sm:p-10";

// Boxed code (e.g. "E E 233") shown at the top of a tile.
export function TileHeader({ code }: { code?: string }) {
  return <div className="flex items-start">{code && <Tag>{code}</Tag>}</div>;
}
