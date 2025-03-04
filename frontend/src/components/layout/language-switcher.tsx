"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
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
      router.push(newPath);
    } else {
      const newPath = `/${newLocale}${path}`;
      console.log("Navigating to:", newPath);
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Language:</span>
      <select
        onChange={handleChange}
        className="bg-transparent border-none focus:ring-0"
        value={locale}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
