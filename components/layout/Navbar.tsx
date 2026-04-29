import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Adhesive Bonding", href: "/adhesive-bonding" },
  { label: "Joining by Forming", href: "/joining-forming" },
  { label: "Welding", href: "/welding" },
  { label: "Material Science", href: "/material-science" },
  { label: "Technical Drawing", href: "/technical-drawing" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/images/partners/lucasgroup-logo.svg"
            alt="Lucas Group"
            width={120}
            height={40}
            className="h-9 w-auto"
          />
          <span className="font-heading text-base font-semibold tracking-wide text-text">
            Engineering<span className="text-accent"> Education</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted transition-colors duration-300 hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#categories"
          className="rounded-xl border border-accent/30 bg-accent/8 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent transition-all duration-300 hover:bg-accent/14"
        >
          Explore
        </Link>
      </nav>
    </header>
  );
}
