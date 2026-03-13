import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | n+α Ventures",
  description: "Privacy Policy for n+α Ventures. Information on how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted mb-12">Last Updated: March 12, 2026</p>

          <div className="prose prose-invert prose-orange max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                n+α Ventures (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, <a href={`https://${SITE_CONFIG.domain}`} className="text-orange-400 hover:underline">{SITE_CONFIG.domain}</a>, and when you engage with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or book a consultation. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email, phone number).</li>
                <li>Company name and job title.</li>
                <li>Any other information you choose to provide in your message.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide requested information.</li>
                <li>Provide and improve our consulting services.</li>
                <li>Send professional updates or marketing communications (you can opt out at any time).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Storage and Security</h2>
              <p>
                Your data is stored securely using industry-standard protocols. We take reasonable measures to protect your personal information from unauthorized access, loss, or disclosure. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
              <p>
                We use third-party tools to help us run our website and services, such as analytics providers (Google Analytics, PostHog). These third parties have their own privacy policies governing how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-orange-400 hover:underline">{SITE_CONFIG.email}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-orange-400 hover:underline">{SITE_CONFIG.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
