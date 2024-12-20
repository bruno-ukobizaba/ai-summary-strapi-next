import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { getAuthToken } from "./services/get-token";

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
  const authToken = await getAuthToken();
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
 * Fetches global page metadata from the API.
 *
 * @returns {Promise<GlobalMetadata>} A promise that resolves to the global page metadata
 * containing title and description fields.
 *
 * @throws {Error} If the network request fails or returns invalid data.
 *
 * @example
 * const metadata = await getGlobalPageMetadata();
 * console.log(metadata.title); // Logs the global page title
 */
export const getGlobalPageMetadata = async () => {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData(url.href);
};

/**
 * Fetches paginated summaries from the API with optional search filtering
 * @param queryString - The search term to filter summaries by title or content
 * @param currentPage - The current page number for pagination
 * @returns Promise containing the paginated and filtered summaries data
 * @remarks
 * - Uses a page size of 4 items per request
 * - Sorts results by creation date in descending order
 * - Filters match case-insensitive substrings in title or summary fields
 */
export const getSummaries = async (
  queryString: string,
  currentPage: number
) => {
  const PAGE_SIZE = 4;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { summary: { $containsi: queryString } },
      ],
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });
  const url = new URL("/api/summaries", baseUrl);
  url.search = query;
  return fetchData(url.href);
};

/**
 * Retrieves a summary by its unique identifier
 * @param summaryId - The unique identifier of the summary to fetch
 * @returns Promise that resolves to the summary data
 * @throws {Error} If the fetch request fails
 */
export const getSummaryById = async (summaryId: string): Promise<any> => {
  return fetchData(`${baseUrl}/api/summaries/${summaryId}`);
};
