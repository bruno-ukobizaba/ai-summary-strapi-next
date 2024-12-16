import { FeaturesSection } from "@/components/layout/features-section";
import { HeroSection } from "@/components/layout/hero-section";
import { getHomePageData } from "@/data/loaders";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeaturesSection,
};

/**
 * A function that takes a block and renders the corresponding component
 * based on the block's `__component` property.
 *
 * @param {Object} block - The block to be rendered.
 * @returns {JSX.Element | null} The rendered component, or null if the block
 * component is not found in the `blockComponents` object.
 */
const blockRendered = (block: any) => {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];

  return Component ? <Component key={block.id} data={block} /> : null;
};

/**
 * The root page of the application.
 *
 * This page fetches the home page data from Strapi and renders the blocks
 * contained in the data.
 *
 * @returns {JSX.Element} A JSX element representing the home page.
 */
export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData?.data || [];

  return <main>{blocks.map(blockRendered)}</main>;
}
