"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: "🕺",
    title: "No Dance Experience Required",
    body: "We specialize in complete beginners. Most of our couples have never danced before — and they shine on their wedding day.",
  },
  {
    icon: "🎵",
    title: "Customized to Your Song & Style",
    body: "Your choreography is built around your music and personality. No cookie-cutter routines.",
  },
  {
    icon: "📆",
    title: "Simple, Flexible Scheduling",
    body: "Book lessons around your busy wedding prep. Evening, weekend, and on-location sessions available.",
  },
  {
    icon: "⚡",
    title: "Fast Progress in Just a Few Lessons",
    body: "Most couples feel confident after 3–5 sessions. Pedro's structured approach makes learning efficient and fun.",
  },
  {
    icon: "🌍",
    title: "Lessons in EN · PT · ES",
    body: "Feel comfortable in the language you know best — English, Portuguese, or Spanish.",
  },
  {
    icon: "❤️",
    title: "Fun, Stress-Free Experience",
    body: "Wedding planning is stressful enough. Pedro's warm, patient style makes dance lessons the highlight of your week.",
  },
];

export default function Benefits() {
  return (
    <section
      className="py-[96px] px-5 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
            Why Pedro Ling
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            Everything You Need to Shine
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-5 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderRadius: "12px", minHeight: "120px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-2xl"
                style={{ background: "#FAF3E0" }}
              >
                {b.icon}
              </div>
              <div>
                <h3
                  className="font-heading font-semibold mb-1"
                  style={{ fontSize: "17px", color: "#1A1A1A" }}
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
