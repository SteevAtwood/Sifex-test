export type Player = {
  symbol: "X" | "O";
  wins: number;
  name?: string;
};

export type GameState = {
  board: (string | null)[][];
  currentPlayer: 1 | 2;
  gameCount: number;
  isGameOver: boolean;
  winner: null | 1 | 2 | "draw";
  gridSize: number;
  players: [Player, Player];
  playerTimers: [number, number];
};

export type GameActions = {
  pickCellClick: (row: number, col: number) => void;
  resetGame: () => void;
  newGame: () => void;
  setGridSize: (size: number) => void;
};

export type PlayerInfoProps = {
  players: [Player, Player];
  currentPlayer: 1 | 2;
};

export type GameBoardProps = {
  gameState: GameState;
  actions: GameActions;
};

export type GameResultModalProps = {
  result: string;
  gameTime: number;
  onClose: () => void;
  isDraw?: boolean;
};

export type PlayerTimerProps = {
  isActive: boolean;
  totalTime: number;
  onTimeUpdate: (newTime: number) => void;
  disabled?: boolean;
};
