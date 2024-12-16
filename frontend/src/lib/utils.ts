import { clsx, type ClassValue } from "clsx";
import process from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function retrieves the base URL for a Strapi application.
 * It uses the `NEXT_PUBLIC_STRAPI_URL` environment variable if available,
 * otherwise, it defaults to "http://localhost:1337".
 *
 * @returns {string} - The base URL for the Strapi application.
 */
export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

/**
 * This function takes a URL and returns the full URL for the Strapi Media item.
 * If the URL is null, it returns null.
 * If the URL is a data URL, it returns the URL as is.
 * If the URL is an absolute URL, it returns the URL as is.
 * If the URL is a relative URL, it returns the URL prefixed with the base URL of the Strapi application.
 *
 * @param url - The URL of the Strapi Media item
 * @returns - The full URL of the Strapi Media item
 */
export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

/**
 * Extracts the YouTube video ID from a given URL or ID.
 *
 * If the input is already a valid YouTube video ID, it is returned as is.
 * Otherwise, the function attempts to extract the video ID from the standard YouTube
 * video URL format or the YouTube Shorts URL format.
 *
 * @param urlOrId - A YouTube video URL or a video ID.
 * @returns The extracted YouTube video ID, or null if no valid ID can be extracted.
 */
export const extractYoutubeVideoId = (urlOrId: string): string | null => {
  const regExpId = /^[a-zA-Z0-9_-]{11}$/;
  if (regExpId.test(urlOrId)) return urlOrId;

  // Regular expression for standard YouTube video URLs.
  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

  // Regular expression for YouTube Shorts URLs.
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

  // Check if the input is a standard YouTube video URL.
  const matchStandard = urlOrId.match(regExpStandard);
  if (matchStandard) return matchStandard[1];

  // Check if the input is a YouTube Shorts URL.
  const matchShorts = urlOrId.match(regExpShorts);
  if (matchShorts) return matchShorts[1];

  return null;
};
