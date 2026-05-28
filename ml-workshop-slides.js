// 微塑膠 ML 工作坊 — 投影片內容
// 由 microplastic-ml-workshop.html 的 buildSlides() 載入

function buildSlides() {
  const deck = document.getElementById('deck');
  deck.innerHTML = SLIDES.map((html, i) =>
    `<section class="slide${i === 0 ? ' active' : ''}">${html}</section>`
  ).join('');
  // 將 <div data-recorder="nir|raman"> placeholder 替換為實際 scan recorder
  document.querySelectorAll('[data-recorder]').forEach((el, idx) => {
    const kind = el.dataset.recorder;
    const opts = kind === 'NIR'
      ? { title: 'NIR 光譜上傳', technique: 'NIR', instruments: NIR_INSTRUMENTS }
      : { title: 'Raman 光譜上傳', technique: 'Raman', instruments: RAMAN_INSTRUMENTS };
    el.innerHTML = makeScanRecorder('rec_' + kind + '_' + idx, opts);
  });
}

const NIR_INSTRUMENTS = [
  { v: 'InnoSpectra', l: 'InnoSpectra (900–1700 nm)' },
  { v: 'NeoSpectra',  l: 'NeoSpectra (1350–2500 nm)' },
  { v: 'MicroNIR',    l: 'MicroNIR (900–1700 nm)' },
];
const RAMAN_INSTRUMENTS = [
  { v: 'QEPro_532', l: 'Ocean Optics QE Pro — 532 nm 雷射' },
  { v: 'QEPro_785', l: 'Ocean Optics QE Pro — 785 nm 雷射' },
];

