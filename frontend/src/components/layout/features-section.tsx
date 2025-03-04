import { CheckIcon, ClockIcon, CloudIcon } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "CLOCK_ICON":
      return <ClockIcon className="w-12 h-12 mb-4 text-blue-600" />;
    case "CHECK_ICON":
      return <CheckIcon className="w-12 h-12 mb-4 text-blue-600" />;
    case "CLOUD_ICON":
      return <CloudIcon className="w-12 h-12 mb-4 text-blue-600" />;
    default:
      return null;
  }
};

interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}

/**
 * A functional component that renders a section displaying a list of features.
 *
 * @param data - An object containing the properties required for the features section,
 *               including the title, description, and an array of feature objects.
 * @returns A JSX element representing the features section, displaying each feature
 *          with an icon, heading, and subheading.
 */
export const FeaturesSection = ({
  data,
}: {
  readonly data: FeatureSectionProps;
}) => {
  const { title, description, feature } = data;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {feature.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 p-3 rounded-full mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.heading}</h3>
                <p className="text-gray-600">{feature.subHeading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
