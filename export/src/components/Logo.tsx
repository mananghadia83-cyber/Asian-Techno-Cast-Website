/** Hexagon "AT" mark from the existing site, drawn as inline SVG. */
export function Logo({ tagline }: { tagline?: string }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 38 38" fill="none" aria-hidden className="h-9 w-9 shrink-0">
        <polygon
          points="19,2 36,10.5 36,27.5 19,36 2,27.5 2,10.5"
          fill="rgba(255,74,0,.12)"
          stroke="#ff4a00"
          strokeWidth="1.5"
        />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-bebas), sans-serif"
          fontSize="13"
          fill="#ff4a00"
        >
          AT
        </text>
      </svg>
      <span className="leading-none">
        <span className="block font-display text-2xl tracking-wide text-paper">Asian Technocast</span>
        {tagline && (
          <span className="mt-0.5 hidden whitespace-nowrap font-mono text-[10px] sm:block uppercase tracking-[0.14em] text-fog">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
