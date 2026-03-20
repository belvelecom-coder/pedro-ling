"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    { icon: "🕺", title: t.benefit1Title, body: t.benefit1Body },
    { icon: "🎵", title: t.benefit2Title, body: t.benefit2Body },
    { icon: "📆", title: t.benefit3Title, body: t.benefit3Body },
    { icon: "⚡", title: t.benefit4Title, body: t.benefit4Body },
    { icon: "🌍", title: t.benefit5Title, body: t.benefit5Body },
    { icon: "❤️", title: t.benefit6Title, body: t.benefit6Body },
  ];

  return (
    <section
      className="py-[60px] md:py-[96px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
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
            {t.benefitsEyebrow}
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            {t.benefitsHeadline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 md:gap-5 bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderRadius: "12px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-2xl"
                style={{ background: "#FAF3E0" }}
              >
                {b.icon}
              </div>
              <div>
                <h3
                  className="font-heading font-semibold mb-1"
                  style={{ fontSize: "16px", color: "#1A1A1A" }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666666", lineHeight: "1.6" }}>
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
