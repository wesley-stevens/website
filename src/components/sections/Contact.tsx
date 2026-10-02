import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getSite, type SectionOf } from "@/lib/site";

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, "");

const columnClasses = {
  "3": "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  "2": "grid gap-5 sm:grid-cols-2",
  "1": "grid gap-5",
};

// Contact cards built from Site settings (emails, phone, links).
export default async function Contact({ title, description, columns }: SectionOf<"contact">) {
  const site = await getSite();
  const methods = [
    { label: "Personal Email (Preferred)", value: site.email, href: `mailto:${site.email}` },
    { label: "School Email", value: site.schoolEmail, href: `mailto:${site.schoolEmail}` },
    { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
    { label: "LinkedIn", value: stripProtocol(site.linkedin), href: site.linkedin },
    { label: "GitHub", value: stripProtocol(site.github), href: site.github },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading title={title} description={description} />
      <div className={columnClasses[columns]}>
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
