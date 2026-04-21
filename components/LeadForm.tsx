"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

type FormState = "idle" | "loading" | "success" | "error";

export default function LeadForm({ variant = "inline" }: { variant?: "inline" | "floating" }) {
  const [formState, setFormState] = useState<FormState>("idle");
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    weddingDate: "",
    phone: "",
    preferredLanguage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_submission", { form_location: variant });
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    try {
      // Convert YYYY-MM-DD → DD/MM/YYYY for the notification email
      const [y, m, d] = form.weddingDate.split("-");
      const formattedDate = y && m && d ? `${d}/${m}/${y}` : form.weddingDate;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, weddingDate: formattedDate }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setFormState("success");
      setForm({ name: "", email: "", weddingDate: "", phone: "", preferredLanguage: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full px-4 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition-shadow";
  const inputStyle = {
    height: "48px",
    borderRadius: "8px",
    borderColor: "#E8D9C0",
    color: "#1A1A1A",
    fontSize: "14px",
  };

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-6"
      >
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: "#1A1A1A" }}>
          {t.formSuccessTitle}
        </h3>
        <p style={{ color: "#666666", fontSize: "15px" }}>
          {t.formSuccessBody}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "#666666" }}>
          {t.formNameLabel}
        </label>
        <input
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t.formNamePlaceholder}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "#666666" }}>
          {t.formEmailLabel}
        </label>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t.formEmailPlaceholder}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "#666666" }}>
          {t.formWeddingDateLabel}
        </label>
        <input
          required
          type="date"
          name="weddingDate"
          value={form.weddingDate}
          onChange={handleChange}
          className={inputClass}
          style={{ ...inputStyle, colorScheme: "light" }}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "#666666" }}>
          {t.formPhoneLabel}
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t.formPhonePlaceholder}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "#666666" }}>
          {t.formLanguageLabel}
        </label>
        <select
          name="preferredLanguage"
          value={form.preferredLanguage}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">{t.formLanguagePlaceholder}</option>
          <option value="English">{t.formLanguageEnglish}</option>
          <option value="Portuguese">{t.formLanguagePortuguese}</option>
          <option value="Spanish">{t.formLanguageSpanish}</option>
        </select>
      </div>

      {formState === "error" && (
        <p className="text-sm text-red-500">{t.formError}</p>
      )}

      <motion.button
        type="submit"
        disabled={formState === "loading"}
        whileHover={{ scale: formState === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full font-semibold text-white transition-opacity"
        style={{
          height: "52px",
          borderRadius: "10px",
          background: formState === "loading" ? "#CCAA88" : "#E76F51",
          fontSize: "15px",
          cursor: formState === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {formState === "loading" ? t.formSending : t.formSubmit}
      </motion.button>

      <p className="text-center text-xs" style={{ color: "#AAAAAA" }}>
        {t.formDisclaimer}
      </p>
    </form>
  );
}
