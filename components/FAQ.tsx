"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "We have zero dance experience — can we still do this?",
    answer:
      "Absolutely. The overwhelming majority of couples who take first dance lessons are complete beginners — many claim to have 'two left feet.' Pedro specializes in taking non-dancers and building confident, polished routines. Focus is on connection and confidence, not technical perfection. Simple moves with good posture and chemistry create a far more memorable dance than a complex routine.",
  },
  {
    question: "How many lessons do we need?",
    answer:
      "A first dance typically takes around 3–10 hours of instruction, depending on the complexity you want. We recommend lessons 1–2 weeks apart to allow practice time between sessions. Most couples achieve a beautiful, confident routine in 5–8 lessons. Plan to have your final lesson at least 3 weeks before the wedding.",
  },
  {
    question: "When should we start?",
    answer:
      "Ideally 3–6 months before your wedding. Starting early means less stress and more time to practice until the moves feel natural. 6 months is best for intricate choreography or if you have no dance experience. 3–4 months works well for a standard, comfortable routine. Even 6–8 weeks is enough for a beautiful, simpler dance.",
  },
  {
    question: "What if we're nervous?",
    answer:
      "Completely normal — and exactly what Pedro is here for. His warm, patient teaching style turns nerves into excitement. By your wedding day, most couples can't wait to get on the dance floor. Private lessons mean you learn at your own pace, with zero pressure or judgment.",
  },
  {
    question: "Can we do lessons at our home or wedding venue?",
    answer:
      "Yes! Pedro offers lessons at his studio, at your home, or at your event space. An additional fee applies for home visits or on-location sessions — contact us for details.",
  },
  {
    question: "What languages are lessons available in?",
    answer:
      "Pedro teaches in English, Portuguese, and Spanish — whichever you're most comfortable with.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b"
      style={{ borderColor: "#F0E8D8" }}
    >
      <button
        className="w-full flex items-center justify-between text-left py-5 gap-4 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="font-semibold"
          style={{ fontSize: "16px", color: "#1A1A1A", fontFamily: "var(--font-inter)" }}
        >
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: open ? "#E76F51" : "#FAF3E0",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke={open ? "#fff" : "#D4A373"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-5"
              style={{ fontSize: "15px", color: "#666666", lineHeight: "1.75" }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-[96px] px-5 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[800px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
            FAQ
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            Common Questions
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
