/* eslint-disable @typescript-eslint/no-explicit-any */

import { getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = getStrapiURL();

/**
 * Service function to register a new user using the Strapi API.
 *
 * @param {RegisterUserProps} userData - The user data for registration
 * @returns {Promise<any>} - A promise that resolves to the server response
 */
export const registerUserService = async (
  userData: RegisterUserProps
): Promise<any> => {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw error;
  }
};

/**
 * Service function to log in an existing user using the Strapi API.
 *
 * @param {LoginUserProps} userData - The user data for login
 * @returns {Promise<any>} - A promise that resolves to the server response
 */
export const loginUserService = async (
  userData: LoginUserProps
): Promise<any> => {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
};
