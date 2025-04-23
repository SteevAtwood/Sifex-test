import React from "react";
import styles from "./GameResultModal.scss";
import { GameResultModalProps } from "../../../Utils/Types";

export const GameResultModal = ({
  result,
  gameTime,
  onClose,
}: GameResultModalProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{result}</h3>
        <p>Час: {formatTime(gameTime)}</p>
        <button onClick={onClose}>Зрозумiло</button>
      </div>
    </div>
  );
};
