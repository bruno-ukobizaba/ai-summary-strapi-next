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
