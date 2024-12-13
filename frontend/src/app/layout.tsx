import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
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

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "Welcome to Bumtech",
    description: metadata?.data?.description ?? "Created by Bumtech",
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const globalData = await getGlobalData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header data={globalData.data.header} />
        {children}
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
};

export default RootLayout;
