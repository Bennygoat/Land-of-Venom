// 食物邏輯
// 食物參數
import { snake } from "./snake.js";
import { game } from "./ui.js";
import { getRandomColor } from "./utils.js";
import { ctx } from "./ui.js";

export const food = {
  x: 0,
  y: 0,
  size: 40,
  foodColor: "black",
  // 必須吃到時間，否則逞罰長度增加
};

// 寶物參數
export const treasure = {
  x: 0,
  y: 0,
  size: 20,
  // 寶物fn
  // 1. 畫布變大(最大限制，太大換獎勵)
  // 2. 速度變慢(最慢限制，太慢換獎勵)
  // 3. 長度變少(1-3，最少1，太少可以留著使用)
  // 4. 分數隨機增加(10-100)
  // 5. 時間隨機增加(1-60s)
};

//  大便參數
export const poop = {
  x: 0,
  y: 0,
  size: 20,
  // 大便fn ，寶物相反
  // 1. 畫布變大(最大限制，太大換獎勵)
  // 2. 速度變慢(最慢限制，太慢換獎勵)
  // 3. 長度變少(1-3，最少1，太少可以留著使用)
  // 4. 分數隨機增加(10-100)
  // 5. 時間隨機增加(1-60s)
};

// 判斷食物蛇重疊
export function isFoodOnSnake(x, y) {
  return snake.body.some((seg) => seg.x === x && seg.y === y);
}

// 產生食物
export function genFood() {
  // 畫布內可出現的單位數
  const gridCountX = Math.floor(game.width / food.size);
  const gridCountY = Math.floor(game.height / food.size);
  // 食物參數
  // location
  let xpos, ypos;
  do {
    xpos = Math.floor(Math.random() * gridCountX) * food.size;
    ypos = Math.floor(Math.random() * gridCountY) * food.size;
  } while (isFoodOnSnake(xpos, ypos));
  // color
  food.x = xpos;
  food.y = ypos;
  do {
    food.foodColor = getRandomColor();
  } while (food.foodColor === snake.snakeColor);
  // 繪圖食物
  ctx.fillStyle = food.foodColor;
  ctx.fillRect(food.x, food.y, food.size, food.size);
}
