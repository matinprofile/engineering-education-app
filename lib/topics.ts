import type { TopicIconName } from "@/components/ui/TopicIcon";

export type Topic = {
  title: string;
  slug: string;
  summary: string;
  highlight: string;
  icon: TopicIconName;
};

export const mainCategories: Topic[] = [
  {
    title: "Adhesive Bonding",
    slug: "adhesive-bonding",
    icon: "adhesive-bonding",
    summary:
      "Explore adhesive characterization, joint design, failure analysis, durability testing, and non-destructive testing techniques for high-performance bonded structures.",
    highlight: "Structural Joining",
  },
  {
    title: "Joining by Forming",
    slug: "joining-forming",
    icon: "joining-forming",
    summary:
      "Plastic deformation-based joining processes including hole hemming, clinching, and self-piercing rivets for multi-material and lightweight structures.",
    highlight: "Forming Processes",
  },
  {
    title: "Welding",
    slug: "welding",
    icon: "welding",
    summary:
      "Laser welding, friction stir welding, dissimilar material joining, intermetallic formation control, and thermal modelling for critical applications.",
    highlight: "Fusion & Solid-State",
  },
  {
    title: "Material Science",
    slug: "material-science",
    icon: "material-science",
    summary:
      "Microstructure-property relationships, mechanical characterization, composites, polymers, and material selection strategies for engineering systems.",
    highlight: "Materials & Properties",
  },
  {
    title: "Technical Drawing",
    slug: "technical-drawing",
    icon: "technical-drawing",
    summary:
      "ISO drafting standards, geometric dimensioning and tolerancing (GD&T), assembly drawings, and communication of manufacturable engineering intent.",
    highlight: "Engineering Graphics",
  },
];

export const allCategories: Topic[] = [...mainCategories];

export type TopicPageData = {
  heading: string;
  tagline: string;
  intro: string;
  icon: TopicIconName;
  bullets: string[];
  keyTopics: { title: string; description: string }[];
  applications: string[];
};

