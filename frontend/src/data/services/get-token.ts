import { cookies } from "next/headers";

/**
 * Retrieves the authentication token from the cookies.
 *
 * @returns A promise that resolves to the authentication token, or undefined if not found.
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("jwt")?.value;
  return authToken;
};
