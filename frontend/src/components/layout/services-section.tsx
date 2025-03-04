import {
  BarChartIcon,
  CodeIcon,
  GlobeIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

const getIcon = (name: string) => {
  switch (name) {
    case "CODE_ICON":
      return <CodeIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "GLOBE_ICON":
      return <GlobeIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "SHIELD_ICON":
      return <ShieldIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "CHART_ICON":
      return <BarChartIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "USERS_ICON":
      return <UsersIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "SETTINGS_ICON":
      return <SettingsIcon className="w-12 h-12 mb-4 text-gray-900" />;
    default:
      return null;
  }
};

interface LinkProps {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
}

interface ServiceProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  link?: LinkProps;
}

interface ServicesSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  services: ServiceProps[];
}

/**
 * A functional component that renders a section displaying a list of services.
 *
 * @param data - An object containing the properties required for the services section,
 *               including the title, description, and an array of service objects.
 * @returns A JSX element representing the services section, displaying each service
 *          with an icon, title, description, and optional link.
 */
export const ServicesSection = ({
  data,
}: {
  readonly data: ServicesSectionProps;
}) => {
  const { title, description, services } = data;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                {getIcon(service.icon)}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.link && (
                  <Link
                    href={service.link.url}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target={service.link.isExternal ? "_blank" : "_self"}
                    rel={service.link.isExternal ? "noopener noreferrer" : ""}>
                    {service.link.text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
