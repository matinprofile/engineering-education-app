"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. Clinching is a joining technique that:",
    options: [
      "Melts and fuses metal sheets using electrical resistance",
      "Mechanically interlocks sheet metal layers by plastic deformation",
      "Uses adhesive between metal surfaces under heat and pressure",
    ],
    correctAnswer: "Mechanically interlocks sheet metal layers by plastic deformation",
  },
  {
    question: "2. A key advantage of clinching over spot welding is:",
    options: [
      "Higher electrical conductivity of the joint",
      "No heat input required — it is a cold-forming process",
      "It can only join identical materials",
    ],
    correctAnswer: "No heat input required — it is a cold-forming process",
  },
  {
    question: "3. Clinching can join dissimilar materials (e.g. aluminium + steel) because:",
    options: [
      "Both metals melt at the same temperature",
      "It relies on mechanical interlocking, not metallurgical bonding",
      "A filler material bridges the two metals",
    ],
    correctAnswer: "It relies on mechanical interlocking, not metallurgical bonding",
  },
  {
    question: "4. In a clinching operation, the die geometry primarily controls:",
    options: [
      "The temperature of the joining zone",
      "The shape and dimensions of the clinch button (neck and undercut)",
      "The travel speed of the punch",
    ],
    correctAnswer: "The shape and dimensions of the clinch button (neck and undercut)",
  },
  {
    question: "5. Clinching is classified as a joining-by-forming process because:",
    options: [
      "It forms a new alloy at the joint interface",
      "It permanently deforms the material to create mechanical interlocking",
      "It uses forming gas as a shielding atmosphere",
    ],
    correctAnswer: "It permanently deforms the material to create mechanical interlocking",
  },
];

export function JoiningFormingModuleQuiz() {
  return <QuizSimulation questions={questions} quizId="joining-forming-module" />;
}
