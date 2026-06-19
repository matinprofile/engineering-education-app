"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. What is the primary goal of surface preparation before adhesive bonding?",
    options: [
      "Increase material thickness",
      "Improve surface wettability and adhesion",
      "Reduce joint weight",
    ],
    correctAnswer: "Improve surface wettability and adhesion",
  },
  {
    question: "2. Atmospheric plasma treatment primarily improves which surface property?",
    options: [
      "Surface roughness (Ra)",
      "Surface energy and wettability",
      "Electrical conductivity",
    ],
    correctAnswer: "Surface energy and wettability",
  },
  {
    question: "3. In a Single Lap Joint (SLJ), where does the highest stress concentration occur?",
    options: [
      "At the centre of the overlap",
      "At the overlap edges (ends)",
      "Uniformly across the overlap",
    ],
    correctAnswer: "At the overlap edges (ends)",
  },
  {
    question: "4. Which failure mode shows fracture entirely within the adhesive layer?",
    options: [
      "Adhesive failure",
      "Cohesive failure in adhesive",
      "Substrate failure",
    ],
    correctAnswer: "Cohesive failure in adhesive",
  },
  {
    question: "5. NR613 is a standard/guideline that applies to:",
    options: [
      "Welded steel structures",
      "Adhesively bonded structural joints",
      "Composite laminate lay-up",
    ],
    correctAnswer: "Adhesively bonded structural joints",
  },
  {
    question: "6. In SLJ manufacturing, which step must occur BEFORE applying adhesive?",
    options: [
      "Curing under pressure",
      "Surface preparation and cleaning",
      "Load application",
    ],
    correctAnswer: "Surface preparation and cleaning",
  },
  {
    question: "7. A low water contact angle (near 0°) on a surface indicates:",
    options: [
      "Poor adhesion potential (hydrophobic surface)",
      "High surface energy and good wettability",
      "Surface contamination by oils",
    ],
    correctAnswer: "High surface energy and good wettability",
  },
  {
    question: "8. Adhesive failure (interfacial failure) means the bond broke:",
    options: [
      "Within the adhesive material",
      "Within the substrate material",
      "At the adhesive–substrate interface",
    ],
    correctAnswer: "At the adhesive–substrate interface",
  },
];

export function AdhesiveBondingModuleQuiz() {
  return <QuizSimulation questions={questions} quizId="adhesive-bonding-module" />;
}
