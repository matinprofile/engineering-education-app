"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. In MAG welding, what is the primary role of the shielding gas?",
    options: [
      "Act as a filler material",
      "Protect the weld pool from atmospheric contamination",
      "Preheat the base metal",
    ],
    correctAnswer: "Protect the weld pool from atmospheric contamination",
  },
  {
    question: "2. What does proper joint preparation (groove geometry) primarily control?",
    options: [
      "Electrode consumption rate",
      "Weld volume, fusion depth, and distortion",
      "Travel speed of the torch",
    ],
    correctAnswer: "Weld volume, fusion depth, and distortion",
  },
  {
    question: "3. The Heat-Affected Zone (HAZ) in welding is the region that:",
    options: [
      "Melts and re-solidifies",
      "Is heated but does not melt, altering its microstructure",
      "Remains completely unaffected by the weld thermal cycle",
    ],
    correctAnswer: "Is heated but does not melt, altering its microstructure",
  },
  {
    question: "4. Ultrasound A-scan inspection detects internal weld defects by:",
    options: [
      "Analysing X-ray film darkening",
      "Measuring reflected sound wave echoes (amplitude vs. time)",
      "Observing magnetic flux leakage",
    ],
    correctAnswer: "Measuring reflected sound wave echoes (amplitude vs. time)",
  },
  {
    question: "5. In radiographic (X-ray) weld inspection, porosity defects appear on film as:",
    options: [
      "Sharp bright lines",
      "Dark rounded spots",
      "Wide light regions",
    ],
    correctAnswer: "Dark rounded spots",
  },
  {
    question: "6. FSW (Friction Stir Welding) produces welds without melting the base material — this makes it a:",
    options: [
      "Fusion welding process",
      "Solid-state welding process",
      "Brazing process",
    ],
    correctAnswer: "Solid-state welding process",
  },
  {
    question: "7. In laser keyhole welding, the 'keyhole' is:",
    options: [
      "A tooling fixture for beam alignment",
      "A vapour cavity formed by intense laser energy enabling deep penetration",
      "A pre-drilled hole to guide the beam",
    ],
    correctAnswer: "A vapour cavity formed by intense laser energy enabling deep penetration",
  },
  {
    question: "8. Porosity in welds is most commonly caused by:",
    options: [
      "Excessive travel speed",
      "Trapped gas from contamination, moisture, or insufficient shielding",
      "Too low a heat input",
    ],
    correctAnswer: "Trapped gas from contamination, moisture, or insufficient shielding",
  },
];

export function WeldingModuleQuiz() {
  return <QuizSimulation questions={questions} quizId="welding-module" />;
}
