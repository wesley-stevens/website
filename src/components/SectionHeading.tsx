// Monospace "label" + title used at the top of sections and pages.
export default function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {"// "}
        {label}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
    </div>
  );
}
