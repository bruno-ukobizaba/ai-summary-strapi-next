import Link from "next/link";

export const metadata = {
  title: "Legal Information",
  description: "Legal information and policies for our platform",
};

export default function LegalPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Information</h1>
        <p className="text-gray-600 mb-8">
          Important legal documents and policies for our platform
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Terms of Service</h2>
            <p className="text-gray-600 mb-4">
              The terms and conditions that govern your use of our platform and
              services.
            </p>
            <Link
              href="/legal/terms"
              className="text-blue-600 hover:text-blue-800 font-medium">
              Read Terms of Service →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              How we collect, use, and protect your personal information.
            </p>
            <Link
              href="/legal/privacy"
              className="text-blue-600 hover:text-blue-800 font-medium">
              Read Privacy Policy →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Cookie Policy</h2>
            <p className="text-gray-600 mb-4">
              Information about how we use cookies and similar technologies.
            </p>
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:text-blue-800 font-medium">
              Read Cookie Policy →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">
              Acceptable Use Policy
            </h2>
            <p className="text-gray-600 mb-4">
              Guidelines for acceptable use of our platform and services.
            </p>
            <Link
              href="/legal/acceptable-use"
              className="text-blue-600 hover:text-blue-800 font-medium">
              Read Acceptable Use Policy →
            </Link>
          </div>
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
