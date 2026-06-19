"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. On a binary phase diagram, the liquidus line represents:",
    options: [
      "The temperature below which the alloy is fully solid",
      "The temperature above which the alloy is fully liquid",
      "The composition at the eutectic point",
    ],
    correctAnswer: "The temperature above which the alloy is fully liquid",
  },
  {
    question: "2. The eutectic point in a binary phase diagram is notable because it:",
    options: [
      "Has the highest melting temperature of all compositions",
      "Has the lowest melting temperature of all compositions in the system",
      "Always occurs at a 50/50 composition by mass",
    ],
    correctAnswer: "Has the lowest melting temperature of all compositions in the system",
  },
  {
    question: "3. A 'total solubility' (isomorphous) system means:",
    options: [
      "Components are completely immiscible in the solid state",
      "Components form a continuous solid solution at all compositions",
      "Only a limited amount of one component dissolves in the other",
    ],
    correctAnswer: "Components form a continuous solid solution at all compositions",
  },
  {
    question: "4. Face-Centred Cubic (FCC) crystal structure has atoms located at:",
    options: [
      "Corners only",
      "Corners and body centre",
      "Corners and face centres",
    ],
    correctAnswer: "Corners and face centres",
  },
  {
    question: "5. In Miller index notation, the plane (110) is perpendicular to which direction?",
    options: [
      "[100]",
      "[110]",
      "[111]",
    ],
    correctAnswer: "[110]",
  },
  {
    question: "6. FCC metals (e.g. aluminium, copper) tend to be more ductile than BCC metals because they have:",
    options: [
      "Fewer atoms per unit cell",
      "More close-packed slip systems available for plastic deformation",
      "Higher melting points",
    ],
    correctAnswer: "More close-packed slip systems available for plastic deformation",
  },
  {
    question: "7. In a partial solubility (eutectic) phase diagram, the two-phase solid region between α and β is called:",
    options: [
      "The liquidus region",
      "The α + β two-phase field",
      "The peritectic region",
    ],
    correctAnswer: "The α + β two-phase field",
  },
  {
    question: "8. Miller indices are used to describe:",
    options: [
      "The mechanical strength of a crystal",
      "Crystallographic planes and directions in a lattice",
      "The chemical composition of alloys",
    ],
    correctAnswer: "Crystallographic planes and directions in a lattice",
  },
];

export function MaterialScienceModuleQuiz() {
  return <QuizSimulation questions={questions} quizId="material-science-module" />;
}
