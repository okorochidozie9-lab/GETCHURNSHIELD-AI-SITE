import React, { useState, useRef } from "react";

// ---------- Icon Components ----------
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Logo = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
    <rect width="32" height="32" rx="8" fill="#059669" />
    <path
      d="M9 20.5L14 11L18 17L23 9"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="23" cy="9" r="2" fill="white" />
  </svg>
);

// ---------- Data ----------
const STEPS = [
  {
    label: "Step 01",
    title: "24/7 Intent Capture",
    body:
      "The engine continuously monitors Instagram and Facebook posts, instantly scraping high-intent buyers the exact split-second they comment on an ad or listing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Step 02",
    title: "Ghost-Agent Nurturing",
    body:
      "The AI instantly launches a highly contextual, value-first conversation on WhatsApp. It uses anti-scam property advice to build trust, completely qualifying budgets and timelines with zero trace of AI.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    label: "Step 03",
    title: "Live Closing Handoff",
    body:
      "The system bypasses data clutter, instantly dropping a verified, live qualification link straight to your smartphone the moment a buyer confirms they are ready for a physical site inspection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path strokeLinecap="round" d="M11 18h2" />
      </svg>
    ),
  },
];

const PLANS = [
  {
    id: "growth",
    name: "GROWTH PLAN",
    price: "₦150,000",
    tagline: "Best for independent realtors and boutique property agencies.",
    popular: false,
    features: [
      "1 Single Source channel (Instagram Ads & Organic Posts).",
      "Up to 300 automated, high-intent buyer leads per month.",
      "Instant, direct value-first outreach straight to WhatsApp.",
      "Custom setup with your specific property listings, pricing, and locations.",
      "100% human-like automated chat layer to verify buyer budgets.",
      "Instant smartphone alerts the moment an inspection is requested.",
    ],
  },
  {
    id: "pro",
    name: "PRO PLAN",
    price: "₦300,000",
    tagline: "Best for mid-sized real estate teams looking to scale fast.",
    popular: true,
    features: [
      "2 Multi-Channel sources (Instagram & Facebook Lead Engines).",
      "Up to 1,000 automated, high-intent buyer leads per month.",
      "Full contextual learning of listing sheets, estate rules, and payment plans.",
      "Automated 24-hour fallback to value-driven Email sequences if chat drops.",
      "Deep conversational flow handling local property objections with zero AI trace.",
      "Dedicated WhatsApp qualification link for immediate team takeover.",
    ],
  },
  {
    id: "ultimate",
    name: "ULTIMATE PLAN",
    price: "₦500,000",
    tagline: "Best for corporate developers and premium enterprise brokerages.",
    popular: false,
    features: [
      "Omnichannel sources (Instagram, Facebook, & Twitter/X Investor Tracking).",
      "Up to 2,500 automated, high-intent buyer leads per month.",
      "Custom AI persona training mapped directly to your unique executive tone.",
      "Autonomous AI voice engine for automated cold calls to inactive leads.",
      "Includes a generous baseline allocation of 1,000 monthly voice minutes.",
      "Advanced developer webhooks to sync chat logs directly to your internal CRM.",
      "Priority instant notifications to your closing team for immediate conversion.",
    ],
  },
];

const FAQS = [
  {
    q: "Will my clients know they are talking to an AI?",
    a: "No. The conversational layer is engineered with advanced real estate context and local empathy filters, reading exactly like a highly trained internal consultant.",
  },
  {
    q: "How long does it take to onboard our agency portfolio?",
    a: "We ingest your current property sheets, payment plans, and locations during your 24-hour setup window, allowing your engine to launch almost immediately.",
  },
  {
    q: "What happens if a lead doesn't use WhatsApp?",
    a: "On our Pro and Ultimate tiers, the system automatically triggers a value-first email fallback sequence to ensure no premium lead falls through the cracks.",
  },
];

// ---------- Reusable Bits ----------
const SectionBackdrop = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.35]"
    style={{
      backgroundImage:
        "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
      backgroundSize: "26px 26px",
    }}
  />
);

const VideoFrame = ({ onOpen }) => (
  <button
    onClick={onOpen}
    className="group relative w-full max-w-4xl mx-auto aspect-video rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
  >
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
        <PlayIcon className="w-9 h-9 text-white translate-x-0.5" />
      </div>
      <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">
        Watch the 2-Minute Demo
      </p>
    </div>
    <div className="absolute top-4 left-4 flex gap-1.5">
      <span className="w-3 h-3 rounded-full bg-red-500/70" />
      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
      <span className="w-3 h-3 rounded-full bg-green-500/70" />
    </div>
  </button>
);

