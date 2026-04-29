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
  { label: "Manufacturing", href: "https://lucasgroup.pt/demos/slj.html", icon: iconManufacturing },
  { label: "Design", href: "https://www.jointdesigner.pt/index.php", icon: iconDesign },
  { label: "YouTube", href: "https://www.youtube.com/@LucasVideoLessons", icon: iconYouTube },
];

const joiningFormingQuickLinks = [
  { label: "Manufacturing", href: "/manufacturing", icon: iconManufacturing },
  { label: "Design", href: "/design", icon: iconDesign },
];

const weldingQuickLinks = [
  { label: "Manufacturing", href: "/manufacturing", icon: iconManufacturing },
];

const designOnlyQuickLinks = [
  { label: "Design", href: "/design", icon: iconDesign },
];

export default function Home() {
  return (
    <div className="pb-8">
      <HeroSection />

      {/* Core Sections */}
      <SectionWrapper
        id="categories"
        title="Categories"
        subtitle=""
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mainCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              {...category}
              footer={
                (category.slug === "adhesive-bonding" || category.slug === "joining-forming" || category.slug === "welding" || category.slug === "material-science" || category.slug === "technical-drawing") ? (
                  <div className="flex items-center gap-3">
                    {(category.slug === "adhesive-bonding" ? adhesiveQuickLinks : category.slug === "joining-forming" ? joiningFormingQuickLinks : category.slug === "welding" ? weldingQuickLinks : designOnlyQuickLinks).map((link) => (
                      <div key={link.label} className="flex flex-col items-center gap-1">
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${link.label}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
                        >
                          {link.icon}
                        </a>
                        <span className="text-[10px] uppercase tracking-wide text-muted/85">
                          {link.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      </SectionWrapper>



      {/* Stats strip */}
      <section className="border-y border-[color:var(--border)] bg-primary/55">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px divide-[color:var(--border)] px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "5", label: "Core Engineering Modules" },
            { value: "20+", label: "Years of Research Experience" },
            { value: "750+", label: "Publications in SCOPUS" },
            { value: "25k+", label: "Academic Citations" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 text-center">
              <p className="font-heading text-4xl font-bold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}

