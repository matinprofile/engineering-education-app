import Link from "next/link";
import { TopicIcon, type TopicIconName } from "@/components/ui/TopicIcon";
import type { ReactNode } from "react";

type CategoryCardProps = {
  title: string;
  slug: string;
  summary: string;
  highlight: string;
  icon: TopicIconName;
  footer?: ReactNode;
};

export function CategoryCard({ title, slug, summary, highlight, icon, footer }: CategoryCardProps) {
  return (
    <article className="group flex h-full w-full flex-col rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(140,45,25,0.14)]">
      <Link href={`/${slug}`} className="block rounded-2xl p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <p className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
            {highlight}
          </p>
          <div className="text-accent transition-transform duration-300 group-hover:scale-[1.04]">
            <TopicIcon name={icon} className="h-14 w-14" />
          </div>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-text transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">{summary}</p>
      </Link>
      {footer && (
        <div className="border-t border-[color:var(--border)] px-4 py-3">{footer}</div>
      )}
    </article>
  );
}
