# 光譜參考資料 / Reference Spectra

本資料夾包含教材中圖譜所引用的原始公開資料與重建合成資料。

## Raman 光譜（KU Leuven 公開資料庫）

`raman_kuleuven/*.csv` — Raman spectra of common polymers from the EXIMIOUS HPU library, KU Leuven Research Data Repository.

- **DOI**: [doi:10.48804/FZNZMH](https://doi.org/10.48804/FZNZMH)
- **Authors**: EXIMIOUS Project, KU Leuven
- **License**: Open access (please cite original authors when using)
- **Coverage**: HDPE, LDPE, PP, PET, PS, PVC（Raman shift 51–3400 cm⁻¹）
- **Format**: CSV with two columns — Raman shift (cm⁻¹), intensity (counts)

## NIR 光譜（教師自量數據）

S12 投影片使用的 PE NIR 光譜（900–2400 nm）源自課程教師於 `D:/Anti/plastic_0527_2026/` 用 NeoSpectra / InnoSpectra NIR 量測的塑膠袋樣品（`bag1_run1`），未做基線校正，僅作教學示意。

## FTIR 光譜（依文獻峰位重建）

教材中的 FTIR 圖譜為合成 SVG，依下列文獻所列峰位重建：

- **Käppler A. et al. (2018)** Analysis of environmental microplastics by vibrational microspectroscopy: FTIR, Raman or both? *Anal Bioanal Chem* 408:8377–8391. [doi:10.1007/s00216-018-1156-x](https://doi.org/10.1007/s00216-018-1156-x)
- **Jung MR. et al. (2018)** Validation of ATR FT-IR to identify polymers of plastic marine debris. *Mar Pollut Bull* 127:704–716.
- 峰位資料庫亦可參考 [Rochman Lab Spectral Libraries](https://rochmanlab.wordpress.com/spectral-libraries-for-microplastics-research/)（FLOPP, FLOPP-e）

## 處理後資料

`spectra_data.json` — 經 downsample 與正規化處理後嵌入 HTML 的所有光譜資料，由 JavaScript 在頁面載入時即時繪製 SVG。

## 重新生成

如需重新處理光譜資料：

```bash
# Raman from KU Leuven dataverse API
curl -L https://rdr.kuleuven.be/api/access/datafile/266332 -o raman_kuleuven/HDPE.csv
# ... (見 commit log 中的 download script)

# 重新產生嵌入 JSON
python scripts/build_spectra_json.py  # （尚未提取為獨立腳本）
```
