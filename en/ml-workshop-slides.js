// Microplastic ML Workshop — Slide content (English)
// Loaded by microplastic-ml-workshop.html buildSlides()

function buildSlides() {
  const deck = document.getElementById('deck');
  deck.innerHTML = SLIDES.map((html, i) =>
    `<section class="slide${i === 0 ? ' active' : ''}">${html}</section>`
  ).join('');
  document.querySelectorAll('[data-recorder]').forEach((el, idx) => {
    const kind = el.dataset.recorder;
    const opts = kind === 'NIR'
      ? { title: 'NIR Spectrum Upload', technique: 'NIR', instruments: NIR_INSTRUMENTS }
      : { title: 'Raman Spectrum Upload', technique: 'Raman', instruments: RAMAN_INSTRUMENTS };
    el.innerHTML = makeScanRecorder('rec_' + kind + '_' + idx, opts);
  });
}

const NIR_INSTRUMENTS = [
  { v: 'InnoSpectra', l: 'InnoSpectra (900–1700 nm)' },
  { v: 'NeoSpectra',  l: 'NeoSpectra (1350–2500 nm)' },
  { v: 'MicroNIR',    l: 'MicroNIR (900–1700 nm)' },
];
const RAMAN_INSTRUMENTS = [
  { v: 'QEPro_532', l: 'Ocean Optics QE Pro — 532 nm laser' },
  { v: 'QEPro_785', l: 'Ocean Optics QE Pro — 785 nm laser' },
];

