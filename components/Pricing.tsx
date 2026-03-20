"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const weddingPlans = [
  {
    name: "Intro Offer",
    badge: "Start Here",
    highlight: true,
    subtitle: "Private lesson · up to 2 people · 60 min",
    price: "€49",
    originalPrice: "€59",
    priceNote: "First lesson only",
    features: [
      "Perfect for beginners",
      "Personalized to your song",
      "No experience needed",
      "Home / venue visit available*",
    ],
    ctaKey: "bookFor49" as const,
  },
  {
    name: "5-Class Pack",
    badge: null,
    highlight: false,
    subtitle: "Private lessons · up to 2 people · 60 min each",
    price: "€275",
    priceNote: "€55 per class",
    features: [
      "Full choreography development",
      "Progress at your own pace",
      "Recorded for home practice",
      "Home / venue visit available*",
    ],
    ctaKey: "bookNow" as const,
  },
  {
    name: "10-Class Pack",
    badge: "Best Value",
    highlight: false,
    subtitle: "Private lessons · up to 2 people · 60 min each",
    price: "€500",
    priceNote: "€50 per class",
    features: [
      "Complete wedding dance package",
      "Complex choreography welcome",
      "Multiple style options",
      "Home / venue visit available*",
    ],
    ctaKey: "bookNow" as const,
  },
];

const partyPlans = [
  {
    name: "Single Class",
    subtitle: "Group lesson · 3–6 people · 60 min",
    price: "€99",
    priceNote: "Per session",
    features: ["Fun group session", "Bridal party welcome", "Home / venue visit available*"],
    ctaKey: "bookNow" as const,
  },
  {
    name: "5-Class Pack",
    subtitle: "Group lessons · 3–6 people · 60 min each",
    price: "€475",
    priceNote: "€95 per class",
    features: ["Build on each session", "Great for parties / events", "Home / venue visit available*"],
    ctaKey: "bookNow" as const,
  },
  {
    name: "10-Class Pack",
    subtitle: "Group lessons · 3–6 people · 60 min each",
    price: "€900",
    priceNote: "€90 per class",
    features: ["Complete group programme", "Perfect for dance-loving groups", "Home / venue visit available*"],
    ctaKey: "bookNow" as const,
  },
];

type PlanBase = {
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
  ctaKey: "bookFor49" | "bookNow";
};

type WeddingPlan = PlanBase & { badge: string | null; highlight: boolean; originalPrice?: string };

function PriceCard({ plan, index }: { plan: WeddingPlan | PlanBase; index: number }) {
  const { t } = useLanguage();
  const highlight = "highlight" in plan && plan.highlight;
  const badge = "badge" in plan ? (plan as WeddingPlan).badge : null;
  const originalPrice = "originalPrice" in plan ? (plan as WeddingPlan).originalPrice : null;

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", {
        cta_location: `pricing_${plan.name}`,
      });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
      style={{
        borderRadius: "16px",
        border: highlight ? "2px solid #E76F51" : "1px solid #F0E8D8",
        padding: "28px 24px",
      }}
    >
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white"
          style={{ background: highlight ? "#E76F51" : "#D4A373" }}
        >
          {badge}
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg mb-1" style={{ color: "#1A1A1A" }}>
          {plan.name}
        </h3>
        <p className="text-xs" style={{ color: "#999999" }}>{plan.subtitle}</p>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-heading font-bold" style={{ fontSize: "36px", color: "#1A1A1A" }}>
            {plan.price}
          </span>
          {originalPrice && (
            <span className="text-base font-medium line-through" style={{ color: "#BBBBBB" }}>
              {originalPrice}
            </span>
          )}
        </div>
        <span className="text-sm" style={{ color: "#999999" }}>{plan.priceNote}</span>
      </div>

      <ul className="flex-1 mb-7 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444444" }}>
            <span style={{ color: "#D4A373", marginTop: "1px" }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        className="w-full font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          height: "48px",
          borderRadius: "10px",
          background: highlight ? "#E76F51" : "#1A1A1A",
          color: "#FFFFFF",
          fontSize: "15px",
        }}
      >
        {t[plan.ctaKey]}
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section
      id="pricing"
      className="py-[60px] md:py-[96px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
            {t.pricingEyebrow}
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            {t.pricingHeadline}
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontSize: "16px", color: "#666666", lineHeight: "1.7" }}>
            {t.pricingSubtitle}
          </p>
        </motion.div>

        {/* Wedding Dance */}
        <div className="mb-12 md:mb-14">
          <h3 className="font-heading text-xl font-semibold mb-2 text-center" style={{ color: "#E76F51" }}>
            {t.pricingWeddingLabel}
          </h3>
          <p className="text-center text-sm mb-7 md:mb-8" style={{ color: "#999999" }}>
            {t.pricingWeddingNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {weddingPlans.map((plan, i) => (
              <PriceCard key={i} plan={plan as WeddingPlan} index={i} />
            ))}
          </div>
        </div>

        {/* Party Dance */}
        <div>
          <h3 className="font-heading text-xl font-semibold mb-2 text-center" style={{ color: "#E76F51" }}>
            {t.pricingPartyLabel}
          </h3>
          <p className="text-center text-sm mb-7 md:mb-8" style={{ color: "#999999" }}>
            {t.pricingPartyNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {partyPlans.map((plan, i) => (
              <PriceCard key={i} plan={plan} index={i} />
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "#AAAAAA" }}>
          {t.pricingFootnote}
        </p>
      </div>
    </section>
  );
}
