// 蛇邏輯

import { overlay, scoreBoard } from "./ui.js";
import { gameState } from "./constants.js";
import { food, genFood } from "./food.js";
import { scoreConstants } from "./score.js";

// 蛇參數
export const snake = {
  body: [{ x: 180, y: 180 }],
  size: 40,
  speed: 40,
  dx: 0,
  dy: 0,
  snakeColor: "black",
};

// 更新蛇並產生食物動作(判斷吃到，更新蛇及食物)
export function updateSnake() {
  // 新蛇頭位置
  const newHead = {
    x: snake.body[0].x + (gameState.isSlowed ? snake.dx / 12 : snake.dx / 6),
    y: snake.body[0].y + (gameState.isSlowed ? snake.dy / 12 : snake.dy / 6),
  };
  // 碰到食物加長
  if (
    Math.abs(newHead.x - food.x) < food.size &&
    Math.abs(newHead.y - food.y) < food.size
  ) {
    scoreConstants.score += 10;
    scoreBoard.innerText = scoreConstants.score;
    genFood();
    // 新蛇頭加到陣列前方
    snake.body.unshift(newHead);
  } else {
    // 不吃就砍尾巴，不然reqaniframe會一直想要加尾巴
    snake.body.pop();
    snake.body.unshift(newHead);
  }
  if (isSelfCollide()) {
    overlay.style.display = "block";
    overlay.innerHTML = "Game Over!";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

// 判斷是否自撞
function isSelfCollide() {
  const [head, ...body] = snake.body;
  return body.some((seg) => seg.x === head.x && seg.y === head.y);
  // TODO: 改進死亡判斷邏輯，目前為暫用版本
  // 兩點距離法、好像有問題
  // const dx = seg.x - head.x;
  // const dy = seg.y - head.y;
  // const distance = Math.sqrt(dx * dx + dy * dy);
  // return distance < snake.size;
  // 有問題版基礎邏輯
  // Math.abs(seg.x - head.x) <= snake.size &&
  // Math.abs(seg.y - head.y) <= snake.size
}
