import PageSections from "@/components/PageSections";
import { getHome } from "@/lib/site";

// Layout and text are edited at /keystatic → Pages → Homepage.
export default async function Home() {
  return <PageSections sections={(await getHome()).sections} />;
}
