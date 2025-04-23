//game.js — 遊戲邏輯核心
// 功能：
// 控制 canvas 繪圖
// 控制蛇移動、碰撞、加分、扣分等邏輯
// 管理遊戲狀態（進行中、暫停、Game Over）
// 可以定義 startGame()、updateGame()、resetGame() 等邏輯
// 遊戲主流程（開始、結束、控制流程）

import { gameState, gameBorder } from "./constants.js";
import { scoreConstants } from "./score.js";
import { snake, updateSnake } from "./snake.js";
import { food } from "./food.js";
import { scoreBoard, ctx, canvas } from "./ui.js";
import { getRandomColor } from "./utils.js";

// 判斷是否在邊界需要扣分
export function applyBorderPenalty(gameState) {
  if (gameState) {
    // ->start timer
    if (scoreConstants.borderPenaltyID === null) {
      scoreConstants.borderPenaltyID = setInterval(() => {
        if (scoreConstants.score <= 0) {
          scoreConstants.score = 0;
          clearInterval(scoreConstants.borderPenaltyID);
          scoreConstants.borderPenaltyID = null;
          return;
        }
        scoreConstants.score -= scoreConstants.borderPenalty;
        scoreBoard.innerText = scoreConstants.score;
      }, 500);
    }
  } else if (scoreConstants.borderPenaltyID !== null) {
    // not on border -> clear timer
    // 發現有scoreConstants.borderPenaltyID就必須先關掉，避免多重扣分
    clearInterval(scoreConstants.borderPenaltyID);
    scoreConstants.borderPenaltyID = null;
    return;
  }
}

// 判斷是否蝶家在對方身上:計算面積，可以偷取對方分數

// 畫蛇及食物、移動
export function draw() {
  // 畫布清除
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 邊界停止並變色
  if (
    snake.body[0].y <= 0 ||
    snake.body[0].y >= gameBorder.gameBorderY ||
    snake.body[0].x <= 0 ||
    snake.body[0].x >= gameBorder.gameBorderX
  ) {
    snake.snakeColor = getRandomColor();
    snake.body[0].y = Math.max(
      0,
      Math.min(snake.body[0].y, gameBorder.gameBorderY)
    );
    snake.body[0].x = Math.max(
      0,
      Math.min(snake.body[0].x, gameBorder.gameBorderX)
    );

    // 邊界降速，未來擴充扣分
    if (!gameState.isOnBorder) {
      gameState.isOnBorder = true;
      gameState.isSlowed = true;
      setTimeout(() => {
        gameState.isOnBorder = false;
        gameState.isSlowed = false;
      }, 1000);
    }
  }

  // 定義蛇的重繪顏色及速度
  // 繪圖蛇
  for (let seg of snake.body) {
    ctx.fillStyle = snake.snakeColor;
    ctx.fillRect(seg.x, seg.y, snake.size, snake.size);
  }

  // 繪圖食物
  ctx.fillStyle = food.foodColor;
  ctx.fillRect(food.x, food.y, food.size, food.size);

  // 判斷吃到，更新蛇及食物
  updateSnake();

  // 扣分
  applyBorderPenalty(gameState.isOnBorder);

  // 自動重新繪圖
  requestAnimationFrame(draw);
}

// 操作移動
export function keyboardControls() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (snake.body[0].y <= 0 || gameState.direction === "down") {
          return;
        }
        gameState.direction = "up";
        snake.dy = -snake.speed;
        snake.dx = 0;
        break;
      case "ArrowDown":
        if (
          snake.body[0].y >= gameBorder.gameBorderY ||
          gameState.direction === "up"
        ) {
          return;
        }
        gameState.direction = "down";
        snake.dy = snake.speed;
        snake.dx = 0;
        break;
      case "ArrowLeft":
        if (snake.body[0].x <= 0 || gameState.direction === "right") {
          return;
        }
        gameState.direction = "left";
        snake.dx = -snake.speed;
        snake.dy = 0;
        break;
      case "ArrowRight":
        if (
          snake.body[0].x >= gameBorder.gameBorderX ||
          gameState.direction === "left"
        ) {
          return;
        }
        gameState.direction = "right";
        snake.dx = snake.speed;
        snake.dy = 0;
        break;
    }
  });
}
