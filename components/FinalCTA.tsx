"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section
      id="lead-form"
      className="py-[96px] px-5 md:px-[120px]"
      style={{ background: "#FAF3E0" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* Left: Copy */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#D4A373" }}>
              Get Started Today
            </p>
            <h2
              className="font-heading font-semibold mb-6 text-balance"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#1A1A1A", maxWidth: "520px" }}
            >
              Ready to Feel Confident on Your Wedding Day?
            </h2>
            <p className="mb-8" style={{ fontSize: "17px", color: "#555555", lineHeight: "1.75", maxWidth: "480px" }}>
              Book your first lesson today and take the first step toward a dance you and your
              guests will never forget.
            </p>

            {/* Risk reducers */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                "💰 Intro offer: first private lesson only €49",
                "📅 Flexible scheduling — evenings & weekends",
                "🌍 Available in English, Portuguese & Spanish",
                "✅ No experience needed whatsoever",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "#444444" }}>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Social proof snippet */}
            <div
              className="rounded-xl p-5"
              style={{ background: "white", border: "1px solid #E8D9C0", maxWidth: "400px" }}
            >
              <div className="flex gap-1 mb-2">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} style={{ color: "#D4A373", fontSize: "14px" }}>{s}</span>
                ))}
              </div>
              <p className="italic text-sm mb-2" style={{ color: "#555555", lineHeight: "1.6" }}>
                "The classes were so much fun! We felt very confident and excited to dance in front
                of all our friends and family."
              </p>
              <span className="text-xs font-semibold" style={{ color: "#D4A373" }}>— Sophia</span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="w-full lg:w-[400px] flex-shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
              style={{ borderRadius: "16px" }}
            >
              <h3
                className="font-heading font-semibold mb-2"
                style={{ fontSize: "22px", color: "#1A1A1A" }}
              >
                Claim Your €49 Intro Lesson
              </h3>
              <p className="text-sm mb-6" style={{ color: "#888888" }}>
                Fill in your details and Pedro will be in touch within 24 hours.
              </p>
              <LeadForm variant="inline" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
