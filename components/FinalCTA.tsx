"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";
import { useLanguage } from "@/lib/LanguageContext";

export default function FinalCTA() {
  const { t } = useLanguage();

  const riskItems = [
    t.finalRisk1,
    t.finalRisk2,
    t.finalRisk3,
    t.finalRisk4,
  ];

  return (
    <section
      id="lead-form"
      className="py-[60px] md:py-[96px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

          {/* Left: Copy — visible on desktop, hidden on mobile */}
          <motion.div
            className="hidden lg:flex flex-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
                {t.finalEyebrow}
              </p>
              <h2
                className="font-heading font-semibold mb-6 text-balance"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#1A1A1A", maxWidth: "520px" }}
              >
                {t.finalHeadline}
              </h2>
              <p className="mb-8" style={{ fontSize: "17px", color: "#555555", lineHeight: "1.75", maxWidth: "480px" }}>
                {t.finalBody}
              </p>

              {/* Risk reducers */}
              <div className="flex flex-col gap-3 mb-8">
                {riskItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "#444444" }}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Social proof snippet */}
              <div
                className="rounded-xl p-5"
                style={{ background: "white", border: "1px solid #E8D9C0", maxWidth: "400px" }}
              >
                <div className="flex gap-1 mb-2">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} style={{ color: "#D4A373", fontSize: "14px" }}>{s}</span>
                  ))}
                </div>
                <p className="italic text-sm mb-2" style={{ color: "#555555", lineHeight: "1.6" }}>
                  "The classes were so much fun! We felt very confident and excited to dance in front
                  of all our friends and family."
                </p>
                <span className="text-xs font-semibold" style={{ color: "#D4A373" }}>— Sophia</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form — full width on mobile */}
          <motion.div
            className="w-full lg:w-[400px] lg:flex-shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Mobile headline shown only on mobile */}
            <div className="lg:hidden mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#D4A373" }}>
                {t.finalEyebrow}
              </p>
              <h2
                className="font-heading font-semibold mb-3"
                style={{ fontSize: "clamp(24px, 6vw, 36px)", color: "#1A1A1A" }}
              >
                {t.finalHeadline}
              </h2>
            </div>

            <div
              className="bg-white rounded-2xl p-6 shadow-lg"
              style={{ borderRadius: "16px" }}
            >
              <h3
                className="font-heading font-semibold mb-2"
                style={{ fontSize: "20px", color: "#1A1A1A" }}
              >
                {t.finalFormTitle}
              </h3>
              <p className="text-sm mb-6" style={{ color: "#888888" }}>
                {t.finalFormSubtitle}
              </p>
              <LeadForm variant="inline" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
