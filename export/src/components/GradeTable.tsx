import type { MaterialsFile } from "@/lib/types";
import { RichText } from "./RichText";

/**
 * IS / ASTM / EN cross-reference. Column order follows the market:
 * ASTM first for US pages, EN first for UK and German pages.
 */
export function GradeTable({
  materials,
  ids,
  showUse = true,
}: {
  materials: MaterialsFile;
  ids?: string[];
  showUse?: boolean;
}) {
  const rows = ids
    ? ids.map((id) => materials.rows.find((r) => r.id === id)).filter((r) => r !== undefined)
    : materials.rows;

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-steel">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead className="bg-ink text-paper">
            <tr>
              {materials.order.map((col, i) => (
                <th key={col} scope="col" className="px-4 py-3 font-semibold">
                  {materials.columns[col]}
                  <span className={`block font-mono text-[11px] font-normal ${i === 0 ? "text-ore" : "text-fog"}`}>
                    {materials.standards[col]}
                  </span>
                </th>
              ))}
              {showUse && (
                <th scope="col" className="px-4 py-3 font-semibold">
                  {materials.columns.use}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-steel odd:bg-white even:bg-paper">
                {materials.order.map((col, i) => (
                  <td
                    key={col}
                    className={`px-4 py-3 font-mono ${i === 0 ? "font-semibold text-ink" : "text-mist"}`}
                  >
                    {r[col]}
                  </td>
                ))}
                {showUse && (
                  <td className="px-4 py-3">
                    <RichText text={r.use} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-mist">
        <span aria-hidden>* </span>
        <RichText text={materials.disclaimer} />
      </p>
    </div>
  );
}
