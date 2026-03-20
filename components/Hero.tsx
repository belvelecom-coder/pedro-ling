"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const trackClick = (label: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { cta_location: label });
    }
  };

  const scrollToForm = () => {
    trackClick("hero_primary");
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPricing = () => {
    trackClick("hero_secondary");
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center pt-[72px] overflow-hidden"
      style={{ minHeight: "720px", background: "#FFFFFF" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[120px] py-[60px] md:py-[80px]">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* Left: Text */}
          <motion.div
            className="flex-1 md:max-w-[520px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Trust badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "#FAF3E0", color: "#D4A373" }}
            >
              <span>⭐⭐⭐⭐⭐</span>
              <span>5-Star Rated · 100+ Couples</span>
            </div>

            <h1
              className="font-heading font-semibold text-[#1A1A1A] mb-6 text-balance"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: "1.15" }}
            >
              Your Perfect First Dance{" "}
              <span style={{ color: "#D4A373" }}>Starts Here</span>
            </h1>

            <p
              className="text-[#666666] mb-8"
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                lineHeight: "1.7",
                maxWidth: "480px",
              }}
            >
              No experience needed. Personalized wedding dance lessons in just a
              few sessions — available in English, Portuguese, or Spanish.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
                className="text-white font-semibold shadow-lg transition-shadow hover:shadow-xl"
                style={{
                  background: "#E76F51",
                  borderRadius: "10px",
                  padding: "0 28px",
                  height: "56px",
                  fontSize: "16px",
                  minWidth: "220px",
                }}
              >
                Book Your First Lesson
              </motion.button>

              <button
                onClick={scrollToPricing}
                className="font-medium underline underline-offset-4 transition-colors"
                style={{ color: "#D4A373", fontSize: "15px" }}
              >
                See Pricing →
              </button>
            </div>

            {/* Micro-copy */}
            <p className="mt-4 text-sm" style={{ color: "#999999" }}>
              Intro offer: first private lesson only <strong style={{ color: "#E76F51" }}>€49</strong> · Limited spots available
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            {/* Desktop Image */}
            <div
              className="hidden md:block relative w-full overflow-hidden shadow-2xl"
              style={{ height: "520px", borderRadius: "16px", maxWidth: "600px" }}
            >
              <Image
                src="/images/hero/desktop-hero.png"
                alt="Couple dancing elegantly at a wedding"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,163,115,0.08) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Mobile Image */}
            <div
              className="block md:hidden relative w-full overflow-hidden shadow-xl"
              style={{ height: "320px", borderRadius: "16px" }}
            >
              <Image
                src="/images/hero/mobile-hero.png"
                alt="Couple dancing at a wedding"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
