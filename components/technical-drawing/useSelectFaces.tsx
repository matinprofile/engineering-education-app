"use client";

import { useState } from "react";
import type { DrawingSelection } from "./types";

function toggleOnly(previous: DrawingSelection, key: keyof DrawingSelection) {
  const next = { ...previous };
  next[key] = !next[key];

  for (const property of Object.keys(next) as Array<keyof DrawingSelection>) {
    if (property !== key) {
      next[property] = false;
    }
  }

  return next;
}

export function useSelectFaces() {
  const [actives, setActives] = useState<DrawingSelection>({
    side: false,
    top: false,
    behind: false,
    bottomCut: false,
    bottomRightCut: false,
    rightMiddle: false,
    rightMiddleBottom: false,
    rightMiddleTop: false,
    middleEdge: false,
    rightEdge: false,
    leftEdge: false,
    otherSide: false,
    bottomCutTop: false,
  });

  return {
    actives,
    handleClickSide: () => setActives((previous) => ({ ...previous, ...toggleOnly(previous, "side") })),
    handleClickTop: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "top") }));
    },
    handleClickBehind: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "behind") }));
    },
    handleClickBottomCut: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "bottomCut") }));
    },
    handleClickBottomRightCut: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "bottomRightCut") }));
    },
    handleClickRightMiddle: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "rightMiddle") }));
    },
    handleClickRightMiddleTop: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "rightMiddleTop") }));
    },
    handleClickRightMiddleBottom: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "rightMiddleBottom") }));
    },
    handleClickMiddleEdge: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "middleEdge") }));
    },
    handleClickRightEdge: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "rightEdge") }));
    },
    handleClickLeftEdge: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "leftEdge") }));
    },
    handleClickOtherSide: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "otherSide") }));
    },
    handleClickBottomCutTop: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setActives((previous) => ({ ...previous, ...toggleOnly(previous, "bottomCutTop") }));
    },
  };
}