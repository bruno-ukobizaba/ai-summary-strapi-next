import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
 * Redirects users to the sign-in page if they are not authenticated and
 * try to access a protected route.
 *
 * @param request - The NextRequest object.
 * @returns NextResponse - The NextResponse object.
 */
export const middleware = async (request: NextRequest) => {
  const user = await getUserMeLoader();

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

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
