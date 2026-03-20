import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import AboutPedro from "@/components/AboutPedro";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Benefits />
        <AboutPedro />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
