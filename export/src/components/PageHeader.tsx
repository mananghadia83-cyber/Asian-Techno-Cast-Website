import { RichText } from "./RichText";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#d8e2ed_1px,transparent_1px),linear-gradient(90deg,#d8e2ed_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ore">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] tracking-wide md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl text-lg text-steel">
            <RichText text={intro} />
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
