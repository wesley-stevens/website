const sizes = {
  md: {
    label: "text-xs",
    title: "text-2xl sm:text-3xl",
    description: "mt-3",
    note: "mt-2 text-xs",
  },
  lg: {
    label: "text-sm",
    title: "text-3xl sm:text-4xl",
    description: "mt-4 text-lg",
    note: "mt-4 text-sm",
  },
  // Same size as the homepage About heading.
  xl: {
    label: "text-sm",
    title: "text-4xl sm:text-5xl",
    description: "mt-4 text-lg",
    note: "mt-4 text-sm",
  },
};

// Optional small uppercase "label" + title used at the top of sections and pages.
export default function SectionHeading({
  label,
  title,
  description,
  note,
  size = "md",
}: {
  label?: string;
  title: string;
  description?: string;
  note?: string; // small line under the description, e.g. "Updated September 2026"
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <div className="mb-8">
      {label && (
        <p className={`mb-2 font-bold uppercase tracking-widest text-foreground ${s.label}`}>
          {"// "}
          {label}
        </p>
      )}
      <h2 className={`tracking-tight ${s.title}`}>{title}</h2>
      {description && <p className={`max-w-4xl text-muted ${s.description}`}>{description}</p>}
      {note && (
        <p className={`font-bold uppercase tracking-widest text-foreground ${s.note}`}>{note}</p>
      )}
    </div>
  );
}
