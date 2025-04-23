import { useState } from "react";
import { GameState, Player } from "../Utils/Types";

const createEmptyBoard = (size: number) =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

const initialPlayers: [Player, Player] = [
  { symbol: "X", wins: 0 },
  { symbol: "O", wins: 0 },
];

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(3),
    currentPlayer: 1,
    gameCount: 0,
    isGameOver: false,
    winner: null,
    gridSize: 3,
    players: initialPlayers,
    playerTimers: [0, 0],
  });

  const checkWin = (board: (string | null)[][], symbol: string): boolean => {
    const size = board.length;
    const winLine = Array(size).fill(symbol).join("");

    if (board.some((row) => row.join("") === winLine)) return true;

    for (let col = 0; col < size; col++) {
      if (board.map((row) => row[col]).join("") === winLine) return true;
    }

    if (board.map((row, i) => row[i]).join("") === winLine) return true;
    if (board.map((row, i) => row[size - i - 1]).join("") === winLine)
      return true;

    return false;
  };

  const pickCellClick = (row: number, col: number) => {
    if (gameState.isGameOver || gameState.board[row][col]) return;

    const newBoard = gameState.board.map((r) => [...r]);
    const currentSymbol = gameState.players[gameState.currentPlayer - 1].symbol;
    newBoard[row][col] = currentSymbol;

    const isWin = checkWin(newBoard, currentSymbol);
    const isDraw = !isWin && newBoard.flat().every((cell) => cell !== null);

    setGameState((prev) => {
      const updatedPlayers = [...prev.players] as [Player, Player];

      if (isWin) {
        updatedPlayers[prev.currentPlayer - 1].wins += 1;
      }

      return {
        ...prev,
        board: newBoard,
        isGameOver: isWin || isDraw,
        winner: isWin ? prev.currentPlayer : isDraw ? "draw" : null,
        players: updatedPlayers,
        currentPlayer:
          isWin || isDraw
            ? prev.currentPlayer
            : prev.currentPlayer === 1
            ? 2
            : 1,
      };
    });
  };

  const resetBoard = () => {
    setGameState((prev) => ({
      ...prev,
      board: createEmptyBoard(prev.gridSize),
      currentPlayer: 1,
      isGameOver: false,
      winner: null,
    }));
  };

  const startNewGame = () => {
    setGameState((prev) => ({
      ...prev,
      board: createEmptyBoard(prev.gridSize),
      currentPlayer: 1,
      isGameOver: false,
      winner: null,
      gameCount: prev.isGameOver ? prev.gameCount + 1 : prev.gameCount,
      playerTimers: [0, 0], 
    }));
  };

  const setGridSize = (size: number) => {
    setGameState((prev) => ({
      ...prev,
      gridSize: Math.max(3, Math.min(size, 9)),
    }));
  };

  const setPlayerName = (index: number, name: string) => {
    setGameState((prev) => {
      const updatedPlayers = [...prev.players] as [Player, Player];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        name: name.trim() === "" ? undefined : name,
      };

      return {
        ...prev,
        players: updatedPlayers,
      };
    });
  };

  const updatePlayerTimer = (playerIndex: 0 | 1, newTime: number) => {
    setGameState((prev) => {
      const updatedTimers = [...prev.playerTimers] as [number, number];
      updatedTimers[playerIndex] = newTime;
      return {
        ...prev,
        playerTimers: updatedTimers,
      };
    });
  };

  const resetPlayerTimers = () => {
    setGameState((prev) => ({
      ...prev,
      playerTimers: [0, 0], 
    }));
  };

  return {
    gameState,
    actions: {
      pickCellClick,
      resetGame: resetBoard,
      newGame: startNewGame,
      setGridSize,
      setPlayerName,
      updatePlayerTimer,
      resetPlayerTimers, 
    },
  };
};
