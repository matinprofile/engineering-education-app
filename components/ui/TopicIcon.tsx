type TopicIconName =
  | "adhesive-bonding"
  | "joining-forming"
  | "welding"
  | "material-science"
  | "technical-drawing";

type TopicIconProps = {
  name: TopicIconName;
  className?: string;
};

function AssetIcon({ src, title }: { src: string; title: string }) {
  return (
    <img
      src={src}
      alt={title}
      className="h-full w-full rounded-xl border border-[color:var(--border)] object-contain bg-white p-1"
      loading="lazy"
    />
  );
}

function SvgFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="52" height="52" rx="16" fill="currentColor" opacity="0.08" />
      <rect x="6.75" y="6.75" width="50.5" height="50.5" rx="15.25" stroke="currentColor" opacity="0.18" strokeWidth="1.5" />
      {children}
    </svg>
  );
}

function AdhesiveBondingIcon() {
  return <AssetIcon src="/adhesivebonding.svg" title="Adhesive Bonding" />;
}

function JoiningFormingIcon() {
  return <AssetIcon src="/joiningbyforming.svg" title="Joining by Forming" />;
}

function WeldingIcon() {
  return <AssetIcon src="/welding.svg" title="Welding" />;
}

function MaterialScienceIcon() {
  return (
    <SvgFrame>
      <circle cx="22" cy="22" r="4" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="42" cy="22" r="4" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="22" cy="42" r="4" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="42" cy="42" r="4" stroke="currentColor" strokeWidth="2.25" />
      <path d="M26 22H38" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M22 26V38" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M42 26V38" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M26 42H38" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M25 25L39 39" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M39 25L25 39" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </SvgFrame>
  );
}

function TechnicalDrawingIcon() {
  return <AssetIcon src="/images/icons/technical-drawing-caliper.jpg" title="Technical Drawing Caliper" />;
}

export function TopicIcon({ name, className }: TopicIconProps) {
  const classes = className ?? "h-16 w-16";

  return (
    <div className={classes}>
      {name === "adhesive-bonding" && <AdhesiveBondingIcon />}
      {name === "joining-forming" && <JoiningFormingIcon />}
      {name === "welding" && <WeldingIcon />}
      {name === "material-science" && <MaterialScienceIcon />}
      {name === "technical-drawing" && <TechnicalDrawingIcon />}
    </div>
  );
}

export type { TopicIconName };