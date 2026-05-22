import { CategoryCard } from "@/components/sections/CategoryCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { mainCategories, type QuickLinkIconType } from "@/lib/topics";
import type { ReactNode } from "react";

const quickLinkIcons: Record<QuickLinkIconType, ReactNode> = {
  manufacturing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
      <path d="M3 21h18" />
      <path d="M5 21V9l7-4 7 4v12" />
      <path d="M9 14h6" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
      <path d="M4 16.5V20h3.5L18.8 8.7a1.6 1.6 0 0 0 0-2.3l-1.2-1.2a1.6 1.6 0 0 0-2.3 0L4 16.5Z" />
      <path d="m13.8 6.2 4 4" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
      <rect x="2.8" y="6.5" width="18.4" height="11" rx="3" />
      <path d="m10 9.7 5 2.8-5 2.8V9.7Z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="pb-8">
      <HeroSection />

      <SectionWrapper id="categories" title="" subtitle="">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mainCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              {...category}
              footer={
                category.quickLinks && category.quickLinks.length > 0 ? (
                  <div className="flex items-start gap-2">
                    {category.quickLinks.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <div key={link.label} className="flex w-20 flex-col items-center gap-1 text-center">
                          <a
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            aria-label={`Open ${link.label}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
                          >
                            {quickLinkIcons[link.iconType]}
                          </a>
                          <span className="min-h-8 text-[10px] uppercase leading-4 tracking-wide text-muted/85">
                            {link.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
