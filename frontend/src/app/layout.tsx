// Global CSS
import "@/styles/globals.css";

// External Libraries
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Fonts and essentials
import { jetBrainsMono } from "@/lib/fonts";

const product = {
  name: "Start Page",
  image: "/site.png",
  description:
    "Transform your new tab into a minimalist productivity hub. Customize your browser start page with quick links, search shortcuts, and a clean design that keeps you focused.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: product.name,
      template: "%s | Muse",
    },
    description: product.description,
    metadataBase: new URL("https://www.muse.egeuysal.com/"),
    authors: [{ name: "Ege Uysal" }],
    keywords: [
      "browser start page",
      "new tab page",
      "custom start page",
      "productivity homepage",
      "minimalist browser page",
      "customizable new tab",
      "browser homepage",
      "quick links dashboard",
      "personal start page",
      "clean browser interface",
      "productivity tools",
      "bookmark organizer",
      "fast start page",
      "browser productivity",
      "minimal new tab",
      "custom homepage",
      "web dashboard",
      "browser customization",
      "efficient browsing",
      "focus homepage",
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      url: "https://www.start.egeuysal.com/",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: "Start Page Image",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: product.name,
    },
    twitter: {
      card: "summary_large_image",
      site: "@egecreates",
      title: product.name,
      description: product.description,
      images: [product.image],
      creator: "@egecreates",
    },
    icons: {
      icon: [
        { url: "/icon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/icon.ico",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.start.egeuysal.com/",
    },
    applicationName: "Start Page",
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
      "https://www.instagram.com/egecreates",
    ],
  };

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${jetBrainsMono.variable} pb-16`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-screen h-screen flex flex-col items-center mt-12 mb-12">
        <main className="w-[75vw] md:w-[65vw] lg:w-[50vw]">
          <Analytics />
          {children}
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
