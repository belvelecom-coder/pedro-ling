"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

type Language = "en" | "pt";

function getWeddingPlans(lang: Language) {
  const d = {
    en: {
      p1Name: "Intro Offer", p1Badge: "Start Here",
      p1Sub: "Private lesson · up to 2 people · 60 min", p1Note: "First lesson only",
      p1F: ["Perfect for beginners", "Personalized to your song", "No experience needed", "Home / venue visit available*"],
      p2Name: "5-Class Pack",
      p2Sub: "Private lessons · up to 2 people · 60 min each", p2Note: "€55 per class",
      p2F: ["Full choreography development", "Progress at your own pace", "Recorded for home practice", "Home / venue visit available*"],
      p3Name: "10-Class Pack", p3Badge: "Best Value",
      p3Sub: "Private lessons · up to 2 people · 60 min each", p3Note: "€50 per class",
      p3F: ["Complete wedding dance package", "Complex choreography welcome", "Multiple style options", "Home / venue visit available*"],
    },
    pt: {
      p1Name: "Oferta Introdutória", p1Badge: "Comece Aqui",
      p1Sub: "Aula privada · até 2 pessoas · 60 min", p1Note: "Apenas a primeira aula",
      p1F: ["Perfeito para principiantes", "Personalizado para a sua música", "Sem experiência necessária", "Visita a casa / local disponível*"],
      p2Name: "Pacote de 5 Aulas",
      p2Sub: "Aulas privadas · até 2 pessoas · 60 min cada", p2Note: "€55 por aula",
      p2F: ["Desenvolvimento completo da coreografia", "Progrida ao seu ritmo", "Gravado para praticar em casa", "Visita a casa / local disponível*"],
      p3Name: "Pacote de 10 Aulas", p3Badge: "Melhor Valor",
      p3Sub: "Aulas privadas · até 2 pessoas · 60 min cada", p3Note: "€50 por aula",
      p3F: ["Pacote completo de Dança dos Noivos", "Coreografia complexa bem-vinda", "Várias opções de estilo", "Visita a casa / local disponível*"],
    },
  }[lang];

  return [
    { name: d.p1Name, badge: d.p1Badge, highlight: true, subtitle: d.p1Sub, price: "€49", originalPrice: "€59", priceNote: d.p1Note, features: d.p1F, ctaKey: "bookFor49" as const },
    { name: d.p2Name, badge: null, highlight: false, subtitle: d.p2Sub, price: "€275", priceNote: d.p2Note, features: d.p2F, ctaKey: "bookNow" as const },
    { name: d.p3Name, badge: d.p3Badge, highlight: false, subtitle: d.p3Sub, price: "€500", priceNote: d.p3Note, features: d.p3F, ctaKey: "bookNow" as const },
  ];
}

function getPartyPlans(lang: Language) {
  const d = {
    en: {
      p1Name: "Single Class", p1Sub: "Group lesson · 3–6 people · 60 min", p1Note: "Per session",
      p1F: ["Fun group session", "Bridal party welcome", "Home / venue visit available*"],
      p2Name: "5-Class Pack", p2Sub: "Group lessons · 3–6 people · 60 min each", p2Note: "€95 per class",
      p2F: ["Build on each session", "Great for parties / events", "Home / venue visit available*"],
      p3Name: "10-Class Pack", p3Sub: "Group lessons · 3–6 people · 60 min each", p3Note: "€90 per class",
      p3F: ["Complete group programme", "Perfect for dance-loving groups", "Home / venue visit available*"],
    },
    pt: {
      p1Name: "Aula Individual", p1Sub: "Aula em grupo · 3–6 pessoas · 60 min", p1Note: "Por sessão",
      p1F: ["Sessão em grupo divertida", "Grupo de casamento bem-vindo", "Visita a casa / local disponível*"],
      p2Name: "Pacote de 5 Aulas", p2Sub: "Aulas em grupo · 3–6 pessoas · 60 min cada", p2Note: "€95 por aula",
      p2F: ["Construa em cada sessão", "Ótimo para festas / eventos", "Visita a casa / local disponível*"],
      p3Name: "Pacote de 10 Aulas", p3Sub: "Aulas em grupo · 3–6 pessoas · 60 min cada", p3Note: "€90 por aula",
      p3F: ["Programa completo em grupo", "Perfeito para grupos que adoram dançar", "Visita a casa / local disponível*"],
    },
  }[lang];

  return [
    { name: d.p1Name, subtitle: d.p1Sub, price: "€99", priceNote: d.p1Note, features: d.p1F, ctaKey: "bookNow" as const },
    { name: d.p2Name, subtitle: d.p2Sub, price: "€475", priceNote: d.p2Note, features: d.p2F, ctaKey: "bookNow" as const },
    { name: d.p3Name, subtitle: d.p3Sub, price: "€900", priceNote: d.p3Note, features: d.p3F, ctaKey: "bookNow" as const },
  ];
}

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
  const { t, language } = useLanguage();
  const weddingPlans = getWeddingPlans(language as Language);
  const partyPlans = getPartyPlans(language as Language);

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
