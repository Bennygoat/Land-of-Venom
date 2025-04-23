// 工具函式

// 取得隨機顏色
export function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // 0~255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
