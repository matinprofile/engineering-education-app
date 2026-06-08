"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ConstructorThreeDView } from "./ThreeDScenes";
import type { DrawingSelection, DrawingViewProps } from "./types";
import sideStyles from "./constructorSideView.module.css";
import topStyles from "./constructorTopView.module.css";

function ArrowUpRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

function ArrowUpLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25" />
    </svg>
  );
}

function SideViewConstructor({ actives, onClickSteps, onClickTop, onClickSide, onClickBehind }: DrawingViewProps) {
  return (
    <div className={`${sideStyles.sideView} ${actives?.start ? sideStyles.sideViewActive : ""}`} onClick={onClickSteps}>
      <div className={sideStyles.sideViewLeft}>
        <div
          className={`${sideStyles.sideViewLeftTopCut} ${actives?.start ? sideStyles.sideViewLeftTopCutActive : ""} ${actives?.top ? sideStyles.sideViewLeftTopCutActiveTop : ""}`}
          onClick={onClickTop}
        />
        <div
          className={`${sideStyles.sideViewLeftBottomCut} ${actives?.side ? sideStyles.sideViewLeftBottomCutActive : ""}`}
          onClick={onClickSide}
        />
      </div>
      <div className={sideStyles.sideViewRight}>
        <div className={`${sideStyles.sideViewRightCut} ${actives?.behind ? sideStyles.sideViewRightCutActive : ""}`} />
        <div className="absolute z-10 h-full w-4 cursor-pointer" style={{ right: "41%" }} onClick={onClickBehind} />
      </div>
    </div>
  );
}

type ConstructorTopViewProps = DrawingViewProps & {
  changeView: (view: "first" | "second") => void;
  activeView: "first" | "second" | undefined;
};

function TopViewConstructor({ actives, onClickBehind, onClickSteps, onClickTop, onClickSide, changeView, activeView }: ConstructorTopViewProps) {
  return (
    <div className={`${topStyles.topView} ${actives?.start ? topStyles.topViewStart : ""}`} onClick={onClickSteps}>
      <div className={topStyles.topViewLeft} onClick={onClickTop}>
        <div className={`${topStyles.topViewLeftCut} ${actives?.side ? topStyles.topViewLeftCutActive : ""}`} onClick={onClickSide} />
      </div>
      <div className={`${topStyles.topViewRight} ${actives?.top ? topStyles.topViewRightActive : ""}`}>
        <div className={`${topStyles.topViewRightCut} ${actives?.behind ? topStyles.topViewRightCutActiveBehind : ""}`} onClick={onClickBehind} />
        <div className="absolute -left-2 h-full w-3 cursor-pointer" onClick={onClickTop} />
      </div>
      <div className={`${topStyles.topViewFirstView} ${activeView === "first" ? topStyles.topViewActiveChoice : ""}`} onClick={() => changeView("first")}>
        <ArrowUpRight />
        View 1
      </div>
      <div className={`${topStyles.topViewSecondView} ${activeView === "second" ? topStyles.topViewActiveChoice : ""}`} onClick={() => changeView("second")}>
        <ArrowUpLeft />
        View 2
      </div>
    </div>
  );
}

export function ProjectionConstructorTool() {
  const [step, setStep] = useState<DrawingSelection>({ top: false, side: false, behind: false, start: true });
  const [count, setCount] = useState(1);
  const [activeView, setActiveView] = useState<"first" | "second" | undefined>();

  useEffect(() => {
    if (!activeView) {
      return;
    }

    const { start, behind, top, side } = step;

    if (start && !top && !side && !behind) {
      setCount(1);
      return;
    }
    if (top && !side && !behind) setCount(2);
    if (side && top && !behind) setCount(3);
    if (side && top && behind) setCount(4);
    if (!side && !top && behind) setCount(5);
    if (side && !top && behind) setCount(6);
    if (side && !top && !behind) setCount(7);
    if (!side && top && behind) setCount(8);
  }, [activeView, step]);

  function toggleStep(key: keyof DrawingSelection) {
    setStep((previous) => ({ ...previous, [key]: !previous[key] }));
  }

  function handleSteps() {
    if (!activeView) {
      return;
    }

    if (count === 0) {
      setStep((previous) => ({ ...previous, start: true }));
    }
  }

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-8 shadow-[0_16px_40px_rgba(48,54,44,0.08)] md:p-10">
      <div className="grid gap-10 py-6 md:grid-cols-[320px_minmax(0,1fr)]">
        <div className="relative m-auto mb-4">
          <SideViewConstructor
            onClickBehind={activeView ? () => toggleStep("behind") : undefined}
            onClickSide={activeView ? () => toggleStep("side") : undefined}
            onClickTop={activeView ? () => toggleStep("top") : undefined}
            onClickSteps={handleSteps}
            actives={step}
          />
          <TopViewConstructor
            changeView={setActiveView}
            activeView={activeView}
            onClickBehind={activeView ? () => toggleStep("behind") : undefined}
            onClickSide={activeView ? () => toggleStep("side") : undefined}
            onClickTop={activeView ? () => toggleStep("top") : undefined}
            onClickSteps={handleSteps}
            actives={step}
          />
        </div>
        <div className="min-h-[260px] sm:min-h-[350px] md:min-h-[420px] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-primary/20">
          {activeView ? (
            <ConstructorThreeDView count={count} activeView={activeView} />
          ) : (
            <div className="flex h-full flex-col justify-center gap-5 p-6 text-text">
              <h2 className="font-heading text-3xl font-semibold">Select the most suitable direction for observing the object.</h2>
              <p className="text-base leading-8 text-muted">Choose the viewing direction that best clarifies the piece before advancing through the construction steps.</p>
              <p className="text-sm text-muted">Good practice note: lower details should be located further forwards and higher details should be located further back.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className={`${!activeView ? "invisible" : "visible"} text-sm font-semibold ${activeView === "first" ? "text-emerald-700" : "text-red-600"}`}>
          {activeView === "second" ? "Incorrect view selected" : "Correct view selected"}
        </div>
        {count === 4 ? (
          <Link
            href="/technical-drawing/3d-perspective"
            className="inline-flex items-center justify-center rounded-xl border border-accent/40 bg-accent px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)]"
          >
            Open 3D Perspective
          </Link>
        ) : null}
      </div>
    </div>
  );
}