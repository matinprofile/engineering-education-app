import { Logo3D } from "@/components/hero/Logo3D";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-[color:var(--border)]"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Dark overlay for text readability — z-0 */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/55" />
      {/* Soft vignette — z-[1] */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_22%,rgba(140,45,25,0.18),transparent_44%)]" />
      {/* Grid texture — z-[2] */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-28 pt-10 sm:px-6 md:pb-36 lg:px-8">
        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Engineering <span className="text-accent">Education</span> Platform
        </h1>
        <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
          Five focused engineering modules built on decades of research partnership with
          industry leaders in automotive, aerospace, and railway sectors.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/#categories">Explore Modules</Button>
        </div>

      </div>
    </section>
  );
}
