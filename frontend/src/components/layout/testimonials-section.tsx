import { StrapiImage } from "@/components/strapi-image";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string;
  };
}

interface TestimonialsSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
}

/**
 * A functional component that renders a section displaying customer testimonials.
 *
 * @param data - An object containing the properties required for the testimonials section,
 *               including the title, description, and an array of testimonial objects.
 * @returns A JSX element representing the testimonials section.
 */
export const TestimonialsSection = ({
  data,
}: {
  readonly data: TestimonialsSectionProps;
}) => {
  const { title, description, testimonials } = data;

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-gray-500">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col h-full p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {testimonial.avatar ?
                  <StrapiImage
                    alt={testimonial.avatar.alternativeText || testimonial.name}
                    className="object-cover w-12 h-12 rounded-full"
                    height={48}
                    src={testimonial.avatar.url}
                    width={48}
                  />
                : <div className="flex items-center justify-center w-12 h-12 text-white bg-gray-400 rounded-full">
                    {testimonial.name.charAt(0)}
                  </div>
                }
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h3>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ?
                        "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="flex-grow text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
