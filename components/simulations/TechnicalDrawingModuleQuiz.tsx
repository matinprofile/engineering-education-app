"use client";

import { QuizSimulation, type QuizQuestion } from "./QuizSimulation";

const questions: QuizQuestion[] = [
  {
    question: "1. How many standard orthographic views are defined in ISO engineering drawing?",
    options: [
      "3 views (front, top, side)",
      "6 views (front, back, top, bottom, left, right)",
      "4 views (front, top, left, isometric)",
    ],
    correctAnswer: "6 views (front, back, top, bottom, left, right)",
  },
  {
    question: "2. In first-angle (European) projection, where is the top view placed relative to the front view?",
    options: [
      "Above the front view",
      "Below the front view",
      "To the right of the front view",
    ],
    correctAnswer: "Below the front view",
  },
  {
    question: "3. Hidden edges in orthographic engineering drawings are represented by:",
    options: [
      "Continuous thick lines",
      "Dashed or dotted thin lines",
      "Centre lines (dash-dot)",
    ],
    correctAnswer: "Dashed or dotted thin lines",
  },
  {
    question: "4. A section view in engineering drawing is used to:",
    options: [
      "Show the outer silhouette of a part",
      "Reveal internal features by cutting through the object",
      "Indicate surface finish requirements",
    ],
    correctAnswer: "Reveal internal features by cutting through the object",
  },
  {
    question: "5. In an isometric drawing, the two horizontal axes are drawn at what angle to the horizontal?",
    options: [
      "45°",
      "30°",
      "60°",
    ],
    correctAnswer: "30°",
  },
  {
    question: "6. A vanishing point in perspective drawing is where:",
    options: [
      "All dimensions are measured from",
      "Parallel lines in 3D space appear to converge on the horizon",
      "The centre of the object is projected",
    ],
    correctAnswer: "Parallel lines in 3D space appear to converge on the horizon",
  },
];

export function TechnicalDrawingModuleQuiz() {
  return <QuizSimulation questions={questions} quizId="technical-drawing-module" />;
}
