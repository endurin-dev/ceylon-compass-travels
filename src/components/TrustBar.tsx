import type { ReactNode } from "react";

/* ─────────────────────────────────────────────
   Edit the text here. Icons are a matched set of
   inline SVGs (same grid, stroke weight and style),
   shown inside a soft gold badge.
   ───────────────────────────────────────────── */
type Item = { title: string; sub: string; icon: ReactNode };

const svgProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ITEMS: Item[] = [
  {
    title: "Fixed & Transparent Pricing",
    sub: "No hidden fees",
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </svg>
    ),
  },
  {
    title: "Safe & Professional Drivers",
    sub: "Licensed & experienced",
    icon: (
      <svg {...svgProps}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    sub: "We're always here",
    icon: (
      <svg {...svgProps}>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
      </svg>
    ),
  },
  {
    title: "Top Rated Service",
    sub: "Trusted by thousands",
    icon: (
      <svg {...svgProps}>
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    ),
  },
  {
    title: "Explore Sri Lanka",
    sub: "Airport · Tours · Rentals",
    icon: (
      <svg {...svgProps}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Buses, Cars, Vans & Scooters",
    sub: "A ride for every trip",
    icon: (
      <svg {...svgProps}>
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
        <circle cx="7" cy="18" r="2" />
        <path d="M9 18h5" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    ),
  },
];

const STYLES = `
  .trust-bar {
    --t-navy:  #0f2a4d;
    --t-blue:  #4a6488;
    --t-gold:  #b7791f;
    --t-line:  rgba(15,42,77,.12);

    position: relative;
    margin-top: 96px;
    background: transparent;
    padding: 26px 20px;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--t-navy);
  }
  .trust-bar *, .trust-bar *::before, .trust-bar *::after { box-sizing: border-box; }

  .trust-list {
    max-width: 1320px; margin: 0 auto; padding: 0; list-style: none;
    display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); align-items: center;
  }
  .trust-item {
    display: flex; align-items: center; gap: 12px;
    padding: 4px 16px; min-width: 0;
  }
  .trust-item + .trust-item { border-left: 1px solid var(--t-line); }

  .trust-icon {
    flex-shrink: 0;
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 14px;
    color: var(--t-gold);
    background: rgba(183,121,31,.10);
    border: 1px solid rgba(183,121,31,.18);
  }
  .trust-icon svg { width: 24px; height: 24px; }

  .trust-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .trust-title { font-size: 14px; font-weight: 700; line-height: 1.25; color: var(--t-navy); }
  .trust-sub   { font-size: 12.5px; font-weight: 500; line-height: 1.3; color: var(--t-blue); }

  /* ── Responsive ── */
  @media (max-width: 1099px) {
    .trust-bar { margin-top: 80px; }
    .trust-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px 0; }
    .trust-item { padding: 4px 22px; }
    .trust-item + .trust-item { border-left: none; }
    .trust-item:not(:nth-child(3n+1)) { border-left: 1px solid var(--t-line); }
  }
  @media (max-width: 699px) {
    .trust-bar { margin-top: 64px; padding: 22px 16px; }
    .trust-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 12px; }
    .trust-item { padding: 0 4px; }
    .trust-item:not(:nth-child(3n+1)) { border-left: none; }
    .trust-icon { width: 42px; height: 42px; border-radius: 12px; }
    .trust-icon svg { width: 22px; height: 22px; }
    .trust-title { font-size: 13.5px; }
  }
  @media (max-width: 440px) {
    .trust-list { grid-template-columns: 1fr; }
  }
`;

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why travellers choose us">
      <style>{STYLES}</style>
      <ul className="trust-list">
        {ITEMS.map((item) => (
          <li key={item.title} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <span className="trust-text">
              <span className="trust-title">{item.title}</span>
              <span className="trust-sub">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}