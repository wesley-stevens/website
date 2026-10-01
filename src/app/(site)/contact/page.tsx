import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getContactPage, getSite } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getContactPage()).title };
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, "");

export default async function ContactPage() {
  const [site, page] = await Promise.all([getSite(), getContactPage()]);
  const methods = [
  { label: "Personal Email (Preferred)", value: site.email, href: `mailto:${site.email}` },
  { label: "School Email", value: site.schoolEmail, href: `mailto:${site.schoolEmail}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
  { label: "LinkedIn", value: stripProtocol(site.linkedin), href: site.linkedin },
  { label: "GitHub", value: stripProtocol(site.github), href: site.github },
];

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading title={page.title} description={page.description} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {methods.map((m) => (
          <a
            key={m.label}
            href={m.href}
            {...(m.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="brutal-panel press p-6 hover:bg-surface-hover"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted">{m.label}</p>
            <p className="mt-2 break-words text-lg text-foreground">{m.value}</p>
          </a>
        ))}
      </div>
    </Container>
  );
}
