import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

type UserMeLoaderProps = {
    ok: boolean;
    data: unknown;
    error: unknown | null;
}

/**
 * Service function to fetch the current user's information from the Strapi API.
 *
 * @returns {Promise<object>} - A promise that resolves to an object containing the server response
 */
export const getUserMeLoader = async (): Promise<UserMeLoaderProps> => {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);

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
    console.log(error);
    return { ok: false, data: null, error: error };
  }
};