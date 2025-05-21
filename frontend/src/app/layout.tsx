// Global CSS
import "@/styles/globals.css";

// External Libraries
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Fonts and essentials
import { jetBrainsMono } from "@/lib/fonts";
import LayoutWrapper from "@/components/LayoutWrapper";

async function getProduct() {
  return {
    name: "Muse: Discover. Create. Inspire. A Minimalist Platform to Capture, Share, and Explore Creative Ideas",
    image: "/og-links.jpg",
    description:
      "Capture and share spontaneous ideas with Muse, a fast and minimal platform where creators collaborate, get inspired, and give their thoughts a home. Get started today!",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data needed for metadata
  const product = await getProduct();

  return {
    title: {
      default: product.name,
      template: "%s | Muse",
    },
    description: product.description,
    metadataBase: new URL("https://www.muse.egeuysal.com/"),
    authors: [{ name: "Ege Uysal" }],
    keywords: [
      "idea sharing platform",
      "collaborative idea app",
      "creative inspiration tool",
      "minimalist idea board",
      "thought sharing app",
      "capture creative thoughts",
      "fast idea capture",
      "inspiration sharing platform",
      "platform for creators",
      "brainstorming and planning tool",
      "mind mapping for creators",
      "digital idea notebook",
      "creative collaboration app",
      "spontaneous idea capture",
      "share and discover ideas",
      "creativity boosting app",
      "minimal notes app",
      "creative journaling app",
      "quick idea logger",
      "real-time idea sharing",
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      url: "https://www.muse.egeuysal.com/",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 640,
          alt: "Astra UI Logo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: product.name,
    },
    twitter: {
      card: "summary_large_image",
      site: "@muse",
      title: product.name,
      description: product.description,
      images: [product.image],
      creator: "@muse",
    },
    icons: {
      icon: [
        { url: "/icon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/icon.ico",
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.muse.egeuysal.com/",
    },
    applicationName: "Muse",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
    other: {
      appleMobileWebAppCapable: "yes",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getProduct();

  // Define date for product schema
  const priceValidUntilDate = new Date();
  priceValidUntilDate.setFullYear(priceValidUntilDate.getFullYear() + 1);
  const priceValidUntilString = priceValidUntilDate.toISOString().split("T")[0];

  // Format current date for schema (ISO format)
  const currentDate = new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://www.muse.egeuysal.com/${product.image}`,
    description: product.description,
    url: "https://www.muse.egeuysal.com/",
    dateModified: currentDate,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.muse.egeuysal.com/",
      priceValidUntil: priceValidUntilString,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: "0",
            maxValue: "0",
            unitCode: "HUR",
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    sameAs: [
      "https://twitter.com/egecreates",
      "https://www.linkedin.com/in/egeuysal",
      "https://www.instagram.com/egeuysalo",
    ],
  };

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-screen h-screen flex-center">
        <main className="w-[50vw]">
          <LayoutWrapper jsonLdData={jsonLd}>
            <Analytics />
            {children}
            <SpeedInsights />
          </LayoutWrapper>
        </main>
      </body>
    </html>
  );
}
