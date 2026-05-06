"use client";

import type { CSSProperties } from "react";
import type { DrawingViewProps } from "./types";
import styles from "./topView.module.css";

const activeFill: CSSProperties = { backgroundColor: "#f24c3d" };

export function TopView({
  actives,
  onClickSide,
  onClickTop,
  onClickBehind,
  onClickBottomCut,
  onClickBottomRightCut,
  onClickRightMiddle,
  onClickRightMiddleBottom,
  onClickRightMiddleTop,
  onClickMiddleEdge,
  onClickLeftEdge,
  onClickRightEdge,
  onClickOtherSide,
  onClickBottomCutTop,
}: DrawingViewProps) {
  return (
    <div className={styles.topView}>
      <div onClick={onClickOtherSide} className={styles.topViewOtherSide} style={actives?.otherSide ? activeFill : undefined} />
      <div className={`${styles.topViewLeft} ${actives?.top ? styles.topViewLeftActive : ""}`} onClick={onClickTop}>
        <div onClick={onClickLeftEdge} className={styles.topViewLeftEdge} style={actives?.leftEdge ? activeFill : undefined} />
        <div onClick={onClickBottomCutTop} className={styles.topViewLeftCut} style={actives?.bottomCutTop ? activeFill : undefined}>
          <div onClick={onClickBottomCut} className={styles.topViewTopAction} style={actives?.bottomCut ? activeFill : undefined} />
          <div onClick={onClickBottomRightCut} className={styles.topViewLeftRightCut} style={actives?.bottomRightCut ? activeFill : undefined} />
        </div>
      </div>
      <div onClick={onClickBehind} className={`${styles.topViewRight} ${actives?.behind ? styles.topViewRightActive : ""}`}>
        <div onClick={onClickMiddleEdge} className={styles.topViewMiddleEdge} style={actives?.middleEdge ? activeFill : undefined} />
        <div onClick={onClickRightEdge} className={styles.topViewRightEdge} style={actives?.rightEdge ? activeFill : undefined} />
        <div className={styles.topViewRightCut} onClick={(event) => event.stopPropagation()}>
          <div onClick={onClickRightMiddle} className={styles.topViewRightMiddle} style={actives?.rightMiddle ? activeFill : undefined} />
          <div onClick={onClickRightMiddleBottom} className={styles.topViewRightMiddleBottom} style={actives?.rightMiddleBottom ? activeFill : undefined} />
          <div onClick={onClickRightMiddleTop} className={styles.topViewRightMiddleTop} style={actives?.rightMiddleTop ? activeFill : undefined} />
        </div>
      </div>
      <div onClick={onClickSide} className={styles.topViewSideCut} style={actives?.side ? activeFill : undefined} />
    </div>
  );
}