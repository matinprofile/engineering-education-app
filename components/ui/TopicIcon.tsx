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
  return <AssetIcon src="/materialscience.svg" title="Material Science" />;
}

function TechnicalDrawingIcon() {
  return <AssetIcon src="/technicaldrawing.svg" title="Technical Drawing" />;
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