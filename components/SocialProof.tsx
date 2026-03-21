"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const testimonialsEn = [
  {
    quote: "Pedro is so patient and kind. He provided lots of feedback and encouragement, so we saw progress really fast! Highly recommend!",
    author: "Marie",
    stars: 5,
  },
  {
    quote: "We got so many compliments about our dance! It was so beautiful to have the perfect choreography to our special song. Thank you!",
    author: "Patricia",
    stars: 5,
  },
  {
    quote: "The classes were so much fun! We looked forward to it every week. In the end we felt very confident and excited to dance in front of all our friends and family.",
    author: "Sophia",
    stars: 5,
  },
];

const testimonialsPt = [
  {
    quote: "O Pedro tem muita paciência e simpatia. Deu-nos muito feedback e encorajamento, e evoluímos muito rapidamente! Recomendo muito!",
    author: "Marie",
    stars: 5,
  },
  {
    quote: "Recebemos tantos elogios pela nossa dança! Foi tão bonito ter a coreografia perfeita para a nossa música especial. Obrigada!",
    author: "Patricia",
    stars: 5,
  },
  {
    quote: "As aulas foram tão divertidas! Esperávamos por elas todas as semanas. No final, sentimo-nos muito confiantes e entusiasmados para dançar à frente de todos os nossos amigos e família.",
    author: "Sophia",
    stars: 5,
  },
];


function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#D4A373">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const { t, language } = useLanguage();
  const testimonials = language === "pt" ? testimonialsPt : testimonialsEn;

  // Trust items without "100+ couples"
  const trustItems = [
    { icon: "⭐", label: t.trust5Star },
    { icon: "🌍", label: t.trustLanguages },
    { icon: "🏆", label: t.trustProfessional },
  ];

  return (
    <section
      className="py-[60px] md:py-[80px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
            {t.socialProofEyebrow}
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            {t.socialProofHeadline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t_item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderRadius: "12px" }}
            >
              <StarRating count={t_item.stars} />
              <p
                className="flex-1 mb-5 italic"
                style={{ color: "#444444", fontSize: "15px", lineHeight: "1.7" }}
              >
                "{t_item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                  style={{ background: "#D4A373" }}
                >
                  {t_item.author[0]}
                </div>
                <span className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
                  {t_item.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar — without "100+ couples" */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-12 pt-8 md:pt-10 border-t"
          style={{ borderColor: "#E8D9C0" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium" style={{ color: "#666666" }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
