import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

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
 * Middleware function to handle authentication and authorization for protected routes.
 *
 * @param {NextRequest} request - The incoming Next.js request
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response
 */
export const middleware = async (request: NextRequest) => {
  // Fetch the current user data
  const user = await getUserMeLoader();

  // Extract the current path from the request URL
  const currentPath = request.nextUrl.pathname;

  // Check if the current path is a protected route and the user is not authenticated
  if (isProtectedRoute(currentPath) && user.ok === false) {
    // Redirect the user to the sign-in page
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If the user is authenticated or the current path is not a protected route, continue to the next middleware or route handler
  return NextResponse.next();
};

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};