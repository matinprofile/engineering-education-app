"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Adhesive Bonding", href: "/adhesive-bonding" },
  { label: "Joining by Forming", href: "/joining-forming" },
  { label: "Welding", href: "/welding" },
  { label: "Material Science", href: "/material-science" },
  { label: "Technical Drawing", href: "/technical-drawing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
        >
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

        {/* Desktop links */}
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

        <div className="flex items-center gap-3">
          <Link
            href="/#categories"
            className="rounded-xl border border-accent/30 bg-accent/8 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent transition-all duration-300 hover:bg-accent/14"
          >
            Explore
          </Link>

          {/* Hamburger — visible below xl */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            style={{ touchAction: "manipulation" }}
            className="inline-flex h-11 w-11 select-none items-center justify-center rounded-lg border border-[color:var(--border)] text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent xl:hidden"
          >
            {isOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu — CSS toggle so Android doesn't miss conditional renders */}
      <div className={`border-t border-[color:var(--border)] bg-white xl:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="mx-auto w-full max-w-7xl divide-y divide-[color:var(--border)] px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-4 text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  pathname === item.href ? "text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
