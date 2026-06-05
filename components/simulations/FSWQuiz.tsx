"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. Friction Stir Welding (FSW) is what type of joining process?",
    options: ["Fusion welding", "Solid-state welding", "Brazing"],
    correctAnswer: "Solid-state welding",
  },
  {
    question: "2. The tool used in FSW is described as:",
    options: ["Consumable", "Non-consumable", "Electrode"],
    correctAnswer: "Non-consumable",
  },
  {
    question: "3. FSW was invented by which organization in 1991?",
    options: ["MIT", "The Welding Institute (TWI)", "Edison Welding Institute (EWI)"],
    correctAnswer: "The Welding Institute (TWI)",
  },
  {
    question: "4. FSW is primarily known for welding which material with high efficiency?",
    options: ["Cast Iron", "High-Carbon Steel", "Aluminum and its alloys"],
    correctAnswer: "Aluminum and its alloys",
  },
  {
    question: "5. What are the three main microstructural zones created by FSW (in general)?",
    options: [
      "Nugget Zone, HAZ, and Fusion Zone",
      "Nugget Zone, TMAZ, and HAZ",
      "Weld Zone, Slag Zone, and HAZ",
    ],
    correctAnswer: "Nugget Zone, TMAZ, and HAZ",
  },
];

export function FSWQuiz() {
  return <QuizSimulation questions={questions} />;
}
