"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const faqsEn = [
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
  {
    question: "Where are you located?",
    answer:
      "Lessons take place in Lapa at LX Portal Yoga, Rua das Trinas 44, Lisbon ([View on Google Maps](https://maps.google.com/?q=Rua+das+Trinas+44+Lisbon)). We can also arrange home or venue visits for an additional fee.",
  },
];

const faqsPt = [
  {
    question: "Não temos experiência em dança — conseguimos fazer isto?",
    answer:
      "Absolutamente. A grande maioria dos casais que faz aulas de primeira dança são principiantes completos. O Pedro especializa-se em transformar não-dançarinos em casais confiantes e com coreografias polidas. O foco está na ligação e confiança, não na perfeição técnica.",
  },
  {
    question: "Quantas aulas precisamos?",
    answer:
      "Uma primeira dança normalmente requer entre 3 a 10 horas de instrução, dependendo da complexidade desejada. A maioria dos casais consegue uma coreografia bonita e confiante em 5 a 8 aulas.",
  },
  {
    question: "Quando devemos começar?",
    answer:
      "Idealmente 3 a 6 meses antes do casamento. Começar cedo significa menos stress e mais tempo para praticar até os movimentos parecerem naturais.",
  },
  {
    question: "E se estivermos nervosos?",
    answer:
      "É completamente normal — e é exatamente para isso que o Pedro existe. O seu estilo de ensino caloroso e paciente transforma o nervosismo em entusiasmo.",
  },
  {
    question: "Podemos ter aulas em casa ou no local da cerimónia?",
    answer:
      "Sim! O Pedro oferece aulas no estúdio, em casa ou no espaço do evento. Aplica-se uma taxa adicional para visitas domiciliárias ou sessões no local.",
  },
  {
    question: "Em que idiomas estão disponíveis as aulas?",
    answer:
      "O Pedro ensina em inglês, português e espanhol — o que for mais confortável para si.",
  },
  {
    question: "Onde ficam as aulas?",
    answer:
      "As aulas realizam-se em Lapa, no LX Portal Yoga, Rua das Trinas 44, Lisboa ([Ver no Google Maps](https://maps.google.com/?q=Rua+das+Trinas+44+Lisboa)). Também podemos organizar aulas em casa ou no local do evento mediante taxa adicional.",
  },
];

const faqsEs = [
  {
    question: "No tenemos experiencia en baile — ¿podemos hacer esto?",
    answer:
      "Absolutamente. La gran mayoría de las parejas que toman clases de primer baile son principiantes completos. Pedro se especializa en transformar a personas sin experiencia en parejas seguras con coreografías pulidas.",
  },
  {
    question: "¿Cuántas clases necesitamos?",
    answer:
      "Un primer baile generalmente requiere entre 3 y 10 horas de instrucción. La mayoría de las parejas logran una coreografía bonita y segura en 5 a 8 clases.",
  },
  {
    question: "¿Cuándo deberíamos empezar?",
    answer:
      "Idealmente 3 a 6 meses antes de la boda. Empezar pronto significa menos estrés y más tiempo para practicar.",
  },
  {
    question: "¿Y si estamos nerviosos?",
    answer:
      "Es completamente normal. El estilo de enseñanza cálido y paciente de Pedro convierte los nervios en emoción.",
  },
  {
    question: "¿Podemos tener clases en casa o en el lugar de la boda?",
    answer:
      "¡Sí! Pedro ofrece clases en su estudio, en tu casa o en el espacio del evento. Se aplica una tarifa adicional para visitas a domicilio o sesiones en el lugar.",
  },
  {
    question: "¿En qué idiomas están disponibles las clases?",
    answer:
      "Pedro enseña en inglés, portugués y español — el que sea más cómodo para ti.",
  },
  {
    question: "¿Dónde se realizan las clases?",
    answer:
      "Las clases tienen lugar en Lapa, en LX Portal Yoga, Rua das Trinas 44, Lisboa ([Ver en Google Maps](https://maps.google.com/?q=Rua+das+Trinas+44+Lisboa)). También podemos organizar clases en casa o en el lugar del evento con un cargo adicional.",
  },
];

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
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
          style={{ fontSize: "15px", color: "#1A1A1A", fontFamily: "var(--font-inter)" }}
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
              {faq.answer.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, idx) => {
                const mdLink = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
                if (mdLink) {
                  return (
                    <a
                      key={idx}
                      href={mdLink[2]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#D4A373", textDecoration: "underline" }}
                    >
                      {mdLink[1]}
                    </a>
                  );
                }
                return part;
              })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t, language } = useLanguage();
  const faqs = language === "pt" ? faqsPt : language === "es" ? faqsEs : faqsEn;

  return (
    <section
      id="faq"
      className="py-[60px] md:py-[96px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[800px] mx-auto">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
            {t.faqEyebrow}
          </p>
          <h2
            className="font-heading font-semibold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
          >
            {t.faqHeadline}
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
