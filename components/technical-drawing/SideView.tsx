"use client";

import type { CSSProperties } from "react";
import type { DrawingViewProps } from "./types";
import styles from "./sideView.module.css";

const activeFill: CSSProperties = { backgroundColor: "#f24c3d" };

export function SideView({
  actives,
  onClickSide,
  onClickTop,
  onClickBehind,
  onClickBottomCut,
  onClickBottomRightCut,
  onClickRightMiddle,
  onClickRightEdge,
  onClickLeftEdge,
  onClickMiddleEdge,
  onClickBottomCutTop,
}: DrawingViewProps) {
  return (
    <div className={`${styles.sideView} ${actives?.side ? styles.sideViewSideActive : ""}`}>
      <div className={styles.sideViewLeft} onClick={onClickSide}>
        <div className={styles.sideViewLeftTopCut} onClick={(event) => event.stopPropagation()} />
        <div onClick={onClickBottomCut} className={styles.sideViewLeftBottomCut} style={actives?.bottomCut ? activeFill : undefined}>
          <div
            onClick={onClickBottomCutTop}
            className={styles.sideViewLeftBottomCutAction}
            style={actives?.bottomCutTop ? activeFill : undefined}
          />
          <div
            onClick={onClickBottomRightCut}
            className={styles.sideViewLeftBottomRightCutAction}
            style={actives?.bottomRightCut ? activeFill : undefined}
          />
        </div>
        <div
          onClick={onClickTop}
          className={`${styles.sideViewLeftMiddleCut} ${actives?.top ? styles.sideViewLeftMiddleCutActive : ""}`}
        />
        <div onClick={onClickMiddleEdge} className={styles.sideViewMiddleEdge} style={actives?.middleEdge ? activeFill : undefined} />
        <div onClick={onClickLeftEdge} className={styles.sideViewLeftEdge} style={actives?.leftEdge ? activeFill : undefined} />
      </div>
      <div className={styles.sideViewRight} onClick={onClickSide}>
        <div className={styles.sideViewRightCut} style={actives?.rightMiddleBottom || actives?.rightMiddleTop ? activeFill : undefined}>
          <div onClick={onClickRightMiddle} className={styles.sideViewRightMiddle} style={actives?.rightMiddle ? activeFill : undefined} />
        </div>
        <div
          onClick={onClickBehind}
          className={`${styles.sideViewRightTop} ${actives?.behind ? styles.sideViewRightTopActive : ""}`}
        />
        <div onClick={onClickRightEdge} className={styles.sideViewRightEdge} style={actives?.rightEdge ? activeFill : undefined} />
      </div>
    </div>
  );
}