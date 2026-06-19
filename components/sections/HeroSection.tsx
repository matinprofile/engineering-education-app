import { Button } from "@/components/ui/Button";
import { Logo3D } from "@/components/hero/Logo3D";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_22%,rgba(140,45,25,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-28 pt-10 sm:px-6 md:pb-36 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.7fr)] lg:px-8">
        <div className="flex flex-col gap-8">
          <h1 className="max-w-4xl font-heading text-3xl font-bold leading-[1.1] text-text sm:text-5xl lg:text-7xl">
            Engineering <span className="text-accent">Education</span> Platform
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Five focused engineering modules built on decades of research partnership with
            industry leaders in automotive, aerospace, and railway sectors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/#categories">Explore Modules</Button>
          </div>
        </div>

        <div className="relative h-[260px] w-full sm:h-[320px] md:h-[380px] lg:h-[420px]">
          <Logo3D />
        </div>
      </div>
    </section>
  );
}
