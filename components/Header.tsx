"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      style={{ height: "72px" }}
    >
      <div className="flex items-center justify-between h-full px-5 md:px-[120px]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="text-xl md:text-2xl font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-playfair)", color: "#D4A373" }}
          >
            Pedro Ling
          </span>
          <span
            className="hidden md:block text-sm text-[#666666] font-body"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Wedding Dance
          </span>
        </div>

        {/* Desktop CTA */}
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
              Book First Lesson – €49
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile CTA always visible */}
        <button
          onClick={handleCTAClick}
          className="md:hidden text-white font-semibold rounded-lg px-4 py-2 text-sm"
          style={{ background: "#E76F51", borderRadius: "8px" }}
        >
          Book – €49
        </button>
      </div>
    </header>
  );
}
