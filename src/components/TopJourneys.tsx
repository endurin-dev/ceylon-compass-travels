"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Rate {
  fromLocId: string;
  toLocId: string;
  fromLocName: string;
  toLocName: string;
  p1: number | null;
  active: boolean;
  onDemand: boolean;
}

interface Journey {
  fromLocId: string;
  toLocId: string;
  from: string;
  to: string;
  price: number;
}

const CURRENCY = "$";
const MAX_JOURNEYS = 4;

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z" />
    </svg>
  );
}

const STYLES = `
  .journeys-section {
    position: relative;
    overflow: hidden;
    padding: 36px 5vw;
    color: #fff;
    background: #164b47 url('/images/banner.webp') center 43% / cover no-repeat;
    font-family: var(--font-inter), sans-serif;
  }
  .journeys-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(9, 34, 34, .88) 0%, rgba(9, 34, 34, .67) 30%, rgba(9, 34, 34, .2) 100%);
  }
  .journeys-shell {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(210px, .95fr) repeat(4, minmax(145px, 1fr));
    gap: 12px;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
  }
  .journeys-copy { padding: 8px 12px 8px 0; }
  .journeys-eyebrow {
    display: block;
    margin-bottom: 6px;
    color: #f4c453;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
  .journeys-title {
    margin: 0 0 7px;
    font-family: Georgia, serif;
    font-size: clamp(27px, 2.7vw, 38px);
    line-height: 1.05;
    color: #fff;
  }
  .journeys-subtitle { margin: 0 0 15px; color: rgba(255,255,255,.88); font-size: 13px; line-height: 1.45; }
  .journeys-all {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 38px;
    padding: 0 15px;
    border-radius: 20px;
    background: #edb944;
    color: #142d2c;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: background .2s, gap .2s;
  }
  .journeys-all:hover { gap: 12px; background: #ffd36f; }
  .journey-card {
    min-width: 0;
    padding: 7px;
    border: 1px solid rgba(255,255,255,.75);
    border-radius: 9px;
    background: rgba(255,255,255,.96);
    box-shadow: 0 8px 22px rgba(8,31,35,.18);
    color: #18314a;
    text-decoration: none;
    transition: transform .2s, box-shadow .2s;
  }
  .journey-card:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgba(8,31,35,.26); }
  .journey-image {
    display: block;
    width: 100%;
    height: 66px;
    margin-bottom: 8px;
    border-radius: 6px;
    background-image: url('/images/banner.webp');
    background-size: cover;
    background-position: center;
  }
  .journey-card:nth-child(2) .journey-image { background-position: 18% 55%; }
  .journey-card:nth-child(3) .journey-image { background-position: 43% 65%; }
  .journey-card:nth-child(4) .journey-image { background-position: 67% 48%; }
  .journey-card:nth-child(5) .journey-image { background-position: 88% 54%; }
  .journey-route { display: flex; align-items: flex-start; gap: 5px; min-height: 32px; font-size: 11px; font-weight: 700; line-height: 1.35; }
  .journey-route svg { flex: 0 0 auto; margin-top: 1px; color: #286a87; }
  .journey-price { display: block; margin-top: 3px; font-size: 15px; font-weight: 800; line-height: 1.2; }
  .journey-from { display: block; margin-top: 1px; color: #638099; font-size: 10px; }
  .journeys-loading { grid-column: 2 / -1; min-height: 120px; }
  @media (max-width: 1040px) {
    .journeys-shell { grid-template-columns: repeat(4, minmax(150px, 1fr)); }
    .journeys-copy { grid-column: 1 / -1; max-width: 480px; padding: 0 0 4px; }
    .journeys-loading { grid-column: 1 / -1; }
  }
  @media (max-width: 680px) {
    .journeys-section { padding: 30px 0 32px 5vw; background-position: 44% center; }
    .journeys-section::before { background: rgba(9, 34, 34, .72); }
    .journeys-shell { grid-template-columns: repeat(4, minmax(155px, 1fr)); gap: 10px; padding-right: 5vw; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: thin; }
    .journeys-copy { grid-column: 1 / -1; }
    .journey-card { scroll-snap-align: start; }
  }
  @media (prefers-reduced-motion: reduce) {
    .journeys-all, .journey-card { transition: none; }
  }
`;

export default function TopJourneys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rates")
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load rates");
        const rates: Rate[] = await response.json();
        const cheapestByRoute = new Map<string, Journey>();

        rates.forEach((rate) => {
          if (!rate.active || rate.onDemand || rate.p1 == null) return;

          const key = `${rate.fromLocId}:${rate.toLocId}`;
          const current = cheapestByRoute.get(key);
          if (!current || rate.p1 < current.price) {
            cheapestByRoute.set(key, {
              fromLocId: rate.fromLocId,
              toLocId: rate.toLocId,
              from: rate.fromLocName,
              to: rate.toLocName,
              price: rate.p1,
            });
          }
        });

        setJourneys(
          Array.from(cheapestByRoute.values())
            .sort((a, b) => a.price - b.price)
            .slice(0, MAX_JOURNEYS),
        );
      })
      .catch(() => setJourneys([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && journeys.length === 0) return null;

  return (
    <section className="journeys-section" aria-labelledby="journeys-heading">
      <style>{STYLES}</style>
      <div className="journeys-shell">
        <div className="journeys-copy">
          <span className="journeys-eyebrow">Featured routes</span>
          <h2 id="journeys-heading" className="journeys-title">Top Journeys</h2>
          <p className="journeys-subtitle">Fixed fares for routes across Sri Lanka.</p>
          <Link href="/rates" className="journeys-all">View All Routes <ArrowIcon /></Link>
        </div>

        {loading ? (
          <div className="journeys-loading" aria-label="Loading popular routes" />
        ) : journeys.map((journey) => {
          const params = new URLSearchParams({
            from: journey.fromLocId,
            to: journey.toLocId,
            passengers: "1",
            kids: "0",
            tripType: "one-way",
          });

          return (
            <Link key={`${journey.fromLocId}-${journey.toLocId}`} href={`/reservation?${params.toString()}`} className="journey-card">
              <span className="journey-image" aria-hidden="true" />
              <span className="journey-route"><PlaneIcon />{journey.from} → {journey.to}</span>
              <span className="journey-price">{CURRENCY}{journey.price}</span>
              <span className="journey-from">From</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}