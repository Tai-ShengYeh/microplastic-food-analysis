# 微塑膠機器學習實作工作坊

> 3.5 小時 hands-on lab：親手掃描塑膠光譜 → 用 Orange Data Mining 做 PCA 與分類器

## 🎯 工作坊目標

完成後，你將能夠：
1. 操作 InnoSpectra / NeoSpectra / MicroNIR 三種行動式 NIR 與 Ocean Optics QE Pro Raman（532 + 785 nm）量測塑膠光譜
2. 使用 **Orange Data Mining** 載入光譜資料、執行預處理、PCA 視覺化、訓練分類器、評估模型
3. 應用 ML 模型預測未知塑膠樣品的類型
4. 理解 ML 在微塑膠分析的限制（過度配適、訓練偏差、out-of-distribution）

## 📅 課前準備（**請務必在課前完成**）

### 1. 安裝 Orange Data Mining

下載：https://orangedatamining.com/download/

- Windows / macOS / Linux 都支援
- 安裝完打開 Orange，**確認版本 ≥ 3.36**

### 2. 安裝 Spectroscopy add-on

Orange 主畫面 → **Options → Add-ons** → 勾選 **Spectroscopy** → Install

> 若 Add-ons 視窗找不到 Spectroscopy，可手動執行：
> ```
> pip install Orange3-Spectroscopy
> ```

### 3. 下載本工作坊資料

從本 repo 下載：
- [`plastic_reference_library.csv`](plastic_reference_library.csv) — KU Leuven Raman 參考光譜庫
- [`student_template.csv`](student_template.csv) — 學生上傳格式範本
- [`plastic_classification.ows`](plastic_classification.ows) — Orange workflow 範本

### 4. 帳號準備

- 知道你的學號
- 知道分組編號（會在課堂發放）

## 🗂️ 工作坊網址

打開：**https://tai-shengyeh.github.io/microplastic-food-analysis/microplastic-ml-workshop.html**

## 📦 樣品清單

每組會分配到 5 種塑膠樣品（皆已切成適合光譜量測的尺寸）：

| 代號 | 全名 | 來源 |
|---|---|---|
| PE | 聚乙烯 | 食品袋、保鮮膜 |
| PP | 聚丙烯 | 微波容器、優格杯 |
| PET | 聚對苯二甲酸乙二酯 | 保特瓶碎片 |
| PS | 聚苯乙烯 | 免洗杯切片 |
| PVC | 聚氯乙烯 | 紅色保鮮膜 |

外加 1–2 個 **未知樣品**（可能是 PA、ABS、PC，或老化塑膠）— 用於模型挑戰。

## 🔬 量測規格

### NIR
- 三種儀器各組輪流使用：InnoSpectra、NeoSpectra、MicroNIR
- 波長範圍：900–1700 nm（InnoSpectra/MicroNIR）或 1350–2500 nm（NeoSpectra）
- 每個樣品 3 重複，取平均

### Raman
- Ocean Optics QE Pro，分別用 532 + 785 nm 雷射各掃一次
- 整合時間：1–5 秒（依樣品調整）
- 注意：有色塑膠（如紅色 PVC）建議用 **785 nm** 避免螢光干擾

## 🤖 ML 分析流程（Orange 中執行）

```
File (載入學生 CSV)
   ↓
Spectra (轉成光譜格式)
   ↓
Preprocess Spectra (baseline + SNV)
   ↓
   ├─→ PCA → Scatter Plot (視覺化分群)
   └─→ Random Forest / SVM / kNN
              ↓
        Test and Score (cross-validation 評估)
              ↓
        Confusion Matrix (看哪些塑膠最易混淆)
              ↓
        Predictions (預測未知樣品)
```

## 🆘 常見問題

| 問題 | 解法 |
|---|---|
| Orange 找不到 Spectra 選項 | 確認已安裝 Spectroscopy add-on 並重啟 Orange |
| CSV 載入後看不到光譜 | 第一欄須是波長/波數，後續欄位是各樣品強度 |
| 分類準確率 < 50% | 檢查預處理（基線、正規化）是否做對；確認類別標籤無誤 |
| PCA 圖看不出分群 | 試試先做 SNV normalization |
| 上傳到雲端失敗 | 檢查網路；學號是否輸入；瀏覽器 F12 看 Console 錯誤 |

## 📚 延伸閱讀

- **Orange Data Mining**: https://orangedatamining.com/
- **OpenSpecy**（線上微塑膠光譜比對）: https://openspecy.org/
- **siMPle**（自動化 FTIR 影像分析）: Primpke et al. (2020) *Appl Spectrosc* 74:1012
- **OpenSpecy 論文**: Cowger et al. (2021) *Anal Chem* 93:7543

## 🔗 相關連結

- 主課程：[食品中微塑膠檢測 3 小時互動課程](../)
- 教師儀表板：[teacher.html](../teacher.html)
- Supabase schema：[schema.sql](../supabase/schema.sql)

---

🤖 教材由 Claude Code (Anthropic) 協助製作
