import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

/**
 * A functional component that renders an image fetched from a Strapi CMS.
 *
 * @param props - The properties for the StrapiImage component.
 * @returns A JSX.Element or null, depending on the conditions within the function body.
 */
export const StrapiImage = ({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) => {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
};
