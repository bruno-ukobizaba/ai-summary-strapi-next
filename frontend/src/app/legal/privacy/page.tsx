import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your information",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: April 3, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy will inform you about how we look
            after your personal data when you visit our website and tell you
            about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. The Data We Collect
          </h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Identity Data includes first name, last name, username or similar
              identifier.
            </li>
            <li className="mb-2">
              Contact Data includes email address and telephone numbers.
            </li>
            <li className="mb-2">
              Technical Data includes internet protocol (IP) address, your login
              data, browser type and version, time zone setting and location,
              browser plug-in types and versions, operating system and platform,
              and other technology on the devices you use to access this
              website.
            </li>
            <li className="mb-2">
              Usage Data includes information about how you use our website,
              products and services.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. How We Use Your Data
          </h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Where we need to perform the contract we are about to enter into
              or have entered into with you.
            </li>
            <li className="mb-2">
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li className="mb-2">
              Where we need to comply with a legal obligation.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed. In addition, we limit access
            to your personal data to those employees, agents, contractors and
            other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Data Retention
          </h2>
          <p className="mb-4">
            We will only retain your personal data for as long as reasonably
            necessary to fulfill the purposes we collected it for, including for
            the purposes of satisfying any legal, regulatory, tax, accounting or
            reporting requirements.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Your Legal Rights
          </h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Request access to your personal data.</li>
            <li className="mb-2">Request correction of your personal data.</li>
            <li className="mb-2">Request erasure of your personal data.</li>
            <li className="mb-2">
              Object to processing of your personal data.
            </li>
            <li className="mb-2">
              Request restriction of processing your personal data.
            </li>
            <li className="mb-2">Request transfer of your personal data.</li>
            <li className="mb-2">Right to withdraw consent.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer by
            websites that you visit. They are widely used in order to make
            websites work, or work more efficiently, as well as to provide
            information to the owners of the site. We use cookies to improve
            your experience on our site and to show you personalized
            advertising.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last updated" date at the top of this privacy
            policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at privacy@example.com.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
