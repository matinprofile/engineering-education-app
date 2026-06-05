"use client";

import { useState } from "react";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizSimulationProps = {
  questions: QuizQuestion[];
};

export function QuizSimulation({ questions }: QuizSimulationProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.correctAnswer).length
    : 0;

  function handleAnswer(qi: number, value: string) {
    if (!submitted) setAnswers((prev) => ({ ...prev, [qi]: value }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length === questions.length) setSubmitted(true);
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div
            key={qi}
            className="rounded-xl border border-[color:var(--border)] bg-white p-6 shadow-[0_4px_16px_rgba(48,54,44,0.06)]"
          >
            <p className="mb-4 font-semibold text-text">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === opt;
                const isCorrect = opt === q.correctAnswer;

                let cls =
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ";

                if (!submitted) {
                  cls += isSelected
                    ? "border-accent bg-accent/10 text-text font-medium"
                    : "border-[color:var(--border)] text-muted hover:border-accent/40 hover:bg-primary/40";
                } else {
                  if (isCorrect)
                    cls += "border-green-400 bg-green-50 font-medium text-green-800";
                  else if (isSelected)
                    cls += "border-red-400 bg-red-50 text-red-700";
                  else cls += "border-[color:var(--border)] text-muted opacity-50";
                }

                return (
                  <label key={oi} className={cls}>
                    <input
                      type="radio"
                      name={`q${qi}`}
                      value={opt}
                      checked={isSelected}
                      onChange={() => handleAnswer(qi, opt)}
                      disabled={submitted}
                      className="accent-accent shrink-0"
                    />
                    <span className="flex-1">{opt}</span>
                    {submitted && isCorrect && (
                      <svg
                        className="ml-auto h-4 w-4 shrink-0 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <svg
                        className="ml-auto h-4 w-4 shrink-0 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Quiz
          </button>
        ) : (
          <>
            <div
              className={`rounded-xl border px-6 py-3 text-sm font-semibold ${
                score === questions.length
                  ? "border-green-400 bg-green-50 text-green-800"
                  : score >= questions.length / 2
                  ? "border-accent/40 bg-primary/40 text-text"
                  : "border-red-300 bg-red-50 text-red-700"
              }`}
            >
              Score: {score} / {questions.length}
            </div>
            <button
              onClick={handleRetry}
              className="rounded-lg border border-[color:var(--border)] px-6 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              Try Again
            </button>
          </>
        )}
        {!submitted && Object.keys(answers).length < questions.length && (
          <span className="text-xs text-muted">
            {questions.length - Object.keys(answers).length} question
            {questions.length - Object.keys(answers).length > 1 ? "s" : ""} remaining
          </span>
        )}
      </div>
    </div>
  );
}
