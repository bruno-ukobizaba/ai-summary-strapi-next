import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "fr"] as const;
export const localePrefix = "always"; // Show locales in URL always

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
