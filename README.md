# 食品中微塑膠檢測｜3 小時互動教學課程

> 大學食品分析課程互動教材 — 涵蓋 NIR、FTIR、Raman、Py-GC-MS、LC-MS 五大儀器技術

## 📋 課程資訊

- **時數**：180 分鐘（含 10 分鐘休息）
- **對象**：食品科學、化學、環境工程相關科系大學部高年級或研究生
- **預備知識**：基礎有機化學、儀器分析概論
- **語言**：繁體中文（zh-TW），專業術語附英文

## 🎯 學習目標

完成本課程後，學生能夠：

1. 解釋微塑膠 (MP) 與奈米塑膠 (NP) 的定義、來源與健康疑慮
2. 比較 NIR / FTIR / Raman / Py-GC-MS / LC-MS 的原理、偵測極限與適用情境
3. 判讀 FTIR、Raman 圖譜並推斷常見塑膠種類 (PE/PP/PET/PS/PVC)
4. 根據樣品基質、目標粒徑與分析目的選擇正確的檢測方法
5. 設計合適的樣品前處理、空白組與品保流程
6. 引用代表性文獻支持自己的方法選擇

## 🧭 課程地圖

| 時間 | 模組 | 主題 |
|---|---|---|
| 0–10 min | M0 | 引言與暖身投票 |
| 10–35 min | M1 | 微塑膠 101：定義、來源、樣品前處理 |
| 35–85 min | M2 | 振動光譜：NIR、FTIR、Raman |
| 85–95 min | — | 休息 |
| 95–155 min | M3 | 質譜技術：Py-GC-MS、TED-GC-MS、LC-MS |
| 155–170 min | M4 | 方法整合與決策樹 |
| 170–180 min | M5 | 總結與 Exit Ticket |

共 **66 張投影片**，內含 14 個互動元件（選擇題、是非題、圖譜辨識題、情境決策題、短答題）。

## ✨ 功能特色

- 📊 **即時自動評分**（選擇題、是非題、圖譜辨識），每題可重新作答
- 🖼️ **內嵌 SVG 光譜圖**（NIR 為實驗室真實數據；Raman 取自 KU Leuven 公開資料庫；FTIR 依文獻峰位重建）
- ⌨️ **鍵盤翻頁**：← → 翻頁
- 🖨️ **可列印 / 匯出 PDF**（瀏覽器列印對話框）
- 📱 響應式設計

### 🎓 評量模式（教學實踐計畫 / 學習成效追蹤）

點擊右上角「📝 我要作答」可進入評量模式：
- 學生輸入學號 + 班級
- 每題作答即時上傳至 **Supabase** 雲端資料庫
- 教師端可在 [`teacher.html`](teacher.html) 用帳號密碼登入查看：
  - **整體摘要**：參與學生數、總作答數、平均正確率
  - **item_stats**：每題答對率（含進度條視覺化）
  - **class_summary**：每位學生在班級內的表現
  - **原始作答紀錄**：最近 200 筆完整資料，可匯出 CSV

> ⚠️ 預設未設定 Supabase，評量模式不會送出資料。設定方法見「Supabase 部署」章節。

## 🚀 線上瀏覽

👉 **[https://tai-shengyeh.github.io/microplastic-food-analysis/](https://tai-shengyeh.github.io/microplastic-food-analysis/)**

學生可直接打開上方網址，使用網頁版互動教材。所有作答會儲存在本機瀏覽器，可隨時匯出。

## 💻 本機使用

直接點擊 `index.html` 在瀏覽器開啟即可，無需任何伺服器或安裝依賴。

```bash
git clone https://github.com/Tai-ShengYeh/microplastic-food-analysis.git
cd microplastic-food-analysis
# 用瀏覽器打開 index.html
```

## 📚 主要參考文獻

- **方法綜論**
  - Primpke S. et al. (2020) Critical assessment of analytical methods. *Appl Spectrosc* 74:1012.
  - Schwaferts C. et al. (2019) Methods for nano- and submicrometer particles. *TrAC* 112:52.
  - La Nasa J. et al. (2020) Challenges and developments. *J Hazard Mater* 401:123379.
- **振動光譜**
  - Käppler A. et al. (2016) FTIR, Raman or both? *Anal Bioanal Chem* 408:8377.
  - Xu G. et al. (2020) SERS for &lt;1 μm. *Environ Sci Technol* 54:15594.
- **質譜技術**
  - Fischer M. & Scholz-Böttcher BM. (2017) Py-GC-MS quantification. *Environ Sci Technol* 51:5052.
  - Dümichen E. et al. (2017) TED-GC-MS. *Chemosphere* 174:572.
  - Ribeiro F. et al. (2020) Seafood Py-GC-MS. *Environ Sci Technol* 54:9408.
- **報告標準**
  - Cowger W. et al. (2020) Reporting Guidelines. *Appl Spectrosc* 74:1066.
- **食品案例**
  - Yang D. et al. (2015) Microplastics in Table Salts from China. *Environ Sci Technol* 49:13622.
  - Hernandez LM. et al. (2019) Plastic Teabags Release Billions. *Environ Sci Technol* 53:12300.
  - Li D. et al. (2020) PP feeding bottles. *Nat Food* 1:746.

## 📝 授權與使用

歡迎用於非營利教學用途，請保留原始引用文獻。教材所有光譜為教學示意 SVG，**不可作為標準儀器圖譜使用**。

## 🗄️ Supabase 部署（學習成效追蹤）

### 1. 在 Supabase 建立 schema
1. 登入 [Supabase Dashboard](https://supabase.com/dashboard) → 選擇您的專案
2. 左側 **SQL Editor** → New query → 將 [`supabase/schema.sql`](supabase/schema.sql) 全部內容貼上 → **Run**
3. 確認 `attempts` 表、`item_stats`、`class_summary` views 都建立成功

### 2. 取得專案 URL 與 anon key
- 左側 **Project Settings** → **API**
- 複製 **Project URL**（形如 `https://xxxxx.supabase.co`）
- 複製 **anon / public** 那行的 API key（不是 service role！）

### 3. 將憑證寫入 HTML
編輯 `index.html` 與 `teacher.html`，找到：
```js
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```
替換為您的值。Anon key 設計上可公開（受 Row Level Security 保護），放到 GitHub 公開 repo 也安全。

### 4. 建立教師帳號
左側 **Authentication** → **Users** → **Add user** → 用 email + password 建立帳號。
之後即可登入 `teacher.html` 看統計。

### 5. 推送並使用
```bash
git add index.html teacher.html
git commit -m "config: 寫入 Supabase 憑證"
git push
```

學生使用：開啟 GitHub Pages 網址 → 右上角「📝 我要作答」→ 輸入學號 → 每題作答即時上傳。

教師使用：打開 `<github-pages-url>/teacher.html` → 用 email/password 登入 → 看儀表板。

## 🛠️ 二次編輯

本教材為單一 HTML 檔（內嵌 CSS + JavaScript），可直接以文字編輯器修改：

- **新增投影片**：在 `<main id="studentDeck">` 內加入 `<section class="slide">...</section>`
- **新增互動題**：使用既有 `checkMCQ()` 或 `selectChoice()` JavaScript 函式，並給每題唯一 `key`
- **新增教師提示**：在任一投影片內加入 `<div class="card teacherOnly">...</div>`，預設僅教師版顯示
- **修改色調**：調整 `:root` CSS 變數 (`--accent`, `--accent2`, `--accent3`)

## 🙋 問題回報

歡迎在本 repo 開 Issue 回報內容錯誤、提問題或要求新功能。

---

🤖 教材由 Claude Code (Anthropic) 協助製作。
