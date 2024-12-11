import { FeaturesSection } from "@/components/layout/features-section";
import { HeroSection } from "@/components/layout/hero-section";
import { getHomePageData } from "@/data/loaders";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeaturesSection,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockRendered = (block: any) => {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];

  return Component ? (
    <Component
      key={block.id}
      data={block}
    />
  ) : null;
};

export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData?.data || [];

  return <main>{blocks.map(blockRendered)}</main>;
}
