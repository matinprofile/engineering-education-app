"use client";

import { SideView } from "./SideView";
import { TopView } from "./TopView";
import { InteractiveThreeDView } from "./ThreeDScenes";
import { useSelectFaces } from "./useSelectFaces";

export function PerspectiveTool() {
  const {
    actives,
    handleClickBehind,
    handleClickSide,
    handleClickTop,
    handleClickBottomCut,
    handleClickBottomRightCut,
    handleClickRightMiddle,
    handleClickRightMiddleBottom,
    handleClickRightMiddleTop,
    handleClickLeftEdge,
    handleClickMiddleEdge,
    handleClickRightEdge,
    handleClickOtherSide,
    handleClickBottomCutTop,
  } = useSelectFaces();

  return (
    <div className="grid gap-8 rounded-2xl border border-[color:var(--border)] bg-white p-8 shadow-[0_16px_40px_rgba(48,54,44,0.08)] md:grid-cols-[320px_minmax(0,1fr)] md:p-10">
      <div className="m-auto">
        <SideView
          actives={actives}
          onClickBehind={handleClickBehind}
          onClickSide={handleClickSide}
          onClickTop={handleClickTop}
          onClickBottomCut={handleClickBottomCut}
          onClickBottomRightCut={handleClickBottomRightCut}
          onClickRightMiddle={handleClickRightMiddle}
          onClickRightMiddleBottom={handleClickRightMiddleBottom}
          onClickRightMiddleTop={handleClickRightMiddleTop}
          onClickLeftEdge={handleClickLeftEdge}
          onClickRightEdge={handleClickRightEdge}
          onClickMiddleEdge={handleClickMiddleEdge}
          onClickBottomCutTop={handleClickBottomCutTop}
        />
        <TopView
          actives={actives}
          onClickBehind={handleClickBehind}
          onClickSide={handleClickSide}
          onClickTop={handleClickTop}
          onClickBottomCut={handleClickBottomCut}
          onClickBottomRightCut={handleClickBottomRightCut}
          onClickRightMiddle={handleClickRightMiddle}
          onClickRightMiddleBottom={handleClickRightMiddleBottom}
          onClickRightMiddleTop={handleClickRightMiddleTop}
          onClickLeftEdge={handleClickLeftEdge}
          onClickRightEdge={handleClickRightEdge}
          onClickMiddleEdge={handleClickMiddleEdge}
          onClickOtherSide={handleClickOtherSide}
          onClickBottomCutTop={handleClickBottomCutTop}
        />
      </div>
      <div className="min-h-[260px] sm:min-h-[350px] md:min-h-[420px] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-primary/20">
        <InteractiveThreeDView actives={actives} />
      </div>
    </div>
  );
}