import React, { useEffect } from "react";
import styles from "./PlayerTimer.scss";
import { PlayerTimerProps } from "../../../Utils/Types";

export const PlayerTimer = ({
  isActive,
  totalTime,
  onTimeUpdate,
  disabled = false,
}: PlayerTimerProps & { disabled?: boolean }) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && !disabled) {
      interval = setInterval(() => {
        onTimeUpdate(totalTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, totalTime, disabled]);

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${min}:${rem.toString().padStart(2, "0")}`;
  };

  return <div className={styles["timer"]}>{formatTime(totalTime)}</div>;
};
