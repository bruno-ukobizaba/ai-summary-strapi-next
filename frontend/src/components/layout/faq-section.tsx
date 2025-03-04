"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  faqs: FaqItem[];
}

/**
 * A functional component that renders a section displaying frequently asked questions.
 *
 * @param data - An object containing the properties required for the FAQ section,
 *               including the title, description, and an array of FAQ items.
 * @returns A JSX element representing the FAQ section.
 */
export const FaqSection = ({ data }: { readonly data: FaqSectionProps }) => {
  const { title, description, faqs } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-gray-500">{description}</p>
          )}
        </div>

        <div className="max-w-3xl mx-auto mt-12 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="py-6">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleFaq(index)}>
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <span className="flex items-center ml-6">
                  {openIndex === index ?
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 prose prose-sm max-w-none text-gray-500">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
