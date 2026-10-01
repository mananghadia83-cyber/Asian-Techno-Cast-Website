import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Section } from "@/lib/types";
import { Container, SectionTitle } from "./Container";
import { FactGrid } from "./FactGrid";
import { ImageSlot } from "./ImageSlot";
import { RichText } from "./RichText";

/** Renders the generic "sections" list used by most content pages. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section
          key={s.id ?? s.title}
          id={s.id}
          className={`py-14 md:py-16 ${i % 2 === 1 ? "bg-paper" : "bg-white"}`}
        >
          <Container>
            <div className={s.image ? "grid gap-10 lg:grid-cols-2 lg:items-start" : ""}>
              <div className="min-w-0">
                <SectionTitle>{s.title}</SectionTitle>
                {s.intro && (
                  <p className="mt-3 max-w-3xl text-lg text-mist">
                    <RichText text={s.intro} />
                  </p>
                )}
                {s.paragraphs && (
                  <div className="prose-site mt-5 max-w-3xl text-[1.05rem] leading-relaxed">
                    {s.paragraphs.map((p, j) => (
                      <p key={j}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                )}
                {s.list && (
                  <ul className="mt-5 grid max-w-4xl gap-2.5 sm:grid-cols-2">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex gap-2.5">
                        <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ore" />
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {s.image && <ImageSlot image={s.image} className="aspect-[4/3] w-full self-start" />}
            </div>

            {s.facts && (
              <div className="mt-8">
                <FactGrid facts={s.facts} />
              </div>
            )}

            {s.steps && (
              <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {s.steps.map((st, j) => (
                  <li key={j} className="rounded-lg border border-steel bg-white p-5">
                    <span className="font-mono text-sm text-ore">{String(j + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-semibold text-ink">{st.title}</h3>
                    <p className="mt-1.5 text-sm text-mist">
                      <RichText text={st.text} />
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {s.cards && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {s.cards.map((c) => {
                  const body = (
                    <>
                      <h3 className="font-semibold text-ink">
                        <RichText text={c.title} />
                      </h3>
                      <p className="mt-1.5 text-sm text-mist">
                        <RichText text={c.text} />
                      </p>
                    </>
                  );
                  return c.href ? (
                    <Link
                      key={c.title}
                      href={c.href}
                      className="block rounded-lg border border-steel bg-white p-5 transition hover:border-ore hover:shadow-md"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div key={c.title} className="rounded-lg border border-steel bg-white p-5">
                      {body}
                    </div>
                  );
                })}
              </div>
            )}

            {s.badges && (
              <ul className="mt-8 flex flex-wrap gap-4">
                {s.badges.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 rounded-lg border-2 border-dashed border-fog/50 bg-white px-4 py-3"
                  >
                    <ShieldCheck aria-hidden className="h-6 w-6 text-fog" />
                    <span className="text-sm">
                      <RichText text={b} />
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {s.note && (
              <p className="mt-6 max-w-3xl text-sm text-mist">
                <RichText text={s.note} />
              </p>
            )}
          </Container>
        </section>
      ))}
    </>
  );
}
