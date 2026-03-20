"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const images = [
  { src: "/images/pedro/pedro-4.JPG", alt: "Pedro Ling performing at a dance competition" },
  { src: "/images/pedro/pedro-2.jpg", alt: "Pedro Ling teaching a couple to dance" },
  { src: "/images/pedro/pedro-3.jpg", alt: "Pedro Ling performing on stage" },
];

export default function AboutPedro() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { t } = useLanguage();

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => go((current - 1 + images.length) % images.length);
  const next = () => go((current + 1) % images.length);

  const scrollToForm = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { cta_location: "about_pedro" });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="py-[60px] md:py-[96px] px-4 sm:px-6 md:px-[120px]"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left: Image Carousel — full width on mobile */}
          <motion.div
            className="relative w-full md:flex-shrink-0 md:w-[400px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/5" }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[current].src}
                    alt={images[current].alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    background: i === current ? "#D4A373" : "rgba(255,255,255,0.6)",
                    width: i === current ? "20px" : "8px",
                    height: "8px",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex-1 w-full md:max-w-[520px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
              {t.aboutEyebrow}
            </p>
            <h2
              className="font-heading font-semibold mb-6"
              style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1A1A1A" }}
            >
              {t.aboutHeadline}
            </h2>

            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "20px" }}>
              {t.aboutP1.split("Jazz, Ballroom, Latin, Argentine Tango, Salsa, Bachata, and Kizomba")[0]}
              <strong>Jazz, Ballroom, Latin, Argentine Tango, Salsa, Bachata, and Kizomba</strong>
              {t.aboutP1.split("Jazz, Ballroom, Latin, Argentine Tango, Salsa, Bachata, and Kizomba")[1]}
            </p>
            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "20px" }}>
              {t.aboutP2.split("Princess Cruises")[0]}
              <strong>Princess Cruises</strong>
              {t.aboutP2.split("Princess Cruises")[1]}
            </p>
            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "32px" }}>
              {t.aboutP3}{" "}
              <strong style={{ color: "#D4A373" }}>{t.aboutP3Lang}</strong>.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Ballroom", "Latin", "Tango", "Salsa", "Bachata", "Kizomba", "Jazz"].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "#FAF3E0", color: "#D4A373", border: "1px solid #D4A373" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToForm}
              className="text-white font-semibold shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
              style={{
                background: "#E76F51",
                borderRadius: "10px",
                padding: "0 28px",
                height: "52px",
                fontSize: "15px",
                minWidth: "200px",
              }}
            >
              {t.aboutCTA}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
