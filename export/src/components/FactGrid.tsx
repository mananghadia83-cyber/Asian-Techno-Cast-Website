import type { Fact } from "@/lib/types";
import { FactValue } from "./FactValue";
import { RichText } from "./RichText";

export function FactGrid({ facts, dark = false }: { facts: Fact[]; dark?: boolean }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border border-steel bg-steel sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label} className={dark ? "bg-ink-2 p-5" : "bg-white p-5"}>
          <dt className={`font-mono text-xs uppercase tracking-wider ${dark ? "text-fog" : "text-mist"}`}>
            {f.label}
          </dt>
          <dd className={`mt-1.5 text-lg font-semibold ${dark ? "text-paper" : "text-ink"}`}>
            <FactValue value={f.value} />
          </dd>
          {f.note && (
            <dd className={`mt-1 text-sm ${dark ? "text-fog" : "text-mist"}`}>
              <RichText text={f.note} />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
