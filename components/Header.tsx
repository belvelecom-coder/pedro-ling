"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import type { Language } from "@/lib/LanguageContext";

const LANG_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { cta_location: "header" });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      style={{ top: "44px", height: "72px" }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-[120px]">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-base sm:text-xl md:text-2xl font-semibold tracking-wide truncate"
            style={{ fontFamily: "var(--font-playfair)", color: "#D4A373" }}
          >
            {t.logoName}
          </span>
        </div>

        {/* Right side: Language switcher + CTA */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className="px-2 py-1 rounded text-xs font-semibold transition-colors"
                style={{
                  background: language === opt.code ? "#D4A373" : "transparent",
                  color: language === opt.code ? "#fff" : "#888888",
                }}
                aria-label={`Switch to ${opt.label}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA (appears on scroll) */}
          <AnimatePresence>
            {scrolled && (
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={handleCTAClick}
                className="hidden md:flex items-center gap-2 text-white font-semibold rounded-lg px-5 py-3 text-sm transition-transform hover:scale-105 active:scale-95"
                style={{
                  width: "220px",
                  height: "48px",
                  background: "#E76F51",
                  borderRadius: "8px",
                  justifyContent: "center",
                }}
              >
                {t.headerCTA}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile CTA always visible */}
          <button
            onClick={handleCTAClick}
            className="md:hidden text-white font-semibold rounded-lg px-3 py-2 text-xs whitespace-nowrap"
            style={{ background: "#E76F51", borderRadius: "8px" }}
          >
            {t.headerCTAShort}
          </button>
        </div>
      </div>
    </header>
  );
}
