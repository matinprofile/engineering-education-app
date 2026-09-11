import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-v-2.png"
          alt="Adhesive bonded joint specimen on a lab bench with FEA stress analysis displayed on screen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_18%_22%,rgba(140,45,25,0.18),transparent_44%)]" />

      <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-28 pt-10 sm:px-6 md:pb-36 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.7fr)] lg:px-8">
        <div className="relative flex flex-col gap-8">
          <h1
            className="max-w-4xl font-heading text-3xl font-bold leading-[1.1] text-text sm:text-5xl lg:text-7xl"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.6)" }}
          >
            Engineering <span className="text-accent">Education</span> Platform
          </h1>
          <p
            className="max-w-2xl text-base leading-8 text-text sm:text-lg"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.55)" }}
          >
            Five focused engineering modules built on decades of research partnership with
            industry leaders in automotive, aerospace, and railway sectors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/#categories">Explore Modules</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
