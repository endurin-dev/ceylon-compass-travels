"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Edit these — everything else is data-driven
   ───────────────────────────────────────────── */
const BRAND     = "Ceylon Compass";          // screenshot name — change to match your brand
const BG_IMAGE  = "";                        // optional faint decorative image, e.g. "/images/palm-leaves.webp"

type Feature = { icon: "shield" | "clock" | "star" | "pin"; title: string; lines: [string, string] };
type Review  = { name: string; country: string; text: string; rating: number; avatar?: string };

const FEATURES: Feature[] = [
  { icon: "shield", title: "Safe & Professional", lines: ["Experienced drivers &", "well-maintained vehicles"] },
  { icon: "clock",  title: "24/7 Support",        lines: ["We're always here", "when you need us"] },
  { icon: "star",   title: "Top Rated",           lines: ["Trusted by thousands", "of travellers"] },
  { icon: "pin",    title: "Explore Sri Lanka",   lines: ["Airport · Tours · Rentals", ""] },
];

// Only publish reviews that are real and that you have permission to show.
const REVIEWS: Review[] = [
  { name: "Sarah Williams", country: "United Kingdom", rating: 5, avatar: "/images/reviews/sarah.webp",
    text: "Excellent service! The driver was on time, very friendly and the car was spotless. Highly recommended!" },
  { name: "Michael Tan", country: "Singapore", rating: 5, avatar: "/images/reviews/michael.webp",
    text: "We booked a van for our family trip. Everything was smooth and professional. Great experience!" },
  { name: "Anna Müller", country: "Germany", rating: 5, avatar: "/images/reviews/anna.webp",
    text: "Comfortable ride, fair price and amazing support. Will definitely use again!" },
  // Add more — the carousel scrolls.
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

  .why-section {
    --w-navy:   #0f2a4d;
    --w-blue:   #4a6488;
    --w-gold:   #b7791f;
    --w-gold-d: #96620f;
    --w-line:   rgba(15,42,77,.12);

    position: relative; overflow: hidden;
    background: linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%);
    padding: 40px 20px 44px;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--w-navy);
  }
  .why-section *, .why-section *::before, .why-section *::after { box-sizing: border-box; }
  .why-section :focus-visible { outline: 3px solid var(--w-gold); outline-offset: 2px; }
  .why-bg { position: absolute; top: 0; right: 0; width: min(34%, 420px); height: 100%; background-size: cover; background-position: left center; opacity: .18; pointer-events: none; }
  .why-shell { position: relative; max-width: 1240px; margin: 0 auto; }

  /* ── Heading ── */
  .why-title { font-family: 'Playfair Display', Georgia, serif; margin: 0 0 6px; font-size: clamp(28px, 3.2vw, 40px); font-weight: 700; line-height: 1.12; letter-spacing: -.01em; }
  .why-subtitle { margin: 0 0 26px; color: var(--w-blue); font-size: clamp(15px, 1.5vw, 18px); line-height: 1.5; }

  /* ── Features ── */
  .why-features { list-style: none; margin: 0 0 30px; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .why-feature { display: flex; align-items: center; gap: 14px; padding: 4px 22px; }
  .why-feature:first-child { padding-left: 0; }
  .why-feature + .why-feature { border-left: 1px solid var(--w-line); }
  .why-feature-icon { flex-shrink: 0; width: 44px; height: 44px; stroke: var(--w-gold); }
  .why-feature-title { margin: 0 0 3px; font-family: 'Playfair Display', Georgia, serif; font-size: 15.5px; font-weight: 700; line-height: 1.25; }
  .why-feature-text { margin: 0; font-size: 12.5px; line-height: 1.45; color: var(--w-blue); }

  /* ── Reviews ── */
  .why-reviews-title { font-family: 'Playfair Display', Georgia, serif; margin: 0 0 14px; font-size: 20px; font-weight: 700; }
  .why-carousel { display: flex; align-items: center; gap: 14px; }
  .why-track {
    display: flex; gap: 16px; flex: 1; min-width: 0; padding: 4px 2px 10px;
    overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;
    scrollbar-width: none; -ms-overflow-style: none;
  }
  .why-track::-webkit-scrollbar { display: none; }

  .why-card {
    flex: 0 0 calc((100% - 32px) / 3); scroll-snap-align: start;
    display: flex; align-items: center; gap: 16px;
    background: #fff; border: 1px solid var(--w-line); border-radius: 12px;
    padding: 16px 18px; box-shadow: 0 6px 20px rgba(15,42,77,.07);
  }
  .why-avatar { flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%; overflow: hidden; background: #dbe4ef; display: grid; place-items: center; font-weight: 700; font-size: 18px; color: var(--w-navy); }
  .why-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .why-quote { margin: 0 0 8px; font-size: 12.5px; line-height: 1.5; color: var(--w-navy); }
  .why-meta { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
  .why-name { display: block; font-size: 12.5px; font-weight: 700; line-height: 1.2; }
  .why-country { display: block; font-size: 11.5px; color: var(--w-blue); margin-top: 2px; }
  .why-stars { display: flex; gap: 2px; fill: var(--w-gold); flex-shrink: 0; }

  .why-arrows { display: flex; gap: 10px; flex-shrink: 0; }
  .why-arrow {
    width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; padding: 0;
    background: #fff; color: var(--w-gold); border: 1px solid var(--w-line); cursor: pointer;
    transition: background .2s, color .2s, border-color .2s, opacity .2s;
  }
  .why-arrow:hover:not(:disabled) { background: var(--w-gold); border-color: var(--w-gold); color: #fff; }
  .why-arrow:disabled { opacity: .35; cursor: default; }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .why-features { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 22px; }
    .why-feature:nth-child(odd)  { padding-left: 0; border-left: none; }
    .why-feature:nth-child(even) { border-left: 1px solid var(--w-line); }
    .why-card { flex-basis: calc((100% - 16px) / 2); }
  }
  @media (max-width: 700px) {
    .why-section { padding: 34px 14px 38px; }
    .why-features { grid-template-columns: 1fr; }
    .why-feature, .why-feature:nth-child(even) { border-left: none; padding: 0; }
    .why-card { flex-basis: 100%; }
    .why-arrows { display: none; }   /* swipe on touch */
  }
  @media (prefers-reduced-motion: reduce) {
    .why-track { scroll-behavior: auto; }
    .why-arrow { transition: none; }
  }
`;

const ICONS: Record<Feature["icon"], JSX.Element> = {
  shield: (<><path d="M24 5l15 6v11c0 10-6.5 17.5-15 21C15.5 39.5 9 32 9 22V11l15-6z" /><path d="M17 24l5 5 9-10" /></>),
  clock:  (<><circle cx="24" cy="24" r="18" /><path d="M24 13v11l7 5" /></>),
  star:   (<path d="M24 6l5.4 11 12.1 1.7-8.8 8.5 2.1 12L24 33.6 13.2 39.2l2.1-12-8.8-8.5L18.6 17 24 6z" />),
  pin:    (<><path d="M24 43s14-12.5 14-23A14 14 0 0010 20c0 10.5 14 23 14 23z" /><circle cx="24" cy="20" r="5" /></>),
};

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

const Star = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18.1 5.5 22l1.7-7.4-5.7-5 7.5-.7L12 2z" />
  </svg>
);

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

function Avatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="why-avatar">
      {review.avatar && !failed ? (
        <img src={review.avatar} alt={`${review.name}, ${review.country}`} loading="lazy" decoding="async" width={56} height={56} onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{initials(review.name)}</span>
      )}
    </div>
  );
}

export default function WhyChooseUs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".why-card");
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="why-section" aria-labelledby="why-heading">
      <style>{STYLES}</style>
      {BG_IMAGE && <div className="why-bg" style={{ backgroundImage: `url(${BG_IMAGE})` }} aria-hidden="true" />}

      <div className="why-shell">
        <h2 id="why-heading" className="why-title">Why Choose {BRAND}?</h2>
        <p className="why-subtitle">More than just a ride — it&apos;s a better way to explore Sri Lanka.</p>

        <ul className="why-features">
          {FEATURES.map((f) => (
            <li key={f.title} className="why-feature">
              <svg className="why-feature-icon" viewBox="0 0 48 48" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[f.icon]}
              </svg>
              <div>
                <h3 className="why-feature-title">{f.title}</h3>
                <p className="why-feature-text">
                  {f.lines[0]}
                  {f.lines[1] && (<><br />{f.lines[1]}</>)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="why-reviews-title">What Our Customers Say</h3>

        <div className="why-carousel">
          <div
            ref={trackRef}
            className="why-track"
            onScroll={updateArrows}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            tabIndex={0}
          >
            {REVIEWS.map((r) => (
              <figure key={r.name} className="why-card" style={{ margin: undefined }}>
                <Avatar review={r} />
                <div>
                  <blockquote className="why-quote" style={{ margin: "0 0 8px" }}>&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="why-meta">
                    <span>
                      <span className="why-name">{r.name}</span>
                      <span className="why-country">{r.country}</span>
                    </span>
                    <span className="why-stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} />)}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <div className="why-arrows">
            <button type="button" className="why-arrow" aria-label="Previous reviews" disabled={!canPrev} onClick={() => scrollByCard(-1)}><Chevron dir="left" /></button>
            <button type="button" className="why-arrow" aria-label="Next reviews" disabled={!canNext} onClick={() => scrollByCard(1)}><Chevron dir="right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}