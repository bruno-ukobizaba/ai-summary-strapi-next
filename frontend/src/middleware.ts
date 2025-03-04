import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "../navigation";

// Define an array of protected routes
const protectedRoutes = [
  "/dashboard",
  // Add more protected routes here
];

// Helper function to check if a path is protected
const isProtectedRoute = (path: string): boolean => {
  return protectedRoutes.some((route) => path.startsWith(route));
};

/**
 * Auth middleware function that handles authentication for protected routes.
 * It checks if the user is authenticated for protected routes and redirects
 * to the sign-in page if not.
 *
 * This middleware is applied after the locale middleware in the root middleware.ts file.
 *
 * @param request - The NextRequest object.
 * @returns NextResponse - The NextResponse object or undefined to continue.
 */
export async function authMiddleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // Extract the locale from the pathname
  const pathnameWithoutLocale = pathname.replace(/^\/[^\/]+/, "");

  // Check if the route is protected
  if (isProtectedRoute(pathnameWithoutLocale)) {
    const user = await getUserMeLoader();

    // If the user is not authenticated, redirect to the sign-in page
    if (user.ok === false) {
      // Get the current locale from the pathname or use the default
      const locale =
        locales.find(
          (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        ) || "en";

      // Create the sign-in URL with the correct locale prefix
      const signInUrl = new URL(`/${locale}/signin`, request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Export a default middleware function to satisfy Next.js requirements
export default async function middleware(request: NextRequest) {
  // This middleware is not directly used by Next.js anymore.
  // The functionality has been moved to the root middleware.ts file.
  // But we need to export a middleware function to satisfy Next.js requirements.
  return NextResponse.next();
}