// ---------- Main Component ----------
export default function GetChurnShieldLanding() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openSetupModal = (plan) => {
    setSelectedPlan(plan);
    setIsSetupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased relative">
      {/* Global subtle dot-grid background texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ---------------- NAVBAR ---------------- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-gray-200/80">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              GetChurnShield <span className="text-emerald-600">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Pricing
            </button>
            <div className="flex items-center gap-2 pl-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-500">
                System Status: Fully Operational
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            Watch Demo
          </button>
        </nav>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <SectionBackdrop />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-wide">
            BUILT FOR NIGERIAN REAL ESTATE AGENCIES
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-7">
            Turn Social Media Comments Into{" "}
            <span className="text-emerald-600">Qualified Property Buyers</span>
            On Autopilot.
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Built exclusively for Nigerian real estate agencies and property
            developers. GetChurnShield AI automatically extracts high-intent
            buyer leads from Instagram twitter and Facebook comments, launches an
            instant value-first qualification sequence on WhatsApp, and alerts
            your team the exact second a hot client is ready to book a
            physical site inspection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <PlayIcon className="w-5 h-5" />
              Watch 2-Minute Demo Video
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="w-full sm:w-auto bg-white text-gray-800 font-bold px-8 py-4 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-700 hover:scale-[1.02]"
            >
              View Setup Pricing
            </button>
          </div>

          <VideoFrame onOpen={() => setIsVideoOpen(true)} />
        </div>
      </section>

      {/* ---------------- PROBLEM SEGMENT ---------------- */}
      <section className="relative bg-gray-50/80 border-y border-gray-200/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Your sales team is wasting too much time doing manual work instead of closing deals.
                </h2>
            times.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Real estate growth stops completely when your agents spend the whole day searching for clients online, copy-pasting price details, chasing people up and down on WhatsApp, and trying to filter serious buyers one by one. This manual hustle doesn't scale. It is too slow, mistakes will happen, and your team will easily forget to follow up on hot leads—which means multi-million Naira commissions are slipping away.GetChurnShield AI takes over this stressful, boring work by actively scanning online spaces to find, chat with, and qualify serious buyers on autopilot. Your team stops wasting time looking for who wants to buy and starts focusing only on closing clients who are ready to pay. Plus, everything is neatly organized in a clean dashboard so you can see exactly how your business is growing in real time.
          </p>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section ref={howItWorksRef} className="relative py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-16">
            How GetChurnShield Automates Your Pipeline in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  {step.label}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {step.body}
                </p>
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section
        ref={pricingRef}
        className="relative bg-gray-50/80 border-y border-gray-200/70 py-24 scroll-mt-20"
      >
        <SectionBackdrop />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Predictable Pricing Built for Real Estate Scale
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select the plan tailored to your agency's pipeline. One closed
              plot or duplex pays for the entire year.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full ${
                  plan.popular
                    ? "border-2 border-emerald-500 shadow-lg lg:-translate-y-3"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-sm font-extrabold tracking-widest text-gray-500 mb-3">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 min-h-[2.5rem]">
                  {plan.tagline}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-slate-700">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openSetupModal(plan)}
                  className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/40"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Secure Your Setup Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-bold text-gray-900">{item.q}</span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-slate-600 leading-relaxed text-sm">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 GetChurnShield AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 font-medium">
            Built for Elite Real Estate Operators.
          </p>
        </div>
      </footer>

      {/* ---------------- VIDEO MODAL ---------------- */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            >
              Close <CloseIcon />
            </button>
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 shadow-2xl flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                <PlayIcon className="w-9 h-9 text-white translate-x-0.5" />
              </div>
              <p className="text-gray-300 text-sm font-medium tracking-wide">
                Demo video playback would appear here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SETUP SESSION MODAL ---------------- */}
      {isSetupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSetupOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Secure Your Setup Session
                </h3>
                {selectedPlan && (
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedPlan.name} &middot; {selectedPlan.price} / month
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsSetupOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-7 py-6">
              <p className="text-sm text-slate-600 mb-5">
                Pick a time below for a 20-minute onboarding call. We'll map
                your listings, pricing, and locations into your engine
                before launch.
              </p>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-6">
                <p className="text-xs font-bold tracking-widest text-gray-500 mb-4">
                  AVAILABLE SESSIONS THIS WEEK
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["Mon 10:00", "Tue 13:30", "Wed 09:00", "Wed 15:00", "Thu 11:00", "Fri 14:00"].map(
                    (slot) => (
                      <button
                        key={slot}
                        className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg py-2.5 transition-all duration-200 hover:border-emerald-500 hover:text-emerald-700 hover:scale-[1.03]"
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder="Agency name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="WhatsApp number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
              />

              <button
                onClick={() => setIsSetupOpen(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-emerald-600/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Confirm Setup Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
