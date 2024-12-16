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
 * passes it to the `Header` and `Footer` components.
 *
 * @param children - The content of the page.
 * @returns - The root layout of the application.
 */
const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const globalData = await getGlobalData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="bottom-center" />
        <Header data={globalData.data.header} />
        {children}
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
};

export default RootLayout;
