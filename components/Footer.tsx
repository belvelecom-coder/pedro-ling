"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="py-10 px-4 md:px-[120px] text-center"
      style={{ background: "#1A1A1A", color: "#888888" }}
    >
      <p className="font-heading text-lg mb-1" style={{ color: "#D4A373" }}>
        {t.footerName}
      </p>
      <p className="text-sm mb-4">{t.footerTagline}</p>
      <p className="text-xs" style={{ color: "#555555" }}>
        © {new Date().getFullYear()} {t.footerCopyright}
      </p>
    </footer>
  );
}
