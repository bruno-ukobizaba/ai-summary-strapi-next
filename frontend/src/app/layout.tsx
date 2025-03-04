import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Define Google Fonts in local
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Generates metadata for the root layout.
 *
 * The metadata is fetched from the Strapi CMS using the
 * `getGlobalPageMetadata` function. If the metadata is not available,
 * default values are used.
 *
 * @returns The metadata for the root layout.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "Welcome to Bumtech",
    description: metadata?.data?.description ?? "Created by Bumtech",
  };
};

/**
 * The root layout of the application.
 *
 * This component is responsible for rendering the root `html` and `body`
 * elements of the application. It fetches the global data from Strapi and
 * passes it to the `Header` and `Footer` components. If the data is not
 * available, it uses fallback data.
 *
 * @param children - The content of the page.
 * @returns - The root layout of the application.
 */
const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) => {
  // Get the locale from the URL or use the default
  const locale = params?.locale || "en";

  const globalData = await getGlobalData();

  // Fallback data for when Strapi is not available
  const fallbackHeader = {
    logoText: {
      id: 1,
      text: "AI Summary",
      url: `/${locale}`,
    },
    ctaButton: {
      id: 1,
      text: "Sign In",
      url: `/${locale}/signin`,
    },
  };

  const fallbackFooter = {
    logoText: {
      id: 1,
      text: "AI Summary",
      url: `/${locale}`,
    },
    copyrightText: "© 2025 AI Summary. All rights reserved.",
    socialMediaLinks: [
      {
        id: 1,
        text: "Twitter",
        url: "https://twitter.com",
      },
      {
        id: 2,
        text: "GitHub",
        url: "https://github.com",
      },
      {
        id: 3,
        text: "YouTube",
        url: "https://youtube.com",
      },
    ],
  };

  // Use the data from Strapi if available, otherwise use fallback data
  const headerData = globalData?.data?.header || fallbackHeader;

  // Update URLs to include locale
  if (headerData.logoText && headerData.logoText.url === "/") {
    headerData.logoText.url = `/${locale}`;
  }

  if (headerData.ctaButton && headerData.ctaButton.url === "/signin") {
    headerData.ctaButton.url = `/${locale}/signin`;
  }

  const footerData = globalData?.data?.footer || fallbackFooter;

  // Update footer logo URL to include locale
  if (footerData.logoText && footerData.logoText.url === "/") {
    footerData.logoText.url = `/${locale}`;
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="bottom-center" />
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
      </body>
    </html>
  );
};

export default RootLayout;
