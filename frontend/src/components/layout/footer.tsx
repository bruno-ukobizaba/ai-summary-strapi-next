import { Logo } from "@/components/layout/logo";
import { GithubIcon, TwitterIcon, YoutubeIcon } from "@/data/icons";
import Link from "next/link";

interface LinkProps {
  id: number;
  text: string;
  url: string;
  isExternal?: boolean;
}

interface FooterProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    copyrightText: string;
    socialMediaLinks: LinkProps[];
    legalLinks?: LinkProps[];
  };
}

/**
 * Given a URL, returns the corresponding social media icon component
 * @param url the URL to check
 * @returns the corresponding social media icon component, or null if none
 */
const selectSocialIcon = (url: string) => {
  if (url.includes("youtube")) return <YoutubeIcon className="h-6 w-6" />;
  if (url.includes("twitter")) return <TwitterIcon className="h-6 w-6" />;
  if (url.includes("github")) return <GithubIcon className="h-6 w-6" />;
  return null;
};

/**
 * A functional component representing the footer of the application.
 *
 * @param data - The data required to render the footer.
 * @returns - A JSX element representing the footer.
 */
export const Footer = ({ data }: Readonly<FooterProps>) => {
  const { logoText, socialMediaLinks, copyrightText, legalLinks } = data;
  return (
    <div className="dark bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <Logo
            dark
            text={logoText.text}
          />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {socialMediaLinks.map((link) => {
              return (
                <Link
                  className="text-white hover:text-gray-300"
                  href={link.url}
                  key={link.id}>
                  {selectSocialIcon(link.url)}
                  <span className="sr-only">Visit us at {link.text}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {legalLinks && legalLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {legalLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-sm text-gray-400 hover:text-white"
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : ""}>
                {link.text}
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-300">{copyrightText}</p>
        </div>
      </div>
    </div>
  );
};
