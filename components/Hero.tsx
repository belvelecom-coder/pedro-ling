"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

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
      // top padding = announcement banner (44px) + header (72px) = 116px
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "720px", background: "#FFFFFF", paddingTop: "116px" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[120px] py-8 md:py-[80px]">
        {/* On mobile: image stacks ABOVE text (flex-col, not flex-col-reverse) */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

          {/* Mobile Image — shown first on mobile, hidden on desktop */}
          <motion.div
            className="block md:hidden w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative w-full overflow-hidden shadow-xl"
              style={{ height: "280px", borderRadius: "16px" }}
            >
              <Image
                src="/images/hero/hero-cropped.jpeg"
                alt="Couple dancing at a wedding"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Left: Text */}
          <motion.div
            className="flex-1 w-full md:max-w-[520px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1
              className="font-heading font-semibold text-[#1A1A1A] mb-5 text-balance"
              style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: "1.15" }}
            >
              {t.heroHeadline1}{" "}
              <span style={{ color: "#D4A373" }}>{t.heroHeadlineAccent}</span>
            </h1>

            <p
              className="text-[#666666] mb-7"
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: "1.7",
                maxWidth: "480px",
              }}
            >
              {t.heroSubtitle}
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
                className="text-white font-semibold shadow-lg transition-shadow hover:shadow-xl text-center"
                style={{
                  background: "#E76F51",
                  borderRadius: "10px",
                  padding: "0 28px",
                  height: "52px",
                  fontSize: "15px",
                  minWidth: "200px",
                }}
              >
                {t.heroCTA}
              </motion.button>

              <button
                onClick={scrollToPricing}
                className="font-medium underline underline-offset-4 transition-colors text-center sm:text-left"
                style={{ color: "#D4A373", fontSize: "15px" }}
              >
                {t.heroSeePricing}
              </button>
            </div>

            {/* Micro-copy */}
            <p className="mt-4 text-sm" style={{ color: "#999999" }}>
              {t.heroMicro} <strong style={{ color: "#E76F51" }}>€49</strong> {t.heroLimited}
            </p>
          </motion.div>

          {/* Right: Desktop Image — hidden on mobile */}
          <motion.div
            className="hidden md:flex flex-1 w-full justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div
              className="relative w-full overflow-hidden shadow-2xl"
              style={{ height: "520px", borderRadius: "16px", maxWidth: "600px" }}
            >
              <Image
                src="/images/hero/hero-cropped.jpeg"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