export const topicPageContent: Record<string, TopicPageData> = {
  "adhesive-bonding": {
    heading: "Adhesive Bonding",
    tagline: "From substrate chemistry to industrial joint qualification",
    icon: "adhesive-bonding",
    intro:
      "Adhesive bonding is a critical joining technology across automotive, aerospace, and railway industries. This section covers the full spectrum — from adhesive selection and surface preparation through joint design, failure analysis, durability under fatigue and moisture, and non-destructive testing methods used in high-responsibility operations.",
    bullets: [
      "Surface preparation and adhesion mechanisms",
      "Joint configuration and stress distribution analysis",
      "Hybrid and graded adhesive joint concepts",
      "Fatigue crack growth and S-N life prediction",
      "Durability under temperature, moisture, and creep",
      "Non-destructive testing and defect detection",
      "Numerical modelling with cohesive zone elements",
      "Debondable and recyclable bonded structures",
    ],
    keyTopics: [
      {
        title: "Adhesive Characterization",
        description:
          "Mechanical property determination of structural adhesives including tensile, shear, fracture toughness, and viscoelastic response under varied loading rates and environmental conditions.",
      },
      {
        title: "Joint Design & Optimisation",
        description:
          "Analytical and numerical approaches to minimize stress concentrations and maximize load transfer efficiency in single-lap, double-lap, T-peel, and complex hybrid joints.",
      },
      {
        title: "Fatigue & Durability",
        description:
          "Design methodologies for bonded joints subjected to cyclic loads including fracture mechanics approaches and total fatigue life (S-N) methods for both metallic and composite substrates.",
      },
      {
        title: "Non-Destructive Testing",
        description:
          "Ultrasonic, thermographic, and wave-propagation-based techniques for detecting voids, disbonds, and weak adhesion zones in bonded assemblies without damaging the structure.",
      },
    ],
    applications: [
      "Automotive body panel bonding",
      "Aerospace primary structure assembly",
      "Railway carriage and bogie joining",
      "Wind turbine blade manufacturing",
      "Naval composite hull construction",
      "Electronic component encapsulation",
    ],
  },
  "joining-forming": {
    heading: "Joining by Forming",
    tagline: "Innovative plastic deformation joining for multi-material structures",
    icon: "joining-forming",
    intro:
      "Joining by forming leverages plastic deformation to create mechanical interlocks between components without the heat-affected zones of fusion welding. This section explores processes such as hole hemming, clinching, and self-piercing riveting, with strong emphasis on their application to lightweight automotive and battery structures where multi-material assembly is essential.",
    bullets: [
      "Hole hemming process mechanics and parameter optimisation",
      "Clinching and self-piercing rivet joining",
      "Numerical modelling of forming-based joining",
      "Joining dissimilar materials: metal–polymer interfaces",
      "Process window determination and quality metrics",
      "Electric busbar joining for battery packs",
      "Fatigue performance of formed joints",
      "Disassembly strategies for circular economy",
    ],
    keyTopics: [
      {
        title: "Hole Hemming Process",
        description:
          "A highly efficient mechanical joining method capable of joining metals to polymers and composites. Study of forming force, geometric tolerances, and structural performance under static and fatigue loads.",
      },
      {
        title: "Clinching & Riveting",
        description:
          "Die-less and die-assisted clinching processes along with self-piercing riveting mechanics. Failure mode characterisation, joint strength prediction, and process optimisation for lightweight assemblies.",
      },
      {
        title: "Battery Pack Manufacturing",
        description:
          "Novel joining techniques for assembling EV battery cells, busbars, and housings. Covers electrical conductivity requirements, thermal management, and assembly repairability for sustainable mobility.",
      },
      {
        title: "Multi-Material Structures",
        description:
          "Strategies for forming-based joining across material interfaces including steel–aluminium, metal–CFRP, and thermoplastic composites relevant to automotive and aerospace lightweighting.",
      },
    ],
    applications: [
      "Electric vehicle battery assembly",
      "Automotive body-in-white multi-material structures",
      "Lightweight aircraft fuselage panels",
      "Consumer electronics enclosures",
      "Busbar connections in power electronics",
      "Recyclable structural packaging",
    ],
  },
  welding: {
    heading: "Welding",
    tagline: "Fusion and solid-state joining for structural performance",
    icon: "welding",
    intro:
      "Welding remains the most widely used permanent joining method in industry. This section covers both fusion welding (laser, arc) and solid-state welding (friction stir), with a focus on metallurgy, residual stress, intermetallic formation in dissimilar joints, process modelling, and quality inspection. Emphasis is placed on aerospace, automotive, and marine applications where weld quality is safety-critical.",
    bullets: [
      "Laser welding of short-fibre composites",
      "Friction stir welding process mechanics",
      "Intermetallic formation in dissimilar metal welding",
      "Residual stress measurement and minimisation",
      "Thermal modelling and heat-affected zone prediction",
      "Buttering technique for solid-state dissimilar joining",
      "Weld joint microstructure and mechanical properties",
      "Dynamic vehicle behaviour considering joint characteristics",
    ],
    keyTopics: [
      {
        title: "Laser Welding",
        description:
          "High-energy-density joining for thin materials and composites. Thermal damage modelling, melt pool dynamics, and process parameter optimisation for precision assemblies in aerospace and electronics.",
      },
      {
        title: "Friction Stir Welding",
        description:
          "Solid-state joining that eliminates fusion defects and enables high-strength aluminium and dissimilar metal joints. Topics include tool design, heat generation, microstructure evolution, and fatigue performance.",
      },
      {
        title: "Dissimilar Material Welding",
        description:
          "Steel-to-aluminium, aluminium-to-titanium, and metal-to-composite joining challenges. Study of intermetallic compound growth, buttering interlayers, and strategies to control brittle phase formation.",
      },
      {
        title: "Welding Simulation & Inspection",
        description:
          "Finite-element thermal and mechanical models of weld processes. Non-destructive inspection methods including radiography, ultrasonic testing, and phased-array for weld quality assurance.",
      },
    ],
    applications: [
      "Automotive body structure fabrication",
      "Aerospace fuselage and wing assembly",
      "Marine hull and offshore structure welding",
      "Armour plate and defence structures",
      "Pressure vessel and pipeline fabrication",
      "Railway bogie and chassis welding",
    ],
  },
  "material-science": {
    heading: "Material Science",
    tagline: "Understanding structure–property relationships for engineering design",
    icon: "material-science",
    intro:
      "Material Science bridges atomic-scale phenomena with macroscopic engineering performance. This section examines metallic alloys, polymers, composites, and bio-based materials — covering microstructure characterisation, mechanical testing, fatigue and fracture mechanics, surface engineering, and selection methodologies used in demanding structural applications.",
    bullets: [
      "Crystal structure, defects, and mechanical behaviour",
      "Phase diagrams and heat treatment of alloys",
      "Fatigue, creep, and fracture mechanics",
      "Polymer viscoelasticity and time-dependent response",
      "Fibre-reinforced composite properties and design",
      "Corrosion mechanisms and protection strategies",
      "Surface treatment for improved adhesion and wear",
      "Bio-based and sustainable materials for structural use",
    ],
    keyTopics: [
      {
        title: "Metals & Alloys",
        description:
          "Microstructure evolution, strengthening mechanisms, and alloy design for steel, aluminium, and titanium. Heat treatment, precipitation hardening, and welding metallurgy with property verification by testing.",
      },
      {
        title: "Polymers & Composites",
        description:
          "Thermoplastic and thermoset matrix systems, fibre architectures, and laminate theory. Viscoelastic behaviour, creep, fatigue, and manufacturing-induced defects in fibre-reinforced composites.",
      },
      {
        title: "Mechanical Testing & Characterisation",
        description:
          "Tensile, compression, torsion, fatigue, and fracture toughness testing. Specimen design, data interpretation, and statistical treatment for material model development and qualification.",
      },
      {
        title: "Surface & Interface Engineering",
        description:
          "Surface energy, wettability, and adhesion. Chemical and mechanical surface treatments, coatings, and thin-film characterisation for improved bonding, wear resistance, and corrosion protection.",
      },
    ],
    applications: [
      "Structural alloy selection for aerospace",
      "Lightweight composite automotive components",
      "Biomedical implant material design",
      "Corrosion-resistant marine coatings",
      "High-temperature turbine alloys",
      "Sustainable and bio-based structural materials",
    ],
  },
  "technical-drawing": {
    heading: "Technical Drawing",
    tagline: "Communicating design intent with precision and standards compliance",
    icon: "technical-drawing",
    intro:
      "Technical Drawing is the universal language of engineering. This section provides a rigorous grounding in orthographic projection, sectional views, dimensioning, geometric dimensioning and tolerancing (GD&T), and the ISO and ASME standards governing engineering documentation. Students will develop the ability to create and interpret drawings that unambiguously communicate how a part is to be manufactured and inspected.",
    bullets: [
      "Orthographic and isometric projection techniques",
      "Sectional views and auxiliary projections",
      "Dimensioning principles and tolerancing",
      "Geometric Dimensioning & Tolerancing (GD&T / ISO 1101)",
      "Datum reference frame selection and application",
      "Surface texture and roughness specification",
      "Assembly drawings and Bill of Materials",
      "Drawing revision control and documentation management",
    ],
    keyTopics: [
      {
        title: "Projection & Views",
        description:
          "First-angle and third-angle orthographic projection, auxiliary views, broken-out sections, and revolved sections used to fully describe complex three-dimensional geometries on a two-dimensional drawing.",
      },
      {
        title: "Dimensioning & Tolerancing",
        description:
          "Correct placement of linear, angular, and radial dimensions according to ISO 129 and ASME Y14.5. Tolerance accumulation, fit and clearance specification, and their impact on manufacturability and assembly.",
      },
      {
        title: "Geometric Dimensioning & Tolerancing",
        description:
          "Complete coverage of GD&T symbols including form, orientation, location, and runout tolerances. Datum selection, feature control frames, and the relationship between functional requirements and tolerance zones.",
      },
      {
        title: "Standards & Documentation",
        description:
          "ISO and ASME drawing standards, title block conventions, revision history management, and the creation of complete drawing packages from concept sketch through production-release documentation.",
      },
    ],
    applications: [
      "Mechanical component manufacturing drawings",
      "Automotive tooling and fixture design",
      "Aerospace precision part documentation",
      "Injection mould and die design",
      "Welded fabrication and assembly drawings",
      "Quality control and inspection planning",
    ],
  },
};