const SLIDES = [

// ===== S01 Cover =====
`
<h1>Microplastic Machine Learning Workshop</h1>
<p class="subtitle">Hands-on NIR + Raman acquisition → Orange Data Mining classifier training</p>
<div>
  <span class="tag">3.5-hour hands-on lab</span>
  <span class="tag cyan">NIR × 3 instruments</span>
  <span class="tag green">Raman × 2 laser wavelengths</span>
  <span class="tag pink">Orange ML</span>
</div>
<div class="card">
  <h3>Learning objectives</h3>
  <ul>
    <li>Operate three portable near-infrared (NIR) spectrometers — InnoSpectra, NeoSpectra, and MicroNIR — and Ocean Optics QE Pro Raman with 532 + 785 nm lasers to acquire spectra of five reference plastics</li>
    <li>Contribute 100+ spectra to a <span class="highlight">collaborative class training set</span> hosted on Supabase</li>
    <li>Use Orange Data Mining to perform principal component analysis (PCA), train k-nearest neighbors (kNN) / support vector machine (SVM) / Random Forest classifiers, and evaluate model performance</li>
    <li>Apply your model to predict an <span class="highlight">unknown plastic sample</span> and reason about the limitations of ML in spectroscopy</li>
  </ul>
</div>
<p class="mini">Click "📝 Sign in" at top-right to enter your Student ID and group before uploading spectra.</p>
`,

// ===== S02 Schedule =====
`
<h2>3.5-Hour Schedule</h2>
<table>
  <tr><th style="width:70px">Time</th><th>Phase</th><th>Content</th></tr>
  <tr><td>10 min</td><td>P0 Intro</td><td>Why we need ML; tool overview</td></tr>
  <tr><td>15 min</td><td>P1 Prep</td><td>Sample introduction, instrument overview, grouping</td></tr>
  <tr><td>35 min</td><td>P2 NIR scanning</td><td>5 plastics × 3 portable NIR instruments</td></tr>
  <tr><td>40 min</td><td>P3 Raman scanning</td><td>5 plastics × 532/785 nm lasers</td></tr>
  <tr><td>10 min</td><td>Break</td><td>—</td></tr>
  <tr><td>25 min</td><td>P4 Preprocessing</td><td>Orange: baseline + smoothing + SNV</td></tr>
  <tr><td>25 min</td><td>P5 PCA</td><td>Dimensionality reduction, PC1–PC2 visualization</td></tr>
  <tr><td>30 min</td><td>P6 Classifiers</td><td>kNN / SVM / RF; confusion matrix</td></tr>
  <tr><td>15 min</td><td>P7 Unknown challenge</td><td>Test the model on out-of-distribution samples</td></tr>
  <tr><td>10 min</td><td>P8 Pitfalls</td><td>Overfitting, training bias, real-world tools</td></tr>
  <tr><td>5 min</td><td>P9 Wrap-up</td><td>—</td></tr>
</table>
`,

// ===== S03 Pre-class checklist =====
`
<h2>Pre-Class Checklist</h2>
<div class="grid">
  <div class="card">
    <h3>✅ Software ready</h3>
    <ul>
      <li><strong>Orange Data Mining</strong> (≥ 3.36)<br/>
        <a href="https://orangedatamining.com/download/" target="_blank" style="font-size:13px;">orangedatamining.com/download</a></li>
      <li><strong>Spectroscopy add-on</strong> installed in Orange<br/>
        <span class="mini">Options → Add-ons → Spectroscopy</span></li>
      <li><code>plastic_reference_library.csv</code> downloaded from GitHub</li>
    </ul>
  </div>
  <div class="card">
    <h3>📋 Personal items</h3>
    <ul>
      <li>Laptop + power cable</li>
      <li>USB flash drive (backup)</li>
      <li>Your Student ID</li>
      <li>Group number (assigned in class)</li>
    </ul>
  </div>
</div>
<div class="card tip">
  <p>If Orange is not yet installed, <strong>do it now</strong>. Download + install ≈ 5 min. If the Spectroscopy add-on cannot be installed via the UI, run from a command line: <code>pip install Orange3-Spectroscopy</code></p>
</div>
`,

// ===== S04 Why ML =====
`
<h2>P0 | Why machine learning?</h2>
<div class="grid">
  <div class="card">
    <h3>Manual expert review</h3>
    <ul>
      <li>A 1 cm² filter may contain <span class="bad">100+ particles</span></li>
      <li>One-by-one FTIR library matching: <span class="bad">4–8 h per sample</span></li>
      <li>Judgment varies between operators (subjectivity)</li>
      <li>Operator fatigue → higher error rate</li>
    </ul>
  </div>
  <div class="card">
    <h3>ML-based automation</h3>
    <ul>
      <li>Same sample: <span class="good">seconds</span> for classification</li>
      <li>Objective and reproducible (same input → same output)</li>
      <li>Scales to tens of thousands of spectra</li>
      <li>Detects subtle features that humans miss</li>
    </ul>
  </div>
</div>
<p class="citation">Primpke, S.; <em>et al.</em> Critical Assessment of Analytical Methods for the Harmonized and Cost-Efficient Analysis of Microplastics. <em>Appl. Spectrosc.</em> <strong>2020</strong>, <em>74</em>, 1012–1047. — Introduces the siMPle framework for automated μ-FTIR image analysis.</p>
`,

// ===== S05 Tool map =====
`
<h2>P0 | Tool map for today</h2>
<div class="grid3">
  <div class="card">
    <h3>🔬 Acquisition (in lab)</h3>
    <ul>
      <li>NIR × 3: InnoSpectra, NeoSpectra, MicroNIR</li>
      <li>Raman: Ocean Optics QE Pro</li>
    </ul>
  </div>
  <div class="card">
    <h3>☁️ Collaboration (cloud)</h3>
    <ul>
      <li><strong>Supabase</strong> stores all student scans in real time</li>
      <li>Groups see one another's progress; class builds a shared training set</li>
    </ul>
  </div>
  <div class="card">
    <h3>🤖 ML analysis (your laptop)</h3>
    <ul>
      <li><strong>Orange Data Mining</strong> visual workflow editor</li>
      <li>No coding required; drag-and-drop widgets</li>
    </ul>
  </div>
</div>
<div class="card ref">
  <h3>Related online resources</h3>
  <ul>
    <li><strong>OpenSpecy</strong> (Cowger 2021): free online microplastic spectral matching — <a href="https://openspecy.org" target="_blank">openspecy.org</a></li>
    <li><strong>siMPle</strong> (Primpke 2020): open-source software for automated μ-FTIR image analysis</li>
  </ul>
</div>
`,

// ===== S06 Reference plastics =====
`
<h2>P1 | Five reference plastics</h2>
<table>
  <tr><th>Code</th><th>Full name</th><th>Density (g/cm³)</th><th>Source</th><th>Appearance</th></tr>
  <tr><td><span class="pill cyan">PE</span></td><td>Polyethylene</td><td>0.91–0.96</td><td>Food bag, cling film</td><td>Hazy white, soft</td></tr>
  <tr><td><span class="pill purple">PP</span></td><td>Polypropylene</td><td>0.90</td><td>Microwave container, yogurt cup</td><td>Translucent, semi-rigid</td></tr>
  <tr><td><span class="pill pink">PET</span></td><td>Polyethylene terephthalate</td><td>1.37</td><td>Water bottle</td><td>Clear, hard, brittle sound</td></tr>
  <tr><td><span class="pill green">PS</span></td><td>Polystyrene</td><td>1.05</td><td>Disposable cup, foam box</td><td>White, easily fractures</td></tr>
  <tr><td><span class="pill amber">PVC</span></td><td>Polyvinyl chloride</td><td>1.40</td><td>Red cling film</td><td>Soft, flexible</td></tr>
</table>
<div class="card">
  <h3>Each group receives</h3>
  <p>Three pieces of each of the five plastics (pre-cut to ~1 cm² for spectroscopic measurement) plus 1–2 <span class="highlight">unknown samples</span> reserved for the model-challenge phase.</p>
</div>
`,

// ===== S07 Warm-up: visual ID =====
`
<h2>P1 | Warm-up: Visual identification</h2>
<p>Without using any instrument, identify the most likely plastic from each description.</p>
<div class="card activity">
  <h3>Clear, rigid, makes a sharp tap sound — similar to a finished beverage bottle</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PE',false)">A. PE</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PET',true)">B. PET</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PS',false)">C. PS</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PVC',false)">D. PVC</button>
  </div>
  <div class="resultBox" id="q_warm1_result"></div>
</div>
<div class="card activity">
  <h3>White, brittle, dull tap sound — similar to a disposable coffee cup</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PE',false)">A. PE</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PP',false)">B. PP</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PS',true)">C. PS</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PET',false)">D. PET</button>
  </div>
  <div class="resultBox" id="q_warm2_result"></div>
</div>
<details>
  <summary>Explanation</summary>
  <p>PET is characterized by being <span class="highlight">rigid, clear, with a sharp tap sound</span>; PS is brittle, smooth, and opaque white (most disposable cups are PS). PE is a soft plastic bag, PP is translucent and slightly tougher, and PVC is generally soft and flexible.</p>
</details>
`,

// ===== S08 Three NIR instruments =====
`
<h2>P1 | Three portable NIR instruments</h2>
<table>
  <tr><th>Instrument</th><th>Wavelength range</th><th>Typical resolution</th><th>Size</th><th>Best suited for</th></tr>
  <tr><td><strong>InnoSpectra NIR-S</strong></td><td>900–1700 nm</td><td>~10 nm</td><td>Palm-sized</td><td>Large particles, polyolefins</td></tr>
  <tr><td><strong>NeoSpectra Micro</strong></td><td>1350–2500 nm</td><td>~16 cm⁻¹</td><td>USB-stick sized</td><td>Covers C–H combination band region</td></tr>
  <tr><td><strong>MicroNIR (VIAVI)</strong></td><td>950–1650 nm</td><td>~6 nm</td><td>Pocket-sized</td><td>Polyesters, polyamides</td></tr>
</table>
<div class="card tip">
  <p>Each group will rotate through all three NIR instruments to measure the same samples — enabling direct comparison of signal characteristics across devices (often called <strong>cross-instrument variability</strong> in the literature).</p>
</div>
<p class="mini">All three are portable (handheld/&lt; 200 g). Benchtop FT-NIR systems offer higher resolution (&lt; 2 nm) but are not field-deployable.</p>
`,

// ===== S09 Raman + laser selection =====
`
<h2>P1 | Ocean Optics QE Pro: 532 vs 785 nm</h2>
<div class="grid">
  <div class="card">
    <h3>532 nm (green)</h3>
    <ul>
      <li>Higher photon energy → <span class="good">stronger Raman signal</span></li>
      <li><span class="bad">Frequently excites fluorescence</span></li>
      <li>Best for: clear, colorless, additive-free plastics</li>
    </ul>
  </div>
  <div class="card">
    <h3>785 nm (near-infrared)</h3>
    <ul>
      <li>Lower photon energy → weaker Raman signal</li>
      <li><span class="good">Reduced fluorescence interference</span></li>
      <li>Best for: colored, additive-loaded, or weathered plastics (the practical first choice for food packaging)</li>
    </ul>
  </div>
</div>
<div class="card activity">
  <h3>Which laser wavelength should you use for red PVC cling film?</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_laser','532',false)">A. 532 nm (stronger signal)</button>
    <button class="choice" onclick="checkMCQ(this,'q_laser','785',true)">B. 785 nm (avoids fluorescence)</button>
  </div>
  <div class="resultBox" id="q_laser_result"></div>
</div>
<details>
  <summary>Why?</summary>
  <p>Red dyes absorb the 532 nm green laser and emit broad fluorescence that buries the Raman signal. Switching to the 785 nm NIR laser shifts excitation away from most dye absorption bands, so fluorescence is minimal.</p>
</details>
`,

// ===== S10 P2 NIR SOP =====
`
<h2>P2 | NIR scanning SOP</h2>
<div class="grid">
  <div class="card">
    <h3>Five steps (~35 min per group)</h3>
    <ol>
      <li>Power on; warm up for 1–2 minutes</li>
      <li>Calibrate: <span class="highlight">white reference</span> (PTFE plate) + <span class="highlight">dark</span> (covered)</li>
      <li>Place sample flat below the probe with gentle contact</li>
      <li>Acquire <span class="highlight">3 replicates per sample</span>, 5-second interval</li>
      <li>Export from software → CSV (wavelength, intensity)</li>
    </ol>
  </div>
  <div class="card">
    <h3>Group target</h3>
    <p><strong>15 NIR spectra</strong>:</p>
    <p>5 plastics × 3 replicates = 15 records</p>
    <p>If time allows, <span class="highlight">rotate through all three NIR instruments</span> measuring the same sample for comparison.</p>
  </div>
</div>
<div class="card tip">
  <p>Critical: always redo the white reference + dark before each new sample, especially when changing between samples of different color or geometry. Poor calibration → no ML method can recover.</p>
</div>
`,

// ===== S11 NIR upload =====
`
<h2>P2 | Upload NIR scan data</h2>
<p>Export CSV from the NIR software, paste or load it here → preview → upload to cloud.</p>
<div data-recorder="NIR"></div>
<div class="card tip">
  <p>Upload one record per scan. <strong>3 replicates = 3 uploads</strong>. Use the "Notes" field to write "rep 1/2/3" for clarity.</p>
</div>
`,

// ===== S12 Raman SOP =====
`
<h2>P3 | Raman scanning SOP (QE Pro)</h2>
<div class="grid">
  <div class="card">
    <h3>Procedure</h3>
    <ol>
      <li>Choose laser wavelength: <span class="highlight">532 or 785 nm</span> (sample-dependent)</li>
      <li>Focus: use microscope head to locate a flat region of the sample</li>
      <li>Background: acquire dark spectrum (no sample illuminated)</li>
      <li>Integration time: 1–5 s, adjust based on signal level</li>
      <li>3 replicates per sample; export CSV</li>
    </ol>
  </div>
  <div class="card">
    <h3>Group target</h3>
    <p><strong>20–30 Raman spectra</strong>:</p>
    <p>5 plastics × 2 lasers × 2–3 replicates</p>
    <p>Recommended: first cover all five plastics with the <span class="highlight">785 nm laser</span>, then revisit non-fluorescent samples with 532 nm.</p>
  </div>
</div>
`,

// ===== S13 Raman upload =====
`
<h2>P3 | Upload Raman scan data</h2>
<div data-recorder="Raman"></div>
<div class="card tip">
  <p>Raman software typically exports with X-axis as <strong>Raman shift (cm⁻¹)</strong>, not wavelength (nm). Confirm the file format before uploading.</p>
</div>
`,

// ===== S14 Break =====
`
<h2>☕ 10-minute break</h2>
<div class="card">
  <h3>Before the second half, please verify</h3>
  <ul>
    <li>✅ Your group has uploaded ≥ 5 NIR records (at least one per plastic)</li>
    <li>✅ Your group has uploaded ≥ 5 Raman records</li>
    <li>✅ Orange is open on your laptop and the <strong>Spectroscopy</strong> widget group is visible</li>
  </ul>
</div>
<div class="card ref">
  <h3>Second half: ML analysis in Orange</h3>
  <ul>
    <li>P4 Preprocessing: baseline, smoothing, normalization</li>
    <li>P5 PCA visualization</li>
    <li>P6 Classifier training (kNN / SVM / Random Forest)</li>
    <li>P7 Unknown sample challenge</li>
  </ul>
</div>
`,

// ===== S15 Why preprocess =====
`
<h2>P4 | Why preprocessing matters</h2>
<div class="card">
  <p>Raw spectra straight from the instrument typically suffer from three issues:</p>
  <ol>
    <li><strong>Baseline drift</strong>: scattering and sample thickness cause an upward sloping baseline</li>
    <li><strong>Intensity variability</strong>: the same PE may show signal of 100 for sample A vs 500 for sample B due to placement angle</li>
    <li><strong>High-frequency noise</strong>: detector thermal noise; cosmic-ray spikes (Raman)</li>
  </ol>
</div>
<div class="card ref">
  <p>Without preprocessing, ML may learn "sample thickness" rather than "chemical identity" → <span class="bad">poor generalization</span>.</p>
</div>
`,

// ===== S16 Three preprocessing steps =====
`
<h2>P4 | Three standard preprocessing steps</h2>
<div class="grid3">
  <div class="card">
    <h3>1. Baseline correction</h3>
    <p>Orange widget: <strong>Preprocess Spectra → Baseline</strong></p>
    <ul>
      <li>Rubber band</li>
      <li>Asymmetric least squares (AsLS)</li>
    </ul>
    <p class="mini">Removes the sloping baseline trend.</p>
  </div>
  <div class="card">
    <h3>2. Smoothing</h3>
    <p>Orange widget: <strong>Savitzky-Golay Filter</strong></p>
    <ul>
      <li>Window: 7–15 points</li>
      <li>Polynomial order: 2 or 3</li>
    </ul>
    <p class="mini">Removes high-frequency noise while preserving peak shape.</p>
  </div>
  <div class="card">
    <h3>3. Normalization</h3>
    <p>Orange widget: <strong>SNV (Standard Normal Variate)</strong></p>
    <ul>
      <li>Each spectrum subtracts its mean and divides by its standard deviation</li>
      <li>Removes intensity variability</li>
    </ul>
    <p class="mini">Makes spectra of different intensities comparable.</p>
  </div>
</div>
`,

// ===== S17 Orange preprocessing workflow =====
`
<h2>P4 | Orange workflow: load + preprocess</h2>
<div class="card">
  <h3>Build the workflow</h3>
  <ol>
    <li>Drag <strong>File</strong> widget → load <code>plastic_reference_library.csv</code></li>
    <li>Connect to <strong>Spectra</strong> widget (auto-detected as spectral data)</li>
    <li>Connect to <strong>Preprocess Spectra</strong> widget:
      <ul>
        <li>Check Cut (crop irrelevant range)</li>
        <li>Check Baseline (AsLS)</li>
        <li>Check Savitzky-Golay (window = 11, polynomial = 3)</li>
        <li>Check SNV</li>
      </ul>
    </li>
    <li>Connect output to <strong>Data Table</strong> to preview results</li>
  </ol>
</div>
<div class="card tip">
  <p>Each Orange widget has an "eye" button to inspect intermediate output. After adding each preprocessing step, open the eye to observe the spectral change — this builds intuition for what each step does.</p>
</div>
`,

// ===== S18 PCA concept =====
`
<h2>P5 | PCA: collapsing high-dimensional spectra to 2D</h2>
<div class="grid">
  <div class="card">
    <h3>What is PCA?</h3>
    <p>An FTIR spectrum is a <span class="highlight">3000-dimensional vector</span>. PCA identifies the two directions of greatest variance (PC1, PC2) and projects from 3000-D into 2-D.</p>
    <p>Visual analogy: rotating a stack of eggs in space to find the viewing angle that best separates their shapes.</p>
  </div>
  <div class="card">
    <h3>Why useful for microplastics?</h3>
    <ul>
      <li>See whether different plastics form <span class="highlight">natural clusters</span> in 2-D</li>
      <li>Detect outliers</li>
      <li>Diagnose preprocessing quality — clean clusters indicate good preprocessing</li>
    </ul>
  </div>
</div>
<p class="mini">Note: PCA is <strong>unsupervised</strong> — it has no knowledge of class labels. If clusters emerge after preprocessing + PCA, the data itself contains discriminative information.</p>
`,

// ===== S19 Orange PCA workflow =====
`
<h2>P5 | Orange workflow: PCA + Scatter Plot</h2>
<div class="card">
  <h3>Build the workflow</h3>
  <ol>
    <li>From <strong>Preprocess Spectra</strong> output, connect to <strong>PCA</strong> widget</li>
    <li>PCA widget: set "2 components"</li>
    <li>Connect PCA output to <strong>Scatter Plot</strong></li>
    <li>Scatter Plot settings: X = PC1, Y = PC2, Color = class</li>
  </ol>
</div>
<div class="card ref">
  <h3>Expected outcome</h3>
  <p>Five plastics form five visible clusters in the PC1–PC2 plane.<br/>
  - PE and PP, both <span class="highlight">aliphatic hydrocarbons</span>, cluster nearby<br/>
  - PET and PS, both containing <span class="highlight">aromatic rings</span>, cluster on the other side<br/>
  - PVC, characterized by C–Cl, sits in its own group</p>
</div>
`,

// ===== S20 PCA interpretation =====
`
<h2>P5 | PCA interpretation exercise</h2>
<div class="card activity">
  <h3>You observe in Orange that PE and PP nearly overlap in the PCA plot. Most likely cause?</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_pca','noise',false)">A. Too much noise</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','similar',true)">B. PE and PP have similar structures; difference lies mainly in CH₃ vibrations — PC1+PC2 not sufficient to separate</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','overfit',false)">C. Overfitting</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','sample',false)">D. Too few samples</button>
  </div>
  <div class="resultBox" id="q_pca_result"></div>
</div>
<details>
  <summary>Explanation</summary>
  <p>PE and PP are both aliphatic hydrocarbon polymers — they differ only in PP's CH₃ side chain. The first two principal components (capturing the largest variance) may reflect coarse contrasts like "aromatic vs aliphatic" or "Cl-containing vs not", relegating subtle PE/PP differences to PC3 or PC4.<br/><br/>
  Remedies: (a) inspect the PC3–PC4 plot, (b) switch to <span class="highlight">supervised methods</span> (PLS-DA, SVM) which directly use PE/PP labels for training.</p>
</details>
`,

// ===== S21 P6 Classifiers =====
`
<h2>P6 | Three supervised classifiers</h2>
<table>
  <tr><th>Algorithm</th><th>Principle</th><th>Pros</th><th>Cons</th></tr>
  <tr><td><strong>kNN</strong><br/>k-Nearest Neighbors</td><td>Find the k most similar training samples, majority vote</td><td>Simple, assumption-free</td><td>Slow on large datasets</td></tr>
  <tr><td><strong>SVM</strong><br/>Support Vector Machine</td><td>Find the optimal separating hyperplane</td><td>Excellent on high-dimensional data, accurate</td><td>Kernel choice requires tuning</td></tr>
  <tr><td><strong>Random Forest</strong></td><td>Ensemble of decision trees voting</td><td>Noise-tolerant, interpretable (feature importance)</td><td>Large model size, less intuitive</td></tr>
</table>
<div class="card tip">
  <p>There is no "best" algorithm for spectral classification a priori. The standard practice is "model selection": train multiple classifiers, compare via cross-validation, and report the best — which is exactly what you will do today.</p>
</div>
`,

// ===== S22 Test & Score =====
`
<h2>P6 | Orange workflow: Test and Score</h2>
<div class="card">
  <h3>Build the workflow</h3>
  <ol>
    <li>From <strong>Preprocess Spectra</strong>, connect to three classifiers: <strong>kNN</strong>, <strong>SVM</strong>, <strong>Random Forest</strong></li>
    <li>Connect all three classifiers to <strong>Test and Score</strong> widget</li>
    <li>Test and Score: set to <span class="highlight">Cross-validation</span> (k = 5 or 10)</li>
    <li>Inspect CA (Classification Accuracy), F1, Precision, Recall</li>
  </ol>
</div>
<div class="card ref">
  <h3>Expected results (literature-based)</h3>
  <ul>
    <li>Clean five-plastic spectra: all algorithms typically reach <span class="good">&gt; 95% accuracy</span></li>
    <li>Real student data: 80–95% due to instrument and operator variability</li>
    <li>Any algorithm below 70%: inspect the confusion matrix to diagnose</li>
  </ul>
</div>
`,

// ===== S23 Confusion matrix =====
`
<h2>P6 | Interpreting the confusion matrix</h2>
<div class="card">
  <h3>What is a confusion matrix?</h3>
  <p>Rows = true class, columns = predicted class. Diagonal = correct predictions; off-diagonal = misclassifications.</p>
</div>
<div class="card activity">
  <h3>Given the matrix below (3 of 10 PE samples predicted as PP), what is the most likely explanation?</h3>
  <table style="background:#fff7ed;">
    <tr><th></th><th>Predicted PE</th><th>Predicted PP</th><th>Predicted PET</th></tr>
    <tr><td><strong>True PE</strong></td><td>7</td><td>3</td><td>0</td></tr>
    <tr><td><strong>True PP</strong></td><td>2</td><td>8</td><td>0</td></tr>
    <tr><td><strong>True PET</strong></td><td>0</td><td>0</td><td>10</td></tr>
  </table>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_cm','random',false)">A. The model is guessing randomly</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','similar',true)">B. PE and PP spectra are similar; the model struggles to distinguish</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','overfit',false)">C. Overfitting</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','bug',false)">D. Software bug</button>
  </div>
  <div class="resultBox" id="q_cm_result"></div>
</div>
<details>
  <summary>Explanation</summary>
  <p>The diagonal PET = 10 is perfect; PE↔PP show mutual confusion (3 PE→PP, 2 PP→PE). Remedies: (1) emphasize the CH₃ region with weights, (2) use 1377 cm⁻¹ (a PP-only band) as a strong feature, (3) collect more PE/PP training data.</p>
</details>
`,

// ===== S24 Student lab time =====
`
<h2>P6 | Student lab time</h2>
<div class="card">
  <h3>Objective</h3>
  <p>Use the <strong>class-shared dataset</strong> (export from Supabase as CSV, or use <code>plastic_reference_library.csv</code>) to train your own classifier.</p>
</div>
<div class="card ref">
  <h3>Steps</h3>
  <ol>
    <li>Build the complete Orange workflow (preprocessing → PCA → classifier → Test &amp; Score)</li>
    <li>Record the CA of all three algorithms</li>
    <li>Read the confusion matrix to identify the most confusable plastic pair</li>
    <li>Try to improve: change preprocessing, add PCA, tune hyperparameters</li>
  </ol>
</div>
<div class="card tip">
  <p>Not sure where to start? Open <a href="ml-workshop/plastic_classification.ows" target="_blank">plastic_classification.ows</a> in Orange to see a complete workflow template.</p>
</div>
`,

// ===== S25 P7 Unknown challenge =====
`
<h2>P7 | Unknown sample challenge: out-of-distribution</h2>
<div class="card">
  <h3>Experiment</h3>
  <p>The instructor distributes a sample with an <strong>undeclared identity</strong> (could be PA, ABS, PC, or weathered PE/PP).</p>
  <p>Tasks:</p>
  <ol>
    <li>Acquire NIR + Raman, upload to cloud (set plastic_type to <code>unknown</code>)</li>
    <li>In Orange, predict its class using your trained model</li>
    <li>Observe the predicted probability — is the model highly confident?</li>
  </ol>
</div>
<div class="card activity">
  <h3>If the model returns "PE 80%, PP 18%, others 2%" for the unknown sample, what does this mean?</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_ood','correct',false)">A. The sample is indeed PE (high confidence)</button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','suspicious',true)">B. Possibly PE, but because the model only recognizes the five trained plastics, it will assign high probabilities even to PA — the result should be <strong>treated with suspicion</strong></button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','wrong',false)">C. The model is broken</button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','sample',false)">D. The sample is contaminated</button>
  </div>
  <div class="resultBox" id="q_ood_result"></div>
</div>
<details>
  <summary>Key concept: out-of-distribution (OOD) detection</summary>
  <p>Standard classifiers <span class="bad">assume</span> every sample belongs to one of the trained classes. If the unknown is PA (not in training set), the model forcibly maps it to the closest known class and reports high confidence.</p>
  <p>Remedies: (1) add a <strong>distance-to-training-set</strong> check (Orange has Outlier widget), (2) use <strong>OneClass SVM</strong> for anomaly detection, (3) report both model probability and similarity score in the final analysis.</p>
</details>
`,

// ===== S26 Pitfalls =====
`
<h2>P8 | Three pitfalls in ML for microplastic analysis</h2>
<div class="grid3">
  <div class="card">
    <h3>1. Overfitting</h3>
    <p>Model achieves 100% on training but <span class="bad">only 60% on test data</span>.</p>
    <p>Remedies: cross-validation, reduce model complexity, increase training data.</p>
  </div>
  <div class="card">
    <h3>2. Training data bias</h3>
    <p>This workshop uses only "clean new plastics" → performance may collapse on <span class="bad">weathered, dirty, or mixed plastics</span>.</p>
    <p>Remedy: training data must cover the variability expected in real applications.</p>
  </div>
  <div class="card">
    <h3>3. Cross-instrument transfer failure</h3>
    <p>A model trained on InnoSpectra <span class="bad">typically fails when applied directly to NeoSpectra</span> (different wavelength range, different resolution).</p>
    <p>Remedies: train one model per instrument, or apply domain adaptation.</p>
  </div>
</div>
<p class="citation">Renner, G.; <em>et al.</em> Analytical Methodologies for Monitoring Micro(nano)plastics: Which Are Fit for Purpose? <em>TrAC Trends Anal. Chem.</em> <strong>2018</strong>, <em>108</em>, 84–93. — Discusses reliability challenges of ML in environmental samples.</p>
`,

// ===== S27 Real-world tools =====
`
<h2>P8 | Tools used in real research</h2>
<div class="grid">
  <div class="card">
    <h3>🌐 OpenSpecy (Cowger 2021)</h3>
    <p>Free online microplastic spectral matching, no registration required.</p>
    <ul>
      <li>Upload your Raman / FTIR → automatic comparison to 1000+ library spectra</li>
      <li>Free, open-source, widely used in academia</li>
      <li>URL: <a href="https://openspecy.org" target="_blank">openspecy.org</a></li>
    </ul>
    <p class="mini">Post-class assignment: take your spectra acquired today, run them through OpenSpecy, and compare the result.</p>
  </div>
  <div class="card">
    <h3>🔬 siMPle (Primpke 2020)</h3>
    <p>Automated μ-FTIR chemical-imaging analysis framework.</p>
    <ul>
      <li>Handles FPA detector imagery (4096 pixels × N wavenumbers)</li>
      <li>Automatically identifies the plastic type at each pixel</li>
      <li>Widely used in European marine research consortia</li>
    </ul>
  </div>
</div>
`,

// ===== S28 Wrap-up =====
`
<h2>P9 | Today's accomplishments</h2>
<div class="card ref">
  <h3>You have achieved</h3>
  <ul>
    <li>✅ Hands-on operation of three portable NIR instruments and dual-wavelength Raman</li>
    <li>✅ Contributed 30+ self-acquired spectra to the class-shared cloud dataset</li>
    <li>✅ Completed the full Orange pipeline: preprocessing → PCA → classifier → evaluation</li>
    <li>✅ Observed out-of-distribution behavior on unknown samples</li>
    <li>✅ Understood both the strengths and limitations of ML in microplastic analysis</li>
  </ul>
</div>
<div class="card">
  <h3>Post-class challenge (optional)</h3>
  <ul>
    <li>Acquire spectra of your phone case, glasses, or lunchbox; classify with your model</li>
    <li>Upload to OpenSpecy and compare against your model's prediction</li>
    <li>If accuracy is unsatisfactory: reflect on how to augment the training set</li>
  </ul>
</div>
<h1 style="text-align:center;margin-top:30px;">Thank you for participating!</h1>
`,

]; // end SLIDES
