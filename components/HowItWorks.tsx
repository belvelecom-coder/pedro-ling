"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { number: "01", icon: "📅", title: t.step1Title, body: t.step1Body },
    { number: "02", icon: "💃", title: t.step2Title, body: t.step2Body },
    { number: "03", icon: "✨", title: t.step3Title, body: t.step3Body },
  ];

  return (
    <section
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
            {t.howEyebrow}
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            {t.howHeadline}
          </h2>
          <p className="mt-4 text-[#666666] max-w-xl mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            {t.howSubtitle}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-[40px]">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center w-full md:w-auto"
              style={{ maxWidth: "280px" }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div
                className="w-[72px] h-[72px] flex items-center justify-center rounded-full mb-5 text-3xl shadow-sm"
                style={{ background: "#FAF3E0", border: "2px solid #D4A373" }}
              >
                {step.icon}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#D4A373" }}
              >
                Step {step.number}
              </span>
              <h3
                className="font-heading font-semibold mb-3"
                style={{ fontSize: "20px", color: "#1A1A1A" }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "15px", color: "#666666", lineHeight: "1.7" }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
