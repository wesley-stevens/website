import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import PageHero from "@/components/PageHero";
import { TileGrid } from "@/components/TileGrid";
import { courses } from "@/lib/coursework";

export const metadata: Metadata = { title: "Coursework" };

export default function CourseworkPage() {
  return (
    <>
      <PageHero
        title="Coursework"
        subtitle="Explore all relevant coursework I've accomplished to complete my degree."
      />
      <TileGrid>
        {courses.map((c) => (
          <CourseCard key={c.code} course={c} />
        ))}
      </TileGrid>
    </>
  );
}
