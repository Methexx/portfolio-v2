export function IntegrationFlow() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M 22 24 C 34 24, 39 34, 50 43"
        fill="none"
        stroke="var(--integrations-line)"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        d="M 78 24 C 66 24, 61 34, 50 43"
        fill="none"
        stroke="var(--integrations-line)"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        d="M 22 69 C 34 69, 39 59, 50 54"
        fill="none"
        stroke="var(--integrations-line)"
        strokeLinecap="round"
        strokeWidth="1.05"
      />
      <path
        d="M 78 69 C 66 69, 61 59, 50 54"
        fill="none"
        stroke="var(--integrations-line)"
        strokeLinecap="round"
        strokeWidth="1.05"
      />
      <path
        d="M 16 86 C 30 84, 39 80, 50 70"
        fill="none"
        stroke="color-mix(in srgb, var(--integrations-line) 82%, white)"
        strokeLinecap="round"
        strokeWidth="0.9"
      />
      <path
        d="M 84 86 C 70 84, 61 80, 50 70"
        fill="none"
        stroke="color-mix(in srgb, var(--integrations-line) 82%, white)"
        strokeLinecap="round"
        strokeWidth="0.9"
      />
      {[
        { cx: 22, cy: 24 },
        { cx: 78, cy: 24 },
        { cx: 22, cy: 69 },
        { cx: 78, cy: 69 },
        { cx: 50, cy: 49 },
      ].map((point) => (
        <circle
          key={`${point.cx}-${point.cy}`}
          cx={point.cx}
          cy={point.cy}
          r="1.15"
          fill="color-mix(in srgb, var(--integrations-accent) 58%, white)"
        />
      ))}
    </svg>
  );
}
