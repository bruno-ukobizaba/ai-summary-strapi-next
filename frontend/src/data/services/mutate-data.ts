/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "@/data/services/get-token";
import { getStrapiURL } from "@/lib/utils";

/**
 * Makes a network request to the Strapi API with the specified HTTP method, path, and optional payload.
 *
 * @param method - The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE").
 * @param path - The API endpoint path to which the request should be made.
 * @param payload - Optional data to be sent with the request. This will be stringified to JSON if provided.
 *
 * @returns A promise that resolves to the response data from the API. For DELETE requests, it resolves to a boolean indicating the success status of the request.
 *
 * @throws Will throw an error if the authentication token is not found or if the network request fails.
 */
export const mutateData = async (
  method: string,
  path: string,
  payload?: any
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
