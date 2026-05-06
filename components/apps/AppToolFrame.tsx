import Link from "next/link";

type AppToolFrameProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  iframeSrc: string;
  iframeTitle: string;
};

export function AppToolFrame({
  title,
  description,
  backHref,
  backLabel,
  iframeSrc,
  iframeTitle,
}: AppToolFrameProps) {
  return (
    <div className="w-full pb-10">
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-primary/45">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(140,45,25,0.12),transparent_48%),radial-gradient(circle_at_90%_10%,rgba(247,218,211,0.38),transparent_52%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            {backLabel}
          </Link>
          <h1 className="font-heading text-3xl font-semibold text-text sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">{description}</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_16px_40px_rgba(48,54,44,0.08)]">
          <iframe src={iframeSrc} title={iframeTitle} className="h-[82vh] w-full border-0" />
        </div>
      </div>
    </div>
  );
}
