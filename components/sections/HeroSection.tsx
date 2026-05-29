import { Logo3D } from "@/components/hero/Logo3D";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-background">
      {/* 3-D logo model — z-0 */}
      <Logo3D />
      {/* Soft vignette to keep text readable — z-[1] */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_22%,rgba(140,45,25,0.10),transparent_44%),radial-gradient(ellipse_at_86%_16%,rgba(255,255,255,0.72),transparent_52%)]" />
      {/* Grid texture — z-[2] */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(rgba(48,54,44,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(48,54,44,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-28 pt-10 sm:px-6 md:pb-36 lg:px-8">
        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.1] text-text sm:text-6xl lg:text-7xl">
          Engineering <span className="text-accent">Education</span> Platform
        </h1>
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
          Five focused engineering modules built on decades of research partnership with
          industry leaders in automotive, aerospace, and railway sectors.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/#categories">Explore Modules</Button>
        </div>

        {/* Section quick-links */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Adhesive Bonding", href: "/adhesive-bonding" },
            { label: "Joining by Forming", href: "/joining-forming" },
            { label: "Welding", href: "/welding" },
            { label: "Material Science", href: "/material-science" },
            { label: "Technical Drawing", href: "/technical-drawing" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-[color:var(--border)] bg-white/80 px-6 py-2.5 text-base font-medium text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/8 hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
