import React from "react";
import styles from "./GameBoard.scss";
import { GameBoardProps } from "../../Utils/Types";

export const GameBoard = ({ gameState, actions }: GameBoardProps) => {
  const moveCick = (row: number, col: number) => {
    actions.pickCellClick(row, col);
  };

  return (
    <div className={styles["game-board-container"]}>
      <div className={styles["game-board"]}>
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles["board-row"]}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={styles["board-cell"]}
                onClick={() => moveCick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
