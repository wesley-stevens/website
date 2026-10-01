import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import PageHero from "@/components/PageHero";
import { TileGrid } from "@/components/TileGrid";
import { getCourses } from "@/lib/coursework";
import { getCourseworkPage } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getCourseworkPage()).title };
}

export default async function CourseworkPage() {
  const [courses, page] = await Promise.all([getCourses(), getCourseworkPage()]);
  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
      />
      <TileGrid>
        {courses.map((c) => (
          <CourseCard key={c.code} course={c} />
        ))}
      </TileGrid>
    </>
  );
}
