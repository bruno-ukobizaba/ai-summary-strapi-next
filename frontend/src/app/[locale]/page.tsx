import { FaqSection } from "@/components/layout/faq-section";
import { FeaturesSection } from "@/components/layout/features-section";
import { HeroSection } from "@/components/layout/hero-section";
import { TestimonialsSection } from "@/components/layout/testimonials-section";
import { getGlobalPageMetadata, getHomePageData } from "@/data/loaders";
import { Metadata } from "next";

/**
 * Generates metadata for the home page.
 *
 * The metadata is fetched from the Strapi CMS using the
 * `getGlobalPageMetadata` function. If the metadata is not available,
 * default values are used.
 *
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "Welcome to Bumtech",
    description: metadata?.data?.description ?? "Created by Bumtech",
  };
};

/**
 * The home page of the application.
 *
 * This component is responsible for rendering the home page of the application.
 * It fetches the home page data from Strapi and renders the different sections
 * of the page.
 *
 * @returns The home page of the application.
 */
export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Load translations for the current locale
  let translations;
  try {
    translations = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for locale: ${locale}`, error);
    translations = (await import(`../../../locales/en.json`)).default;
  }

  const homePageData = await getHomePageData();

  // If there's no data, return null
  if (!homePageData?.data?.blocks) {
    return null;
  }

  // Extract the blocks from the data
  const { blocks } = homePageData.data;

  return (
    <main>
      {blocks.map((block: any) => {
        // Render the appropriate section based on the __component property
        switch (block.__component) {
          case "layout.hero-section":
            return (
              <HeroSection
                key={block.id}
                data={block}
              />
            );
          case "layout.features-section":
            return (
              <FeaturesSection
                key={block.id}
                data={block}
              />
            );
          case "layout.testimonials-section":
            return (
              <TestimonialsSection
                key={block.id}
                data={block}
              />
            );
          case "layout.faq-section":
            return (
              <FaqSection
                key={block.id}
                data={block}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
