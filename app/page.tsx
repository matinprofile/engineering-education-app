import { CategoryCard } from "@/components/sections/CategoryCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { mainCategories } from "@/lib/topics";

const iconManufacturing = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
    <path d="M3 21h18" />
    <path d="M5 21V9l7-4 7 4v12" />
    <path d="M9 14h6" />
  </svg>
);

const iconDesign = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
    <path d="M4 16.5V20h3.5L18.8 8.7a1.6 1.6 0 0 0 0-2.3l-1.2-1.2a1.6 1.6 0 0 0-2.3 0L4 16.5Z" />
    <path d="m13.8 6.2 4 4" />
  </svg>
);

const iconYouTube = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
    <rect x="2.8" y="6.5" width="18.4" height="11" rx="3" />
    <path d="m10 9.7 5 2.8-5 2.8V9.7Z" fill="currentColor" stroke="none" />
  </svg>
);

const adhesiveQuickLinks = [
  { label: "Manufacturing", href: "/adhesive-bonding/apps/slj-manufacturing-guide", icon: iconManufacturing },
  { label: "Design", href: "/adhesive-bonding/apps/nr613-tutorial", icon: iconDesign },
  { label: "YouTube", href: "https://www.youtube.com/@LucasVideoLessons", icon: iconYouTube },
];

const joiningFormingQuickLinks = [
  { label: "Manufacturing", href: "/manufacturing", icon: iconManufacturing },
  { label: "Design", href: "/joining-forming/clinching", icon: iconDesign },
];

const weldingQuickLinks = [
  { label: "Manufacturing", href: "/manufacturing", icon: iconManufacturing },
  { label: "Design", href: "/welding/apps/mag-welding-sim", icon: iconDesign },
];

const materialScienceQuickLinks = [
  { label: "Design", href: "/material-science", icon: iconDesign },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=jvwq5BT4R1g&list=PLZScjc7Bq4IXKqd24t4e85N9PsTDVhS9o", icon: iconYouTube },
];

const technicalDrawingQuickLinks = [
  { label: "Design", href: "/technical-drawing", icon: iconDesign },
];

export default function Home() {
  return (
    <div className="pb-8">
      <HeroSection />

      {/* Core Sections */}
      <SectionWrapper
        id="categories"
        title=""
        subtitle=""
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mainCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              {...category}
              footer={
                (category.slug === "adhesive-bonding" || category.slug === "joining-forming" || category.slug === "welding" || category.slug === "material-science" || category.slug === "technical-drawing") ? (
                  <div className="flex items-start gap-2">
                    {(category.slug === "adhesive-bonding"
                      ? adhesiveQuickLinks
                      : category.slug === "joining-forming"
                        ? joiningFormingQuickLinks
                        : category.slug === "welding"
                          ? weldingQuickLinks
                          : category.slug === "material-science"
                            ? materialScienceQuickLinks
                            : technicalDrawingQuickLinks).map((link) => (
                      (() => {
                        const externalLink = link.href.startsWith("http");

                        return (
                      <div key={link.label} className="flex w-20 flex-col items-center gap-1 text-center">
                        <a
                          href={link.href}
                          target={externalLink ? "_blank" : undefined}
                          rel={externalLink ? "noopener noreferrer" : undefined}
                          aria-label={`Open ${link.label}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
                        >
                          {link.icon}
                        </a>
                        <span className="min-h-8 text-[10px] uppercase leading-4 tracking-wide text-muted/85">
                          {link.label}
                        </span>
                      </div>
                        );
                      })()
                    ))}
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

