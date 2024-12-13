"use client";
import { BugIcon } from "lucide-react";
import { useEffect } from "react";

/**
 * A functional component that displays an error message page.
 *
 * @param error - An object containing the error details, including an optional digest.
 * @returns A JSX element representing the error page with a message and icon.
 */
export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <BugIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is an error page. Please try again later.
        </p>
        <p className="text-pink-800 italic">{error.message}</p>
      </div>
    </div>
  );
}
