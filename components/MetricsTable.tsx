import type { Metrics } from "@/types/content";

export function MetricsTable({ metrics }: { metrics: Metrics }) {
  const [first, ...numeric] = metrics.columns;
  return (
    <div className="overflow-x-auto">
      <table className="pf-table">
        <caption className="pf-caption">{metrics.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{first}</th>
            {numeric.map((col) => (
              <th key={col} scope="col" className="num">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.rows.map((row, i) => (
            <tr key={i} className={i === metrics.best ? "best" : undefined}>
              {row.map((cell, j) => (
                <td key={j} className={j > 0 ? "num" : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
