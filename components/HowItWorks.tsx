"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: "📅",
    title: "Book a Consultation",
    body: "Schedule a free 15-minute call so Pedro can understand your vision, song choice, and timeline.",
  },
  {
    number: "02",
    icon: "💃",
    title: "Learn Your Personalized Routine",
    body: "Work through a choreography tailored to you and your song — at your own pace, in English, Portuguese, or Spanish.",
  },
  {
    number: "03",
    icon: "✨",
    title: "Dance Confidently on Your Big Day",
    body: "Walk onto the dance floor feeling relaxed, prepared, and ready to create a moment you'll never forget.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-[96px] px-5 md:px-[120px]"
      style={{ background: "#FFFFFF" }}
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
            Simple Process
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            How It Works
          </h2>
          <p className="mt-4 text-[#666666] max-w-xl mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Three easy steps from nervous beginner to confident dancer.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-[40px]">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              style={{ maxWidth: "280px", width: "100%" }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Icon circle */}
              <div
                className="w-[72px] h-[72px] flex items-center justify-center rounded-full mb-5 text-3xl shadow-sm"
                style={{ background: "#FAF3E0", border: "2px solid #D4A373" }}
              >
                {step.icon}
              </div>

              {/* Step number */}
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
