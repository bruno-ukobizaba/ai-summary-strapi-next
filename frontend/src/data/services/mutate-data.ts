/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "@/data/services/get-token";
import { getStrapiURL } from "@/lib/utils";

/**
 * Performs a mutation on the Strapi API.
 *
 * @param {string} method - The HTTP method to use. e.g. "POST", "PUT", "DELETE"
 * @param {string} path - The path to the Strapi API endpoint.
 * @param {object} [payload] - The payload to send with the request.
 *
 * @returns {Promise<object>} - A promise that resolves to the response data.
 *
 * @throws {Error} - If there is an error making the request, or if the request fails.
 */
export const mutateData = async (
  method: string,
  path: string,
  payload?: any,
) => {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: payload ? JSON.stringify({ ...payload }) : undefined,
    });

    if (method === "DELETE") return response.ok;

    const data = await response?.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
