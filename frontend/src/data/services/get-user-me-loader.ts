/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { getAuthToken } from "./get-token";

/**
 * The type definition for the return value of getUserMeLoader.
 */
type UserMeLoaderProps = {
  ok: boolean;
  data: any;
  error: any;
};

/**
 * Fetches the current user's data from Strapi.
 *
 * @returns An object with three properties: `ok` (a boolean indicating
 *          whether the request was successful), `data` (the user's data, or
 *          null if the request failed), and `error` (an error message, or
 *          null if the request succeeded).
 */
export const getUserMeLoader = async (): Promise<UserMeLoaderProps> => {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);

  url.search = qs.stringify({
    populate: "*",
  });

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();

    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error("Error fetching user's data:", error);

    return { ok: false, data: null, error: error };
  }
};
