# Microplastic Machine Learning Workshop (English)

> 3.5-hour hands-on laboratory module: students acquire NIR and Raman spectra of reference plastics on instruments, contribute to a shared cloud dataset, and build classifiers in Orange Data Mining.

## 🌐 Online URLs

| Module | URL |
|---|---|
| **ML Workshop (English)** | [microplastic-ml-workshop.html](https://tai-shengyeh.github.io/microplastic-food-analysis/en/microplastic-ml-workshop.html) |
| Chinese version | [../microplastic-ml-workshop.html](../microplastic-ml-workshop.html) |

## 🎯 Learning Objectives

Upon completion, students will be able to:

1. Operate three portable near-infrared (NIR) spectrometers (InnoSpectra, NeoSpectra, MicroNIR) and the Ocean Optics QE Pro Raman with 532 and 785 nm lasers
2. Use Orange Data Mining to load spectra, apply preprocessing (baseline, smoothing, SNV), perform principal component analysis (PCA), train classifiers (k-nearest neighbors, support vector machine, Random Forest), and evaluate model performance
3. Apply a trained model to predict the identity of an unknown plastic sample
4. Reason about the limitations of ML in microplastic spectroscopy (overfitting, training bias, out-of-distribution samples)

## 📅 Pre-Class Preparation

**Required before the workshop:**

### 1. Install Orange Data Mining

Download: https://orangedatamining.com/download/

- Available for Windows, macOS, Linux
- After installation, verify version ≥ 3.36

### 2. Install Spectroscopy add-on

Open Orange → **Options → Add-ons** → check **Spectroscopy** → Install

If the GUI installation fails, use the command line:
```
pip install Orange3-Spectroscopy
```

### 3. Download workshop materials

From this repository:
- [`plastic_reference_library.csv`](../ml-workshop/plastic_reference_library.csv) — Raman spectral library based on KU Leuven open dataset (6 plastics × 3 replicates, Orange-friendly wide format)
- [`student_template.csv`](../ml-workshop/student_template.csv) — Expected format for student-uploaded spectra
- [`plastic_classification.ows`](../ml-workshop/plastic_classification.ows) — Orange workflow template *(if available)*

### 4. Identifiers

- Know your Student ID
- Group number will be assigned in class

## 🗂️ Workshop URL

Open: **https://tai-shengyeh.github.io/microplastic-food-analysis/en/microplastic-ml-workshop.html**

## 📦 Sample inventory

Each group will receive 5 reference plastics (pre-cut to ~1 cm² pieces):

| Code | Full Name | Typical source |
|---|---|---|
| PE | Polyethylene | Food bag, cling film |
| PP | Polypropylene | Microwave container, yogurt cup |
| PET | Polyethylene terephthalate | Beverage bottle fragment |
| PS | Polystyrene | Disposable cup |
| PVC | Polyvinyl chloride | Red cling film |

Plus 1–2 **unknown samples** (e.g., PA, ABS, PC, or weathered plastic) reserved for the model-challenge phase.

## 🔬 Measurement specifications

### NIR
- Three portable instruments rotated through groups: InnoSpectra, NeoSpectra, MicroNIR
- Wavelength range: 900–1700 nm (InnoSpectra/MicroNIR) or 1350–2500 nm (NeoSpectra)
- 3 replicates per sample, averaged

### Raman
- Ocean Optics QE Pro, both 532 + 785 nm lasers
- Integration time: 1–5 s (signal-dependent)
- Note: colored plastics (e.g., red PVC) should be measured with the **785 nm laser** to suppress fluorescence interference

## 🤖 ML analysis pipeline (run in Orange)

```
File (load student CSV)
   ↓
Spectra (convert to spectral format)
   ↓
Preprocess Spectra (baseline + SNV)
   ↓
   ├─→ PCA → Scatter Plot (visualize clustering)
   └─→ Random Forest / SVM / kNN
              ↓
        Test and Score (cross-validation evaluation)
              ↓
        Confusion Matrix (identify confusable plastic pairs)
              ↓
        Predictions (predict unknown samples)
```

## 🆘 Troubleshooting

| Problem | Solution |
|---|---|
| Orange does not show "Spectra" widget | Verify Spectroscopy add-on installed; restart Orange |
| CSV loads but spectra are not visible | First column must be wavelength/wavenumber; subsequent columns are intensities per sample |
| Classification accuracy < 50% | Check preprocessing (baseline, normalization); confirm class labels correct |
| PCA shows no clustering | Try SNV normalization first |
| Cloud upload fails | Check network; confirm Student ID entered; open browser console (F12) to view errors |

## 📚 Further reading

- **Orange Data Mining**: https://orangedatamining.com/
- **OpenSpecy** (online microplastic spectral matching): https://openspecy.org/
- **Primpke et al. (2020)** *Appl. Spectrosc.* 74:1012 — siMPle framework for automated μ-FTIR
- **Cowger et al. (2021)** *Anal. Chem.* 93:7543 — OpenSpecy launch paper

## 🔗 Related

- Chinese version (3-hour main course + ML workshop): [../](../)
- Instructor dashboard: [../teacher.html](../teacher.html)
- Supabase schema: [../supabase/schema.sql](../supabase/schema.sql)

---

🤖 Materials assisted by Claude Code (Anthropic)