const SLIDES = [

// ====== S01 封面 ======
`
<h1>微塑膠機器學習實作工作坊</h1>
<p class="subtitle">親手掃描 NIR + Raman → 用 Orange Data Mining 訓練分類器</p>
<div>
  <span class="tag">3.5 小時 hands-on</span>
  <span class="tag cyan">NIR × 3 種儀器</span>
  <span class="tag green">Raman × 2 雷射波長</span>
  <span class="tag pink">Orange ML</span>
</div>
<div class="card">
  <h3>今天你會做</h3>
  <ul>
    <li>用三種行動式 NIR (InnoSpectra/NeoSpectra/MicroNIR) 掃描 5 種塑膠</li>
    <li>用 Ocean Optics QE Pro (532 + 785 nm 雷射) 量 Raman 光譜</li>
    <li>全班 100+ 筆光譜資料即時上傳雲端，建立<span class="highlight">合作訓練集</span></li>
    <li>在 Orange 中做 PCA + 三種分類器 (kNN / SVM / Random Forest) + 模型評估</li>
    <li>用模型挑戰「未知樣品」並理解 ML 的限制</li>
  </ul>
</div>
<p class="mini">點右上「📝 學生登入」輸入學號 + 組別即可開始上傳資料。</p>
`,

// ====== S02 工作坊時程 ======
`
<h2>3.5 小時時程</h2>
<table>
  <tr><th style="width:60px">時間</th><th>階段</th><th>內容</th></tr>
  <tr><td>10 min</td><td>P0 引言</td><td>為什麼需要 ML、工具地圖</td></tr>
  <tr><td>15 min</td><td>P1 準備</td><td>樣品介紹、儀器簡介、分組</td></tr>
  <tr><td>35 min</td><td>P2 NIR 掃描</td><td>5 塑膠 × 3 NIR 儀器</td></tr>
  <tr><td>40 min</td><td>P3 Raman 掃描</td><td>5 塑膠 × 532/785 nm 雷射</td></tr>
  <tr><td>10 min</td><td>休息</td><td>—</td></tr>
  <tr><td>25 min</td><td>P4 預處理</td><td>Orange: baseline + smoothing + SNV</td></tr>
  <tr><td>25 min</td><td>P5 PCA</td><td>降維視覺化、判讀 PC1-PC2</td></tr>
  <tr><td>30 min</td><td>P6 分類器</td><td>kNN / SVM / RF、混淆矩陣</td></tr>
  <tr><td>15 min</td><td>P7 未知挑戰</td><td>用未訓練塑膠測試模型</td></tr>
  <tr><td>10 min</td><td>P8 陷阱</td><td>過度配適、訓練偏差、真實工具</td></tr>
  <tr><td>5 min</td><td>P9 總結</td><td>—</td></tr>
</table>
`,

// ====== S03 課前準備檢核 ======
`
<h2>課前準備檢核</h2>
<div class="grid">
  <div class="card">
    <h3>✅ 已安裝</h3>
    <ul>
      <li><strong>Orange Data Mining</strong>（≥ 3.36）<br/>
        <a href="https://orangedatamining.com/download/" target="_blank" style="font-size:14px;">orangedatamining.com/download</a></li>
      <li>Orange 內已加裝 <strong>Spectroscopy add-on</strong><br/>
        <span class="mini">主畫面 → Options → Add-ons → Spectroscopy</span></li>
      <li>已從 GitHub 下載 <code>plastic_reference_library.csv</code></li>
    </ul>
  </div>
  <div class="card">
    <h3>📋 隨身物品</h3>
    <ul>
      <li>筆電 + 充電線</li>
      <li>USB 隨身碟（備用）</li>
      <li>學號（記得）</li>
      <li>組別（課堂發放）</li>
    </ul>
  </div>
</div>
<div class="card tip">
  <p>如果還沒裝 Orange，<strong>現在就裝</strong>！下載安裝約 5 分鐘。Spectroscopy add-on 安裝失敗可改命令列：<code>pip install Orange3-Spectroscopy</code></p>
</div>
`,

// ====== S04 為什麼需要 ML ======
`
<h2>P0｜為什麼需要機器學習？</h2>
<div class="grid">
  <div class="card">
    <h3>傳統人工判讀</h3>
    <ul>
      <li>一張 1 cm² 濾膜可能有 <span class="bad">100+ 顆粒</span></li>
      <li>逐顆比對 FTIR 光譜庫：<span class="bad">4–8 小時/樣品</span></li>
      <li>判讀標準因人而異（主觀性）</li>
      <li>長時間操作疲勞 → 錯誤率上升</li>
    </ul>
  </div>
  <div class="card">
    <h3>ML 自動化</h3>
    <ul>
      <li>同樣樣品：<span class="good">數秒鐘</span>完成分類</li>
      <li>客觀、可重現（同樣輸入 → 同樣輸出）</li>
      <li>可擴展到萬筆光譜</li>
      <li>找出人工容易忽略的細微差異</li>
    </ul>
  </div>
</div>
<p class="citation">Primpke S. et al. (2020) Critical assessment of analytical methods. <em>Appl Spectrosc</em> 74:1012－介紹 siMPle 自動化 FTIR 影像分析框架</p>
`,

// ====== S05 工具地圖 ======
`
<h2>P0｜今天用到的工具地圖</h2>
<div class="grid3">
  <div class="card">
    <h3>🔬 量測（實驗室）</h3>
    <ul>
      <li>NIR × 3：InnoSpectra、NeoSpectra、MicroNIR</li>
      <li>Raman：Ocean Optics QE Pro</li>
    </ul>
  </div>
  <div class="card">
    <h3>☁️ 資料協作（雲端）</h3>
    <ul>
      <li><strong>Supabase</strong> 即時儲存全班掃描資料</li>
      <li>每組互看進度、共建訓練集</li>
    </ul>
  </div>
  <div class="card">
    <h3>🤖 ML 分析（你的筆電）</h3>
    <ul>
      <li><strong>Orange Data Mining</strong> 視覺化 workflow</li>
      <li>無需編程、拖拉式介面</li>
    </ul>
  </div>
</div>
<div class="card ref">
  <h3>延伸線上工具</h3>
  <ul>
    <li><strong>OpenSpecy</strong> (Cowger 2021)：免註冊線上微塑膠光譜比對 <a href="https://openspecy.org" target="_blank">openspecy.org</a></li>
    <li><strong>siMPle</strong> (Primpke 2020)：開源 FTIR 化學成像自動化軟體</li>
  </ul>
</div>
`,

// ====== S06 5 塑膠樣品介紹 ======
`
<h2>P1｜5 種標準塑膠樣品</h2>
<table>
  <tr><th>代號</th><th>全名</th><th>密度</th><th>來源</th><th>外觀</th></tr>
  <tr><td><span class="pill cyan">PE</span></td><td>聚乙烯</td><td>0.91–0.96</td><td>食品袋、保鮮膜</td><td>霧白、軟</td></tr>
  <tr><td><span class="pill purple">PP</span></td><td>聚丙烯</td><td>0.90</td><td>微波容器、優格杯</td><td>半透明、稍硬</td></tr>
  <tr><td><span class="pill pink">PET</span></td><td>聚對苯二甲酸乙二酯</td><td>1.37</td><td>保特瓶</td><td>透明、硬、清脆</td></tr>
  <tr><td><span class="pill green">PS</span></td><td>聚苯乙烯</td><td>1.05</td><td>免洗杯、發泡盒</td><td>白色、易碎</td></tr>
  <tr><td><span class="pill amber">PVC</span></td><td>聚氯乙烯</td><td>1.40</td><td>紅色保鮮膜</td><td>柔軟、有彈性</td></tr>
</table>
<div class="card">
  <h3>每組將拿到</h3>
  <p>5 種塑膠各 3 片（已切成 ~1 cm² 適合光譜量測）+ 1–2 個<span class="highlight">未知樣品</span>（最後用於模型挑戰）。</p>
</div>
`,

// ====== S07 暖身：外觀辨識 ======
`
<h2>P1｜暖身：外觀辨識</h2>
<p>不靠儀器，光靠外觀感受，下列描述最可能是哪種塑膠？</p>
<div class="card activity">
  <h3>透明、硬、輕敲清脆，類似喝完的保特瓶碎片</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PE',false)">A. PE</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PET',true)">B. PET</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PS',false)">C. PS</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm1','PVC',false)">D. PVC</button>
  </div>
  <div class="resultBox" id="q_warm1_result"></div>
</div>
<div class="card activity">
  <h3>白色易碎、輕敲悶聲，類似免洗杯</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PE',false)">A. PE</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PP',false)">B. PP</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PS',true)">C. PS</button>
    <button class="choice" onclick="checkMCQ(this,'q_warm2','PET',false)">D. PET</button>
  </div>
  <div class="resultBox" id="q_warm2_result"></div>
</div>
<details>
  <summary>解析</summary>
  <p>PET 的特徵是<span class="highlight">硬而透明、清脆音</span>；PS 易碎、表面光滑、白色不透明（一般免洗杯就是 PS）。PE 是軟塑膠袋、PP 半透明微韌、PVC 通常較柔軟有彈性。</p>
</details>
`,

// ====== S08 三種 NIR 儀器介紹 ======
`
<h2>P1｜三種 NIR 儀器比較</h2>
<table>
  <tr><th>儀器</th><th>波長範圍</th><th>典型解析度</th><th>大小</th><th>適用塑膠</th></tr>
  <tr><td><strong>InnoSpectra NIR-S</strong></td><td>900–1700 nm</td><td>~10 nm</td><td>掌心大小</td><td>大顆粒、SOPP</td></tr>
  <tr><td><strong>NeoSpectra Micro</strong></td><td>1350–2500 nm</td><td>~16 cm⁻¹</td><td>USB 隨身碟大</td><td>覆蓋 C–H 組合頻區</td></tr>
  <tr><td><strong>MicroNIR (VIAVI)</strong></td><td>950–1650 nm</td><td>~6 nm</td><td>口袋大小</td><td>聚酯、聚醯胺</td></tr>
</table>
<div class="card tip">
  <p>本工作坊每組會輪流用三種 NIR 各掃同一塑膠 → 比較不同儀器訊號的差異（這在文獻上叫 <strong>cross-instrument variability</strong>）。</p>
</div>
<p class="mini">三者都是行動式 (handheld/portable)，重量 < 200 g，可現場使用。靜置實驗室時通常用 FT-NIR 機型（解析度 < 2 nm），但便攜性差。</p>
`,

// ====== S09 Raman 儀器 + 雷射選擇 ======
`
<h2>P1｜Ocean Optics QE Pro：532 vs 785 nm 雷射</h2>
<div class="grid">
  <div class="card">
    <h3>532 nm（綠光）</h3>
    <ul>
      <li>光子能量高 → <span class="good">Raman 訊號強</span></li>
      <li><span class="bad">容易激發螢光</span></li>
      <li>適合：透明、無色、無添加劑的純塑膠</li>
    </ul>
  </div>
  <div class="card">
    <h3>785 nm（近紅外）</h3>
    <ul>
      <li>光子能量低 → Raman 訊號較弱</li>
      <li><span class="good">螢光干擾低</span></li>
      <li>適合：有色、有添加劑、老化塑膠（食品包裝實務首選）</li>
    </ul>
  </div>
</div>
<div class="card activity">
  <h3>紅色 PVC 保鮮膜應選哪個雷射波長？</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_laser','532',false)">A. 532 nm（訊號較強）</button>
    <button class="choice" onclick="checkMCQ(this,'q_laser','785',true)">B. 785 nm（避免螢光）</button>
  </div>
  <div class="resultBox" id="q_laser_result"></div>
</div>
<details>
  <summary>為什麼？</summary>
  <p>紅色色素吸收 532 nm 綠光、放出寬廣螢光背景，會淹沒 Raman 訊號。改用 785 nm 紅外雷射，色素的螢光放射波長通常落在 700 nm 以下，較不會被激發。</p>
</details>
`,

,

// ====== S10 P2 NIR 掃描 SOP ======
`
<h2>P2｜NIR 掃描 SOP</h2>
<div class="grid">
  <div class="card">
    <h3>5 步驟（每組約 35 分鐘）</h3>
    <ol>
      <li>開機 → 暖機 1–2 分鐘</li>
      <li>校正：<span class="highlight">White reference</span>（白色 PTFE 板）+ <span class="highlight">Dark</span>（蓋上）</li>
      <li>樣品平放於探頭下，輕壓接觸</li>
      <li>每樣品<span class="highlight">掃 3 重複</span>，每次間隔 5 秒</li>
      <li>軟體匯出 → CSV（wavelength, intensity）</li>
    </ol>
  </div>
  <div class="card">
    <h3>每組目標</h3>
    <p><strong>15 筆 NIR 光譜</strong>：</p>
    <p>5 種塑膠 × 3 重複 = 15 筆</p>
    <p>若時間允許，<span class="highlight">輪流用三種 NIR</span> 各掃同樣品比較。</p>
  </div>
</div>
<div class="card tip">
  <p>關鍵：每次量測前一定要重做 white reference + dark，特別是換到不同顏色或形狀的樣品時。校正未做好 → 後續 ML 無法救。</p>
</div>
`,

// ====== S11 NIR 上傳介面 ======
`
<h2>P2｜上傳 NIR 掃描資料</h2>
<p>從 NIR 軟體匯出 CSV，貼上或上傳檔案 → 預覽 → 上傳雲端。</p>
<div data-recorder="NIR"></div>
<div class="card tip">
  <p>每掃完一個樣品就上傳一筆。<strong>3 重複 = 3 次上傳</strong>，每次「備註」可寫「rep 1/2/3」方便辨識。</p>
</div>
`,

// ====== S12 P3 Raman 掃描 SOP ======
`
<h2>P3｜Raman 掃描 SOP（QE Pro）</h2>
<div class="grid">
  <div class="card">
    <h3>操作步驟</h3>
    <ol>
      <li>選擇雷射波長：<span class="highlight">532 或 785 nm</span>（依樣品決定）</li>
      <li>對焦：用顯微頭找到樣品平整處</li>
      <li>背景：先量空白（無樣品時的暗訊號）</li>
      <li>整合時間 (integration time)：1–5 秒，依訊號強度調整</li>
      <li>每樣品掃 3 重複，匯出 CSV</li>
    </ol>
  </div>
  <div class="card">
    <h3>每組目標</h3>
    <p><strong>20–30 筆 Raman 光譜</strong>：</p>
    <p>5 塑膠 × 2 雷射 × 2–3 重複</p>
    <p>建議至少先用 <span class="highlight">785 nm</span> 把 5 種塑膠都掃過，再用 532 nm 補非螢光樣品。</p>
  </div>
</div>
`,

// ====== S13 Raman 上傳 ======
`
<h2>P3｜上傳 Raman 掃描資料</h2>
<div data-recorder="Raman"></div>
<div class="card tip">
  <p>Raman 軟體匯出時，X 軸通常是 <strong>Raman shift (cm⁻¹)</strong>，不是波長 (nm)。請確認格式正確。</p>
</div>
`,

// ====== S14 休息 ======
`
<h2>☕ 休息 10 分鐘</h2>
<div class="card">
  <h3>休息時請確認</h3>
  <ul>
    <li>✅ 你的組別已上傳至少 5 筆 NIR（每塑膠至少 1 筆）</li>
    <li>✅ 你的組別已上傳至少 5 筆 Raman</li>
    <li>✅ 筆電已開 Orange，並能找到 <strong>Spectroscopy</strong> 群組的 widgets</li>
  </ul>
</div>
<div class="card ref">
  <h3>下半場：Orange 中做 ML 分析</h3>
  <ul>
    <li>P4 預處理：基線、平滑、正規化</li>
    <li>P5 PCA 視覺化</li>
    <li>P6 分類器訓練（kNN / SVM / Random Forest）</li>
    <li>P7 未知樣品挑戰</li>
  </ul>
</div>
`,

// ====== S15 P4 為什麼預處理 ======
`
<h2>P4｜為什麼需要預處理？</h2>
<div class="card">
  <p>從儀器直出的 raw spectrum 通常有三大問題：</p>
  <ol>
    <li><strong>基線斜率</strong>：散射、樣品厚度導致整段光譜「斜上去」</li>
    <li><strong>強度差異</strong>：同樣 PE，A 樣品強度 100、B 樣品強度 500（樣品擺放角度差異）</li>
    <li><strong>高頻雜訊</strong>：偵測器熱雜訊、宇宙射線（Raman）</li>
  </ol>
</div>
<div class="card ref">
  <p>沒做預處理 → ML 學到的是「樣品厚度」而不是「化學身份」 → <span class="bad">無法泛化</span>。</p>
</div>
`,

// ====== S16 三步驟預處理 ======
`
<h2>P4｜三步驟標準預處理</h2>
<div class="grid3">
  <div class="card">
    <h3>1. 基線校正</h3>
    <p>Orange widget: <strong>Preprocess Spectra → Baseline</strong></p>
    <ul>
      <li>Rubber band</li>
      <li>Asymmetric least squares (AsLS)</li>
    </ul>
    <p class="mini">移除「斜上去」的趨勢。</p>
  </div>
  <div class="card">
    <h3>2. 平滑化</h3>
    <p>Orange widget: <strong>Savitzky-Golay Filter</strong></p>
    <ul>
      <li>window size: 7–15 點</li>
      <li>polynomial order: 2 或 3</li>
    </ul>
    <p class="mini">移除高頻雜訊，保留峰形。</p>
  </div>
  <div class="card">
    <h3>3. 正規化</h3>
    <p>Orange widget: <strong>SNV (Standard Normal Variate)</strong></p>
    <ul>
      <li>每條光譜減去自己的平均、除以標準差</li>
      <li>消除強度差異</li>
    </ul>
    <p class="mini">讓不同強度的光譜「比較得起來」。</p>
  </div>
</div>
`,

// ====== S17 Orange 操作示範 ======
`
<h2>P4｜Orange Workflow：載入 + 預處理</h2>
<div class="card">
  <h3>建立 Workflow（建議步驟）</h3>
  <ol>
    <li><strong>File</strong> widget → 載入 <code>plastic_reference_library.csv</code></li>
    <li>連到 <strong>Spectra</strong> widget（自動辨識為光譜資料）</li>
    <li>連到 <strong>Preprocess Spectra</strong> widget：
      <ul>
        <li>勾 Cut（裁切無用波段）</li>
        <li>勾 Baseline (asLS)</li>
        <li>勾 Savitzky-Golay (window=11, poly=3)</li>
        <li>勾 SNV</li>
      </ul>
    </li>
    <li>輸出連到 <strong>Data Table</strong> 預覽結果</li>
  </ol>
</div>
<div class="card tip">
  <p>Orange 的好處：每個 widget 都有「眼睛」按鈕，點開即可看到該步驟的中介結果。建議每加一個預處理 widget 就點開看光譜變化，建立直覺。</p>
</div>
`,

// ====== S18 P5 PCA 概念 ======
`
<h2>P5｜PCA：把高維光譜壓平到 2D</h2>
<div class="grid">
  <div class="card">
    <h3>什麼是 PCA？</h3>
    <p>一條 FTIR 光譜 = <span class="highlight">3000 維向量</span>。PCA 找出資料變異最大的兩個方向（PC1、PC2），把 3000 維壓成 2D。</p>
    <p>視覺上：類似把一堆雞蛋從各種角度看，找到「最能區分形狀」的那個角度。</p>
  </div>
  <div class="card">
    <h3>對微塑膠分析的用處</h3>
    <ul>
      <li>看不同塑膠是否在 2D 平面<span class="highlight">自然分群</span></li>
      <li>找出離群樣品（outliers）</li>
      <li>判斷預處理是否成功（分群清楚 = 預處理 OK）</li>
    </ul>
  </div>
</div>
<p class="mini">注意：PCA 是<strong>非監督式</strong>方法 — 不需要事先告訴它「這是 PE 那是 PP」。如果預處理 + PCA 後仍能看到分群，代表資料本身就有區別能力。</p>
`,

// ====== S19 Orange PCA 操作 ======
`
<h2>P5｜Orange Workflow：PCA + Scatter Plot</h2>
<div class="card">
  <h3>建立步驟</h3>
  <ol>
    <li>從 <strong>Preprocess Spectra</strong> 輸出，連到 <strong>PCA</strong> widget</li>
    <li>PCA widget 設定：「2 components」</li>
    <li>PCA 輸出連到 <strong>Scatter Plot</strong></li>
    <li>Scatter Plot 設定：X = PC1、Y = PC2、Color = class</li>
  </ol>
</div>
<div class="card ref">
  <h3>預期會看到</h3>
  <p>5 種塑膠在 PC1-PC2 平面形成 5 個明顯分群（cluster）。<br/>
  - PE/PP 因為都是<span class="highlight">脂肪族碳氫</span>，會比較靠近<br/>
  - PET/PS 含<span class="highlight">芳香環</span>，會聚在另一側<br/>
  - PVC 因 C–Cl，獨自一群</p>
</div>
`,

// ====== S20 PCA 判讀互動 ======
`
<h2>P5｜PCA 圖判讀練習</h2>
<div class="card activity">
  <h3>假設你在 Orange 看到 PE 與 PP 在 PCA 圖上幾乎重疊，無法分開。最可能原因是？</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_pca','noise',false)">A. 雜訊太多</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','similar',true)">B. PE 與 PP 化學結構相似，差異主要在 CH₃ 振動，PC1+PC2 不足以分離</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','overfit',false)">C. 過度配適</button>
    <button class="choice" onclick="checkMCQ(this,'q_pca','sample',false)">D. 樣品數太少</button>
  </div>
  <div class="resultBox" id="q_pca_result"></div>
</div>
<details>
  <summary>解析</summary>
  <p>PE 與 PP 都是脂肪族碳氫聚合物，差別只在 PP 多了 CH₃ 側鏈。前兩個主成分（捕捉最大變異）可能反映「芳香 vs 非芳香」「有 vs 無 Cl」等大方向差異，而把細節留給 PC3、PC4。<br/><br/>
  解法：(a) 看 PC3-PC4 圖、(b) 改用<span class="highlight">監督式方法</span>（PLS-DA、SVM）直接以「PE/PP」標籤訓練。</p>
</details>
`,

// ====== S21 P6 分類器三選一 ======
`
<h2>P6｜三種監督式分類器</h2>
<table>
  <tr><th>演算法</th><th>原理</th><th>優點</th><th>缺點</th></tr>
  <tr><td><strong>kNN</strong><br/>K-Nearest Neighbors</td><td>找最相似的 K 個訓練樣品，多數決</td><td>簡單、無假設</td><td>大資料時慢</td></tr>
  <tr><td><strong>SVM</strong><br/>Support Vector Machine</td><td>找最佳分界超平面</td><td>對高維資料佳、精度高</td><td>kernel 選擇要試</td></tr>
  <tr><td><strong>Random Forest</strong></td><td>多棵決策樹投票</td><td>抗雜訊、可解釋（特徵重要性）</td><td>模型大、難直觀</td></tr>
</table>
<div class="card tip">
  <p>對光譜分類沒有「絕對最好」的演算法。本工作坊三種都試一遍、比較準確率，這就是「模型選擇 (model selection)」的標準流程。</p>
</div>
`,

// ====== S22 Orange Test & Score ======
`
<h2>P6｜Orange Workflow：Test and Score</h2>
<div class="card">
  <h3>建立步驟</h3>
  <ol>
    <li>從 <strong>Preprocess Spectra</strong> 連到三個分類器 widgets：<strong>kNN</strong>、<strong>SVM</strong>、<strong>Random Forest</strong></li>
    <li>三個分類器都連到 <strong>Test and Score</strong> widget</li>
    <li>Test and Score 設定：<span class="highlight">Cross-validation</span> (k=5 或 k=10)</li>
    <li>查看 CA (Classification Accuracy)、F1、Precision、Recall</li>
  </ol>
</div>
<div class="card ref">
  <h3>預期結果（基於文獻）</h3>
  <ul>
    <li>清乾淨的 5 塑膠光譜：所有演算法應達 <span class="good">> 95% 準確率</span></li>
    <li>實際學生掃的資料：因儀器/操作差異，可能落在 80–95%</li>
    <li>如果有任何一個 < 70%：去看混淆矩陣，找原因</li>
  </ul>
</div>
`,

// ====== S23 混淆矩陣 ======
`
<h2>P6｜混淆矩陣判讀</h2>
<div class="card">
  <h3>什麼是混淆矩陣？</h3>
  <p>列 = 真實類別、欄 = 預測類別。對角線 = 預測正確；非對角線 = 被誤分。</p>
</div>
<div class="card activity">
  <h3>下表是某模型的混淆矩陣（10 筆 PE 中有 3 筆被預測為 PP）。最可能的解釋？</h3>
  <table style="background:#fff7ed;">
    <tr><th></th><th>預測 PE</th><th>預測 PP</th><th>預測 PET</th></tr>
    <tr><td><strong>真實 PE</strong></td><td>7</td><td>3</td><td>0</td></tr>
    <tr><td><strong>真實 PP</strong></td><td>2</td><td>8</td><td>0</td></tr>
    <tr><td><strong>真實 PET</strong></td><td>0</td><td>0</td><td>10</td></tr>
  </table>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_cm','random',false)">A. 模型隨機亂猜</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','similar',true)">B. PE 與 PP 光譜相似，模型難以區分</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','overfit',false)">C. 過度配適造成</button>
    <button class="choice" onclick="checkMCQ(this,'q_cm','bug',false)">D. 軟體錯誤</button>
  </div>
  <div class="resultBox" id="q_cm_result"></div>
</div>
<details>
  <summary>解析</summary>
  <p>對角線 PET=10 全對；PE-PP 互相混淆（PE→PP 3 筆、PP→PE 2 筆）。改善方法：(1) 加 CH₃ 區域加權，(2) 改用 1377 cm⁻¹ (PP 獨有) 作為強特徵，(3) 收集更多 PE/PP 訓練資料。</p>
</details>
`,

// ====== S24 學生實作時間 ======
`
<h2>P6｜學生實作時間</h2>
<div class="card">
  <h3>目標</h3>
  <p>用 <strong>全班合作上傳</strong>的光譜資料（從 Supabase 匯出 CSV，或用 reference_library.csv）訓練自己的分類器。</p>
</div>
<div class="card ref">
  <h3>實作步驟</h3>
  <ol>
    <li>建立完整 Orange workflow（預處理 → PCA → 分類器 → Test&Score）</li>
    <li>記錄三種演算法的 CA</li>
    <li>看混淆矩陣，找出最易混淆的兩種塑膠</li>
    <li>嘗試改善：換預處理組合、加 PCA 降維、調 hyperparameters</li>
  </ol>
</div>
<div class="card tip">
  <p>不知道從哪開始？打開 <a href="ml-workshop/plastic_classification.ows" target="_blank">plastic_classification.ows</a> 範本 workflow，看完整的 widget 連線。</p>
</div>
`,

// ====== S25 P7 未知樣品挑戰 ======
`
<h2>P7｜未知樣品挑戰：out-of-distribution</h2>
<div class="card">
  <h3>實驗</h3>
  <p>老師會發給你一個<strong>未事先聲明類別</strong>的樣品（可能是 PA、ABS、PC、或老化的 PE/PP）。</p>
  <p>請：</p>
  <ol>
    <li>用 NIR + Raman 掃描，上傳資料（plastic_type 選 <code>unknown</code>）</li>
    <li>在 Orange 中用你訓練好的模型預測它</li>
    <li>觀察模型給的「機率」是否高自信</li>
  </ol>
</div>
<div class="card activity">
  <h3>如果模型對未知樣品給出「PE 80%、PP 18%、其他 2%」的預測，這代表？</h3>
  <div class="choices-grid">
    <button class="choice" onclick="checkMCQ(this,'q_ood','correct',false)">A. 樣品就是 PE（信心高）</button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','suspicious',true)">B. 可能是 PE，但因模型只認得訓練過的 5 種塑膠，若樣品是 PA 模型仍會給高機率 → 應該<strong>懷疑</strong>結果</button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','wrong',false)">C. 模型壞掉了</button>
    <button class="choice" onclick="checkMCQ(this,'q_ood','sample',false)">D. 樣品有問題</button>
  </div>
  <div class="resultBox" id="q_ood_result"></div>
</div>
<details>
  <summary>關鍵觀念：out-of-distribution detection</summary>
  <p>傳統分類器<span class="bad">假設</span>所有樣品一定屬於訓練類別之一。如果未知樣品是 PA（訓練集沒有），模型仍會「強制」分到最像的類別並給高信心。</p>
  <p>解法：(1) 加 <strong>distance to training set</strong> 檢查 (Orange 有 Outlier widget)，(2) 用 <strong>OneClass SVM</strong> 做 anomaly detection，(3) 報告時同時呈現「模型機率」+「相似度」。</p>
</details>
`,

// ====== S26 P8 模型陷阱 ======
`
<h2>P8｜ML 在微塑膠分析的三大陷阱</h2>
<div class="grid3">
  <div class="card">
    <h3>1. 過度配適 (overfitting)</h3>
    <p>模型在訓練資料 100% 正確，但<span class="bad">測試資料只有 60%</span>。</p>
    <p>解法：cross-validation、降低模型複雜度、增加資料。</p>
  </div>
  <div class="card">
    <h3>2. 訓練資料偏差</h3>
    <p>本工作坊只用「乾淨新品塑膠」訓練 → 對<span class="bad">老化 / 髒污 / 混合塑膠</span>表現可能崩壞。</p>
    <p>解法：訓練資料要涵蓋實際應用中可能遇到的變異。</p>
  </div>
  <div class="card">
    <h3>3. 儀器轉移失敗</h3>
    <p>用 InnoSpectra 訓練的模型，<span class="bad">直接套到 NeoSpectra 通常失敗</span>（波長範圍不同、解析度不同）。</p>
    <p>解法：每台儀器各自訓練，或用 domain adaptation。</p>
  </div>
</div>
<p class="citation">Renner G. et al. (2018) Analytical methodologies for monitoring micro(nano)plastics. <em>TrAC</em> 108:84 — 討論 ML 在環境樣品的可靠性挑戰</p>
`,

// ====== S27 真實研究工具 ======
`
<h2>P8｜真實研究中使用的工具</h2>
<div class="grid">
  <div class="card">
    <h3>🌐 OpenSpecy (Cowger 2021)</h3>
    <p>免註冊線上微塑膠光譜比對網站。</p>
    <ul>
      <li>上傳你的 Raman / FTIR → 自動比對 1000+ 庫</li>
      <li>免費、開源、學術界廣用</li>
      <li>網址：<a href="https://openspecy.org" target="_blank">openspecy.org</a></li>
    </ul>
    <p class="mini">課後作業：用你今天掃的光譜，去 OpenSpecy 比對看結果。</p>
  </div>
  <div class="card">
    <h3>🔬 siMPle (Primpke 2020)</h3>
    <p>自動化 μ-FTIR 化學成像分析框架。</p>
    <ul>
      <li>處理 FPA 偵測器 4096 像素 × N 波數的影像</li>
      <li>自動辨識每個像素的塑膠類型</li>
      <li>是目前歐盟海洋研究廣用的工具</li>
    </ul>
  </div>
</div>
`,

// ====== S28 P9 總結 ======
`
<h2>P9｜今日成就</h2>
<div class="card ref">
  <h3>你今天做到了</h3>
  <ul>
    <li>✅ 親手操作三種行動式 NIR + 雙波長 Raman</li>
    <li>✅ 上傳 30+ 筆自製光譜資料到全班共享雲端</li>
    <li>✅ 在 Orange 中完整跑通預處理 → PCA → 分類器 → 評估</li>
    <li>✅ 觀察到 out-of-distribution 樣品的模型行為</li>
    <li>✅ 理解 ML 在微塑膠分析的優勢與陷阱</li>
  </ul>
</div>
<div class="card">
  <h3>課後挑戰（選做）</h3>
  <ul>
    <li>掃描你的手機殼、眼鏡、便當盒，丟進你的模型分類</li>
    <li>上傳到 OpenSpecy 比對，看結果是否一致</li>
    <li>如果準確率不夠：思考要怎麼擴充訓練資料</li>
  </ul>
</div>
<h1 style="text-align:center;margin-top:30px;">辛苦了，謝謝大家！</h1>
`,

] // end SLIDES
;
