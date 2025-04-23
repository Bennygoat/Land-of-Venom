// 入口點，統一 import 所有功能，啟動遊戲
// 執行
import { genFood } from "./food.js";
import { draw, keyboardControls } from "./game.js";
import { startCountdown } from "./render.js";

window.onload = () => {
  keyboardControls(); // 鍵盤控制
  startCountdown(() => {
    genFood();
    draw(); // 倒數結束後才開始真正的遊戲
  });
};

// // 資料: 遊戲時間、玩家id帳號密碼、玩家得分、排名(最強玩家可以放音樂)、死亡長度、寶箱數、垃圾數
// // 待新增基礎功能:
// // 2. 及格邊際，一定時間內必須達到指定分數否則out
// // 3.
// // 模式1: single snake
// // 模式2: snake on snake : 寶物可以充當武器使用
