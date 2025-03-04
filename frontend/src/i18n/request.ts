import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  // Get the locale from the X-NEXT-INTL-LOCALE header
  const headersList = await headers();
  const locale = headersList.get("X-NEXT-INTL-LOCALE");

  // Default to 'en' if locale is undefined
  const safeLocale = locale || "en";

  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../locales/${safeLocale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${safeLocale}`, error);
    messages = (await import(`../../locales/en.json`)).default;
  }

  return {
    messages,
    // You can add other configuration options here if needed
    // timeZone: 'Europe/Paris',
    // now: new Date(),
  };
});
