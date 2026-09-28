"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CirclePlay } from "lucide-react";
import type { JoiningFormingGuideStep } from "@/lib/joining-forming-guides";

type JoiningFormingVideoPlayerProps = {
  steps: JoiningFormingGuideStep[];
};

export function JoiningFormingVideoPlayer({
  steps,
}: JoiningFormingVideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedVideoUrl, setFailedVideoUrl] = useState<string | null>(null);
  const currentStep = steps[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setFailedVideoUrl(null);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-white shadow-[0_12px_32px_rgba(48,54,44,0.08)]">
        <div className="flex gap-2 overflow-x-auto border-b border-[color:var(--border)] px-4 py-3 sm:px-6">
          {steps.map((step, index) => (
            <button
              key={step.videoUrl}
              type="button"
              aria-pressed={index === currentIndex}
              onClick={() => goTo(index)}
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                index === currentIndex
                  ? "bg-accent text-white"
                  : "bg-primary/45 text-muted hover:bg-primary"
              }`}
            >
              <span className="mr-2 opacity-75">{index + 1}</span>
              {step.title}
            </button>
          ))}
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,1fr)]">
          <div>
            <h2 className="mb-3 font-heading text-xl font-semibold text-text">
              {currentStep.title}
            </h2>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-[color:var(--border)] bg-neutral-950">
              {failedVideoUrl === currentStep.videoUrl ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/75">
                  <CirclePlay aria-hidden="true" className="h-12 w-12 opacity-50" />
                  <p className="text-sm">This video could not be loaded.</p>
                </div>
              ) : (
                <video
                  key={currentStep.videoUrl}
                  className="absolute inset-0 h-full w-full"
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setFailedVideoUrl(currentStep.videoUrl)}
                >
                  <source src={currentStep.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          </div>

          <div className="flex min-h-56 flex-col">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                Procedure
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {currentStep.description}
              </p>
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted">
                <span>Step {currentIndex + 1} of {steps.length}</span>
                <span>{Math.round(((currentIndex + 1) / steps.length) * 100)}%</span>
              </div>
              <div
                className="mb-5 h-1.5 overflow-hidden rounded-full bg-primary"
                role="progressbar"
                aria-label="Guide progress"
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-valuenow={currentIndex + 1}
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-300"
                  style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => goTo(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-[color:var(--border)] px-3 text-sm font-semibold text-text transition-colors hover:bg-primary/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex + 1)}
                  disabled={currentIndex === steps.length - 1}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md bg-accent px-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}