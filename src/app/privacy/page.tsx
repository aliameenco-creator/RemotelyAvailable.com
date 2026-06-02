import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-text-muted">Last updated: February 27, 2026</p>

          <div className="mt-12 space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                1. Introduction
              </h2>
              <p>
                {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to
                protecting your personal data. This Privacy Policy explains how we collect, use, store,
                and share your information when you visit our website at {siteConfig.url} or use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                2. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and company name (via contact forms)</li>
                <li>Shopify store URL (via lead capture forms)</li>
                <li>Service preferences and budget range</li>
                <li>Messages and project details you share with us</li>
              </ul>

              <h3 className="font-semibold text-text-primary mt-4 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>IP address and approximate location</li>
                <li>Pages visited, time spent, and referring URLs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>Respond to your enquiries and provide our services</li>
                <li>Send you relevant resources you have requested (e.g., playbooks, guides)</li>
                <li>Communicate with you about projects, updates, and service offerings</li>
                <li>Improve our website, services, and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                4. Email Communications
              </h2>
              <p>
                When you download a resource or submit a form on our website, you may be added to our
                email list hosted on EmailOctopus. We use email to deliver requested content and share
                relevant updates about our services. You can unsubscribe at any time by clicking the
                unsubscribe link in any email or by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                5. Data Sharing
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share
                your data with:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <span className="text-text-primary font-medium">Service providers</span> — trusted
                  third-party tools we use to operate our business (e.g., EmailOctopus for email,
                  Calendly for scheduling, Vercel for hosting)
                </li>
                <li>
                  <span className="text-text-primary font-medium">Legal requirements</span> — if
                  required by law, regulation, or legal process
                </li>
              </ul>
              <p className="mt-3">
                All third-party service providers are bound by their own privacy policies and data
                protection obligations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                6. Cookies
              </h2>
              <p>
                Our website may use cookies and similar technologies to enhance your browsing experience.
                Cookies are small text files stored on your device. You can control cookie preferences
                through your browser settings. Disabling cookies may affect certain features of the website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                7. Data Security
              </h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal
                data against unauthorised access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                8. Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to fulfil the purposes outlined
                in this policy, or as required by law. Contact form submissions and email list data are
                retained until you request deletion or unsubscribe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                9. Your Rights
              </h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for email communications at any time</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary-400 hover:text-primary-300 transition-colors">
                  {siteConfig.email}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                10. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed at individuals under the age of 18. We do not knowingly
                collect personal data from children. If you believe we have inadvertently collected such
                data, please contact us so we can promptly delete it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this
                page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                12. Contact
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please
                contact us at{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary-400 hover:text-primary-300 transition-colors">
                  {siteConfig.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
