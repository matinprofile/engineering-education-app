export type AppTool = {
  slug: string;
  title: string;
  description: string;
  fileName: string;
};

export const adhesiveBondingTools: AppTool[] = [
  {
    slug: "surfaceprep-v2",
    title: "Surface Preparation",
    description: "Interactive simulation of surface treatment effects on adhesive bonding performance.",
    fileName: "surfaceprep_V2.html",
  },
  {
    slug: "failure-modes",
    title: "Failure Modes",
    description: "Explore adhesive, cohesive-in-adhesive, and cohesive-in-substrate failure mechanisms.",
    fileName: "failuremode.html",
  },
  {
    slug: "slj-maker",
    title: "Adhesive Joint Tutorial",
    description: "Step-by-step 3D interactive tutorial for single lap joint fabrication and design.",
    fileName: "sljmaker_V2.html",
  },
  {
    slug: "plasma-treatment",
    title: "Plasma Treatment",
    description: "Simulate atmospheric plasma surface activation and wettability improvement.",
    fileName: "PlasmaSim.html",
  },
  {
    slug: "nr613-tutorial",
    title: "NR613 Design Tutorial",
    description: "Interactive guideline walkthrough for bonded joint design under NR613 rules.",
    fileName: "NR613_V2.html",
  },
  {
    slug: "slj-manufacturing-guide",
    title: "SLJ Manufacturing Guide",
    description: "Video-based process viewer for single lap joint manufacturing steps.",
    fileName: "slj.html",
  },
  {
    slug: "adhesive-bonding-quiz",
    title: "Module Quiz — Adhesive Bonding",
    description: "Test your knowledge of surface preparation, plasma treatment, joint design, failure modes, and NR613.",
    fileName: "",
  },
];

export const weldingTools: AppTool[] = [
  {
    slug: "mag-welding-sim",
    title: "MAG Welding Simulator",
    description: "Interactive MAG welding simulator focused on process control and technique.",
    fileName: "MAGweldingsim.html",
  },
  {
    slug: "fsw-quality-sim",
    title: "FSW Quality Simulator",
    description: "Friction stir welding quality simulator with parameter-to-defect relationships.",
    fileName: "fsw_simulator.html",
  },
  {
    slug: "joint-preparation-sim",
    title: "Joint Preparation Simulator",
    description: "Configure weld preparation geometry and estimate weld volume requirements.",
    fileName: "Preparationsim.html",
  },
  {
    slug: "ultrasound-a-scan",
    title: "Ultrasound A-Scan",
    description: "Inspect welded joints with an interactive ultrasonic A-scan simulation.",
    fileName: "Ultrasoundscan.html",
  },
  {
    slug: "radiography-sim",
    title: "Radiography Simulator",
    description: "Interpret common radiographic weld defects using an interactive film simulation.",
    fileName: "Xraysim.html",
  },
  {
    slug: "laser-quiz",
    title: "Laser Welding Quiz",
    description: "Knowledge-check quiz for laser welding principles and process understanding.",
    fileName: "laser_game.html",
  },
  {
    slug: "fsw-quiz",
    title: "FSW Quiz",
    description: "Knowledge-check quiz for friction stir welding terminology and process basics.",
    fileName: "fsw_game.html",
  },
  {
    slug: "welding-module-quiz",
    title: "Module Quiz — Welding",
    description: "Comprehensive assessment covering MAG welding, joint preparation, FSW, NDT inspection, and laser welding.",
    fileName: "",
  },
];

export function getAdhesiveTool(slug: string) {
  return adhesiveBondingTools.find((tool) => tool.slug === slug);
}

export function getWeldingTool(slug: string) {
  return weldingTools.find((tool) => tool.slug === slug);
}
