export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return <Tag className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</Tag>;
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-3xl tracking-wide text-ink md:text-4xl">
      {children}
    </h2>
  );
}
