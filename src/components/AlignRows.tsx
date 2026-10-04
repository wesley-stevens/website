"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Lines up matching parts of cards that sit side by side. Inside each visual row of
// cards, every element with the same data-align value (e.g. "tags", "title") is given
// the height of the tallest one, so the next part (title, summary) starts at the same
// level in every card of that row. Recomputed whenever the grid resizes; on phones
// (one card per row) nothing changes.
export default function AlignRows({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const grid = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = grid.current;
    if (!el) return;
    let frame = 0;

    const align = () => {
      const parts = [...el.querySelectorAll<HTMLElement>("[data-align]")];
      for (const part of parts) part.style.minHeight = "";
      // Group by row (cards with the same top edge) and by which part it is.
      const groups = new Map<string, HTMLElement[]>();
      for (const part of parts) {
        const card = [...el.children].find((c) => c.contains(part)) as HTMLElement | undefined;
        if (!card) continue;
        const key = `${card.offsetTop}|${part.dataset.align}`;
        groups.set(key, [...(groups.get(key) ?? []), part]);
      }
      for (const group of groups.values()) {
        if (group.length < 2) continue;
        const tallest = Math.max(...group.map((p) => p.getBoundingClientRect().height));
        for (const part of group) part.style.minHeight = `${tallest}px`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(align);
    };

    align();
    // Web fonts change text heights once they load.
    document.fonts?.ready.then(schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={grid} className={className}>
      {children}
    </div>
  );
}
