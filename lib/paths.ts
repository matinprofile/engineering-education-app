export type PathStep = {
  title: string;
  href: string;
  duration: string;
};

export type LearningPath = {
  module: string;
  title: string;
  steps: PathStep[];
};

export const learningPaths: Record<string, LearningPath> = {
  "adhesive-bonding": {
    module: "adhesive-bonding",
    title: "Adhesive Bonding",
    steps: [
      { title: "Surface Preparation", href: "/adhesive-bonding/apps/surfaceprep-v2", duration: "15 min" },
      { title: "Plasma Treatment", href: "/adhesive-bonding/apps/plasma-treatment", duration: "10 min" },
      { title: "Adhesive Joint Tutorial", href: "/adhesive-bonding/apps/slj-maker", duration: "20 min" },
      { title: "SLJ Manufacturing Guide", href: "/adhesive-bonding/apps/slj-manufacturing-guide", duration: "10 min" },
      { title: "NR613 Design Tutorial", href: "/adhesive-bonding/apps/nr613-tutorial", duration: "20 min" },
      { title: "Failure Modes", href: "/adhesive-bonding/apps/failure-modes", duration: "15 min" },
      { title: "Module Quiz", href: "/adhesive-bonding/apps/adhesive-bonding-quiz", duration: "10 min" },
    ],
  },
  "welding": {
    module: "welding",
    title: "Welding",
    steps: [
      { title: "Joint Preparation", href: "/welding/apps/joint-preparation-sim", duration: "10 min" },
      { title: "MAG Welding Simulator", href: "/welding/apps/mag-welding-sim", duration: "15 min" },
      { title: "FSW Quality Simulator", href: "/welding/apps/fsw-quality-sim", duration: "15 min" },
      { title: "Ultrasound A-Scan", href: "/welding/apps/ultrasound-a-scan", duration: "15 min" },
      { title: "Radiography Simulator", href: "/welding/apps/radiography-sim", duration: "15 min" },
      { title: "Laser Welding Quiz", href: "/welding/apps/laser-quiz", duration: "10 min" },
      { title: "FSW Quiz", href: "/welding/apps/fsw-quiz", duration: "10 min" },
      { title: "Module Quiz", href: "/welding/apps/welding-module-quiz", duration: "12 min" },
    ],
  },
  "material-science": {
    module: "material-science",
    title: "Material Science",
    steps: [
      { title: "Phase Diagram: Total Solubility", href: "/material-science/phase-diagram/total-solubility", duration: "15 min" },
      { title: "Phase Diagram: Partial Solubility", href: "/material-science/phase-diagram/partial-solubility", duration: "15 min" },
      { title: "Phase Diagram: Insolubility", href: "/material-science/phase-diagram/insolubility", duration: "15 min" },
      { title: "Crystal Structure Viewer", href: "/material-science/crystallography/structure", duration: "15 min" },
      { title: "Miller Indices", href: "/material-science/crystallography/miller", duration: "15 min" },
      { title: "Module Quiz", href: "/material-science/quiz", duration: "10 min" },
    ],
  },
  "technical-drawing": {
    module: "technical-drawing",
    title: "Technical Drawing",
    steps: [
      { title: "Orthographic Views", href: "/technical-drawing/orthographic-views", duration: "20 min" },
      { title: "Projection Constructor", href: "/technical-drawing/projection-constructor", duration: "20 min" },
      { title: "3D Perspective", href: "/technical-drawing/3d-perspective", duration: "15 min" },
      { title: "Module Quiz", href: "/technical-drawing/quiz", duration: "10 min" },
    ],
  },
  "joining-forming": {
    module: "joining-forming",
    title: "Joining by Forming",
    steps: [
      { title: "Clinching Simulator", href: "/joining-forming/clinching", duration: "20 min" },
      { title: "Module Quiz", href: "/joining-forming/quiz", duration: "8 min" },
    ],
  },
};

export function getPathForHref(href: string): { path: LearningPath; stepIndex: number } | null {
  for (const path of Object.values(learningPaths)) {
    const idx = path.steps.findIndex((s) => s.href === href);
    if (idx !== -1) return { path, stepIndex: idx };
  }
  return null;
}
