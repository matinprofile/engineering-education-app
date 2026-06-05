import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Engineering Education Platform",
  description: "Terms and conditions for using the Engineering Education Platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Home
      </Link>

      <h1 className="font-heading text-4xl font-bold text-text">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-muted">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted">
        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">1. About This Platform</h2>
          <p>
            The Engineering Education Platform is an academic resource developed by researchers at the
            Faculty of Engineering of the University of Porto (FEUP) and the Institute of Science and
            Innovation in Mechanical and Industrial Engineering (INEGI). It provides interactive
            simulation tools for educational purposes in the fields of adhesive bonding, joining by
            forming, welding, material science, and technical drawing.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">2. Permitted Use</h2>
          <p>
            This platform is intended for educational and research use only. You may access and use
            the interactive tools for personal learning, academic coursework, and non-commercial
            research. Redistribution, commercial use, or incorporation into other products without
            prior written consent from FEUP/INEGI is not permitted.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">3. Intellectual Property</h2>
          <p>
            All simulation tools, content, code, and materials on this platform are the intellectual
            property of FEUP and INEGI unless otherwise stated. The underlying research is published
            in peer-reviewed journals and conference proceedings; citations are listed within
            individual simulation pages where applicable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">4. No Warranty</h2>
          <p>
            The tools and simulations are provided &quot;as is&quot; for educational demonstration. Results
            produced by the simulations are not intended for use in structural design, safety
            analysis, or any professional engineering decision-making without independent validation.
            FEUP and INEGI make no warranty, express or implied, regarding accuracy, completeness,
            or fitness for a particular purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, FEUP and INEGI shall not be liable
            for any direct, indirect, incidental, or consequential damages arising from your use of
            this platform or its simulation tools.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">6. Privacy</h2>
          <p>
            This platform does not currently collect personal data beyond standard server logs
            (anonymized IP, pages visited, browser type) retained for up to 90 days for operational
            purposes. No data is sold or shared with third parties. If user authentication is added
            in future, a separate privacy notice will be published.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-semibold text-text">7. Contact</h2>
          <p>
            For questions regarding these terms, contact:{" "}
            <a href="mailto:lucas@fe.up.pt" className="text-accent underline-offset-4 hover:underline">
              lucas@fe.up.pt
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
