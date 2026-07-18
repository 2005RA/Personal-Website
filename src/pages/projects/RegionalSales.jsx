import { useEffect } from 'react'
import { parseWithHandlers } from '../../lib/parseHtml.js'

const css = `
:root{
  --bg:#faf9f7;--bg2:#ffffff;--bg3:#f0ecff;
  --border:#e8e4f0;
  --accent:#7c3aed;--accent2:#059669;--accent3:#ef4444;
  --text:#1a1a2e;--muted:#4a4a6a;
  --mono:'Syne',sans-serif;
  --serif:'Fraunces',serif;
  --sans:'DM Sans',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-weight:400;line-height:1.7;overflow-x:hidden;}
body::before{display:none;}
body::after{content:'';position:fixed;inset:0;z-index:0;
  background-image:linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px);
  background-size:60px 60px;pointer-events:none;}
nav,main,footer,.project-hero,.page-hero{position:relative;z-index:1;}
/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
.nav-links{display:flex;gap:2.5rem;list-style:none;}
.nav-links a,.nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.nav-links a:hover,.nav-back:hover{color:var(--accent);}
/* PROJECT HERO */
.project-hero{padding:9rem 3rem 4rem;border-bottom:1px solid var(--border);}
.project-tag{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
.project-title{font-family:var(--serif);font-size:clamp(2rem,5.5vw,4.5rem);line-height:1.05;letter-spacing:-0.02em;max-width:900px;}
.project-title em{font-style:italic;color:var(--accent);}
.project-meta{display:flex;gap:3rem;margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.5rem;flex-wrap:wrap;}
.meta-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem;}
.meta-value{font-family:var(--mono);font-size:0.78rem;color:var(--text);}
/* QUICK-NAV */
.quick-nav{position:sticky;top:65px;z-index:50;background:var(--bg2);border-bottom:1px solid var(--border);
  padding:0.65rem 3rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
.quick-nav-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-right:0.5rem;}
.qn-btn{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;
  padding:0.3rem 0.8rem;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:all 0.2s;}
.qn-btn:hover{border-color:var(--accent);color:var(--accent);}
.qn-btn.risk{border-color:rgba(239,68,68,0.3);color:var(--accent3);}
.qn-btn.risk:hover{border-color:var(--accent3);background:rgba(239,68,68,0.08);}
.qn-btn.rec{border-color:rgba(5,150,105,0.3);color:var(--accent2);}
.qn-btn.rec:hover{border-color:var(--accent2);background:rgba(5,150,105,0.08);}
/* MAIN CONTENT */
main{max-width:1100px;margin:0 auto;padding:4rem 3rem 6rem;}
.summary{border-left:2px solid var(--accent);padding:1.5rem 2rem;background:var(--bg2);margin-bottom:4rem;}
.summary p{color:var(--muted);}
.summary p strong{color:var(--text);}
.content-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:0.5rem;}
.content-title{font-family:var(--serif);font-size:1.75rem;margin-bottom:1.25rem;}
.content-text{color:var(--muted);margin-bottom:2.5rem;max-width:740px;font-size:0.92rem;}
/* CHARTS */
.chart-wrap{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:3rem;}
.chart-title{font-family:var(--mono);font-size:0.67rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);
  margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);}
.chart-title span{color:var(--accent);}
.chart-canvas-wrap{position:relative;width:100%;height:320px;}
.chart-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5px;background:var(--border);margin-bottom:3rem;}
.chart-row .chart-wrap{margin-bottom:0;border:none;}
/* METRICS */
.findings-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:var(--border);margin-bottom:3rem;}
.findings-grid.col3{grid-template-columns:repeat(3,1fr);}
.finding-card{background:var(--bg2);padding:1.5rem;}
.finding-num{font-family:var(--mono);font-size:1.9rem;color:var(--accent);line-height:1;margin-bottom:0.4rem;}
.finding-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:0.35rem;}
.finding-desc{font-size:0.76rem;color:var(--muted);}
/* TABLE */
.table-wrap{background:var(--bg2);border:1px solid var(--border);overflow-x:auto;margin-bottom:3rem;}
.table-header{padding:0.9rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
.table-header-title{font-family:var(--mono);font-size:0.67rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
.table-header-title span{color:var(--accent);}
.table-badge{font-family:var(--mono);font-size:0.6rem;padding:0.2rem 0.55rem;border:1px solid var(--border);color:var(--muted);}
table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:0.77rem;}
thead th{padding:0.7rem 1.25rem;text-align:left;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;}
tbody tr{border-bottom:1px solid var(--border);transition:background 0.15s;}
tbody tr:last-child{border-bottom:none;}
tbody tr:hover{background:var(--bg3);}
tbody td{padding:0.65rem 1.25rem;color:var(--text);vertical-align:top;}
td.pos{color:#059669;} td.neg{color:#ef4444;} td.acc{color:var(--accent);} td.mu{color:var(--muted);font-size:0.7rem;}
/* INSIGHTS */
.insights-list{list-style:none;margin-bottom:3rem;}
.insights-list li{padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);background:var(--bg2);display:flex;gap:1rem;align-items:flex-start;}
.insights-list li:first-child{border-top:1px solid var(--border);}
.insight-bullet{font-family:var(--mono);font-size:0.72rem;color:var(--accent);flex-shrink:0;margin-top:0.1rem;}
.insight-text{font-size:0.86rem;color:var(--muted);}
.insight-text strong{color:var(--text);}
/* RISK & REC BLOCKS */
.risk-block{border:1px solid rgba(239,68,68,0.25);background:rgba(239,68,68,0.05);padding:1.75rem 2rem;margin-bottom:1rem;}
.rec-block{border:1px solid rgba(5,150,105,0.25);background:rgba(5,150,105,0.06);padding:1.75rem 2rem;margin-bottom:1rem;}
.block-icon{font-size:1rem;margin-right:0.5rem;}
.block-title{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.75rem;}
.risk-block .block-title{color:var(--accent3);}
.rec-block .block-title{color:var(--accent2);}
.block-text{font-size:0.86rem;color:var(--muted);}
.block-text strong{color:var(--text);}
/* DIVIDER */
.divider{border:none;border-top:1px solid var(--border);margin:3rem 0;}
/* SECTION ANCHOR HIGHLIGHT */
.section-anchor{scroll-margin-top:110px;}
/* FOOTER */
footer{border-top:1px solid var(--border);padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;}
footer span{font-family:var(--mono);font-size:0.62rem;color:var(--muted);letter-spacing:0.1em;}
footer a{color:var(--accent);text-decoration:none;}
@media(max-width:768px){
  nav{padding:1rem 1.5rem;} .nav-links{display:none;}
  .project-hero,.quick-nav{padding-left:1.5rem;padding-right:1.5rem;}
  main{padding:3rem 1.5rem 5rem;}
  .chart-row{grid-template-columns:1fr;}
  .findings-grid{grid-template-columns:1fr 1fr;}
  .findings-grid.col3{grid-template-columns:1fr 1fr;}
}

/* LANG TOGGLE */
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.lang-toggle{display:flex;align-items:center;gap:0.55rem;border-left:1px solid var(--border);padding-left:1.25rem;}
.lang-label{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);opacity:0.38;transition:opacity 0.2s;user-select:none;}
.lang-label.active{opacity:1;}
.switch{position:relative;display:inline-block;width:36px;height:19px;flex-shrink:0;}
.switch input{opacity:0;width:0;height:0;position:absolute;}
.slider{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:19px;transition:0.3s;}
.slider::before{content:'';position:absolute;height:11px;width:11px;left:3px;bottom:3px;background:var(--accent);border-radius:50%;transition:0.3s;}
.switch input:checked + .slider::before{transform:translateX(17px);}

.nav-right{display:flex;align-items:center;gap:1.5rem;}

.lang-label{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);opacity:0.38;transition:opacity 0.2s;user-select:none;}
.lang-label.active{opacity:1;}
.switch{position:relative;display:inline-block;width:36px;height:19px;flex-shrink:0;}
.switch input{opacity:0;width:0;height:0;position:absolute;}
.slider{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:19px;transition:0.3s;}
.slider::before{content:'';position:absolute;height:11px;width:11px;left:3px;bottom:3px;background:var(--accent);border-radius:50%;transition:0.3s;}
.switch input:checked + .slider::before{transform:translateX(17px);}




/* ── language toggle ── */
.lang-pill{display:flex;background:#EDE9FE;border-radius:20px;padding:3px;}
.lang-btn{padding:4px 14px;border:none;background:transparent;border-radius:16px;
  font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.06em;
  color:#52525B;transition:all .2s;}
.lang-btn.active{background:white;color:#7C3AED;box-shadow:0 1px 6px rgba(124,58,237,.14);}

body{}
`

