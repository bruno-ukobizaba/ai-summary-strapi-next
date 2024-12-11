import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { GithubIcon, TwitterIcon, YoutubeIcon } from "@/data/icons";

interface SocialLink {
  id: number;
  text: string;
  url: string;
}

interface FooterProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    copyrightText: string;
    socialMediaLinks: SocialLink[];
  };
}

const selectSocialIcon = (url: string) => {
  if (url.includes("youtube")) return <YoutubeIcon className="h-6 w-6" />;
  if (url.includes("twitter")) return <TwitterIcon className="h-6 w-6" />;
  if (url.includes("github")) return <GithubIcon className="h-6 w-6" />;
  return null;
};

export const Footer = ({ data }: Readonly<FooterProps>) => {
  const { logoText, socialMediaLinks, copyrightText } = data;
  return (
    <div className="dark bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <Logo
          dark
          text={logoText.text}
        />
        <p className="mt-4 md:mt-0 text-sm text-gray-300">{copyrightText}</p>
        <div className="flex items-center space-x-4">
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
    </div>
  );
};