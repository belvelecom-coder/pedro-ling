"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "/images/pedro/pedro-2.jpg", alt: "Pedro Ling teaching a couple to dance" },
  { src: "/images/pedro/pedro-3.jpg", alt: "Pedro Ling performing on stage" },
];

export default function AboutPedro() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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
      className="py-[96px] px-5 md:px-[120px]"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: Image Carousel */}
          <motion.div
            className="relative flex-shrink-0 w-full md:w-[480px]"
            style={{ height: "480px" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
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
                    sizes="(max-width: 768px) 100vw, 480px"
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
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === current ? "#D4A373" : "rgba(255,255,255,0.6)",
                    width: i === current ? "20px" : "8px",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex-1 max-w-[520px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
              Meet Your Instructor
            </p>
            <h2
              className="font-heading font-semibold mb-6"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#1A1A1A" }}
            >
              Pedro Ling
            </h2>

            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "20px" }}>
              Pedro Ling is a professional dancer and performer with expertise spanning{" "}
              <strong>Jazz, Ballroom, Latin, Argentine Tango, Salsa, Bachata, and Kizomba</strong>.
            </p>
            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "20px" }}>
              With experience teaching ballroom and social dancing on board{" "}
              <strong>Princess Cruises</strong>, as well as an extensive performance career in
              musical theatre across Europe, Pedro brings both technical excellence and a warm,
              easy-going approach to every lesson.
            </p>
            <p style={{ fontSize: "16px", color: "#444444", lineHeight: "1.8", marginBottom: "32px" }}>
              Whether you're a complete beginner or looking to perfect your first dance, Pedro will
              make sure you feel confident, comfortable, and ready to shine on your wedding day —
              with classes available in{" "}
              <strong style={{ color: "#D4A373" }}>English, Portuguese, and Spanish</strong>.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Jazz", "Ballroom", "Latin", "Tango", "Salsa", "Bachata", "Kizomba"].map((s) => (
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
              className="text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
              style={{
                background: "#E76F51",
                borderRadius: "10px",
                padding: "0 28px",
                height: "56px",
                fontSize: "15px",
                minWidth: "200px",
              }}
            >
              Book a Lesson with Pedro
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
