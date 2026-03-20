"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AnnouncementBanner() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const scrollToForm = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { cta_location: "announcement_banner" });
    }
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4"
      style={{
        height: "44px",
        background: "#E76F51",
        color: "#FFFFFF",
        fontSize: "13px",
        fontFamily: "var(--font-inter)",
      }}
    >
      <span className="hidden sm:inline font-medium">{t.announcementText}</span>
      <span className="sm:hidden font-medium">🎉 Intro Offer: First Lesson — €49</span>

      <button
        onClick={scrollToForm}
        className="font-bold underline underline-offset-2 whitespace-nowrap hover:opacity-80 transition-opacity"
        style={{ fontSize: "13px" }}
      >
        {t.announcementCTA}
      </button>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        style={{ fontSize: "18px", lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}
