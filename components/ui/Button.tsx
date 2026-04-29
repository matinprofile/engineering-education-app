import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function Button({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border border-accent/40 bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-[color:var(--accent-hover)] hover:shadow-[0_16px_32px_rgba(140,45,25,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 ${className}`}
    >
      {children}
    </Link>
  );
}
