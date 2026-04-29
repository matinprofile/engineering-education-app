import type { ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 ${className}`}>
      {(title || subtitle) && (
        <header className="mb-8 space-y-3">
          {title && (
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="max-w-2xl text-muted">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
