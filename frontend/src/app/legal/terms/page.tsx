import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our platform",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: April 3, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to our platform. These Terms of Service govern your use of
            our website, services, and applications (collectively, the
            "Service"). By accessing or using the Service, you agree to be bound
            by these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide accurate,
            complete, and current information. You are responsible for
            safeguarding the password and for all activities that occur under
            your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content</h2>
          <p className="mb-4">
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material. You are responsible for the content that you post to the
            Service, including its legality, reliability, and appropriateness.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Prohibited Uses
          </h2>
          <p className="mb-4">
            You may use our Service only for lawful purposes and in accordance
            with these Terms. You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              In any way that violates any applicable law or regulation.
            </li>
            <li className="mb-2">
              To transmit, or procure the sending of, any advertising or
              promotional material, including any "junk mail", "chain letter" or
              "spam".
            </li>
            <li className="mb-2">
              To impersonate or attempt to impersonate the Company, a Company
              employee, another user, or any other person or entity.
            </li>
            <li className="mb-2">
              To engage in any other conduct that restricts or inhibits anyone's
              use or enjoyment of the Service, or which may harm the Company or
              users of the Service.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of our company and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both the United States and foreign countries.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms. Upon termination, your right to
            use the Service will immediately cease.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            In no event shall our company, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at
            support@example.com.
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
