// 畫面渲染
// 開始倒數計時動畫fn
import { overlay } from "./ui.js";

export function startCountdown(callback) {
  let count = Number(overlay.innerText);

  const interval = setInterval(() => {
    if (count > 0) {
      overlay.innerText = count;
      count--;
    } else if (count === 0) {
      overlay.innerText = "Start!";
      count--;
    } else {
      clearInterval(interval);
      overlay.style.display = "none";
      if (callback) callback(); // 倒數完呼叫開始遊戲邏輯
    }
  }, 1000);
}
