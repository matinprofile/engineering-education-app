import type { MouseEventHandler } from "react";

export type DrawingSelection = {
  side: boolean;
  top: boolean;
  behind: boolean;
  start?: boolean;
  bottomCut?: boolean;
  bottomRightCut?: boolean;
  rightMiddle?: boolean;
  rightMiddleBottom?: boolean;
  rightMiddleTop?: boolean;
  middleEdge?: boolean;
  rightEdge?: boolean;
  leftEdge?: boolean;
  otherSide?: boolean;
  bottomCutTop?: boolean;
};

export type DrawingViewProps = {
  actives?: DrawingSelection;
  onClickSide?: MouseEventHandler<HTMLDivElement>;
  onClickTop?: MouseEventHandler<HTMLDivElement>;
  onClickBehind?: MouseEventHandler<HTMLDivElement>;
  onClickBottomCut?: MouseEventHandler<HTMLDivElement>;
  onClickBottomRightCut?: MouseEventHandler<HTMLDivElement>;
  onClickRightMiddle?: MouseEventHandler<HTMLDivElement>;
  onClickRightMiddleBottom?: MouseEventHandler<HTMLDivElement>;
  onClickRightMiddleTop?: MouseEventHandler<HTMLDivElement>;
  onClickMiddleEdge?: MouseEventHandler<HTMLDivElement>;
  onClickRightEdge?: MouseEventHandler<HTMLDivElement>;
  onClickLeftEdge?: MouseEventHandler<HTMLDivElement>;
  onClickOtherSide?: MouseEventHandler<HTMLDivElement>;
  onClickBottomCutTop?: MouseEventHandler<HTMLDivElement>;
  onClickSteps?: () => void;
};