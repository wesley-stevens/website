import type { Section } from "@/lib/site";
import About from "./sections/About";
import { Courses, Featured, ProjectCards, ProjectTabs } from "./sections/CardSections";
import Contact from "./sections/Contact";
import ExperienceWindows from "./sections/ExperienceWindows";
import { Banner, Buttons, Heading, MediaSection, Spacer, Text } from "./sections/General";
import Resume from "./sections/Resume";

// Renders a page's sections top to bottom (edited at /keystatic → Pages → Sections).
export default function PageSections({ sections }: { sections: readonly Section[] }) {
  return (
    <>
      {sections.map((section, i) => {
        if (section.value.hidden) return null;
        switch (section.discriminant) {
          case "banner":
            return <Banner key={i} {...section.value} />;
          case "heading":
            return <Heading key={i} {...section.value} />;
          case "text":
            return <Text key={i} {...section.value} />;
          case "media":
            return <MediaSection key={i} {...section.value} />;
          case "buttons":
            return <Buttons key={i} {...section.value} />;
          case "spacer":
            return <Spacer key={i} {...section.value} />;
          case "about":
            return <About key={i} {...section.value} />;
          case "featured":
            return <Featured key={i} {...section.value} />;
          case "projectTabs":
            return <ProjectTabs key={i} {...section.value} />;
          case "projectCards":
            return <ProjectCards key={i} {...section.value} />;
          case "courses":
            return <Courses key={i} {...section.value} />;
          case "experience":
            return <ExperienceWindows key={i} {...section.value} />;
          case "resume":
            return <Resume key={i} {...section.value} />;
          case "contact":
            return <Contact key={i} {...section.value} />;
        }
      })}
    </>
  );
}
