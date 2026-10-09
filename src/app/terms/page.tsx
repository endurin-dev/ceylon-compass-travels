"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";

/* ─────────────────────────────────────────────
   Edit these once — same details as the Privacy page
   ───────────────────────────────────────────── */
const BRAND        = "Ceylon Compass Travels";
const SITE_LABEL   = "www.ceyloncompasstravels.ru";
const EMAIL        = "info.ceyloncompasstravels@gmail.com";
const PHONE_1      = { display: "+94 76 006 8828", tel: "+94760068828" };
const PHONE_2      = { display: "+94 71 739 3971", tel: "+94717393971" };
const ADDRESS      = "Unawatuna, Sri Lanka";
const LAST_UPDATED = "October 8, 2026";

const linkStyle = { color: "#c8a96e", borderBottom: "1px solid rgba(200,169,110,0.3)" };

const sections = [
  {
    num: "01",
    title: "Definitions",
    content: (
      <>
        <p>In these Terms and Conditions, the following definitions apply:</p>
        <ul>
          <li><strong>“Company”</strong> refers to Ceylon Compass Travels, a private tourist transport and car-and-driver provider operating in Sri Lanka.</li>
          <li><strong>“Client”</strong> refers to any individual, group, or organisation that makes a booking with the Company.</li>
          <li><strong>“Service”</strong> refers to any airport transfer, island-wide transfer, day tour, multi-day car and driver hire, group or coach transport, or other transportation service provided by the Company.</li>
          <li><strong>“Booking”</strong> refers to a confirmed reservation made via the website, phone, email, or WhatsApp.</li>
          <li><strong>“Driver”</strong> refers to any licensed, experienced driver operating on behalf of the Company.</li>
          <li><strong>“Vehicle”</strong> refers to any car, van, minibus, or bus operated under a Ceylon Compass Travels booking.</li>
        </ul>
      </>
    ),
  },
  {
    num: "02",
    title: "Scope of Services & Fleet",
    content: (
      <>
        <p>Ceylon Compass Travels provides private tourist transport across Sri Lanka, including but not limited to:</p>
        <ul>
          <li>Airport transfers to and from Bandaranaike International Airport (CMB), Mattala Rajapaksa International Airport (HRI), and domestic airports</li>
          <li>Island-wide transfers between cities, hotels, beaches, hill country towns, and national parks</li>
          <li>Day tours and sightseeing trips with a driver</li>
          <li>Multi-day car and driver hire for round trips and custom itineraries</li>
          <li>Train station and bus station pickups and drop-offs</li>
          <li>Group transport for weddings, events, school or corporate trips, and tour groups</li>
        </ul>
        <p>Our fleet includes <strong>cars</strong> (for small parties), <strong>vans</strong> (for families and mid-sized groups), and <strong>minibuses and buses</strong> (for large groups). The vehicle type, seating capacity, and air-conditioning availability are stated in your booking confirmation. Vehicles are private to the Client and are never shared with other passengers without prior agreement.</p>
      </>
    ),
  },
  {
    num: "03",
    title: "Booking & Confirmation",
    content: (
      <>
        <p>A booking is considered confirmed only when the Client receives a written confirmation (email or WhatsApp message) from Ceylon Compass Travels.</p>
        <ul>
          <li>The Client is responsible for providing accurate pickup and drop-off details, flight or train numbers, travel dates and times, passenger count, and luggage information at the time of booking.</li>
          <li>The Company may contact the Client to verify booking details before confirming the reservation.</li>
          <li>Vehicle availability is not guaranteed until the booking is confirmed. During peak seasons and public holidays, we recommend booking as early as possible.</li>
          <li>Ceylon Compass Travels reserves the right to decline a booking at its discretion, in which case any payment received will be fully refunded.</li>
          <li>If the Client’s group is larger than first stated, the Company may need to change the Vehicle type, and the price may be adjusted accordingly.</li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Pricing & Payment",
    content: (
      <>
        <p>All prices are quoted in the currency stated in your booking confirmation and are agreed in advance.</p>
        <ul>
          <li><strong>Fixed Pricing</strong>: The quoted price is guaranteed at the time of confirmation. There are no hidden fees.</li>
          <li><strong>What Is Included</strong>: Unless your quote says otherwise, the price includes the Vehicle, Driver, fuel, standard waiting time, and applicable taxes. Expressway and highway tolls are included unless stated otherwise in your quote.</li>
          <li><strong>What Is Not Included</strong>: Entrance fees (national parks, safaris, temples, museums), meals, personal expenses, and parking at attractions are paid by the Client unless stated otherwise.</li>
          <li><strong>Night Travel</strong>: A surcharge may apply for pickups or journeys late at night or early in the morning. Any surcharge is stated in your quote before you confirm.</li>
          <li><strong>Payment Methods</strong>: Payment is made as agreed in your booking confirmation, by cash, card, or bank or online transfer. Some bookings, especially large group or multi-day bookings, may require a deposit to secure the Vehicle.</li>
          <li><strong>On-Demand Pricing</strong>: Bespoke itineraries and large group transport are quoted on request and confirmed in writing before the booking is finalised.</li>
          <li>The Company may adjust its prices at any time. Changes do not affect confirmed bookings.</li>
        </ul>
      </>
    ),
  },
  {
    num: "05",
    title: "Day Tours & Multi-Day Hire",
    content: (
      <>
        <p>For day tours and multi-day car and driver hire, the following conditions apply:</p>
        <ul>
          <li><strong>Itinerary</strong>: The itinerary is agreed with the Client in advance. Reasonable changes may be made on the day with the Driver’s agreement, depending on time, distance, and road conditions.</li>
          <li><strong>Daily Hours & Distance</strong>: The daily driving hours and distance allowance are stated in your quote. Extra distance or overtime beyond the agreed limits may be charged at the rate stated in your quote.</li>
          <li><strong>Driver Accommodation & Meals</strong>: For multi-day hire, the arrangement for Driver accommodation and meals (whether included in the price or provided by the Client) is confirmed in your quote.</li>
          <li><strong>Rest Periods</strong>: For safety, Drivers must take reasonable rest breaks. The Company may refuse a request that would require unsafe driving hours.</li>
          <li><strong>Stops</strong>: Additional stops are welcome where time allows. Long delays at stops may affect the rest of the itinerary, and the Company is not responsible for activities missed as a result.</li>
        </ul>
      </>
    ),
  },
  {
    num: "06",
    title: "Cancellation & Modification Policy",
    content: (
      <>
        <p>We understand that travel plans can change. Our cancellation and modification policy is as follows:</p>
        <ul>
          <li><strong>Free Cancellation</strong>: Cancellations made more than 24 hours before the scheduled pickup time incur no charge.</li>
          <li><strong>Late Cancellation</strong>: Cancellations made within 24 hours of the scheduled pickup may be subject to a cancellation fee of up to 50% of the booking value.</li>
          <li><strong>No-Show</strong>: If the Client fails to appear at the agreed pickup location without prior notice, the full fare may be charged.</li>
          <li><strong>Group & Multi-Day Bookings</strong>: Bookings of buses, minibuses, or multi-day hire may have a longer cancellation notice period or a non-refundable deposit. These terms are stated in your quote or booking confirmation.</li>
          <li><strong>Modifications</strong>: Changes to pickup time, location, route, or passenger count can be requested by contacting us at least 12 hours in advance. We will confirm whether the modification is possible and whether the price changes.</li>
          <li>Cancellations and modifications must be communicated in writing via email or WhatsApp to be considered valid.</li>
        </ul>
      </>
    ),
  },
  {
    num: "07",
    title: "Flight Monitoring & Waiting Time",
    content: (
      <>
        <p>Ceylon Compass Travels monitors incoming flights using live flight tracking.</p>
        <ul>
          <li><strong>Airport Pickups</strong>: The Driver will track your flight and adjust the pickup time accordingly at no extra charge. Standard complimentary waiting time is 60 minutes after the scheduled landing time.</li>
          <li><strong>Train Station Pickups</strong>: Complimentary waiting time is 30 minutes after the confirmed arrival time.</li>
          <li><strong>Other Pickups</strong>: Complimentary waiting time is 15 minutes from the scheduled pickup time.</li>
          <li>Waiting time beyond the complimentary period may be charged at the rate stated in your quote.</li>
          <li>The Client should provide their flight or train number at the time of booking to enable tracking. The Company is not liable for delays caused by incorrect or missing flight or train information.</li>
          <li>Trains in Sri Lanka can run significantly late. Please share your ticket details and keep your phone reachable so the Driver can adjust.</li>
        </ul>
      </>
    ),
  },
  {
    num: "08",
    title: "Meet & Greet Service",
    content: (
      <>
        <p>For airport and train station pickups, Ceylon Compass Travels provides a meet &amp; greet service as standard:</p>
        <ul>
          <li>The Driver will wait in the arrivals area holding a name sign with the Client’s name.</li>
          <li>The Driver will assist with luggage from the arrivals area to the Vehicle.</li>
          <li>The exact meeting point will be confirmed in your booking confirmation.</li>
          <li>If the Client cannot locate the Driver, they should call or WhatsApp the number provided in the confirmation without delay.</li>
        </ul>
      </>
    ),
  },
  {
    num: "09",
    title: "Luggage, Child Seats & Special Requests",
    content: (
      <>
        <p>Ceylon Compass Travels endeavours to accommodate all reasonable special requests, subject to availability.</p>
        <ul>
          <li><strong>Luggage</strong>: The Client must declare the number and size of bags at the time of booking. Luggage space differs between cars, vans, and buses. Excess luggage beyond the declared amount may require a larger Vehicle at additional cost, subject to availability.</li>
          <li><strong>Child Seats</strong>: Baby seats and child booster seats are available on request, subject to availability. Requests must be made at the time of booking, and any charge is stated in your quote.</li>
          <li><strong>Accessibility</strong>: If a passenger has reduced mobility or needs assistance, please tell us at the time of booking so we can recommend a suitable Vehicle and help.</li>
          <li><strong>Surfboards, Bicycles & Large Items</strong>: Please tell us in advance. Large items may need a bigger Vehicle or a roof rack, and an extra charge may apply.</li>
          <li><strong>Pets</strong>: Pets are permitted only with prior approval. Additional cleaning charges may apply.</li>
        </ul>
      </>
    ),
  },
  {
    num: "10",
    title: "Vehicle Capacity, Safety & Road Conditions",
    content: (
      <>
        <p>Your safety is our priority. Our Vehicles are maintained for road use, and our Drivers are licensed and experienced on Sri Lankan roads.</p>
        <ul>
          <li><strong>Passenger Capacity</strong>: The number of passengers must never exceed the registered seating capacity of the Vehicle. Seat belts must be worn where fitted.</li>
          <li><strong>Driver’s Discretion</strong>: The Driver may refuse to continue or change a route if conditions are unsafe, for example heavy rain, flooding, landslide risk, damaged roads, or unsafe behaviour by passengers.</li>
          <li><strong>Travel Times</strong>: Journey times given are estimates only. Traffic, roadworks, hill country roads, festival days, and Poya holidays can add significant time, so please allow extra time for important connections, especially flights.</li>
          <li><strong>Route Suitability</strong>: Some destinations, such as rough tracks, national park interiors, or remote hill roads, may not suit certain Vehicle types (for example buses). We will advise you at booking.</li>
          <li><strong>Speed & Driving Standards</strong>: Drivers follow Sri Lankan traffic law and speed limits. Clients must not ask Drivers to drive unsafely or break the law.</li>
        </ul>
      </>
    ),
  },
  {
    num: "11",
    title: "Client Obligations",
    content: (
      <>
        <p>The Client agrees to the following obligations when using Ceylon Compass Travels services:</p>
        <ul>
          <li>Be ready at the designated pickup location at the confirmed time.</li>
          <li>Provide accurate booking information, including addresses, passenger numbers, and flight details.</li>
          <li>Ensure all passengers behave respectfully towards the Driver and do not damage the Vehicle.</li>
          <li>Refrain from smoking or using illegal substances in any Vehicle. Food and alcohol may be consumed only with the Driver’s permission. Violations may result in additional cleaning charges.</li>
          <li>Not carry illegal goods, prohibited items, or hazardous materials in the Vehicle.</li>
          <li>Notify the Company promptly of any changes to travel plans.</li>
          <li>Ensure children are accompanied by a responsible adult at all times.</li>
          <li>Keep their own passports, valuables, and travel documents with them at all times.</li>
        </ul>
      </>
    ),
  },
  {
    num: "12",
    title: "Liability & Limitations",
    content: (
      <>
        <p>Ceylon Compass Travels takes reasonable care to provide safe and reliable transport. The following limitations of liability apply:</p>
        <ul>
          <li>The Company is not liable for delays caused by traffic, weather, road closures, accidents, protests, strikes, or any circumstances beyond its control.</li>
          <li>The Company is not liable for missed flights, trains, tours, or connections caused by events outside its control. Clients are advised to allow generous time for flights.</li>
          <li>The Company’s liability for any claim shall not exceed the total value of the booking in question, except where the law does not allow this limit.</li>
          <li>The Company is not responsible for personal belongings left in the Vehicle. Lost property that is found will be held for 14 days and arrangements made for collection or return at the Client’s cost.</li>
          <li>The Client is liable for any damage caused to the Vehicle through negligence or deliberate action.</li>
          <li>Clients are strongly encouraged to hold their own travel and medical insurance. Nothing in these Terms limits any rights that cannot be excluded under Sri Lankan law.</li>
        </ul>
      </>
    ),
  },
  {
    num: "13",
    title: "Force Majeure",
    content: (
      <p>Ceylon Compass Travels shall not be held liable for any failure to perform its obligations due to events beyond its reasonable control, including but not limited to natural disasters, floods, landslides, severe monsoon weather, fuel shortages, government restrictions, curfews, strikes, pandemic measures, civil unrest, or acts of war. In such cases, the Company will endeavour to provide an alternative solution or issue a full or partial refund at its discretion.</p>
    ),
  },
  {
    num: "14",
    title: "Privacy & Data Protection",
    content: (
      <p>The collection, use, and storage of personal data is governed by our <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>. By making a booking, the Client consents to the processing of their personal data as described therein, in accordance with the Personal Data Protection Act, No. 9 of 2022 of Sri Lanka and, where applicable, the GDPR.</p>
    ),
  },
  {
    num: "15",
    title: "Complaints & Dispute Resolution",
    content: (
      <>
        <p>Ceylon Compass Travels is committed to providing an excellent service. In the event of a complaint:</p>
        <ul>
          <li>Complaints should be submitted in writing to <a href={`mailto:${EMAIL}`} style={linkStyle}>{EMAIL}</a> within 7 days of the service date.</li>
          <li>We will acknowledge your complaint within 48 hours and aim to resolve it within 14 days.</li>
          <li>If a resolution cannot be reached, the Client may refer the matter to the relevant Sri Lankan authority, such as the Sri Lanka Tourism Development Authority or the Consumer Affairs Authority.</li>
        </ul>
      </>
    ),
  },
  {
    num: "16",
    title: "Governing Law",
    content: (
      <p>These Terms and Conditions are governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising from these Terms shall be subject to the jurisdiction of the courts of Sri Lanka.</p>
    ),
  },
  {
    num: "17",
    title: "Amendments",
    content: (
      <p>Ceylon Compass Travels reserves the right to amend these Terms and Conditions at any time. The most current version will always be published on our website. Continued use of our services following any amendments constitutes acceptance of the revised Terms.</p>
    ),
  },
];

const CONTACT_NUM = String(sections.length + 1).padStart(2, "0");

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

        .tc-root { background:#060d1a; color:#d8dff0; min-height:100vh; font-family:'Inter',system-ui,sans-serif; }

        /* ── Hero ── */
        .tc-hero { position:relative; text-align:center; padding:120px 24px 80px; overflow:hidden; }
        .tc-hero::before { content:''; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(13,30,60,0.6) 0%, transparent 60%); }
        .tc-eyebrow { font-family:'Inter',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.3em; text-transform:uppercase; color:#c8a96e; margin-bottom:20px; opacity:0.8; }
        .tc-title { font-family:'Cinzel',serif; font-size:clamp(2.4rem,6vw,4.2rem); font-weight:500; letter-spacing:0.12em; color:#f5f0e8; margin:0 0 20px; line-height:1.1; }
        .tc-subtitle { font-size:14px; color:rgba(200,169,110,0.65); letter-spacing:0.12em; text-transform:uppercase; font-weight:500; }
        .tc-hero-rule { width:1px; height:56px; background:linear-gradient(to bottom, rgba(200,169,110,0.5), transparent); margin:32px auto 0; }

        /* ── Layout ── */
        .tc-layout { max-width:1180px; margin:0 auto; padding:60px 24px 100px; display:grid; grid-template-columns:220px 1fr; gap:64px; align-items:start; }

        /* ── Sidebar TOC ── */
        .tc-toc { position:sticky; top:100px; max-height:calc(100vh - 120px); overflow-y:auto; scrollbar-width:none; }
        .tc-toc::-webkit-scrollbar { display:none; }
        .tc-toc-label { font-size:10px; font-weight:600; letter-spacing:0.25em; text-transform:uppercase; color:rgba(200,169,110,0.5); margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid rgba(200,169,110,0.12); }
        .tc-toc-item { display:flex; align-items:flex-start; gap:10px; padding:7px 0; cursor:pointer; text-decoration:none; border:none; background:none; width:100%; text-align:left; }
        .tc-toc-item:hover .tc-toc-text { color:#c8a96e; }
        .tc-toc-num { font-size:10px; color:rgba(200,169,110,0.3); font-weight:600; letter-spacing:0.05em; flex-shrink:0; margin-top:1px; transition:color 0.2s; }
        .tc-toc-text { font-size:11.5px; color:rgba(200,169,110,0.35); line-height:1.4; transition:color 0.2s; }
        .tc-toc-item.active .tc-toc-num, .tc-toc-item.active .tc-toc-text { color:#c8a96e; }
        .tc-toc-item.active .tc-toc-text { font-weight:500; }

        /* ── Intro ── */
        .tc-intro { font-family:'EB Garamond',serif; font-size:clamp(1.05rem,1.3vw,1.2rem); line-height:1.85; color:rgba(216,223,240,0.8); margin-bottom:64px; padding-bottom:48px; border-bottom:1px solid rgba(200,169,110,0.1); }
        .tc-intro strong { color:#c8a96e; font-weight:500; }

        /* ── Sections ── */
        .tc-section { margin-bottom:56px; padding-bottom:56px; border-bottom:1px solid rgba(200,169,110,0.07); }
        .tc-section:last-of-type { border-bottom:none; }
        .tc-section-header { display:flex; align-items:center; gap:18px; margin-bottom:24px; }
        .tc-section-num { font-family:'Cinzel',serif; font-size:11px; color:rgba(200,169,110,0.4); letter-spacing:0.1em; flex-shrink:0; }
        .tc-section-rule { flex:1; height:1px; background:linear-gradient(to right, rgba(200,169,110,0.25), transparent); }
        .tc-section-title { font-family:'Cinzel',serif; font-size:clamp(1rem,1.4vw,1.15rem); font-weight:500; color:#f0e8d8; letter-spacing:0.06em; margin:0 0 18px; }
        .tc-section-body { font-family:'EB Garamond',serif; font-size:clamp(1rem,1.2vw,1.1rem); line-height:1.85; color:rgba(216,223,240,0.72); }
        .tc-section-body p { margin:0 0 14px; }
        .tc-section-body p:last-child { margin-bottom:0; }
        .tc-section-body strong { color:rgba(240,232,216,0.9); font-weight:500; }
        .tc-section-body ul { list-style:none; padding:0; margin:16px 0 0; display:flex; flex-direction:column; gap:10px; }
        .tc-section-body ul li { display:flex; gap:14px; align-items:flex-start; line-height:1.65; }
        .tc-section-body ul li::before { content:''; display:block; width:4px; height:4px; border-radius:50%; background:#c8a96e; opacity:0.5; flex-shrink:0; margin-top:10px; }

        /* ── Highlight box ── */
        .tc-highlight { background:linear-gradient(135deg, rgba(200,169,110,0.06), rgba(200,169,110,0.02)); border:1px solid rgba(200,169,110,0.16); border-left:3px solid rgba(200,169,110,0.5); border-radius:0 12px 12px 0; padding:20px 24px; margin-bottom:48px; font-family:'EB Garamond',serif; font-size:clamp(0.95rem,1.1vw,1.05rem); line-height:1.75; color:rgba(200,169,110,0.75); }

        /* ── Contact card ── */
        .tc-contact { background:linear-gradient(135deg, rgba(13,26,51,0.9), rgba(8,15,30,0.95)); border:1px solid rgba(200,169,110,0.18); border-radius:20px; padding:40px 44px; position:relative; overflow:hidden; }
        .tc-contact::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg, transparent, #c8a96e, transparent); }
        .tc-contact-title { font-family:'Cinzel',serif; font-size:1rem; font-weight:500; color:#c8a96e; letter-spacing:0.1em; margin-bottom:24px; }
        .tc-contact-row { display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; font-family:'EB Garamond',serif; font-size:1.05rem; color:rgba(216,223,240,0.75); line-height:1.5; }
        .tc-contact-row:last-of-type { margin-bottom:0; }
        .tc-contact-icon { font-size:15px; flex-shrink:0; margin-top:2px; opacity:0.7; }
        .tc-contact-row a { color:rgba(216,223,240,0.75); text-decoration:none; border-bottom:1px solid rgba(200,169,110,0.2); transition:color 0.2s, border-color 0.2s; word-break:break-word; }
        .tc-contact-row a:hover { color:#c8a96e; border-color:#c8a96e; }
        .tc-contact-badges { display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; padding-top:24px; border-top:1px solid rgba(200,169,110,0.1); }
        .tc-badge { font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:rgba(200,169,110,0.6); padding:5px 12px; border:1px solid rgba(200,169,110,0.18); border-radius:999px; }

        /* ── Footer ── */
        .tc-foot { border-top:1px solid rgba(200,169,110,0.08); padding:32px 24px; text-align:center; }
        .tc-foot-text { font-size:11px; color:rgba(200,169,110,0.35); letter-spacing:0.08em; line-height:1.9; }
        .tc-foot-link { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:rgba(200,169,110,0.5); text-decoration:none; letter-spacing:0.1em; text-transform:uppercase; transition:color 0.2s; margin-bottom:20px; }
        .tc-foot-link:hover { color:#c8a96e; }

        /* ── Mobile ── */
        @media (max-width:860px) {
          .tc-layout { grid-template-columns:1fr; gap:0; padding:40px 20px 80px; }
          .tc-toc { display:none; }
          .tc-hero { padding:100px 20px 60px; }
          .tc-contact { padding:28px 24px; }
        }
        @media (max-width:480px) {
          .tc-hero { padding:88px 16px 48px; }
          .tc-layout { padding:32px 16px 64px; }
          .tc-section { margin-bottom:40px; padding-bottom:40px; }
          .tc-highlight { padding:16px 18px; }
        }
      `}</style>

      <div className="tc-root">
        {/* Hero */}
        <div className="tc-hero">
          <div className="tc-eyebrow">{BRAND} · Legal Documents</div>
          <h1 className="tc-title">Terms &amp; Conditions</h1>
          <p className="tc-subtitle">Last updated: {LAST_UPDATED}</p>
          <div className="tc-hero-rule" />
        </div>

        {/* Body */}
        <div className="tc-layout">
          {/* Sidebar TOC */}
          <nav className="tc-toc" aria-label="Table of contents">
            <div className="tc-toc-label">Contents</div>
            {sections.map((s) => (
              <a
                key={s.num}
                href={`#section-${s.num}`}
                className={`tc-toc-item${activeSection === `section-${s.num}` ? " active" : ""}`}
              >
                <span className="tc-toc-num">{s.num}</span>
                <span className="tc-toc-text">{s.title}</span>
              </a>
            ))}
            <a
              href="#section-contact"
              className={`tc-toc-item${activeSection === "section-contact" ? " active" : ""}`}
            >
              <span className="tc-toc-num">{CONTACT_NUM}</span>
              <span className="tc-toc-text">Contact Us</span>
            </a>
          </nav>

          {/* Main */}
          <main>
            {/* Intro */}
            <p className="tc-intro">
              Please read these Terms and Conditions carefully before using the services of{" "}
              <strong>{BRAND}</strong>. By making a booking with us, you confirm that you have read, understood, and agreed to be bound by these Terms. These Terms form an agreement between you (the Client) and {BRAND}, a private tourist transport provider in Sri Lanka offering cars, vans, and buses with drivers.
            </p>

            {/* Important notice */}
            <div className="tc-highlight">
              These Terms apply to all bookings made via <strong style={{ color: "#c8a96e" }}>{SITE_LABEL}</strong>, by phone, email, or WhatsApp. If you do not agree with any part of these Terms, please do not proceed with a booking.
            </div>

            {/* Sections */}
            {sections.map((s) => (
              <div key={s.num} id={`section-${s.num}`} data-section className="tc-section">
                <div className="tc-section-header">
                  <span className="tc-section-num">{s.num}</span>
                  <div className="tc-section-rule" />
                </div>
                <h2 className="tc-section-title">{s.title}</h2>
                <div className="tc-section-body">{s.content}</div>
              </div>
            ))}

            {/* Contact */}
            <div id="section-contact" data-section className="tc-section">
              <div className="tc-section-header">
                <span className="tc-section-num">{CONTACT_NUM}</span>
                <div className="tc-section-rule" />
              </div>
              <h2 className="tc-section-title">Contact Us</h2>
              <p className="tc-section-body" style={{ marginBottom: 24 }}>
                For any questions, booking amendments, complaints, or general enquiries regarding these Terms, please reach us through the following channels:
              </p>
              <div className="tc-contact">
                <div className="tc-contact-title">{BRAND} — Private Transfers &amp; Tours</div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">📍</span>
                  <span>{ADDRESS}</span>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">📞</span>
                  <span>
                    <a href={`tel:${PHONE_1.tel}`}>{PHONE_1.display}</a>
                    <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span>
                    <a href={`tel:${PHONE_2.tel}`}>{PHONE_2.display}</a>
                    <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span>
                    <span style={{ fontSize: "0.92em", opacity: 0.6 }}>WhatsApp available</span>
                  </span>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">✉️</span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">🌐</span>
                  <a href={`https://${SITE_LABEL}`}>{SITE_LABEL}</a>
                </div>
                <div className="tc-contact-badges">
                  <span className="tc-badge">24 / 7 Support</span>
                  <span className="tc-badge">Island-wide Pickups</span>
                  <span className="tc-badge">Fixed Fares</span>
                  <span className="tc-badge">English &amp; Russian</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <p style={{ fontSize: 12, color: "rgba(200,169,110,0.3)", textAlign: "center", marginTop: 48, lineHeight: 1.9, letterSpacing: "0.06em" }}>
              These Terms and Conditions are governed by the laws of Sri Lanka.<br />
              © 2026 {BRAND} — All Rights Reserved.
            </p>
          </main>
        </div>

        {/* Footer */}
        <footer className="tc-foot">
          <div>
            <Link href="/" className="tc-foot-link">← Back to Home</Link>
          </div>
          <p className="tc-foot-text">
            {BRAND} · {SITE_LABEL} · {ADDRESS}
          </p>
        </footer>
      </div>
    </>
  );
}