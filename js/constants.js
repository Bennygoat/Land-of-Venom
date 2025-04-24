// 全域參數
export const gridSize = 40;
export const speed = 10;
export const gameBorder = {
  gameBorderX: game.width - gridSize,
  gameBorderY: game.height - gridSize,
};

// 狀態
export const gameState = {
  isSlowed: false,
  isOnBorder: false,
  direction: "",
  isUnderProtection: true,
};
