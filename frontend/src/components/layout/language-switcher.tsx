"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  // Get the current locale from the URL
  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    if (
      pathParts.length > 1 &&
      (pathParts[1] === "en" || pathParts[1] === "fr")
    ) {
      setLocale(pathParts[1]);
    }
  }, []);

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return; // Don't do anything if the locale is the same

    console.log("Language changed to:", newLocale);

    const path = window.location.pathname;
    const pathParts = path.split("/");

    // Replace the locale part of the URL
    if (
      pathParts.length > 1 &&
      (pathParts[1] === "en" || pathParts[1] === "fr")
    ) {
      pathParts[1] = newLocale;
      const newPath = pathParts.join("/");
      console.log("Navigating to:", newPath);
      window.location.href = newPath; // Use direct navigation instead of router
    } else {
      const newPath = `/${newLocale}${path}`;
      console.log("Navigating to:", newPath);
      window.location.href = newPath; // Use direct navigation instead of router
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Language:</span>
      <div className="flex gap-2">
        <button
          onClick={() => switchLanguage("en")}
          className={`px-2 py-1 text-sm rounded ${
            locale === "en" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}>
          English
        </button>
        <button
          onClick={() => switchLanguage("fr")}
          className={`px-2 py-1 text-sm rounded ${
            locale === "fr" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}>
          Français
        </button>
      </div>
    </div>
  );
}
