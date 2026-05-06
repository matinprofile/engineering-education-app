"use client";

import { SideView } from "./SideView";
import { TopView } from "./TopView";
import { useSelectFaces } from "./useSelectFaces";

export function OrthographicViewsTool() {
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
    <div className="flex flex-col-reverse items-center gap-10 rounded-2xl border border-[color:var(--border)] bg-white p-8 shadow-[0_16px_40px_rgba(48,54,44,0.08)] md:p-10">
      <TopView
        onClickBehind={handleClickBehind}
        onClickTop={handleClickTop}
        onClickSide={handleClickSide}
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
        actives={actives}
      />
      <SideView
        onClickBehind={handleClickBehind}
        onClickTop={handleClickTop}
        onClickSide={handleClickSide}
        onClickBottomCut={handleClickBottomCut}
        onClickBottomRightCut={handleClickBottomRightCut}
        onClickRightMiddle={handleClickRightMiddle}
        onClickRightMiddleBottom={handleClickRightMiddleBottom}
        onClickRightMiddleTop={handleClickRightMiddleTop}
        onClickLeftEdge={handleClickLeftEdge}
        onClickRightEdge={handleClickRightEdge}
        onClickMiddleEdge={handleClickMiddleEdge}
        onClickBottomCutTop={handleClickBottomCutTop}
        actives={actives}
      />
    </div>
  );
}