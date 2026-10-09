"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const BRAND        = "Ceylon Compass Travels";
const SITE_URL     = "https://www.ceyloncompasstravels.ru";
const WHATSAPP     = "https://wa.me/94760068828";
const CURRENCY     = "$";                 // same as the home page fleet section
const FALLBACK_IMG = "/images/car.png";

type Vehicle = {
  id: string;
  name: string;
  model: string;
  maxPassengers: number;
  maxLuggage: number;
  img: string;
  price: number | null;
  tag: string;
  special: string;
  active: boolean;
  sortOrder: number;
};

type Size = "all" | "small" | "medium" | "large";

const SIZES: { key: Size; label: string; test: (n: number) => boolean }[] = [
  { key: "all",    label: "All vehicles", test: () => true },
  { key: "small",  label: "1–3 passengers", test: (n) => n <= 3 },
  { key: "medium", label: "4–6 passengers", test: (n) => n >= 4 && n <= 6 },
  { key: "large",  label: "7+ passengers",  test: (n) => n >= 7 },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

  .fleet-page {
    --f-navy:   #0f2a4d;
    --f-blue:   #4a6488;
    --f-icon:   #2b4a7a;
    --f-gold:   #b7791f;
    --f-gold-d: #96620f;
    --f-line:   rgba(15,42,77,.10);

    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
    padding: 72px 20px 72px;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--f-navy);
  }
  .fleet-page *, .fleet-page *::before, .fleet-page *::after { box-sizing: border-box; }
  .fleet-page :focus-visible { outline: 3px solid var(--f-gold); outline-offset: 2px; }
  @media (max-width: 1199px) { .fleet-page { padding-top: 48px; } }

  .fleet-shell { max-width: 1240px; margin: 0 auto; }

  /* ── Header ── */
  .fleet-header { margin-bottom: 24px; }
  .fleet-eyebrow {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
    color: var(--f-gold);
  }
  .fleet-eyebrow::before { content: ""; width: 26px; height: 1.5px; background: var(--f-gold); }
  .fleet-title {
    font-family: 'Playfair Display', Georgia, serif;
    margin: 6px 0 6px; font-size: clamp(30px, 3.6vw, 44px); font-weight: 700;
    line-height: 1.1; letter-spacing: -.01em; color: var(--f-navy);
  }
  .fleet-subtitle { margin: 0; color: var(--f-blue); font-size: 16px; line-height: 1.5; max-width: 620px; }

  /* ── Filters ── */
  .fleet-bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px 20px; flex-wrap: wrap; margin-bottom: 22px;
    padding-bottom: 18px; border-bottom: 1px solid var(--f-line);
  }
  .fleet-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .fleet-chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 14px; border-radius: 7px; cursor: pointer;
    background: #fff; color: var(--f-navy); border: 1px solid var(--f-line);
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    transition: background .2s, color .2s, border-color .2s;
  }
  .fleet-chip small { font-size: 12px; font-weight: 600; color: var(--f-blue); font-variant-numeric: tabular-nums; }
  .fleet-chip:hover { border-color: var(--f-gold); color: var(--f-gold); }
  .fleet-chip[aria-pressed="true"] { background: var(--f-navy); border-color: var(--f-navy); color: #fff; }
  .fleet-chip[aria-pressed="true"] small { color: rgba(255,255,255,.72); }
  .fleet-count { margin: 0; font-size: 13.5px; font-weight: 500; color: var(--f-blue); }

  /* ── Grid ── */
  .fleet-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }

  .fleet-card {
    display: flex; flex-direction: column;
    background: #fff; border-radius: 12px; padding: 4px 4px 14px;
    border: 1px solid var(--f-line);
    box-shadow: 0 8px 26px rgba(15,42,77,.08);
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .fleet-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(15,42,77,.14); }

  .fleet-image { position: relative; aspect-ratio: 4 / 3; border-radius: 9px; overflow: hidden; background: #e8eef5; }
  .fleet-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .fleet-tag {
    position: absolute; left: 8px; top: 8px;
    padding: 4px 10px; border-radius: 5px;
    background: var(--f-gold); color: #fff;
    font-size: 11.5px; font-weight: 600; line-height: 1.3;
  }

  .fleet-body { display: flex; flex-direction: column; flex: 1; padding: 14px 10px 0; }
  .fleet-name { margin: 0 0 2px; font-size: 16px; font-weight: 700; line-height: 1.25; color: var(--f-navy); }
  .fleet-model { margin: 0 0 10px; font-size: 12.5px; font-weight: 500; color: var(--f-blue); line-height: 1.3; }

  .fleet-specs { list-style: none; margin: 0 0 14px; padding: 0; display: grid; gap: 8px; }
  .fleet-specs li { display: flex; align-items: center; gap: 9px; font-size: 12.5px; font-weight: 500; color: var(--f-blue); line-height: 1.3; }
  .fleet-specs svg { flex-shrink: 0; stroke: var(--f-icon); }

  .fleet-price { margin-top: auto; display: flex; align-items: baseline; gap: 6px; padding-bottom: 10px; }
  .fleet-price-from { font-size: 12.5px; font-weight: 500; color: var(--f-blue); }
  .fleet-price-amount { font-size: 21px; font-weight: 700; color: var(--f-navy); line-height: 1; font-variant-numeric: tabular-nums; }
  .fleet-price-unit { font-size: 12.5px; font-weight: 500; color: var(--f-blue); }
  .fleet-price-quote { font-size: 15px; font-weight: 700; color: var(--f-navy); }

  .fleet-button {
    display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%;
    padding: 9px 12px; border-radius: 7px; cursor: pointer;
    background: #fff; color: var(--f-gold); border: 1px solid var(--f-gold);
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none;
    transition: background .2s, color .2s;
  }
  .fleet-button:hover { background: var(--f-gold); color: #fff; }
  .fleet-button.solid { background: var(--f-gold); color: #fff; }
  .fleet-button.solid:hover { background: var(--f-gold-d); border-color: var(--f-gold-d); }
  .fleet-button.inline { display: inline-flex; width: auto; padding: 10px 20px; }

  /* ── States ── */
  .fleet-skel {
    border-radius: 12px; height: 400px; border: 1px solid var(--f-line);
    background: linear-gradient(100deg, #eef2f7 30%, #f8fafc 50%, #eef2f7 70%);
    background-size: 200% 100%; animation: fleet-shimmer 1.4s linear infinite;
  }
  @keyframes fleet-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

  .fleet-state {
    grid-column: 1 / -1; text-align: center; padding: 48px 20px;
    background: #fff; border: 1px solid var(--f-line); border-radius: 12px;
    box-shadow: 0 8px 26px rgba(15,42,77,.06);
  }
  .fleet-state h3 { font-family: 'Playfair Display', Georgia, serif; margin: 0 0 8px; font-size: 24px; font-weight: 700; color: var(--f-navy); }
  .fleet-state p { margin: 0 auto 18px; max-width: 440px; color: var(--f-blue); font-size: 15px; line-height: 1.5; }
  .fleet-state-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

  /* ── CTA ── */
  .fleet-cta {
    margin-top: 48px; padding: 32px 30px; border-radius: 12px; color: #fff;
    background: var(--f-navy);
    display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
    box-shadow: 0 16px 36px rgba(15,42,77,.18);
  }
  .fleet-cta h2 { font-family: 'Playfair Display', Georgia, serif; margin: 0 0 6px; font-size: clamp(22px, 2.6vw, 30px); font-weight: 700; line-height: 1.15; }
  .fleet-cta p { margin: 0; font-size: 15px; color: rgba(255,255,255,.78); line-height: 1.5; }
  .fleet-cta-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .fleet-cta .fleet-button.ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,.45); }
  .fleet-cta .fleet-button.ghost:hover { background: #fff; color: var(--f-navy); border-color: #fff; }

  /* ── Responsive ── */
  @media (max-width: 520px) {
    .fleet-page { padding: 36px 14px 56px; }
    .fleet-grid { grid-template-columns: 1fr; }
    .fleet-button, .fleet-chip { min-height: 44px; }
    .fleet-cta { padding: 26px 18px; }
    .fleet-cta-actions, .fleet-cta-actions .fleet-button { width: 100%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .fleet-card, .fleet-button, .fleet-chip { transition: none; }
    .fleet-skel { animation: none; }
  }
`;

const Arrow = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [size, setSize] = useState<Size>("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError("");

    (async () => {
      try {
        const res = await fetch("/api/vehicles", { cache: "no-store", signal: ctrl.signal });
        if (!res.ok) throw new Error("Failed to load vehicles");
        const data: Vehicle[] = await res.json();
        setVehicles(
          data
            .filter((v) => v.active)
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name))
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Fleet load error:", err);
        setError("We could not load the fleet.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [reloadKey]);

  const visible = useMemo(() => {
    const t = SIZES.find((s) => s.key === size)!.test;
    return vehicles.filter((v) => t(v.maxPassengers));
  }, [vehicles, size]);

  const counts = useMemo(() => {
    const out = {} as Record<Size, number>;
    SIZES.forEach((s) => { out[s.key] = vehicles.filter((v) => s.test(v.maxPassengers)).length; });
    return out;
  }, [vehicles]);

  const waLink = (v?: Vehicle) =>
    v ? `${WHATSAPP}?text=${encodeURIComponent(`Hello, I would like to book the ${v.name} (${v.model}).`)}` : WHATSAPP;

  /* SEO: structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${SITE_URL}/fleet`,
    name: `Our fleet | ${BRAND}`,
    about: { "@type": "TravelAgency", name: BRAND, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: vehicles.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${v.name} (${v.model})`,
      })),
    },
  };

  return (
    <main className="fleet-page">
      <style>{STYLES}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="fleet-shell">
        <header className="fleet-header">
          <span className="fleet-eyebrow">Our Fleet</span>
          <h1 className="fleet-title">Choose Your Perfect Ride</h1>
          <p className="fleet-subtitle">
            Comfortable, clean and well-maintained vehicles for every journey. Pick by group size, then book online or message us.
          </p>
        </header>

        <div className="fleet-bar">
          <div className="fleet-chips" role="group" aria-label="Filter by group size">
            {SIZES.map((s) => (
              <button key={s.key} type="button" className="fleet-chip" aria-pressed={size === s.key} onClick={() => setSize(s.key)}>
                {s.label}
                {!loading && !error && <small>{counts[s.key]}</small>}
              </button>
            ))}
          </div>
          <p className="fleet-count" aria-live="polite">
            {loading ? "Loading fleet…" : error ? "" : `${visible.length} ${visible.length === 1 ? "vehicle" : "vehicles"} available`}
          </p>
        </div>

        <div className="fleet-grid">
          {loading && [0, 1, 2, 3].map((i) => <div key={i} className="fleet-skel" aria-hidden="true" />)}

          {!loading && error && (
            <div className="fleet-state" role="alert">
              <h3>{error}</h3>
              <p>Check your connection and try again, or message us and we will recommend a vehicle for your trip.</p>
              <div className="fleet-state-actions">
                <button type="button" className="fleet-button solid inline" onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="fleet-button inline">WhatsApp us</a>
              </div>
            </div>
          )}

          {!loading && !error && visible.length === 0 && (
            <div className="fleet-state">
              <h3>{vehicles.length === 0 ? "No vehicles listed yet" : "No vehicles for this group size"}</h3>
              <p>
                {vehicles.length === 0
                  ? "Our fleet is being updated. Message us and we will arrange a vehicle for your trip."
                  : "Try a different group size, or message us and we will find a vehicle that fits."}
              </p>
              <div className="fleet-state-actions">
                {vehicles.length > 0 && (
                  <button type="button" className="fleet-button solid inline" onClick={() => setSize("all")}>Show all vehicles</button>
                )}
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="fleet-button inline">WhatsApp us</a>
              </div>
            </div>
          )}

          {!loading && !error && visible.map((vehicle) => (
            <article key={vehicle.id} className="fleet-card">
              <div className="fleet-image">
                {vehicle.tag && <span className="fleet-tag">{vehicle.tag}</span>}
                <img
                  src={vehicle.img || FALLBACK_IMG}
                  alt={`${vehicle.name} ${vehicle.model}`.trim()}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith(FALLBACK_IMG)) target.src = FALLBACK_IMG;
                  }}
                />
              </div>

              <div className="fleet-body">
                <h2 className="fleet-name">{vehicle.name}</h2>
                {vehicle.model && <p className="fleet-model">{vehicle.model}</p>}

                <ul className="fleet-specs">
                  <li>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                    </svg>
                    {vehicle.maxPassengers} Passengers
                  </li>
                  <li>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5" y="7" width="14" height="13" rx="2" />
                      <path d="M9 7V4h6v3M9 11v5M15 11v5" />
                    </svg>
                    {vehicle.maxLuggage} Luggage
                  </li>
                  <li>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="4" y="4" width="10" height="16" rx="1.5" />
                      <path d="M4 10h10M14 8h2.5a1.5 1.5 0 011.5 1.5V16a1.5 1.5 0 003 0V9l-2.5-2.5" />
                    </svg>
                    {vehicle.special || "Air-conditioned"}
                  </li>
                </ul>

                <div className="fleet-price">
                  {vehicle.price ? (
                    <>
                      <span className="fleet-price-from">From</span>
                      <span className="fleet-price-amount">{CURRENCY}{vehicle.price}</span>
                      <span className="fleet-price-unit">/ trip</span>
                    </>
                  ) : (
                    <span className="fleet-price-quote">Custom quote</span>
                  )}
                </div>

                <Link href={`/reservation?vehicleId=${encodeURIComponent(vehicle.id)}`} className="fleet-button">
                  Book Now <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="fleet-cta" aria-labelledby="fleet-cta-heading">
          <div>
            <h2 id="fleet-cta-heading">Not sure which vehicle fits?</h2>
            <p>Tell us your group size, luggage and route and we will recommend one with a fixed fare.</p>
          </div>
          <div className="fleet-cta-actions">
            <Link href="/reservation" className="fleet-button solid inline">Book Now <Arrow /></Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="fleet-button ghost inline">WhatsApp us</a>
          </div>
        </section>
      </div>
    </main>
  );
}