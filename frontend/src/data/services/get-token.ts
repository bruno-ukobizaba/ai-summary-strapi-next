import { cookies } from "next/headers";

/**
 * Retrieves the authentication token from the Next.js request cookies.
 *
 * @returns {Promise<string | undefined>} - A promise that resolves to the authentication token
 * stored in the "jwt" cookie. If the cookie is not found, the promise resolves to `undefined`.
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("jwt")?.value;
  return authToken;
};