const bodyHtml = `
<nav>
  <a href="/" class="nav-logo">R.A.</a>
  <div class="nav-right">
    <a href="/" class="nav-back" id="navBack" data-en="← Back to Portfolio" data-az="← Portfolioya qayıt">← Back to Portfolio</a>
    
  </div>
    <div class="lang-pill">
      <button class="lang-btn active" onclick="setLang('en')">EN</button>
      <button class="lang-btn"        onclick="setLang('az')">AZ</button>
    </div>
</nav>

<div class="project-hero">
  <div class="project-tag">Sales Analytics · Regional Performance</div>
  <h1 class="project-title">Regional Sales &<br><em>Discount Strategy Analysis</em></h1>
    <!-- DATE: e.g. "March 2025 · University Internship Project" -->
  <div class="project-meta">
    <div><div class="meta-label">Regions</div><div class="meta-value">Baku · Ganja · Khirdalan · Shaki · Sumgayit</div></div>
    <div><div class="meta-label">Categories</div><div class="meta-value">Cosmetics · Electronics · Clothing · Food · Home</div></div>
    <div><div class="meta-label">Tools</div><div class="meta-value">Excel · Pivot Tables · Data Aggregation</div></div>
    <div><div class="meta-label">Focus</div><div class="meta-value">Discount impact on net revenue by region & category</div></div>
  </div>
</div>
<div class="quick-nav">
  <span class="quick-nav-label">Jump to →</span>
  <a class="qn-btn" href="#overview">Revenue Overview</a>
  <a class="qn-btn" href="#discount">Discount Analysis</a>
  <a class="qn-btn" href="#category">Category Breakdown</a>
  <a class="qn-btn risk" href="#risks">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations">✓ Recommendations</a>
</div>
<main>
  <div class="summary">
    <p><strong>Objective:</strong> Analyse sales performance across 5 regions and 5 product categories, with particular focus on the cost of discount strategies and their impact on net revenue.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> Baku generates the highest revenue (47,859 AZN, 21% of total) but also applies significant discounts in Cosmetics. Ganja applies the highest discount rate (11.8%) while Shaki applies the lowest (9.8%) — yet Shaki is still the weakest performer, suggesting the problem is demand and marketing, not pricing.</p>
  </div>

  <div id="overview" class="section-anchor">
    <p class="content-label">Revenue Overview</p>
    <h2 class="content-title">Sales by Region</h2>
  </div>
  <div class="findings-grid">
    <div class="finding-card"><div class="finding-num">227k</div><div class="finding-label">Total Revenue (AZN)</div><div class="finding-desc">Across all 5 regions and product categories combined</div></div>
    <div class="finding-card"><div class="finding-num">47,859</div><div class="finding-label">Baku (Top)</div><div class="finding-desc">21% of total revenue — highest-performing region</div></div>
    <div class="finding-card"><div class="finding-num">11.8%</div><div class="finding-label">Ganja Discount Rate</div><div class="finding-desc">Highest discount rate across all regions</div></div>
    <div class="finding-card"><div class="finding-num">5,603</div><div class="finding-label">Top–Bottom Gap (AZN)</div><div class="finding-desc">Between Baku (highest) and Sumgayit (lowest) — significant regional disparity</div></div>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span>Fig 01</span> — Net Revenue by Region (AZN)</div><div class="chart-canvas-wrap"><canvas id="c-region-rev"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span>Fig 02</span> — Revenue Share by Region (%)</div><div class="chart-canvas-wrap"><canvas id="c-region-share"></canvas></div></div>
  </div>

  <hr class="divider"/>
  <div id="discount" class="section-anchor">
    <p class="content-label">Discount Analysis</p>
    <h2 class="content-title">The Cost of Discounting</h2>
  </div>
  <p class="content-text">Only Cosmetics received discounts — all other categories (Electronics, Clothing, Food, Home Goods) were sold at full price. The total discount cost across all regions for Cosmetics alone was 5,928 AZN, representing 10.2% of Cosmetics revenue. This is the single largest margin drag in the dataset.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span>Fig 03</span> — Discount Rate by Region (%)</div><div class="chart-canvas-wrap"><canvas id="c-disc-region"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span>Fig 04</span> — Discount Amount vs Revenue by Region (AZN)</div><div class="chart-canvas-wrap"><canvas id="c-disc-cost"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Ganja discounts the most (11.8%) yet is only the 2nd best performer.</strong> Higher discounts are not translating into proportionally higher revenue — suggesting diminishing returns from discount-led strategies in this region.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Shaki applies the lowest discounts (9.8%) and is still the weakest region.</strong> This confirms that low discounting isn't the cause of poor performance — the root issue is lower demand and inadequate marketing investment.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>Cosmetics discounts cost 5,928 AZN in foregone revenue</strong> while Electronics, Clothing, Food, and Home Goods were all sold at full price with no apparent demand problem. Why is Cosmetics the exception?</span></li>
  </ul>

  <hr class="divider"/>
  <div id="category" class="section-anchor">
    <p class="content-label">Category Breakdown</p>
    <h2 class="content-title">Product Mix by Region</h2>
  </div>
  <div class="chart-wrap"><div class="chart-title"><span>Fig 05</span> — Sales by Category × Region (AZN)</div><div class="chart-canvas-wrap" style="height:360px"><canvas id="c-cat-region"></canvas></div></div>
  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 01</span> — Regional Summary with Discount Impact</span>
      <span class="table-badge">5 regions</span>
    </div>
    <table><thead><tr><th>Region</th><th>Total Revenue (AZN)</th><th>Share %</th><th>Discount Amount (AZN)</th><th>Discount Rate</th><th>Top Category</th></tr></thead>
    <tbody>
      <tr><td class="acc">Baku</td><td>47,859</td><td>21.0%</td><td class="neg">4,912</td><td>10.3%</td><td>Cosmetics (13,095)</td></tr>
      <tr><td class="acc">Ganja</td><td>46,438</td><td>20.4%</td><td class="neg">5,469</td><td class="neg">11.8% ▲</td><td>Cosmetics (11,677)</td></tr>
      <tr><td class="acc">Khirdalan</td><td>45,866</td><td>20.1%</td><td>4,680</td><td>10.2%</td><td>Home Goods (10,410)</td></tr>
      <tr><td class="acc">Shaki</td><td>44,675</td><td>19.6%</td><td class="pos">4,399</td><td class="pos">9.8% ▼</td><td>Clothing (10,952)</td></tr>
      <tr><td class="acc">Sumgayit</td><td>42,255</td><td>18.5%</td><td>4,733</td><td>11.2%</td><td>Food (10,542)</td></tr>
    </tbody></table>
  </div>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label">Risk Assessment</p><h2 class="content-title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Cosmetics discount dependency</div><div class="block-text">Nearly 6,000 AZN in annual revenue is being sacrificed through Cosmetics discounts. If this discount is removed without a marketing replacement, demand may fall — but if it continues, margins compress every year. <strong>This needs a controlled A/B test before any change.</strong></div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Shaki structural underperformance</div><div class="block-text">Shaki is the weakest region despite having the lowest discount rate. This means the problem is not price — it is volume. Without targeted investment, Shaki's gap vs Baku will widen as other regions grow.</div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label">Action Items</p><h2 class="content-title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Reduce Cosmetics discounts in Baku and Khirdalan first</div><div class="block-text">These two regions already have strong organic demand — discounts may be unnecessary. A trial quarter without Cosmetics discounts in Baku could save ~4,900 AZN with minimal demand impact. <strong>Test before deploying company-wide.</strong></div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Invest in demand generation for Shaki</div><div class="block-text">Since Shaki's problem is not pricing but demand, allocate a marketing budget (social media, local partnerships) specifically for this region. Track unit sales growth rather than revenue — if volume increases, full-price revenue will follow.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Investigate why Ganja's high discount isn't translating to top revenue</div><div class="block-text">Ganja applies 11.8% discount but is 2nd, not 1st. This suggests customers in Ganja are price-sensitive but the discount ceiling has been reached. Consider loyalty programmes or bundling instead of further discounting.</div></div>
</main>

<footer>
  <span>← <a href="/">Back to Portfolio</a></span>
  <span>© 2026 — Junior Data Analyst Portfolio</span>
</footer>
`

