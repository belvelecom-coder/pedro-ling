import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "@/lib/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lisbon First Dance | Wedding Dance Lessons",
  description:
    "Feel confident and look amazing on your first dance — no experience needed. Personalized wedding dance lessons in Lisbon. Beginner-friendly, fast results. Book your first lesson for only €49.",
  keywords:
    "wedding dance lessons, first dance, Lisbon First Dance, ballroom, salsa, bachata, wedding choreography, lisbon, portugal",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Lisbon First Dance | Wedding Dance Lessons",
    description:
      "Your Perfect First Dance Starts Here. Personalized wedding dance lessons — no experience needed.",
    type: "website",
    url: "https://lisbonfirstdance.com",
    siteName: "Lisbon First Dance",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* GA4 — replace GA_MEASUREMENT_ID with your actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Meta Pixel — replace PIXEL_ID with your actual ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
