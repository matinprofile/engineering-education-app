"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. What is the primary heat source in Laser Beam Welding (LBW)?",
    options: ["A high-velocity electron beam", "A concentrated stream of photons", "A focused electric arc"],
    correctAnswer: "A concentrated stream of photons",
  },
  {
    question: "2. Laser welding is generally categorized as what type of welding process?",
    options: ["Solid-state welding", "Fusion welding", "Resistance welding"],
    correctAnswer: "Fusion welding",
  },
  {
    question: "3. What phenomenon is crucial for deep, narrow welds in Keyhole Mode Laser Welding?",
    options: ["Plasma jetting", "Creating a vaporized column (keyhole)", "Using a consumable electrode"],
    correctAnswer: "Creating a vaporized column (keyhole)",
  },
  {
    question: "4. What is a major advantage of Laser Welding regarding the Heat-Affected Zone (HAZ)?",
    options: ["It produces a very wide HAZ", "It results in a minimal, narrow HAZ", "It completely eliminates the HAZ"],
    correctAnswer: "It results in a minimal, narrow HAZ",
  },
  {
    question: "5. Which laser type is commonly used for high-power industrial welding due to its efficiency and beam quality?",
    options: ["CO2 Laser", "Fiber Laser", "Nd:YAG Laser"],
    correctAnswer: "Fiber Laser",
  },
];

export function LaserQuiz() {
  return <QuizSimulation questions={questions} />;
}
