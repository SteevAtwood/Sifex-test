import React, { useState } from "react";
import styles from "./PlayerInfo.scss";
import { PlayerInfoProps } from "../../Utils/Types";

export const PlayerInfo = ({
  players,
  currentPlayer,
  setPlayerName,
}: PlayerInfoProps & {
  setPlayerName: (index: number, name: string) => void;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");

  const changeNameClick = (index: number, currentName: string | undefined) => {
    setEditingIndex(index);
    setTempName(currentName ?? "");
  };

  const blur = (index: number) => {
    setPlayerName(index, tempName);
    setEditingIndex(null);
  };

  return (
    <div className={styles["player-info-container"]}>
      {players.map((player, index) => {
        const playerNumber = index + 1;
        const isCurrent = currentPlayer === playerNumber;

        return (
          <div key={playerNumber} className={styles["player-card"]}>
            {editingIndex === index ? (
              <input
                className={styles["player-name-input"]}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={() => blur(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") blur(index);
                }}
              />
            ) : (
              <span
                className={styles["player-title"]}
                onClick={() => changeNameClick(index, player.name)}
              >
                {player.name || `ГРАВЕЦЬ ${playerNumber}`} ✏️
              </span>
            )}
            <span className={styles["player-symbol"]}>
              ● символ - {player.symbol}
            </span>
            <span className={styles["player-wins"]}>
              ● кількість виграшів - {player.wins}
            </span>
            {isCurrent && (
              <span className={styles["current-turn"]}>👉 Зараз ходить</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
