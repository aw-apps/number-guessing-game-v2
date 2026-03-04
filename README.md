# 猜數字遊戲 v2（Number Guessing Game）

一個以純 HTML/CSS/JavaScript 製作的猜數字網頁遊戲。玩家在有限次數內猜出系統隨機產生的數字，並可在本機保存最佳成績。

## 技術棧
- HTML5
- CSS3
- Vanilla JavaScript (ES2020+)
- localStorage（儲存最佳成績與偏好）

## 功能（MVP）
- 隨機產生 1–100 的目標數字
- 輸入驗證（空值、非數字、範圍外）
- 即時提示（太大 / 太小 / 猜中）
- 回合限制與重新開始
- 計分：嘗試次數、歷史最佳成績
- 響應式介面（手機/桌面）

## 本機執行
1. 下載或 clone 專案
2. 直接用瀏覽器開啟 `index.html`

## 測試
- 手動測試：
  - 輸入合法/非法值
  - 驗證提示與剩餘回合變化
  - 重新開始後狀態重置
  - 重新整理頁面後最佳成績仍保留

## 部署
本專案以 GitHub Pages 為目標：
- 分支：`main`
- 資料夾：`/ (root)`
- 預期網址：`https://aw-apps.github.io/number-guessing-game-v2/`
