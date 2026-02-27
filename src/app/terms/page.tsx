import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}. Read our terms and conditions for using our AI automation services.`,
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-text-muted">Last updated: February 27, 2026</p>

          <div className="mt-12 space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the services provided by {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                including our website at {siteConfig.url} and any related services, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                2. Services
              </h2>
              <p>
                {siteConfig.name} provides AI automation, consulting, and development services including but not limited to:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>AI workflow automations</li>
                <li>AI-powered website development</li>
                <li>AI voice agents and chatbots</li>
                <li>AI strategy and consulting</li>
                <li>AI content systems</li>
                <li>Shopify email automation</li>
              </ul>
              <p className="mt-3">
                The specific scope, deliverables, and timeline of any project will be outlined in a separate
                proposal or statement of work agreed upon by both parties before work begins.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                3. Client Responsibilities
              </h2>
              <p>As a client, you agree to:</p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information necessary for us to deliver our services</li>
                <li>Respond to requests for information, feedback, or approvals in a timely manner</li>
                <li>Ensure that any content, data, or materials you provide do not infringe on any third-party rights</li>
                <li>Maintain the confidentiality of any login credentials or access details we provide</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                4. Payment Terms
              </h2>
              <p>
                Payment terms, including pricing, payment schedule, and accepted methods, will be outlined in
                the project proposal or invoice. Unless otherwise agreed:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>A deposit may be required before work begins</li>
                <li>Invoices are due within 14 days of receipt</li>
                <li>Late payments may incur additional fees or result in paused work</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                5. Intellectual Property
              </h2>
              <p>
                Upon full payment, you will own the final deliverables created specifically for your project.
                We retain the right to use general knowledge, techniques, and non-proprietary components
                developed during the project. We may also showcase the work in our portfolio unless you
                request otherwise in writing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                6. Guarantees and Refunds
              </h2>
              <p>
                Where a specific guarantee is offered (such as our Shopify automation money-back guarantee),
                the terms of that guarantee will be clearly stated at the time of purchase. General services
                are non-refundable once work has commenced, unless otherwise agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including loss of profits, data, or
                business opportunities, arising from the use of our services. Our total liability shall not
                exceed the amount paid by you for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                8. Confidentiality
              </h2>
              <p>
                Both parties agree to keep confidential any proprietary or sensitive information shared
                during the course of the engagement. This obligation survives the termination of the
                business relationship.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                9. Termination
              </h2>
              <p>
                Either party may terminate the engagement with written notice. In the event of termination,
                you will be responsible for payment for all work completed up to the date of termination.
                Any deliverables completed and paid for will be transferred to you.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                10. Third-Party Services
              </h2>
              <p>
                Our services may integrate with or rely on third-party platforms (e.g., Klaviyo, Shopify,
                EmailOctopus, n8n). We are not responsible for the availability, performance, or policies
                of these third-party services. Your use of such services is subject to their respective
                terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to update these Terms of Service at any time. Changes will be posted
                on this page with an updated revision date. Continued use of our services after changes
                constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                12. Contact
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
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
