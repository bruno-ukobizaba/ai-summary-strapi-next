/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  loginUserService,
  registerUserService,
} from "@/data/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const registerSchema = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 30 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8).max(100, {
    message: "Password must be between 8 and 100 characters",
  }),
});

/**
 * Server-side action function to handle user registration.
 *
 * @param prevState - The previous state of the application
 * @param formData - The form data containing user registration details
 * @returns A promise that resolves to an object containing the updated state,
 *          data, error messages, and a success message. If any error occurs
 *          during the process, the corresponding error message will be
 *          included in the returned object.
 */
export const registerUserAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  // Validate the form data using Zod schema
  const validatedFields = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Handle validation errors
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing fields. Failed to register user.",
    };
  }

  // Make a request to the server to register the user
  const responseData = await registerUserService(validatedFields.data);

  // Handle server errors
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  // Handle registration errors
  if (
    responseData &&
    typeof responseData === "object" &&
    "error" in responseData
  ) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to register user.",
    };
  }

  // Set the JWT cookie and redirect the user to the dashboard
  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt as string, config);

  redirect("/dashboard");
};

const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Username or email must be between 3 and 30 characters",
    })
    .max(20, {
      message: "Username or email must be between 3 and 20 characters",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be between 8 and 100 characters",
    })
    .max(100, {
      message: "Password must be between 8 and 100 characters",
    }),
});

/**
 * Server-side action function to handle user login.
 *
 * @param {any} prevState - The previous state of the application
 * @param {FormData} formData - The form data containing user login details
 * @returns {Promise<any>} - A promise that resolves to an object containing the updated state and relevant messages
 */
export const loginUserAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  // Validate the form data using Zod schema
  const validatedFields = loginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  // Handle validation errors
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing fields. Failed to log in.",
    };
  }

  // Make a request to the server to log in the user
  const responseData = await loginUserService(validatedFields.data);

  // Handle server errors
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  // Handle server errors
  if (
    responseData &&
    typeof responseData === "object" &&
    "error" in responseData
  ) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to log in.",
    };
  }

  // Set the JWT cookie and redirect the user to the dashboard
  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt as string, config);

  redirect("/dashboard");
};

/**
 * Server-side action function to handle user logout.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is logged out
 */
export const logoutUserAction = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });

  redirect("/");
};
