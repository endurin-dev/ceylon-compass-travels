"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   Edit these once — chat links used in header
   and mobile drawer.
   ───────────────────────────────────────────── */
const WHATSAPP_URL = "https://wa.me/94771234567";            // TODO: digits only, with country code
const TELEGRAM_URL = "https://t.me/your_username";           // TODO: your Telegram username
const SIGNAL_URL   = "https://signal.me/#p/+94771234567";    // TODO: your Signal number with +

const chatLinks = [
  {
    key: "whatsapp",
    label: "Chat on WhatsApp",
    href: WHATSAPP_URL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    key: "signal",
    label: "Message on Signal",
    href: SIGNAL_URL,
    icon: (
      /* Simplified Signal mark: dotted ring + speech bubble with tail */
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10.6" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1.6 2.4" strokeLinecap="round" />
        <path
          fill="currentColor"
          d="M12 4.6c-4.09 0-7.4 3.03-7.4 6.77 0 1.55.57 2.98 1.53 4.12l-.9 3.16 3.3-1.02c.81.3 1.7.46 2.62.46h.1c4.09 0 7.4-3.03 7.4-6.77S16.09 4.6 12 4.6z"
        />
      </svg>
    ),
  },
  {
    key: "telegram",
    label: "Chat on Telegram",
    href: TELEGRAM_URL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/",            label: "Home" },
    { href: "/fleet",       label: "Fleet" },
    { href: "/rates",       label: "Rates" },
    { href: "/reservation", label: "Reservation" },
    { href: "/faq",         label: "FAQ" },
    { href: "/contact-us",  label: "Contact" },
  ];

  const NAVY_DEEP    = "#080f1e";
  const NAVY_MID     = "#0d1a33";
  const NAVY_SURFACE = "rgba(13,26,51,0.6)";
  const GOLD         = "#f4b63d";
  const GOLD_DIM     = "rgba(244,182,61,0.65)";
  const GOLD_GLOW    = "rgba(244,182,61,0.18)";
  const WHITE        = "#f0f4ff";
  const WHITE_DIM    = "rgba(240,244,255,0.65)";
  const BORDER_MID   = "rgba(244,182,61,0.28)";

  // Same fonts as the Fleet section
  const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
  const FONT_BODY    = "'Inter', system-ui, sans-serif";

  // Home page: transparent gradient header floating over the hero image.
  // Other pages: solid navy. After scrolling: frosted navy everywhere.
  const headerBackground = scrolled
    ? "rgba(8,15,30,0.88)"
    : isHome
      ? "linear-gradient(180deg, rgba(8,15,30,.9) 0%, rgba(8,15,30,.6) 55%, rgba(8,15,30,0) 100%)"
      : NAVY_DEEP;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

        .h-logo-circle {
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid ${BORDER_MID};
          box-shadow: 0 0 0 3px rgba(244,182,61,0.08), 0 4px 20px rgba(8,15,30,0.7);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          background: #080f1e;
          position: relative;
        }
        .h-logo-circle:hover {
          border-color: rgba(244,182,61,0.55);
          box-shadow: 0 0 0 4px rgba(244,182,61,0.12), 0 6px 28px rgba(8,15,30,0.9);
          transform: scale(1.03);
        }
        .h-logo-circle::after {
          content: '';
          position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(130deg, transparent 30%, rgba(244,182,61,0.18) 50%, transparent 70%);
          background-size: 250% 100%;
          background-position: 200% 0;
          transition: background-position 0.6s ease;
          pointer-events: none; z-index: 2;
        }
        .h-logo-circle:hover::after { background-position: -50% 0; }

        .h-brand-name {
          font-family: ${FONT_DISPLAY};
          font-weight: 800;
          letter-spacing: -0.01em;
          line-height: 1.1;
          color: #ffffff;
          text-shadow: 0 1px 12px rgba(244,182,61,0.25);
          transition: color 0.3s ease, text-shadow 0.3s ease;
          white-space: nowrap;
        }
        .h-logo-group:hover .h-brand-name {
          color: #ffffff;
          text-shadow: 0 1px 18px rgba(244,182,61,0.45);
        }
        .h-brand-slogan {
          font-family: ${FONT_BODY};
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: ${GOLD};
          margin-top: 2px;
          white-space: nowrap;
          transition: color 0.3s ease;
          opacity: 0.9;
        }
        .h-logo-group:hover .h-brand-slogan { opacity: 1; }

        .h-navlink-u {
          position: relative;
          font-family: ${FONT_BODY};
          font-size: 15px; font-weight: 600;
          color: ${WHITE_DIM};
          text-decoration: none; padding: 8px 14px;
          letter-spacing: 0.01em;
          border-radius: 8px; white-space: nowrap;
          transition: all 0.28s ease;
        }
        .h-navlink-u::after {
          content: ''; position: absolute; width: 0; height: 1.5px;
          bottom: 3px; left: 50%;
          background: ${GOLD}; transition: width 0.35s ease;
          transform: translateX(-50%);
        }
        .h-navlink-u:hover { background: ${GOLD_GLOW}; color: ${WHITE}; }
        .h-navlink-u:hover::after { width: 55%; }

        .h-book-btn {
          position: relative;
          background: #f4b63d !important;
          border: 2px solid #f4b63d !important;
          box-shadow: none !important;
          color: #10241f !important;
          border-radius: 100px !important;
          transition: background .25s ease, border-color .25s ease, transform .25s ease !important;
        }
        .h-book-btn:hover {
          background: #ffc94d !important;
          border-color: #ffc94d !important;
          transform: translateY(-2px) !important;
        }
        .h-book-btn:active { transform: translateY(0) !important; }

        /* ── Chat icons ── */
        .h-chat { display: flex; align-items: center; gap: 8px; }
        .h-chat-btn {
          width: 36px; height: 36px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          color: ${WHITE_DIM};
          background: ${NAVY_SURFACE};
          border: 1px solid ${BORDER_MID};
          text-decoration: none;
          transition: color .25s ease, background .25s ease, border-color .25s ease, transform .25s ease;
        }
        .h-chat-btn:hover { transform: translateY(-2px); color: #fff; }
        .h-chat-btn[data-k="whatsapp"]:hover { background: #25D366; border-color: #25D366; }
        .h-chat-btn[data-k="signal"]:hover   { background: #3a76f0; border-color: #3a76f0; }
        .h-chat-btn[data-k="telegram"]:hover { background: #27a7e7; border-color: #27a7e7; }
        .h-chat-btn:focus-visible, .h-navlink-u:focus-visible, .h-drawer-link:focus-visible, .h-book-btn:focus-visible {
          outline: 2px solid ${GOLD}; outline-offset: 2px;
        }
        .h-chat-divider { width: 1px; height: 22px; background: ${BORDER_MID}; margin: 0 4px 0 6px; }

        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }

        .h-burger-line { height: 1.8px; background: ${WHITE_DIM}; border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        .h-drawer { position: fixed; inset: 0; z-index: 9998; display: flex; }
        .h-drawer-backdrop { position: absolute; inset: 0; background: rgba(4,8,18,0.82); backdrop-filter: blur(6px); animation: fadeIn 0.3s ease both; }
        .h-drawer-panel { position: relative; z-index: 1; width: min(340px, 88vw); height: 100%; background: ${NAVY_MID}; border-right: 1px solid rgba(244,182,61,0.12); display: flex; flex-direction: column; animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; overflow-y: auto; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .h-drawer-top { padding: 28px 24px 22px; border-bottom: 1px solid rgba(244,182,61,0.1); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .h-drawer-nav { padding: 12px 0; flex: 1; }
        .h-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; font-family: ${FONT_BODY}; font-size: 16px; font-weight: 600; letter-spacing: 0.01em; color: rgba(240,244,255,0.75); text-decoration: none; border-left: 3px solid transparent; transition: all 0.22s; }
        .h-drawer-link:hover { color: ${WHITE}; background: rgba(244,182,61,0.05); border-left-color: rgba(244,182,61,0.45); }
        .h-drawer-bottom { padding: 20px 24px; border-top: 1px solid rgba(244,182,61,0.1); display: flex; flex-direction: column; gap: 16px; }
        .h-drawer-chat-label { font-family: ${FONT_BODY}; font-size: 13px; font-weight: 500; color: ${WHITE_DIM}; }
        .h-drawer-chat { display: flex; gap: 10px; }
        .h-drawer-chat .h-chat-btn { width: 44px; height: 44px; }
        .h-drawer-chat .h-chat-btn svg { width: 20px; height: 20px; }

        @media (prefers-reduced-motion: reduce) {
          .h-chat-btn, .h-book-btn, .h-navlink-u, .h-logo-circle, .h-drawer-panel, .h-drawer-backdrop { transition: none !important; animation: none !important; }
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: headerBackground,
        backdropFilter: scrolled ? "blur(22px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
        boxShadow: scrolled ? "0 8px 40px rgba(4,8,18,0.75)" : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <div style={{
          maxWidth: 1520, margin: "0 auto", padding: "0 4vw",
          height: scrolled ? 72 : 88,   /* unscrolled 88 = --header-h in the Hero file */
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxSizing: "border-box", transition: "height 0.4s ease",
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 14 }} className="h-logo-group">
            <div
              className="h-logo-circle"
              style={{
                width: scrolled ? 48 : 58,
                height: scrolled ? 48 : 58,
                transition: "all 0.4s ease",
              }}
            >
              <Image
                src="/images/logo.jpeg"
                alt="Ceylon Compass Travels"
                fill
                sizes="58px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span className="h-brand-name" style={{ fontSize: scrolled ? 20 : 23 }}>
                Ceylon Compass Travels
              </span>
              <span className="h-brand-slogan">Travel Sri Lanka</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="h-navlink-u">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Right Controls ── */}
          <div
            className="h-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div className="h-chat">
              {chatLinks.map((c) => (
                <a
                  key={c.key}
                  data-k={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-chat-btn"
                  aria-label={c.label}
                  title={c.label}
                >
                  {c.icon}
                </a>
              ))}
              <span className="h-chat-divider" aria-hidden="true" />
            </div>

            <Link
              href="/reservation"
              className="h-book-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                height: scrolled ? 40 : 46,
                padding: "0 24px",
                color: "#10241f",
                fontFamily: FONT_BODY, fontSize: 15, fontWeight: 700,
                letterSpacing: "0.01em",
                borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap",
                transition: "height 0.4s ease",
              }}
            >
              Book Now
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className={`h-mobile-btn${isOpen ? " h-burger-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{
              display: "flex", flexDirection: "column", gap: 5,
              width: 42, height: 42, alignItems: "center", justifyContent: "center",
              background: NAVY_SURFACE,
              border: "none",
              borderRadius: 8, cursor: "pointer",
            }}
          >
            <span className="h-burger-line" />
            <span className="h-burger-line" />
            <span className="h-burger-line" />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <div className="h-drawer">
          <div className="h-drawer-backdrop" onClick={() => setIsOpen(false)} />
          <div className="h-drawer-panel">

            <div className="h-drawer-top">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  position: "relative", width: 44, height: 44, flexShrink: 0,
                  borderRadius: "50%", overflow: "hidden",
                  border: `1.5px solid rgba(244,182,61,0.3)`,
                  background: NAVY_DEEP,
                }}>
                  <Image
                    src="/images/logo.jpeg"
                    alt="Ceylon Compass Travels"
                    fill
                    sizes="44px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: FONT_DISPLAY, fontWeight: 800,
                    fontSize: 18, color: WHITE, letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}>
                    Ceylon Compass Travels
                  </div>
                  <div style={{
                    fontFamily: FONT_BODY, fontWeight: 500,
                    fontSize: 12, color: GOLD_DIM, letterSpacing: "0.04em",
                    marginTop: 3,
                  }}>
                    Travel Sri Lanka
                  </div>
                </div>
              </div>

              <button
                aria-label="Close menu"
                style={{ background: "none", border: "none", color: WHITE_DIM, cursor: "pointer", flexShrink: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="h-drawer-nav" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="h-drawer-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="h-drawer-bottom">
              <div>
                <div className="h-drawer-chat-label" style={{ marginBottom: 10 }}>Message us directly</div>
                <div className="h-drawer-chat">
                  {chatLinks.map((c) => (
                    <a
                      key={c.key}
                      data-k={c.key}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-chat-btn"
                      aria-label={c.label}
                    >
                      {c.icon}
                    </a>
                  ))}
                </div>
              </div>

              <Link href="/reservation" className="h-book-btn" style={{
                textAlign: "center", padding: "14px", borderRadius: 100,
                fontFamily: FONT_BODY, fontSize: 16, fontWeight: 700,
                letterSpacing: "0.01em",
                color: "#10241f", textDecoration: "none",
              }}>
                Book Now
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}