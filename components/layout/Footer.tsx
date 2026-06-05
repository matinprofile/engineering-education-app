import Image from "next/image";
import Link from "next/link";


const footerLinks = [
  { label: "Adhesive Bonding", href: "/adhesive-bonding" },
  { label: "Joining by Forming", href: "/joining-forming" },
  { label: "Welding", href: "/welding" },
  { label: "Material Science", href: "/material-science" },
  { label: "Technical Drawing", href: "/technical-drawing" },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[color:var(--border)] bg-primary/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-heading text-lg font-semibold text-text">
              Engineering<span className="text-accent"> Education</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
              A professional platform for structural joining, material science, and technical
              drawing education, aligned with industrial practice and research excellence.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://www.fe.up.pt/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-[color:var(--border)] bg-white p-1.5 transition-colors duration-300 hover:border-accent/50"
                aria-label="FEUP website"
              >
                <Image
                  src="/images/partners/feup-logo.svg"
                  alt="FEUP"
                  width={140}
                  height={42}
                  className="h-8 w-auto"
                />
              </a>
              <a
                href="https://www.inegi.pt/en/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-[color:var(--border)] bg-white p-1.5 transition-colors duration-300 hover:border-accent/50"
                aria-label="INEGI website"
              >
                <Image
                  src="/images/partners/inegi-logo.svg"
                  alt="INEGI"
                  width={140}
                  height={42}
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Sections
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Contact
            </p>
            <div className="space-y-2 text-sm text-muted">
              <p className="font-semibold text-text">Lucas F. M. da Silva</p>
              <p>Professor of Mechanical Engineering</p>
              <p>Faculty of Engineering of the University of Porto (FEUP)</p>
              <p>Institute of Science and Innovation in Mechanical and Industrial Engineering (INEGI)</p>
              <p>
                Phone: <a href="tel:+351225081706" className="transition-colors duration-300 hover:text-accent">+351 225 081 706</a>
              </p>
              <p>
                <a href="mailto:lucas@fe.up.pt" className="transition-colors duration-300 hover:text-accent">
                  lucas@fe.up.pt
                </a>
                {" / "}
                <a href="mailto:lucas@inegi.up.pt" className="transition-colors duration-300 hover:text-accent">
                  lucas@inegi.up.pt
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[color:var(--border)] pt-6 flex flex-col items-center gap-2 text-center text-xs text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Engineering Education. All rights reserved.</span>
          <Link
            href="/terms"
            className="transition-colors duration-300 hover:text-accent"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
