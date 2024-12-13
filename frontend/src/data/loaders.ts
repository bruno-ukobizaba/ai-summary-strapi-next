import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

/**
 * Define the base URL for the Strapi CMS.
 */
const baseUrl = getStrapiURL();

/**
 * A function to fetch data from the Strapi CMS.
 *
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to the fetched data.
 */
const fetchData = async (url: string) => {
  const authToken = process.env.STRAPI_API_TOKEN;
  const headers = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * A function to fetch home page data from the Strapi CMS.
 *
 * @returns A Promise that resolves to the fetched home page data.
 */
export const getHomePageData = async () => {
  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: {
                populate: true,
              },
            },
          },
          "layout.features-section": {
            populate: {
              feature: {
                populate: true,
              },
            },
          },
          // "layout.testimonials-section": {
          //     populate: {
          //         testimonial: {
          //             populate: true,
          //         },
          //     },
          // },
          // "layout.contact-section": {
          //     populate: {
          //         form: {
          //             populate: true,
          //         },
          //     },
          // }
        },
      },
    },
  });

  return await fetchData(url.href);
};

/**
 * A function to fetch global data from the Strapi CMS.
 *
 * @returns A Promise that resolves to the fetched global data.
 */
export const getGlobalData = async () => {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialMediaLinks",
    ],
  });

  return await fetchData(url.href);
};

/**
 * A function to fetch global page metadata from the Strapi CMS.
 *
 * @returns A Promise that resolves to the fetched global page metadata.
 */
export const getGlobalPageMetadata = async () => {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData(url.href);
};
