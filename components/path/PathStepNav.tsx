"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getPathForHref, type PathStep } from "@/lib/paths";
import { recordVisit, updateTimeSpent } from "@/lib/tracking";

type PathStepNavProps = {
  steps: PathStep[];
  currentIndex: number;
  pathTitle: string;
};

export function PathStepNav({ steps, currentIndex, pathTitle }: PathStepNavProps) {
  const currentStep = steps[currentIndex];
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const href = currentStep.href;
    const pathInfo = getPathForHref(href);
    const module = pathInfo?.path.module ?? "";
    startTime.current = Date.now();
    recordVisit(href, module, currentStep.title);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateTimeSpent(href, (Date.now() - startTime.current) / 1000);
      } else {
        startTime.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      updateTimeSpent(href, (Date.now() - startTime.current) / 1000);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [currentStep.href, currentStep.title]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-[color:var(--border)] bg-white px-6 py-5 shadow-[0_4px_16px_rgba(48,54,44,0.06)] sm:flex-row sm:justify-between">
        {/* Previous */}
        <div className="w-full sm:w-56">
          {prevStep ? (
            <Link
              href={prevStep.href}
              className="group flex items-center gap-2 text-sm transition-colors hover:text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted group-hover:text-accent"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted/60">Previous</div>
                <div className="font-medium text-text group-hover:text-accent">{prevStep.title}</div>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" aria-hidden />
          )}
        </div>

        {/* Center — progress */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent/70">
            {pathTitle} Learning Path
          </div>
          <div className="text-sm font-semibold text-text">
            Step {currentIndex + 1} of {steps.length}
          </div>
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < currentIndex
                    ? "h-1.5 w-4 bg-accent"
                    : i === currentIndex
                    ? "h-1.5 w-6 bg-accent"
                    : "h-1.5 w-4 bg-accent/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <div className="w-full sm:w-56 sm:text-right">
          {nextStep ? (
            <Link
              href={nextStep.href}
              className="group flex items-center justify-start gap-2 text-sm transition-colors hover:text-accent sm:justify-end"
            >
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted/60 sm:text-right">Next</div>
                <div className="font-medium text-text group-hover:text-accent">{nextStep.title}</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted group-hover:text-accent"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center justify-start gap-2 sm:justify-end">
              <div className="sm:text-right">
                <div className="text-xs font-medium uppercase tracking-widest text-accent/70">Path Complete</div>
                <div className="font-medium text-accent">All steps done!</div>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