const script = `
const A='#7c3aed',A2='#059669',A3='#ef4444',A4='#10b981',A5='rgba(124,58,237,0.45)';
const GRID='rgba(0,0,0,0.07)',MUT='#6b7280',BG3='#f0ecff';
const FONT="'Syne',sans-serif";
Chart.defaults.color=MUT;Chart.defaults.borderColor=GRID;
Chart.defaults.font.family=FONT;Chart.defaults.font.size=11;
const scl={x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT}}};


// c-region-rev
new Chart(document.getElementById('c-region-rev'),{type:'bar',data:{
  labels:['Baku','Ganja','Khirdalan','Shaki','Sumgayit'],
  datasets:[{label:'Revenue (AZN)',data:[47859,46438,45866,44675,42255],
    backgroundColor:[A,'rgba(124,58,237,0.75)','rgba(124,58,237,0.55)','rgba(124,58,237,0.35)','rgba(255,255,255,0.15)'],borderWidth:0,borderRadius:2}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:38000}}}});

// c-region-share (donut)
new Chart(document.getElementById('c-region-share'),{type:'doughnut',data:{
  labels:['Baku','Ganja','Khirdalan','Shaki','Sumgayit'],
  datasets:[{data:[21.0,20.4,20.1,19.6,18.5],backgroundColor:[A,A2,'rgba(124,58,237,0.5)','rgba(76,159,255,0.4)','rgba(255,255,255,0.15)'],borderColor:'#faf9f7',borderWidth:3}]
},options:{responsive:true,maintainAspectRatio:false,cutout:'58%',plugins:{legend:{position:'bottom',labels:{color:MUT,padding:12,boxWidth:10}}}}});

// c-disc-region
new Chart(document.getElementById('c-disc-region'),{type:'bar',data:{
  labels:['Ganja','Sumgayit','Baku','Khirdalan','Shaki'],
  datasets:[{label:'Discount Rate %',data:[11.8,11.2,10.3,10.2,9.8],
    backgroundColor:[A3,'rgba(255,107,107,0.65)','rgba(124,58,237,0.6)','rgba(124,58,237,0.4)','rgba(93,216,122,0.5)'],borderWidth:0,borderRadius:2}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:8.5,max:13}}}});

// c-disc-cost
new Chart(document.getElementById('c-disc-cost'),{type:'bar',data:{
  labels:['Baku','Ganja','Sumgayit','Khirdalan','Shaki'],
  datasets:[
    {label:'Net Revenue',data:[47859,46438,42255,45866,44675],backgroundColor:'rgba(76,159,255,0.4)',borderWidth:0,borderRadius:2},
    {label:'Discount Cost',data:[4912,5469,4733,4680,4399],backgroundColor:A3,borderWidth:0,borderRadius:2}
  ]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:scl}});

// c-cat-region
new Chart(document.getElementById('c-cat-region'),{type:'bar',data:{
  labels:['Baku','Ganja','Khirdalan','Shaki','Sumgayit'],
  datasets:[
    {label:'Cosmetics',data:[13095,11677,9418,9008,8958],backgroundColor:A,borderWidth:0},
    {label:'Clothing',data:[9656,9215,6803,10952,9087],backgroundColor:A2,borderWidth:0},
    {label:'Electronics',data:[7311,9202,10310,7777,7116],backgroundColor:'rgba(93,216,122,0.7)',borderWidth:0},
    {label:'Home Goods',data:[9070,8290,10410,8625,6552],backgroundColor:'rgba(168,85,247,0.6)',borderWidth:0},
    {label:'Food',data:[8727,8054,8925,8313,10542],backgroundColor:'rgba(255,107,107,0.7)',borderWidth:0}
  ]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:10,boxWidth:10}}},
  scales:{x:{...scl.x,stacked:true},y:{...scl.y,stacked:true}}}});




const PAGE_T={en:{
  back:'← Back to Portfolio', tag:'Sales Analytics · Regional Performance',
  title_html:'Regional Sales &<br><em>Discount Strategy</em>',
  meta_labels:['Tools','Regions','Categories','Metrics'],
  jt:'Jump to →',
  qn_labels:['Revenue Overview','Discount Analysis','Category Breakdown','⚠ Risks','✓ Recommendations'],
  obj_lbl:'Objective:', obj_text:'Analyse 5-region, 5-category sales data to identify revenue leaders, quantify the financial cost of discounting, and uncover structural demand problems at the regional level.',
  kf_lbl:'Key Finding:', kf_text:"Baku leads at 47,859 AZN (21% of total). Cosmetics is the only category with discounts — at 9.9% company-wide — costing 5,928 AZN in foregone revenue. Shaki is the weakest region and its problem is demand, not price. Ganja discounts the most (11.8%) yet only ranks 2nd.",
  finding_labels:['Total Revenue (AZN)','Baku (Top)','Ganja Discount Rate','Top–Bottom Gap (AZN)'],
  finding_descs:['Across all 5 regions and product categories combined','21% of total revenue — highest-performing region','Highest discount rate across all regions','Between Baku (highest) and Sumgayit (lowest) — significant regional disparity'],
  section_labels:['Revenue Overview','Discount Analysis','Category Breakdown','Risk Assessment','Action Items'],
  section_titles:['Sales by Region','The Cost of Discounting','Product Mix by Region','⚠ Key Risks','✓ Recommendations'],
  section_texts:['Baku leads with 47,859 AZN, followed by Ganja and Khirdalan. Shaki lags behind despite similar category mix. Regional performance is driven by population density, marketing presence, and pricing strategy.','Cosmetics is the only discounted category across all regions — generating 5,928 AZN in forgone revenue at the 9.9% average discount rate. All other categories are sold at full price.','Electronics and Clothing dominate revenue across all regions. Food and Home Goods show consistent distribution. Cosmetics, despite discounting, does not outperform other categories proportionally.'],
  chart_titles:[
    '<span>Fig 01</span> — Net Revenue by Region (AZN)',
    '<span>Fig 02</span> — Avg Discount Rate by Region (%)',
    '<span>Fig 03</span> — Revenue by Product Category',
    '<span>Fig 04</span> — Cosmetics Discount Cost vs Revenue',
    '<span>Fig 05</span> — Category Mix by Region (%)'],
  insights:[
    "<strong>Ganja discounts the most (11.8%) yet is only the 2nd best performer.</strong> Higher discounts are not translating into proportionally higher revenue — suggesting diminishing returns from discount-led strategies in this region.",
    "<strong>Shaki applies the lowest discounts (9.8%) and is still the weakest region.</strong> This confirms that low discounting isn't the cause of poor performance — the root issue is lower demand and inadequate marketing investment.",
    "<strong>Cosmetics discounts cost 5,928 AZN in foregone revenue</strong> while Electronics, Clothing, Food, and Home Goods were all sold at full price with no apparent demand problem. Why is Cosmetics the exception?"],
  risk_titles:['⚠ Shaki structural underperformance'],
  risk_texts:['Shaki is the weakest region despite having the lowest discount rate. This means the problem is not price — it is volume. Without targeted investment, Shaki\\'s gap vs Baku will widen as other regions grow.'],
  rec_titles:['→ Reduce Cosmetics discounts in Baku and Khirdalan first','→ Invest in demand generation for Shaki','→ Investigate why Ganja\\'s high discount isn\\'t translating to top revenue'],
  rec_texts:["These two regions already have strong organic demand — discounts may be unnecessary. A trial quarter without Cosmetics discounts in Baku could save ~4,900 AZN with minimal demand impact. <strong>Test before deploying company-wide.</strong>",
    "Since Shaki\\'s problem is not pricing but demand, allocate a marketing budget (social media, local partnerships) specifically for this region. Track unit sales growth rather than revenue — if volume increases, full-price revenue will follow.",
    "Ganja applies 11.8% discount but is 2nd, not 1st. This suggests customers in Ganja are price-sensitive but the discount ceiling has been reached. Consider loyalty programmes or bundling instead of further discounting."]
},az:{
  back:'← Portfolioya Qayıt', tag:'Satış Analizi · Regional Performans',
  title_html:'Regional Satış &<br><em>Endirim Strategiyası</em>',
  meta_labels:['Alətlər','Regionlar','Kateqoriyalar','Göstəricilər'],
  jt:'Keç →',
  qn_labels:['Gəlir Baxışı','Endirim Analizi','Kateqoriya Bölgüsü','⚠ Risklər','✓ Tövsiyələr'],
  obj_lbl:'Məqsəd:', obj_text:'Gəlir liderlərini müəyyənləşdirmək, endirimin maliyyə dəyərini kəmiyyətləndirilmək və regional səviyyədə struktur tələb problemlərini aşkar etmək üçün 5 region, 5 kateqoriya satış məlumatını analiz etmək.',
  kf_lbl:'Əsas Tapıntı:', kf_text:'Bakı 47,859 AZN (ümumi 21%) ilə liderdir. Kosmetika endirimlərə sahib yeganə kateqoriyadır — şirkət üzrə 9.9% ilə — 5,928 AZN itirilmiş gəlir. Şəkinin problemi tələb deyil, qiymətdir. Gəncə ən çox endirim edir (11.8%) lakin yalnız 2-ci olur.',
  finding_labels:['Ümumi Gəlir (AZN)','Bakı (Lider)','Gəncə Endirim Dərəcəsi','Zirvə–Dib Fərqi (AZN)'],
  finding_descs:['Bütün 5 region və məhsul kateqoriyaları birlikdə','Ümumi gəlirin 21%-i — ən yüksək performanslı region','Bütün regionlar üzrə ən yüksək endirim dərəcəsi','Bakı (ən yüksək) və Sumqayıt (ən aşağı) arasında — əhəmiyyətli regional fərq'],
  section_labels:['Gəlir Baxışı','Endirim Analizi','Kateqoriya Bölgüsü','Risk Qiymətləndirməsi','Fəaliyyət Addımları'],
  section_titles:['Regionlara Görə Satış','Endirimin Dəyəri','Regionlara Görə Məhsul Qarışığı','⚠ Əsas Risklər','✓ Tövsiyələr'],
  section_texts:['Bakı 47,859 AZN ilə liderdir, onu Gəncə və Xırdalan izləyir. Şəki bənzər kateqoriya qarışığına baxmayaraq geri qalır.','Kosmetika bütün regionlarda endirimli yeganə kateqoriyadır — 9.9% orta endirim dərəcəsindəki 5,928 AZN itirilmiş gəlir yaradır. Bütün digər kateqoriyalar tam qiymətə satılır.','Elektronika və Geyim bütün regionlarda gəliri üstələyir. Ərzaq və Ev Malları ardıcıl paylanma göstərir. Kosmetika endirimlərə baxmayaraq digər kateqoriyaları orantılı şəkildə üstələmir.'],
  chart_titles:[
    '<span>Şəkil 01</span> — Regionlara Görə Xalis Gəlir (AZN)',
    '<span>Şəkil 02</span> — Regionlara Görə Orta Endirim Dərəcəsi (%)',
    '<span>Şəkil 03</span> — Məhsul Kateqoriyasına Görə Gəlir',
    '<span>Şəkil 04</span> — Kosmetika Endirimi Dəyəri vs Gəlir',
    '<span>Şəkil 05</span> — Regionlara Görə Kateqoriya Qarışığı (%)'],
  insights:[
    "<strong>Gəncə ən çox endirim edir (11.8%) lakin yalnız 2-ci ən yüksək performans göstərir.</strong> Daha yüksək endirimlər orantılı dərəcədə daha yüksək gəlirə çevrilmir — bu regionda endirim əsaslı strategiyaların azalan gəlirliliyini göstərir.",
    "<strong>Şəki ən aşağı endirimləri (9.8%) tətbiq edir və hələ də ən zəif regiondur.</strong> Bu, aşağı endirimin zəif performansın səbəbi olmadığını təsdiqləyir — kök problem daha aşağı tələb və qeyri-kafi marketinq sərmayəsidir.",
    "<strong>Kosmetika endirimləri itirilmiş gəlirdə 5,928 AZN xərcləyir</strong>, Elektronika, Geyim, Ərzaq və Ev Malları isə aşkar tələb problemi olmadan tam qiymətə satılıb. Kosmetika niyə istisnadır?"],
  risk_titles:['⚠ Şəkinin struktur aşağı performansı'],
  risk_texts:['Şəki ən aşağı endirim dərəcəsinə baxmayaraq ən zəif regiondur. Yəni problem qiymət deyil — həcmdir. Məqsədli investisiya olmadan Şəkinin Bakıya nisbətin boşluğu digər regionlar böyüdükcə genişlənəcək.'],
  rec_titles:['→ Kosmetika endirimlerini əvvəlcə Bakı və Xırdalanda azaldın','→ Şəki üçün tələb yaratmaya investisiya edin','→ Gəncənin yüksək endirimi neden gəlirin zirvəsinə çevrilmədiyini araşdırın'],
  rec_texts:["Bu iki region artıq güclü üzvi tələbə malikdir — endirimlər lazımsız ola bilər. Bakıda Kosmetika endirimsiz sınaq rübü ~4,900 AZN qənaət edə bilər. <strong>Şirkət miqyasında tətbiq etmədən test edin.</strong>",
    "Şəkinin problemi qiymət deyil, tələb olduğundan, bu region üçün xüsusi bir marketinq büdcəsi (sosial media, yerli tərəfdaşlıqlar) ayırın. Həcm artarsa, tam qiymətli gəlir izləyəcək.",
    "Gəncə 11.8% endirim tətbiq edir lakin 1-ci deyil, 2-cidir. Bu, Gəncə müştərilərinin qiyməthassas olduğunu, lakin endirim tavanına çatıldığını göstərir. Əlavə endirim əvəzinə sədaqət proqramları və ya paketlər nəzərdən keçirin."]
}};
const CHART_LABELS={en:{
  'c-region-rev': ['Baku','Ganja','Khirdalan','Shaki','Sumgayit'],
  'c-region-disc': ['Ganja','Baku','Khirdalan','Sumgayit','Shaki'],
  'c-category-rev': ['Electronics','Clothing','Food','Home Goods','Cosmetics'],
  'c-category-mix': ['Baku','Ganja','Khirdalan','Shaki','Sumgayit']
},az:{
  'c-region-rev': ['Bakı','Gəncə','Xırdalan','Şəki','Sumqayıt'],
  'c-region-disc': ['Gəncə','Bakı','Xırdalan','Sumqayıt','Şəki'],
  'c-category-rev': ['Elektronika','Geyim','Ərzaq','Ev Malları','Kosmetika'],
  'c-category-mix': ['Bakı','Gəncə','Xırdalan','Şəki','Sumqayıt']
}};
let lang=localStorage.getItem('portfolioLang')||'en';

function updateProjectCharts(l){
  const L=CHART_LABELS[l];
  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas) continue;
    const id=c.canvas.id;
    if(L[id]){
      if(Array.isArray(L[id])) c.data.labels=L[id];
      else if(L[id].labels) c.data.labels=L[id].labels;
      if(L[id].datasets) L[id].datasets.forEach((d,i)=>{if(c.data.datasets[i])c.data.datasets[i].label=d;});
      if(L[id].xTitle) c.options.scales.x.title.text=L[id].xTitle;
      if(L[id].yTitle) c.options.scales.y.title.text=L[id].yTitle;
      c.update();
    }
  }
}

function applyProjectLang(l){
  lang=l;localStorage.setItem('portfolioLang',l);
  document.documentElement.lang=l==='az'?'az':'en';
  const t=PAGE_T[l];
  const q=s=>document.querySelector(s);
  const qa=s=>[...document.querySelectorAll(s)];
  
  if(q('#navBack'))q('#navBack').textContent=t.back;
  const tg=q('.project-tag');if(tg)tg.innerHTML=t.tag;
  const ti=q('.project-title');if(ti)ti.innerHTML=t.title_html;
  
  // Meta
  const mls=qa('.meta-label');
  t.meta_labels&&t.meta_labels.forEach((v,i)=>{if(mls[i])mls[i].textContent=v;});
  
  // Quick nav
  const qnl=q('.quick-nav-label');if(qnl)qnl.textContent=t.jt;
  const qns=qa('.qn-btn');
  t.qn_labels&&t.qn_labels.forEach((v,i)=>{if(qns[i])qns[i].innerHTML=v;});
  
  // Summary
  const sps=qa('.summary p');
  if(sps[0]&&t.obj_lbl)sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1]&&t.kf_lbl)sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;
  
  // Finding cards
  const fls=qa('.finding-label');const fds=qa('.finding-desc');
  t.finding_labels&&t.finding_labels.forEach((v,i)=>{if(fls[i])fls[i].textContent=v;});
  t.finding_descs&&t.finding_descs.forEach((v,i)=>{if(fds[i])fds[i].textContent=v;});
  
  // Section labels, titles, texts
  const cls=qa('.content-label');
  const cts=qa('.content-title');
  const ctx=qa('.content-text');
  const ctit=qa('.chart-title');
  const ils=qa('.insight-text');
  
  t.section_labels&&t.section_labels.forEach((v,i)=>{if(cls[i])cls[i].textContent=v;});
  t.section_titles&&t.section_titles.forEach((v,i)=>{if(cts[i])cts[i].innerHTML=v;});
  t.section_texts&&t.section_texts.forEach((v,i)=>{if(ctx[i])ctx[i].textContent=v;});
  t.chart_titles&&t.chart_titles.forEach((v,i)=>{if(ctit[i])ctit[i].innerHTML=v;});
  t.insights&&t.insights.forEach((v,i)=>{if(ils[i])ils[i].innerHTML=v;});
  
  // Risk/rec blocks
  qa('.risk-block .block-title').forEach((el,i)=>{if(t.risk_titles&&t.risk_titles[i])el.innerHTML=t.risk_titles[i];});
  qa('.risk-block .block-text').forEach((el,i)=>{if(t.risk_texts&&t.risk_texts[i])el.innerHTML=t.risk_texts[i];});
  qa('.rec-block .block-title').forEach((el,i)=>{if(t.rec_titles&&t.rec_titles[i])el.innerHTML=t.rec_titles[i];});
  qa('.rec-block .block-text').forEach((el,i)=>{if(t.rec_texts&&t.rec_texts[i])el.innerHTML=t.rec_texts[i];});
  
  // Table headers
  const ths=qa('thead th');
  t.table_headers&&t.table_headers.forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});
  
  // Footer
  const fs=qa('footer span');
  if(fs[1])fs[1].textContent=l==='az'?'© 2026 — Gənc Data Analitik Portfolio':'© 2026 — Junior Data Analyst Portfolio';
  
  
  
  
  
  updateProjectCharts(l);
}
function toggleLang(c){applyProjectLang(c?'az':'en');}

window.addEventListener('load',()=>applyProjectLang(lang));
applyProjectLang(lang);

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyProjectLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
`

export default function RegionalSales() {
  useEffect(() => {
    const tag = document.createElement('script')
    tag.textContent = script
    document.body.appendChild(tag)
    return () => { document.body.removeChild(tag) }
  }, [])

  return (
    <>
      <style>{css}</style>
      {parseWithHandlers(bodyHtml)}
    </>
  )
}
