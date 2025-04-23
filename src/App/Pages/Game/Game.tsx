import React, { useEffect, useState } from "react";
import styles from "./Game.scss";
import { useGame } from "../../Hooks/useGame";
import { PlayerInfo } from "../../Components/PlayerInfo/PlayerInfo";
import { GameBoard } from "../../Components/GameBoard/GameBoard";
import { GameResultModal } from "../../Components/UI/GameResultModal/GameResultModal";
import { PlayerTimer } from "../../Components/UI/PlayerTimer/PlayerTimer";
import { Textings } from "../../Utils/Textings";

export const Game = () => {
  const { gameState, actions } = useGame();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    result: "",
    time: 0,
  });

  useEffect(() => {
    if (!gameState.isGameOver || gameState.winner === null) return;

    const calculateGameTime = () => {
      if (gameState.winner === "draw") {
        return gameState.playerTimers[0] + gameState.playerTimers[1];
      }
      return gameState.winner !== null
        ? gameState.playerTimers[gameState.winner - 1]
        : 0;
    };

    const timeout = setTimeout(() => {
      const gameTime = calculateGameTime();

      let resultText = "";
      if (gameState.winner === "draw") {
        resultText = "Нічия!";
      } else {
        const winnerName =
          gameState.winner !== null
            ? gameState.players[gameState.winner - 1].name ||
              `Гравець ${gameState.winner}`
            : "Гравець";
        resultText = `Переміг: ${winnerName}`;
      }

      setModalContent({
        result: resultText,
        time: gameTime,
      });
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [gameState.isGameOver, gameState.winner, gameState.players]);

  return (
    <div className={styles["game-container"]}>
      <h1 className={styles["game-title"]}>{Textings.MAINTEXT.TITLE}</h1>

      <PlayerInfo
        players={gameState.players}
        currentPlayer={gameState.currentPlayer}
        setPlayerName={actions.setPlayerName}
      />

      <div className={styles["grid-size-select"]}>
        <label htmlFor="gridSize">Розмір сітки: </label>
        <select
          id="gridSize"
          value={gameState.gridSize}
          onChange={(e) => actions.setGridSize(parseInt(e.target.value))}
        >
          {Array.from({ length: 7 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>
              {size} × {size}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["game-stats"]}>
        Загальна кількість зіграних ігор: {gameState.gameCount}
      </div>

      <PlayerTimer
        isActive={gameState.currentPlayer === 1}
        totalTime={gameState.playerTimers[0]}
        onTimeUpdate={(newTime) => actions.updatePlayerTimer(0, newTime)}
        disabled={gameState.isGameOver}
      />

      <PlayerTimer
        isActive={gameState.currentPlayer === 2}
        totalTime={gameState.playerTimers[1]}
        onTimeUpdate={(newTime) => actions.updatePlayerTimer(1, newTime)}
        disabled={gameState.isGameOver}
      />

      <GameBoard gameState={gameState} actions={actions} />

      <div className={styles["buttons-row"]}>
        <button onClick={actions.newGame}>Нова гра</button>
        <button onClick={actions.resetGame}>Скинути гру</button>
      </div>

      <div className={styles["modal-placeholder"]}>
        {showModal && (
          <GameResultModal
            result={modalContent.result}
            gameTime={modalContent.time}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};
