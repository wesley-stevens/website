export default function Tag({ children }: { children: string }) {
  return (
    <span
      className={`brutal-chip inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider
        text-foreground`}
    >
      {children}
    </span>
  );
}
