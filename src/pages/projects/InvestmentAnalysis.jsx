import { useEffect } from 'react'
import { parseWithHandlers } from '../../lib/parseHtml.js'

const css = `
:root{
  --bg:#faf9f7;--bg2:#ffffff;--bg3:#f0ecff;
  --border:#e8e4f0;
  --accent:#7c3aed;--accent2:#059669;--accent3:#ef4444;--accent4:#10b981;
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
nav,main,footer,.project-hero{position:relative;z-index:1;}
/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
.nav-right{display:flex;align-items:center;gap:2rem;}
.nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.nav-back:hover{color:var(--accent);}
/* LANG TOGGLE */
.lang-toggle{display:flex;align-items:center;gap:0.55rem;border-left:1px solid var(--border);padding-left:1.25rem;}
.lang-label{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);opacity:0.38;transition:opacity 0.2s;user-select:none;}
.lang-label.active{opacity:1;}
.switch{position:relative;display:inline-block;width:36px;height:19px;flex-shrink:0;}
.switch input{opacity:0;width:0;height:0;position:absolute;}
.slider{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:19px;transition:0.3s;}
.slider::before{content:'';position:absolute;height:11px;width:11px;left:3px;bottom:3px;background:var(--accent);border-radius:50%;transition:0.3s;}
.switch input:checked + .slider::before{transform:translateX(17px);}
/* HERO */
.project-hero{padding:9rem 3rem 4rem;border-bottom:1px solid var(--border);}
.project-tag{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
.project-title{font-family:var(--serif);font-size:clamp(2rem,5.5vw,4.5rem);line-height:1.05;letter-spacing:-0.02em;max-width:900px;}
.project-title em{font-style:italic;color:var(--accent);}
.project-meta{display:flex;gap:3rem;margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.5rem;flex-wrap:wrap;}
.meta-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem;}
.meta-value{font-family:var(--mono);font-size:0.78rem;color:var(--text);}
/* QUICK-NAV */
.quick-nav{position:sticky;top:65px;z-index:50;background:var(--bg2);border-bottom:1px solid var(--border);
  padding:0.7rem 3rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
.quick-nav-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-right:0.5rem;}
.qn-btn{font-family:var(--mono);font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;
  padding:0.32rem 0.85rem;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:all 0.2s;}
.qn-btn:hover{border-color:var(--accent);color:var(--accent);}
.qn-btn.risk{border-color:rgba(239,68,68,0.3);color:var(--accent3);}
.qn-btn.risk:hover{border-color:var(--accent3);background:rgba(239,68,68,0.08);}
.qn-btn.rec{border-color:rgba(5,150,105,0.3);color:var(--accent2);}
.qn-btn.rec:hover{border-color:var(--accent2);background:rgba(5,150,105,0.08);}
/* MAIN */
main{max-width:1100px;margin:0 auto;padding:4rem 3rem 6rem;}
.summary{border-left:2px solid var(--accent);padding:1.5rem 2rem;background:var(--bg2);margin-bottom:4rem;}
.summary p{color:var(--muted);}
.summary p strong{color:var(--text);}
.content-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:0.5rem;}
.content-title{font-family:var(--serif);font-size:1.75rem;margin-bottom:1.25rem;}
.content-text{color:var(--muted);margin-bottom:2rem;max-width:740px;font-size:0.92rem;}
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
table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:0.76rem;}
thead th{padding:0.7rem 1.25rem;text-align:left;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;}
tbody tr{border-bottom:1px solid var(--border);transition:background 0.15s;}
tbody tr:last-child{border-bottom:none;}
tbody tr:hover{background:var(--bg3);}
tbody td{padding:0.78rem 1.25rem;color:var(--text);vertical-align:middle;}
td.pos{color:#059669;}td.neg{color:#ef4444;}td.acc{color:var(--accent);}td.mu{color:var(--muted);font-size:0.7rem;}
/* INSIGHTS */
.insights-list{list-style:none;margin-bottom:3rem;}
.insights-list li{padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);background:var(--bg2);display:flex;gap:1rem;align-items:flex-start;}
.insights-list li:first-child{border-top:1px solid var(--border);}
.insight-bullet{font-family:var(--mono);font-size:0.72rem;color:var(--accent);flex-shrink:0;margin-top:0.1rem;}
.insight-text{font-size:0.86rem;color:var(--muted);}
.insight-text strong{color:var(--text);}
/* ESSAY BLOCK */
.essay-block{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:2rem;border-left:2px solid var(--accent2);}
.essay-block h3{font-family:var(--mono);font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent2);margin-bottom:1rem;}
.essay-block p{font-size:0.88rem;color:var(--muted);line-height:1.8;margin-bottom:0.85rem;}
.essay-block p:last-child{margin-bottom:0;}
.essay-block p strong{color:var(--text);}
/* CASE STUDY */
.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;}
.case-card{background:var(--bg2);border:1px solid var(--border);padding:1.5rem;}
.case-card-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);margin-bottom:0.75rem;}
.case-card-title{font-family:var(--mono);font-size:0.8rem;color:var(--text);margin-bottom:0.5rem;}
.case-card-amount{font-family:var(--mono);font-size:1.4rem;color:var(--accent);line-height:1;margin-bottom:0.35rem;}
.case-card-rate{font-family:var(--mono);font-size:0.72rem;color:var(--accent4);}
.case-card-note{font-size:0.78rem;color:var(--muted);margin-top:0.45rem;}
.total-card{background:var(--bg3);border:1px solid rgba(245,197,24,0.3);padding:1.5rem;margin-bottom:2rem;}
.total-row{display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid var(--border);}
.total-row:last-child{border-bottom:none;}
.total-label{font-family:var(--mono);font-size:0.7rem;color:var(--muted);}
.total-value{font-family:var(--mono);font-size:0.85rem;color:var(--accent);}
/* RISK & REC */
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
.section-anchor{scroll-margin-top:120px;}
/* FOOTER */
footer{border-top:1px solid var(--border);padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;}
footer span{font-family:var(--mono);font-size:0.62rem;color:var(--muted);letter-spacing:0.1em;}
footer a{color:var(--accent);text-decoration:none;}
@media(max-width:768px){
  nav{padding:1rem 1.5rem;} .nav-back span{display:none;}
  .project-hero,.quick-nav{padding-left:1.5rem;padding-right:1.5rem;}
  main{padding:3rem 1.5rem 5rem;}
  .chart-row,.case-grid{grid-template-columns:1fr;}
  .findings-grid{grid-template-columns:1fr 1fr;}
  .lang-toggle{padding-left:0.75rem;}
}




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
  <a href="${import.meta.env.BASE_URL}" class="nav-logo">R.A.</a>
  <div class="nav-right">
    <a href="${import.meta.env.BASE_URL}" class="nav-back" data-i18n="back">← Back</a>
    
  </div>
    <div class="lang-pill">
      <button class="lang-btn active" onclick="setLang('en')">EN</button>
      <button class="lang-btn"        onclick="setLang('az')">AZ</button>
    </div>
</nav>

<div class="project-hero">
  <div class="project-tag" data-i18n="tag">Financial Modelling · Investment Analysis · Azerbaijan</div>
  <h1 class="project-title" data-i18n="title_html">Investment Decision:<br><em>Real Returns Analysis</em></h1>
    <!-- DATE: e.g. "March 2025 · University Internship Project" -->
  <div class="project-meta">
    <div><div class="meta-label" data-i18n="m1l">Tasks Covered</div><div class="meta-value" data-i18n="m1v">A (Calculations) · B (Essays) · C (Case Study) · D (International)</div></div>
    <div><div class="meta-label" data-i18n="m2l">Tools</div><div class="meta-value">Excel · Compound Interest · Fisher Equation</div></div>
    <div><div class="meta-label" data-i18n="m3l">Principals Analysed</div><div class="meta-value">50,000 / 80,000 / 100,000 AZN</div></div>
    <div><div class="meta-label" data-i18n="m4l">Dimensions</div><div class="meta-value" data-i18n="m4v">Rate · EIR · Real Return · Risk · Portfolio</div></div>
  </div>
</div>

<div class="quick-nav">
  <span class="quick-nav-label" data-i18n="jt">Jump to →</span>
  <a class="qn-btn" href="#compound" data-i18n="qn1">Compound</a>
  <a class="qn-btn" href="#inflation" data-i18n="qn2">Inflation</a>
  <a class="qn-btn" href="#alternatives" data-i18n="qn3">Alternatives</a>
  <a class="qn-btn" href="#casestudy" data-i18n="qn4">Case Study</a>
  <a class="qn-btn" href="#international" data-i18n="qn5">International</a>
  <a class="qn-btn risk" href="#risks">⚠ <span data-i18n="qn6">Risks</span></a>
  <a class="qn-btn rec" href="#recommendations">✓ <span data-i18n="qn7">Recommendations</span></a>
</div>

<main>
  <div class="summary">
    <p><strong data-i18n="obj_lbl">Objective:</strong> <span data-i18n="obj_text">This analysis compares bank deposits, inflation-adjusted returns, alternative investment choices, and a practical portfolio split for an Azerbaijani investor. The aim is not only to find the highest nominal return, but to see which option still makes sense after risk, liquidity, and inflation are considered.</span></p>
    <p style="margin-top:0.75rem"><strong data-i18n="kf_lbl">Key Finding:</strong> <span data-i18n="kf_text">Bank C gives the highest 3-year final value, 68,382 AZN, even though it compounds only once a year. In this case, the higher nominal rate matters more than compounding frequency. For the 100,000 AZN deposit at 12%, inflation reduces the apparent gain by about 18,000 AZN, but the real balance is still positive at 122,665 AZN.</span></p>
  </div>

  <div class="findings-grid">
    <div class="finding-card"><div class="finding-num">68,382</div><div class="finding-label" data-i18n="f1l">Bank C - Highest FV (AZN)</div><div class="finding-desc" data-i18n="f1d">The 11% annual rate produces the strongest 3-year result despite lower compounding frequency.</div></div>
    <div class="finding-card"><div class="finding-num">7.04%</div><div class="finding-label" data-i18n="f2l">Real Return</div><div class="finding-desc" data-i18n="f2d">After adjusting the 12% deposit for 4.63% average inflation, the real annual return is 7.04%.</div></div>
    <div class="finding-card"><div class="finding-num">34,355</div><div class="finding-label" data-i18n="f3l">Best Safe Gain (AZN)</div><div class="finding-desc" data-i18n="f3d">The 10.5% bank deposit gives a guaranteed gain, while the fund still carries a wide risk range.</div></div>
    <div class="finding-card"><div class="finding-num">59,620</div><div class="finding-label" data-i18n="f4l">Fund Upside (AZN)</div><div class="finding-desc" data-i18n="f4d">The fund can reach a 59,620 AZN gain in the optimistic case, but its downside is clearly weaker.</div></div>
  </div>

  <hr class="divider"/>

  <!-- TASK A.1 -->
  <div id="compound" class="section-anchor">
    <p class="content-label" data-i18n="a1_lbl">Task A.1 - Compound Interest</p>
    <h2 class="content-title" data-i18n="a1_title">Three Banks: Which Option Grows More?</h2>
  </div>
  <p class="content-text" data-i18n="a1_text">The starting principal is 50,000 AZN for 3 years. Bank A compounds monthly at 9.5%, Bank B compounds quarterly at 10.2%, and Bank C compounds annually at 11%. I used the Effective Annual Rate (EIR) to compare them on the same basis, because the stated rate alone does not show the full effect of compounding.</p>

  <div class="chart-row">
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 01</span> - <span data-i18n="c1t">Final Value (AZN) after 3 Years</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-fv"></canvas></div>
    </div>
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 02</span> - <span data-i18n="c2t">Effective Annual Rate (EIR) vs Nominal</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-eir"></canvas></div>
    </div>
  </div>

  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 01</span> - <span data-i18n="t1h">Bank Compound Interest Comparison</span></span>
      <span class="table-badge" data-i18n="t1b">3 banks · 3 years</span>
    </div>
    <table>
      <thead><tr>
        <th data-i18n="th_bank">Bank</th>
        <th data-i18n="th_rate">Nominal Rate</th>
        <th data-i18n="th_freq">Compounding</th>
        <th data-i18n="th_eir">EIR</th>
        <th data-i18n="th_fv">Final Value (AZN)</th>
        <th data-i18n="th_gain">Gain (AZN)</th>
      </tr></thead>
      <tbody>
        <tr><td class="acc">Bank C</td><td>11.00%</td><td data-i18n="annual">Annual</td><td>11.000%</td><td class="pos">68,382</td><td class="pos">18,382</td></tr>
        <tr><td class="acc">Bank B</td><td>10.20%</td><td data-i18n="quarterly">Quarterly</td><td>10.593%</td><td>67,636</td><td>17,636</td></tr>
        <tr><td class="acc">Bank A</td><td>9.50%</td><td data-i18n="monthly">Monthly</td><td>9.921%</td><td class="neg">66,525</td><td class="neg">16,525</td></tr>
      </tbody>
    </table>
  </div>

  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text" data-i18n="i_a1_1"><strong>The main driver here is the nominal rate, not the compounding schedule.</strong> Bank C compounds less often than the others, but its 11% rate is enough to produce the highest final value. Frequency becomes more important only when the rates are very close.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text" data-i18n="i_a1_2"><strong>Bank A's EIR is higher than its nominal rate, so monthly compounding does help.</strong> However, that extra effect is not strong enough to close the 1.5 percentage point gap between Bank A and Bank C.</span></li>
  </ul>

  <hr class="divider"/>

  <!-- TASK A.2 -->
  <div id="inflation" class="section-anchor">
    <p class="content-label" data-i18n="a2_lbl">Task A.2 - Inflation Correction</p>
    <h2 class="content-title" data-i18n="a2_title">Real Purchasing Power: Fisher Equation</h2>
  </div>
  <p class="content-text" data-i18n="a2_text">For the 100,000 AZN deposit at 12% over 3 years, the nominal balance reaches 140,493 AZN. After cumulative inflation of 14.53% is applied, the real balance becomes 122,665 AZN. I used the Fisher formula, real return = (1 + nominal return) / (1 + inflation) - 1, to show the purchasing power behind the bank statement number.</p>

  <div class="chart-row">
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 03</span> - <span data-i18n="c3t">Nominal vs Real Balance Over 3 Years (AZN)</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-nominal-real"></canvas></div>
    </div>
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 04</span> - <span data-i18n="c4t">Annual Inflation vs Deposit Rate</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-inflation"></canvas></div>
    </div>
  </div>

  <div class="findings-grid col3">
    <div class="finding-card"><div class="finding-num">140,493</div><div class="finding-label" data-i18n="f5l">Nominal Balance (AZN)</div><div class="finding-desc" data-i18n="f5d">The amount shown by the bank after 3 years at a 12% nominal rate.</div></div>
    <div class="finding-card"><div class="finding-num">122,665</div><div class="finding-label" data-i18n="f6l">Real Balance (AZN)</div><div class="finding-desc" data-i18n="f6d">The purchasing power left after 14.53% cumulative inflation.</div></div>
    <div class="finding-card"><div class="finding-num">7.04%</div><div class="finding-label" data-i18n="f7l">Real Annual Return</div><div class="finding-desc" data-i18n="f7d">Fisher-adjusted return after comparing 12% nominal growth with 4.63% average inflation.</div></div>
  </div>

  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text" data-i18n="i_a2_1"><strong>The deposit still protects purchasing power.</strong> A 7.04% real return means the 12% deposit is comfortably above the average inflation rate. The money is not just increasing on paper; it is gaining real value.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text" data-i18n="i_a2_2"><strong>The nominal gain should not be read at face value.</strong> The 40,493 AZN increase becomes a real gain of 22,665 AZN after inflation. That does not make the deposit bad, but it shows why real return is the more useful decision metric.</span></li>
  </ul>

  <hr class="divider"/>

  <!-- TASK A.3 -->
  <div id="alternatives" class="section-anchor">
    <p class="content-label" data-i18n="a3_lbl">Task A.3 - Alternative Investment Analysis</p>
    <h2 class="content-title" data-i18n="a3_title">Three Strategies: 50,000 AZN Over 5 Years</h2>
  </div>
  <p class="content-text" data-i18n="a3_text">I compared a bank deposit at 10.5% with monthly compounding, government bonds at 9.8% annually, and a mutual fund with an expected 13% return and a 4% standard deviation. For the fund, I separated the result into pessimistic, normal, and optimistic scenarios so the return is not shown without its risk.</p>

  <div class="chart-wrap">
    <div class="chart-title"><span>Fig 05</span> - <span data-i18n="c5t">5-Year Final Value by Strategy (AZN)</span></div>
    <div class="chart-canvas-wrap" style="height:280px"><canvas id="c-alt"></canvas></div>
  </div>

  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 02</span> - <span data-i18n="t2h">Investment Strategy Comparison</span></span>
      <span class="table-badge" data-i18n="t2b">5 years · 50,000 AZN</span>
    </div>
    <table>
      <thead><tr>
        <th data-i18n="th_option">Option</th>
        <th data-i18n="th_5yr">5-Year FV (AZN)</th>
        <th data-i18n="th_gainn">Gain (AZN)</th>
        <th data-i18n="th_risk">Risk</th>
      </tr></thead>
      <tbody>
        <tr><td class="acc" data-i18n="row_dep">Bank Deposit (10.5%)</td><td>84,355</td><td class="pos">+34,355</td><td data-i18n="r_low">✓ Insured (ASF)</td></tr>
        <tr><td class="acc" data-i18n="row_bond">Gov. Bonds (9.8%)</td><td>79,795</td><td>+29,795</td><td data-i18n="r_low">✓ Insured (ASF)</td></tr>
        <tr><td class="mu" data-i18n="row_fpess">Fund - Pessimistic (9%)</td><td class="neg">76,930</td><td class="neg">+26,930</td><td class="neg" data-i18n="r_high">High Risk</td></tr>
        <tr><td class="mu" data-i18n="row_fnorm">Fund - Normal (13%)</td><td>92,120</td><td>+42,120</td><td class="neg" data-i18n="r_high">High Risk</td></tr>
        <tr><td class="mu" data-i18n="row_fopt">Fund - Optimistic (17%)</td><td class="pos">109,620</td><td class="pos">+59,620</td><td class="neg" data-i18n="r_high">High Risk</td></tr>
      </tbody>
    </table>
  </div>

  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text" data-i18n="i_a3_1"><strong>The fund's pessimistic result is below the guaranteed deposit gain.</strong> If the fund performs at the lower end, the investor earns 26,930 AZN, compared with 34,355 AZN from the protected deposit.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text" data-i18n="i_a3_2"><strong>The choice depends on risk tolerance, not only on the highest possible number.</strong> The fund has the best upside, while the deposit is stronger for a conservative investor. The bond option is safe, but at these rates it gives less return than the deposit for a similar risk level.</span></li>
  </ul>

  <hr class="divider"/>

  <!-- TASK B - Essays -->
  <div id="essays" class="section-anchor">
    <p class="content-label" data-i18n="b_lbl">Task B - Analytical Essays</p>
    <h2 class="content-title" data-i18n="b_title">Interest Rate Policy & Deposit Insurance</h2>
  </div>

  <div class="essay-block">
    <h3 data-i18n="b1_h">B.1 - Interest Rate Transmission Mechanism</h3>
    <p data-i18n="b1_p1">Central banks influence economic activity through the policy rate. When the Central Bank of Azerbaijan raises this rate, commercial banks face higher funding costs and usually respond by increasing deposit rates to attract retail savings. This link between the policy rate and bank-level interest rates is the interest rate transmission mechanism.</p>
    <p data-i18n="b1_p2">In 2022, inflation in Azerbaijan reached 13.85%, which pushed the Central Bank to tighten monetary policy. Banks followed with higher deposit rates. By 2024, inflation had fallen to 2.21%, but banks were slower to reduce rates because cutting deposit returns can push customers toward competitors. This slower reaction on the way down is known as asymmetric transmission.</p>
    <p data-i18n="b1_p3">Transmission in Azerbaijan is limited by several local factors. Many depositors still hold part of their savings in USD or EUR, so AZN rate changes do not affect everyone equally. Large state-backed banks such as Kapital Bank and ABB also have stronger market positions, which can reduce pressure to react quickly. Oil revenues matter as well, because strong liquidity in the banking system lowers the need to compete aggressively for deposits. In more competitive markets such as Georgia, banks like TBC Bank and Bank of Georgia tend to adjust deposit pricing faster after central bank decisions.</p>
  </div>

  <div class="essay-block">
    <h3 data-i18n="b2_h">B.2 - Deposit Insurance: Protection or Moral Hazard?</h3>
    <p data-i18n="b2_p1">Azerbaijan's Deposit Insurance Fund (ASF/ƏSF) protects deposits up to 100,000 AZN per bank and per depositor. This is an important safety net, especially because the fund has already paid 1.717 billion AZN to 62,520 depositors in 19 liquidated banks. At the same time, deposit insurance can create moral hazard if people stop checking bank quality simply because the deposit is insured.</p>
    <p data-i18n="b2_p2">The risk is that insured depositors may chase the highest advertised rate without looking at the bank behind it. Banks can then raise rates to attract money and take more risk with the funds they collect. If the strategy fails, the loss is carried by the insurance system and, indirectly, by the public rather than only by the bank shareholders.</p>
    <p data-i18n="b2_p3"><strong>A practical depositor strategy is simple:</strong> keep amounts above 100,000 AZN split across several ASF-member banks, follow capital adequacy and non-performing loan indicators in MBDP reports, prefer stronger or state-backed banks for large deposits, and treat any rate that is 3-4 percentage points above the market average as a warning sign rather than a gift.</p>
  </div>

  <hr class="divider"/>

  <!-- TASK C - Case Study -->
  <div id="casestudy" class="section-anchor">
    <p class="content-label" data-i18n="c_lbl">Task C - Case Study</p>
    <h2 class="content-title" data-i18n="c_title">Leyla's Capital Strategy: 80,000 AZN Portfolio</h2>
  </div>
  <p class="content-text" data-i18n="c_text">Leyla has three priorities: protect the capital, earn a return above inflation, and keep at least 30% of the money, or 24,000 AZN, accessible at all times. The portfolio is therefore split across four banks by purpose: liquidity, core income, diversification, and flexible reserve.</p>

  <div class="case-grid">
    <div class="case-card">
      <div class="case-card-label" data-i18n="cc1_lbl">Part 1 - Liquid (30%)</div>
      <div class="case-card-title">AccessBank - <span data-i18n="demand">Demand Account</span></div>
      <div class="case-card-amount">24,000 AZN</div>
      <div class="case-card-rate">8.50% → 2,040 AZN/<span data-i18n="yr">yr</span></div>
      <div class="case-card-note" data-i18n="cc1_note">Available at any time, with ASF membership and a broad branch network.</div>
    </div>
    <div class="case-card">
      <div class="case-card-label" data-i18n="cc2_lbl">Part 2 - Core Income (35%)</div>
      <div class="case-card-title">Kapital Bank - 12-<span data-i18n="month">month</span></div>
      <div class="case-card-amount">28,000 AZN</div>
      <div class="case-card-rate">11.90% → 3,332 AZN/<span data-i18n="yr">yr</span></div>
      <div class="case-card-note" data-i18n="cc2_note">The highest selected market rate, supported by a strong state-backed bank and still well below the insurance limit.</div>
    </div>
    <div class="case-card">
      <div class="case-card-label" data-i18n="cc3_lbl">Part 3 - Diversification (25%)</div>
      <div class="case-card-title">ABB Bank - 12-<span data-i18n="month">month</span></div>
      <div class="case-card-amount">20,000 AZN</div>
      <div class="case-card-rate">11.00% → 2,200 AZN/<span data-i18n="yr">yr</span></div>
      <div class="case-card-note" data-i18n="cc3_note">Reduces reliance on Kapital Bank and keeps another state-backed bank in the portfolio.</div>
    </div>
    <div class="case-card">
      <div class="case-card-label" data-i18n="cc4_lbl">Part 4 - Flex Reserve (10%)</div>
      <div class="case-card-title">Bank of Baku - 6-<span data-i18n="month">month</span></div>
      <div class="case-card-amount">8,000 AZN</div>
      <div class="case-card-rate">10.75% → 860 AZN/<span data-i18n="yr">yr</span></div>
      <div class="case-card-note" data-i18n="cc4_note">Semi-liquid money that can be reviewed every 6 months for short-term needs or better rates.</div>
    </div>
  </div>

  <div class="total-card">
    <div class="total-row"><span class="total-label" data-i18n="tot1">Total Annual Income</span><span class="total-value">8,432 AZN</span></div>
    <div class="total-row"><span class="total-label" data-i18n="tot2">Effective Rate</span><span class="total-value">10.54%</span></div>
    <div class="total-row"><span class="total-label" data-i18n="tot3">Real Return (after avg 4.89% inflation)</span><span class="total-value" style="color:var(--accent4)">+5.65%</span></div>
  </div>

  <div class="chart-row">
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 06</span> - <span data-i18n="c6t">Portfolio Allocation (%)</span></div>
      <div class="chart-canvas-wrap" style="height:260px"><canvas id="c-leyla-pie"></canvas></div>
    </div>
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 07</span> - <span data-i18n="c7t">Annual Income per Bank Allocation (AZN)</span></div>
      <div class="chart-canvas-wrap" style="height:260px"><canvas id="c-leyla-bar"></canvas></div>
    </div>
  </div>

  <hr class="divider"/>

  <!-- TASK D - International -->
  <div id="international" class="section-anchor">
    <p class="content-label" data-i18n="d_lbl">Task D - International Comparison</p>
    <h2 class="content-title" data-i18n="d_title">Regional Deposit Rates: 4 Countries</h2>
  </div>
  <p class="content-text" data-i18n="d_text">Nominal rates are only the first layer of the comparison. Turkey's 41.49% rate looks very high, but inflation of about 31.1% leaves a much smaller real return and adds major currency risk. Kazakhstan's 14.2% deposit rate is also weakened by 12.9% inflation. Azerbaijan's 11.9% rate is lower in nominal terms, but with 4.63% average inflation it produces a competitive real return and avoids currency conversion risk for an AZN-based investor.</p>

  <div class="chart-row">
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 08</span> - <span data-i18n="c8t">Nominal Deposit Rate by Country (%)</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-intl-nominal"></canvas></div>
    </div>
    <div class="chart-wrap">
      <div class="chart-title"><span>Fig 09</span> - <span data-i18n="c9t">Real Return by Country (%) - Fisher Adjusted</span></div>
      <div class="chart-canvas-wrap"><canvas id="c-intl-real"></canvas></div>
    </div>
  </div>

  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 03</span> - <span data-i18n="t3h">Regional Deposit Comparison</span></span>
      <span class="table-badge" data-i18n="t3b">4 countries</span>
    </div>
    <table>
      <thead><tr>
        <th data-i18n="th_country">Country / Bank</th>
        <th data-i18n="th_nom">Nominal %</th>
        <th data-i18n="th_curr">Currency</th>
        <th data-i18n="th_inf">Inflation %</th>
        <th data-i18n="th_real">Real Return %</th>
        <th data-i18n="th_verdict">Verdict</th>
      </tr></thead>
      <tbody>
        <tr><td class="acc" data-i18n="row_geo">Georgia / TBC Bank</td><td class="pos">12.10%</td><td>GEL</td><td>~4.0%</td><td class="pos">7.79%</td><td data-i18n="v_best">✓ Best real return</td></tr>
        <tr><td class="acc" data-i18n="row_az">Azerbaijan / Kapital Bank</td><td class="pos">11.90%</td><td>AZN</td><td>4.63%</td><td class="pos">7.04%</td><td data-i18n="v_stable">✓ Stable currency</td></tr>
        <tr><td class="acc" data-i18n="row_tr">Turkey / İş Bankası</td><td>41.49%</td><td>TRY</td><td>~31.1%</td><td>7.93%</td><td class="neg" data-i18n="v_fx">⚠ High FX risk</td></tr>
        <tr><td class="acc" data-i18n="row_kz">Kazakhstan / Halyk Bank</td><td>14.20%</td><td>KZT</td><td>12.9%</td><td class="neg">1.69%</td><td class="neg" data-i18n="v_weak">✗ Weakest real</td></tr>
      </tbody>
    </table>
  </div>

  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text" data-i18n="i_d1"><strong>Georgia has the strongest real return in the table, but the practical result is lower after conversion costs.</strong> Changing 50,000 AZN into GEL and then back again can cost around 1.5%, which reduces the advantage for an Azerbaijani investor.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text" data-i18n="i_d2"><strong>Turkey's high rate is mostly compensation for inflation and currency risk.</strong> If the lira weakens faster than expected, the foreign investor can lose more through exchange rate movement than they gain from interest.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text" data-i18n="i_d3"><strong>Azerbaijan is the cleanest option for an AZN-based investor.</strong> There is no currency conversion risk, the real return is competitive at 7.04%, and the manat remains supported by oil-backed fiscal reserves.</span></li>
  </ul>

  <hr class="divider"/>

  <!-- RISKS -->
  <div id="risks" class="section-anchor">
    <p class="content-label" data-i18n="risk_lbl">Risk Assessment</p>
    <h2 class="content-title">⚠ <span data-i18n="risk_title">Key Risks</span></h2>
  </div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span><span data-i18n="r1t">Inflation surge scenario</span></div><div class="block-text" data-i18n="r1b">If inflation rises above 9%, the 12% deposit rate can turn into a weak or negative real return. This is the main macro risk. It is not the base case under current AZN stability, but it should be checked through CBAR updates each quarter.</div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span><span data-i18n="r2t">Mutual fund downside scenario</span></div><div class="block-text" data-i18n="r2b">The fund's pessimistic gain of 26,930 AZN is lower than the guaranteed deposit gain of 34,355 AZN. Without enough risk tolerance, choosing the fund can produce a worse result than the bank deposit.</div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span><span data-i18n="r3t">Concentration risk in Leyla's portfolio</span></div><div class="block-text" data-i18n="r3b">Kapital Bank holds 35% of the portfolio, or 28,000 AZN. The amount is below the insurance limit, but a wider banking stress event could still delay access to funds even when the deposit is insured.</div></div>

  <hr class="divider"/>

  <!-- RECOMMENDATIONS -->
  <div id="recommendations" class="section-anchor">
    <p class="content-label" data-i18n="rec_lbl">Action Items</p>
    <h2 class="content-title">✓ <span data-i18n="rec_title">Recommendations</span></h2>
  </div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span><span data-i18n="rec1t">For individual investors: choose Bank C for a 3-year horizon</span></div><div class="block-text" data-i18n="rec1b">For a 50,000 AZN principal over 3 years, Bank C gives the highest final value at 68,382 AZN. The comparison shows that a higher nominal rate can matter more than a more frequent compounding schedule when the rate gap is large enough.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span><span data-i18n="rec2t">For inflation protection: check the real return before depositing</span></div><div class="block-text" data-i18n="rec2b">A 12% deposit with 4.63% average inflation gives a 7.04% real return. Before committing capital, the investor should use the Fisher formula instead of relying only on the advertised nominal rate. In the current Azerbaijani environment, very low nominal deposits can easily become inflation-neutral or negative.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span><span data-i18n="rec3t">For a multi-bank portfolio: match each bank to a purpose</span></div><div class="block-text" data-i18n="rec3b">Leyla's split works because each part has a role: liquidity, income, diversification, and flexible reserve. No single bank should hold more than the insured limit. The flexible part can stay in shorter 6-month deposits so the investor can respond if rates improve.</div></div>
</main>

<footer>
  <span>← <a href="${import.meta.env.BASE_URL}" data-i18n="back">← Back to Portfolio</a></span>
  <span>© 2026 · Junior Data Analyst Portfolio</span>
</footer>
`

const script = `
const A='#7c3aed',A2='#059669',A3='#ef4444',A4='#10b981';
const GRID='rgba(255,255,255,0.05)',MUT='#8fa0c8',BG2='#112050';
const FONT="'Syne',sans-serif";
Chart.defaults.color=MUT;Chart.defaults.borderColor=GRID;
Chart.defaults.font.family=FONT;Chart.defaults.font.size=11;
const scl={x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT}}};

const LABELS = {
  en:{
    banks:["Bank C (11% Annual)", "Bank B (10.2% Quarterly)", "Bank A (9.5% Monthly)"],
    fv_label:"Final Value (AZN)",
    eir_nom:["Bank A Nominal", "Bank A EIR", "Bank B Nominal", "Bank B EIR", "Bank C Nominal", "Bank C EIR"],
    eir_label:"Rate %",
    nom_real_x:["Start", "Year 1", "Year 2", "Year 3"],
    nom_lbl:"Nominal Balance",
    real_lbl:"Real Balance",
    inf_x:["2024", "2025", "2026"],
    inf_dep:"Deposit Rate 12%",
    inf_inf:"Inflation %",
    alt_x:["Deposit\\n10.5%", "Gov. Bonds\\n9.8%", "Fund Pessimistic\\n9%", "Fund Normal\\n13%", "Fund Optimistic\\n17%"],
    alt_lbl:"5-Year Final Value (AZN)",
    leyla_parts:["Liquid (AccessBank)", "Core Income (Kapital)", "Diversification (ABB)", "Flex Reserve (BoB)"],
    leyla_income_x:["AccessBank\\n8.5%", "Kapital Bank\\n11.9%", "ABB Bank\\n11%", "Bank of Baku\\n10.75%"],
    leyla_income_lbl:"Annual Income (AZN)",
    countries:["Georgia", "Azerbaijan", "Turkey", "Kazakhstan"],
    nom_lbl2:"Nominal Rate %",
    real_lbl2:"Real Return %",
  },
  az:{
    banks:["Bank C (11% illik)", "Bank B (10.2% rüblük)", "Bank A (9.5% aylıq)"],
    fv_label:"Yekun məbləğ (AZN)",
    eir_nom:["Bank A nominal", "Bank A EİF", "Bank B nominal", "Bank B EİF", "Bank C nominal", "Bank C EİF"],
    eir_label:"Faiz %",
    nom_real_x:["Başlanğıc", "1-ci il", "2-ci il", "3-cü il"],
    nom_lbl:"Nominal balans",
    real_lbl:"Real balans",
    inf_x:["2024", "2025", "2026"],
    inf_dep:"Depozit faizi 12%",
    inf_inf:"İnflyasiya %",
    alt_x:["Depozit\\n10.5%", "Dövlət istiqrazı\\n9.8%", "Fond pessimist\\n9%", "Fond normal\\n13%", "Fond optimist\\n17%"],
    alt_lbl:"5 illik yekun məbləğ (AZN)",
    leyla_parts:["Likvid (AccessBank)", "Əsas gəlir (Kapital)", "Diversifikasiya (ABB)", "Çevik ehtiyat (BoB)"],
    leyla_income_x:["AccessBank\\n8.5%", "Kapital Bank\\n11.9%", "ABB Bank\\n11%", "Bank of Baku\\n10.75%"],
    leyla_income_lbl:"İllik gəlir (AZN)",
    countries:["Gürcüstan", "Azərbaycan", "Türkiyə", "Qazaxıstan"],
    nom_lbl2:"Nominal faiz %",
    real_lbl2:"Real gəlir %",
  }
};

let charts = {};
let lang = localStorage.getItem('portfolioLang')||'en';

function buildCharts(l){
  const L = LABELS[l];
  Object.values(charts).forEach(c=>c.destroy());
  charts = {};

  charts.fv = new Chart(document.getElementById('c-fv'),{type:'bar',data:{
    labels:L.banks,
    datasets:[{label:L.fv_label,data:[68382,67636,66525],
      backgroundColor:[A,'rgba(124,58,237,0.65)','rgba(124,58,237,0.35)'],borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{...scl,y:{...scl.y,min:65000,max:70000}}}});

  charts.eir = new Chart(document.getElementById('c-eir'),{type:'bar',data:{
    labels:[L.eir_nom[0],L.eir_nom[1],L.eir_nom[2],L.eir_nom[3],L.eir_nom[4],L.eir_nom[5]],
    datasets:[{label:L.eir_label,data:[9.5,9.921,10.2,10.593,11.0,11.0],
      backgroundColor:['rgba(76,159,255,0.4)',A2,'rgba(124,58,237,0.4)','rgba(124,58,237,0.65)','rgba(255,255,255,0.15)',A],
      borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{...scl,y:{...scl.y,min:9,max:12}}}});

  charts.nr = new Chart(document.getElementById('c-nominal-real'),{type:'line',data:{
    labels:L.nom_real_x,
    datasets:[
      {label:L.nom_lbl,data:[100000,112000,125440,140493],borderColor:A,backgroundColor:'rgba(124,58,237,0.06)',borderWidth:2,tension:0.3,fill:true},
      {label:L.real_lbl,data:[100000,107040,114576,122665],borderColor:A2,borderDash:[4,4],borderWidth:1.5,tension:0.3,pointRadius:3}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:scl}});

  charts.inf = new Chart(document.getElementById('c-inflation'),{type:'bar',data:{
    labels:L.inf_x,
    datasets:[
      {label:L.inf_dep,data:[12,12,12],backgroundColor:'rgba(124,58,237,0.25)',borderWidth:0,borderRadius:2},
      {label:L.inf_inf,data:[4.4,5.5,4.0],backgroundColor:A3,borderWidth:0,borderRadius:2}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:scl}});

  charts.alt = new Chart(document.getElementById('c-alt'),{type:'bar',data:{
    labels:L.alt_x,
    datasets:[{label:L.alt_lbl,data:[84355,79795,76930,92120,109620],
      backgroundColor:[A,'rgba(76,159,255,0.6)','rgba(255,107,107,0.5)','rgba(255,255,255,0.15)',A4],
      borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{...scl,y:{...scl.y,min:70000,max:115000}}}});

  charts.pie = new Chart(document.getElementById('c-leyla-pie'),{type:'doughnut',data:{
    labels:L.leyla_parts,
    datasets:[{data:[30,35,25,10],backgroundColor:[A2,A,'rgba(124,58,237,0.45)','rgba(255,255,255,0.15)'],
      borderColor:'#faf9f7',borderWidth:3}]
  },options:{responsive:true,maintainAspectRatio:false,cutout:'58%',
    plugins:{legend:{position:'bottom',labels:{color:MUT,padding:10,boxWidth:10}}}}});

  charts.lbar = new Chart(document.getElementById('c-leyla-bar'),{type:'bar',data:{
    labels:L.leyla_income_x,
    datasets:[{label:L.leyla_income_lbl,data:[2040,3332,2200,860],
      backgroundColor:[A2,A,'rgba(124,58,237,0.55)','rgba(255,255,255,0.15)'],borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

  charts.intlNom = new Chart(document.getElementById('c-intl-nominal'),{type:'bar',data:{
    labels:L.countries,
    datasets:[{label:L.nom_lbl2,data:[12.10,11.90,41.49,14.20],
      backgroundColor:[A2,A,'rgba(255,107,107,0.55)','rgba(255,255,255,0.15)'],borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

  charts.intlReal = new Chart(document.getElementById('c-intl-real'),{type:'bar',data:{
    labels:L.countries,
    datasets:[{label:L.real_lbl2,data:[7.79,7.04,7.93,1.69],
      backgroundColor:[A2,A,'rgba(255,107,107,0.55)','rgba(255,255,255,0.15)'],borderWidth:0,borderRadius:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});
}

// ============ i18n ============
const T = {
  en:{
    back:"← Back to Portfolio",
    tag:"Financial Modelling · Investment Analysis · Azerbaijan",
    title_html:"Investment Decision:<br><em>Real Returns Analysis</em>",
    m1l:"Tasks Covered",
    m1v:"A (Calculations) · B (Essays) · C (Case Study) · D (International)",
    m2l:"Tools",
    m3l:"Principals Analysed",
    m4l:"Dimensions",
    m4v:"Rate · EIR · Real Return · Risk · Portfolio",
    jt:"Jump to →",
    qn1:"Compound",
    qn2:"Inflation",
    qn3:"Alternatives",
    qn4:"Case Study",
    qn5:"International",
    qn6:"Risks",
    qn7:"Recommendations",
    obj_lbl:"Objective:",
    obj_text:"This analysis compares bank deposits, inflation-adjusted returns, alternative investment choices, and a practical portfolio split for an Azerbaijani investor. The aim is not only to find the highest nominal return, but to see which option still makes sense after risk, liquidity, and inflation are considered.",
    kf_lbl:"Key Finding:",
    kf_text:"Bank C gives the highest 3-year final value, 68,382 AZN, even though it compounds only once a year. In this case, the higher nominal rate matters more than compounding frequency. For the 100,000 AZN deposit at 12%, inflation reduces the apparent gain by about 18,000 AZN, but the real balance is still positive at 122,665 AZN.",
    f1l:"Bank C - Highest FV (AZN)",
    f1d:"The 11% annual rate produces the strongest 3-year result despite lower compounding frequency.",
    f2l:"Real Return",
    f2d:"After adjusting the 12% deposit for 4.63% average inflation, the real annual return is 7.04%.",
    f3l:"Best Safe Gain (AZN)",
    f3d:"The 10.5% bank deposit gives a guaranteed gain, while the fund still carries a wide risk range.",
    f4l:"Fund Upside (AZN)",
    f4d:"The fund can reach a 59,620 AZN gain in the optimistic case, but its downside is clearly weaker.",
    a1_lbl:"Task A.1 - Compound Interest",
    a1_title:"Three Banks: Which Option Grows More?",
    a1_text:"The starting principal is 50,000 AZN for 3 years. Bank A compounds monthly at 9.5%, Bank B compounds quarterly at 10.2%, and Bank C compounds annually at 11%. I used the Effective Annual Rate (EIR) to compare them on the same basis, because the stated rate alone does not show the full effect of compounding.",
    c1t:"Final Value (AZN) after 3 Years",
    c2t:"Effective Annual Rate (EIR) vs Nominal",
    t1h:"Bank Compound Interest Comparison",
    t1b:"3 banks · 3 years",
    th_bank:"Bank",
    th_rate:"Nominal Rate",
    th_freq:"Compounding",
    th_eir:"EIR",
    th_fv:"Final Value (AZN)",
    th_gain:"Gain (AZN)",
    annual:"Annual",
    quarterly:"Quarterly",
    monthly:"Monthly",
    i_a1_1:"<strong>The main driver here is the nominal rate, not the compounding schedule.</strong> Bank C compounds less often than the others, but its 11% rate is enough to produce the highest final value. Frequency becomes more important only when the rates are very close.",
    i_a1_2:"<strong>Bank A's EIR is higher than its nominal rate, so monthly compounding does help.</strong> However, that extra effect is not strong enough to close the 1.5 percentage point gap between Bank A and Bank C.",
    a2_lbl:"Task A.2 - Inflation Correction",
    a2_title:"Real Purchasing Power: Fisher Equation",
    a2_text:"For the 100,000 AZN deposit at 12% over 3 years, the nominal balance reaches 140,493 AZN. After cumulative inflation of 14.53% is applied, the real balance becomes 122,665 AZN. I used the Fisher formula, real return = (1 + nominal return) / (1 + inflation) - 1, to show the purchasing power behind the bank statement number.",
    c3t:"Nominal vs Real Balance Over 3 Years (AZN)",
    c4t:"Annual Inflation vs Deposit Rate",
    f5l:"Nominal Balance (AZN)",
    f5d:"The amount shown by the bank after 3 years at a 12% nominal rate.",
    f6l:"Real Balance (AZN)",
    f6d:"The purchasing power left after 14.53% cumulative inflation.",
    f7l:"Real Annual Return",
    f7d:"Fisher-adjusted return after comparing 12% nominal growth with 4.63% average inflation.",
    i_a2_1:"<strong>The deposit still protects purchasing power.</strong> A 7.04% real return means the 12% deposit is comfortably above the average inflation rate. The money is not just increasing on paper; it is gaining real value.",
    i_a2_2:"<strong>The nominal gain should not be read at face value.</strong> The 40,493 AZN increase becomes a real gain of 22,665 AZN after inflation. That does not make the deposit bad, but it shows why real return is the more useful decision metric.",
    a3_lbl:"Task A.3 - Alternative Investment Analysis",
    a3_title:"Three Strategies: 50,000 AZN Over 5 Years",
    a3_text:"I compared a bank deposit at 10.5% with monthly compounding, government bonds at 9.8% annually, and a mutual fund with an expected 13% return and a 4% standard deviation. For the fund, I separated the result into pessimistic, normal, and optimistic scenarios so the return is not shown without its risk.",
    c5t:"5-Year Final Value by Strategy (AZN)",
    t2h:"Investment Strategy Comparison",
    t2b:"5 years · 50,000 AZN",
    th_option:"Option",
    th_5yr:"5-Year FV (AZN)",
    th_gainn:"Gain (AZN)",
    th_risk:"Risk",
    row_dep:"Bank Deposit (10.5%)",
    row_bond:"Gov. Bonds (9.8%)",
    row_fpess:"Fund - Pessimistic (9%)",
    row_fnorm:"Fund - Normal (13%)",
    row_fopt:"Fund - Optimistic (17%)",
    r_low:"✓ Insured (ASF)",
    r_high:"High Risk",
    i_a3_1:"<strong>The fund's pessimistic result is below the guaranteed deposit gain.</strong> If the fund performs at the lower end, the investor earns 26,930 AZN, compared with 34,355 AZN from the protected deposit.",
    i_a3_2:"<strong>The choice depends on risk tolerance, not only on the highest possible number.</strong> The fund has the best upside, while the deposit is stronger for a conservative investor. The bond option is safe, but at these rates it gives less return than the deposit for a similar risk level.",
    b_lbl:"Task B - Analytical Essays",
    b_title:"Interest Rate Policy & Deposit Insurance",
    b1_h:"B.1 - Interest Rate Transmission Mechanism",
    b1_p1:"Central banks influence economic activity through the policy rate. When the Central Bank of Azerbaijan raises this rate, commercial banks face higher funding costs and usually respond by increasing deposit rates to attract retail savings. This link between the policy rate and bank-level interest rates is the interest rate transmission mechanism.",
    b1_p2:"In 2022, inflation in Azerbaijan reached 13.85%, which pushed the Central Bank to tighten monetary policy. Banks followed with higher deposit rates. By 2024, inflation had fallen to 2.21%, but banks were slower to reduce rates because cutting deposit returns can push customers toward competitors. This slower reaction on the way down is known as asymmetric transmission.",
    b1_p3:"Transmission in Azerbaijan is limited by several local factors. Many depositors still hold part of their savings in USD or EUR, so AZN rate changes do not affect everyone equally. Large state-backed banks such as Kapital Bank and ABB also have stronger market positions, which can reduce pressure to react quickly. Oil revenues matter as well, because strong liquidity in the banking system lowers the need to compete aggressively for deposits. In more competitive markets such as Georgia, banks like TBC Bank and Bank of Georgia tend to adjust deposit pricing faster after central bank decisions.",
    b2_h:"B.2 - Deposit Insurance: Protection or Moral Hazard?",
    b2_p1:"Azerbaijan's Deposit Insurance Fund (ASF/ƏSF) protects deposits up to 100,000 AZN per bank and per depositor. This is an important safety net, especially because the fund has already paid 1.717 billion AZN to 62,520 depositors in 19 liquidated banks. At the same time, deposit insurance can create moral hazard if people stop checking bank quality simply because the deposit is insured.",
    b2_p2:"The risk is that insured depositors may chase the highest advertised rate without looking at the bank behind it. Banks can then raise rates to attract money and take more risk with the funds they collect. If the strategy fails, the loss is carried by the insurance system and, indirectly, by the public rather than only by the bank shareholders.",
    b2_p3:"<strong>A practical depositor strategy is simple:</strong> keep amounts above 100,000 AZN split across several ASF-member banks, follow capital adequacy and non-performing loan indicators in MBDP reports, prefer stronger or state-backed banks for large deposits, and treat any rate that is 3-4 percentage points above the market average as a warning sign rather than a gift.",
    c_lbl:"Task C - Case Study",
    c_title:"Leyla's Capital Strategy: 80,000 AZN Portfolio",
    c_text:"Leyla has three priorities: protect the capital, earn a return above inflation, and keep at least 30% of the money, or 24,000 AZN, accessible at all times. The portfolio is therefore split across four banks by purpose: liquidity, core income, diversification, and flexible reserve.",
    cc1_lbl:"Part 1 - Liquid (30%)",
    cc1_note:"Available at any time, with ASF membership and a broad branch network.",
    cc2_lbl:"Part 2 - Core Income (35%)",
    cc2_note:"The highest selected market rate, supported by a strong state-backed bank and still well below the insurance limit.",
    cc3_lbl:"Part 3 - Diversification (25%)",
    cc3_note:"Reduces reliance on Kapital Bank and keeps another state-backed bank in the portfolio.",
    cc4_lbl:"Part 4 - Flex Reserve (10%)",
    cc4_note:"Semi-liquid money that can be reviewed every 6 months for short-term needs or better rates.",
    demand:"Demand Account",
    month:"month",
    yr:"yr",
    tot1:"Total Annual Income",
    tot2:"Effective Rate",
    tot3:"Real Return (after avg 4.89% inflation)",
    c6t:"Portfolio Allocation (%)",
    c7t:"Annual Income per Bank Allocation (AZN)",
    d_lbl:"Task D - International Comparison",
    d_title:"Regional Deposit Rates: 4 Countries",
    d_text:"Nominal rates are only the first layer of the comparison. Turkey's 41.49% rate looks very high, but inflation of about 31.1% leaves a much smaller real return and adds major currency risk. Kazakhstan's 14.2% deposit rate is also weakened by 12.9% inflation. Azerbaijan's 11.9% rate is lower in nominal terms, but with 4.63% average inflation it produces a competitive real return and avoids currency conversion risk for an AZN-based investor.",
    c8t:"Nominal Deposit Rate by Country (%)",
    c9t:"Real Return by Country (%) - Fisher Adjusted",
    t3h:"Regional Deposit Comparison",
    t3b:"4 countries",
    th_country:"Country / Bank",
    th_nom:"Nominal %",
    th_curr:"Currency",
    th_inf:"Inflation %",
    th_real:"Real Return %",
    th_verdict:"Verdict",
    row_geo:"Georgia / TBC Bank",
    row_az:"Azerbaijan / Kapital Bank",
    row_tr:"Turkey / İş Bankası",
    row_kz:"Kazakhstan / Halyk Bank",
    v_best:"✓ Best real return",
    v_stable:"✓ Stable currency",
    v_fx:"⚠ High FX risk",
    v_weak:"✗ Weakest real",
    i_d1:"<strong>Georgia has the strongest real return in the table, but the practical result is lower after conversion costs.</strong> Changing 50,000 AZN into GEL and then back again can cost around 1.5%, which reduces the advantage for an Azerbaijani investor.",
    i_d2:"<strong>Turkey's high rate is mostly compensation for inflation and currency risk.</strong> If the lira weakens faster than expected, the foreign investor can lose more through exchange rate movement than they gain from interest.",
    i_d3:"<strong>Azerbaijan is the cleanest option for an AZN-based investor.</strong> There is no currency conversion risk, the real return is competitive at 7.04%, and the manat remains supported by oil-backed fiscal reserves.",
    risk_lbl:"Risk Assessment",
    risk_title:"Key Risks",
    r1t:"Inflation surge scenario",
    r1b:"If inflation rises above 9%, the 12% deposit rate can turn into a weak or negative real return. This is the main macro risk. It is not the base case under current AZN stability, but it should be checked through CBAR updates each quarter.",
    r2t:"Mutual fund downside scenario",
    r2b:"The fund's pessimistic gain of 26,930 AZN is lower than the guaranteed deposit gain of 34,355 AZN. Without enough risk tolerance, choosing the fund can produce a worse result than the bank deposit.",
    r3t:"Concentration risk in Leyla's portfolio",
    r3b:"Kapital Bank holds 35% of the portfolio, or 28,000 AZN. The amount is below the insurance limit, but a wider banking stress event could still delay access to funds even when the deposit is insured.",
    rec_lbl:"Action Items",
    rec_title:"Recommendations",
    rec1t:"For individual investors: choose Bank C for a 3-year horizon",
    rec1b:"For a 50,000 AZN principal over 3 years, Bank C gives the highest final value at 68,382 AZN. The comparison shows that a higher nominal rate can matter more than a more frequent compounding schedule when the rate gap is large enough.",
    rec2t:"For inflation protection: check the real return before depositing",
    rec2b:"A 12% deposit with 4.63% average inflation gives a 7.04% real return. Before committing capital, the investor should use the Fisher formula instead of relying only on the advertised nominal rate. In the current Azerbaijani environment, very low nominal deposits can easily become inflation-neutral or negative.",
    rec3t:"For a multi-bank portfolio: match each bank to a purpose",
    rec3b:"Leyla's split works because each part has a role: liquidity, income, diversification, and flexible reserve. No single bank should hold more than the insured limit. The flexible part can stay in shorter 6-month deposits so the investor can respond if rates improve.",
  },
  az:{
    back:"← Portfolioya qayıt",
    tag:"Maliyyə Modelləşdirməsi · İnvestisiya Analizi · Azərbaycan",
    title_html:"İnvestisiya Qərarı:<br><em>Real Gəlirlər Analizi</em>",
    m1l:"Əhatə edilən tapşırıqlar",
    m1v:"A (Hesablamalar) · B (Esselər) · C (Keys-study) · D (Beynəlxalq)",
    m2l:"Alətlər",
    m3l:"Əsas məbləğlər",
    m4l:"Ölçülər",
    m4v:"Faiz · EİF · Real gəlir · Risk · Portfel",
    jt:"Keçid →",
    qn1:"Mürəkkəb faiz",
    qn2:"İnflyasiya",
    qn3:"Alternativlər",
    qn4:"Keys-study",
    qn5:"Beynəlxalq",
    qn6:"Risklər",
    qn7:"Tövsiyələr",
    obj_lbl:"Məqsəd:",
    obj_text:"Bu analiz bank depozitlərini, inflyasiya nəzərə alınmış real gəlirləri, alternativ investisiya seçimlərini və Azərbaycan investoruna uyğun praktiki portfel bölgüsünü müqayisə edir. Məqsəd yalnız ən yüksək nominal faizi tapmaq deyil, risk, likvidlik və inflyasiya nəzərə alınanda hansı seçimin daha məntiqli olduğunu göstərməkdir.",
    kf_lbl:"Əsas nəticə:",
    kf_text:"Bank C 3 il sonunda ən yüksək yekun məbləği, 68,382 AZN-i verir, baxmayaraq ki, kapitallaşma yalnız ildə bir dəfə aparılır. Bu nümunədə daha yüksək nominal faiz kapitallaşma tezliyindən daha güclü təsir göstərir. 100,000 AZN-in 12% ilə depozitə qoyulması zamanı inflyasiya görünən qazancı təxminən 18,000 AZN azaldır, amma real balans yenə də müsbətdir: 122,665 AZN.",
    f1l:"Bank C - Ən yüksək yekun (AZN)",
    f1d:"11% illik faiz daha az kapitallaşma tezliyinə baxmayaraq 3 il üzrə ən güclü nəticəni verir.",
    f2l:"Real gəlir",
    f2d:"12% depozit 4.63% orta inflyasiya ilə düzəldildikdən sonra real illik gəlir 7.04% olur.",
    f3l:"Ən yaxşı təhlükəsiz qazanc (AZN)",
    f3d:"10.5% bank depoziti zəmanətli qazanc verir, fond isə daha geniş risk aralığı daşıyır.",
    f4l:"Fondun yuxarı potensialı (AZN)",
    f4d:"Fond optimistik ssenaridə 59,620 AZN qazanc verə bilər, amma aşağı ssenarisi daha zəifdir.",
    a1_lbl:"Tapşırıq A.1 - Mürəkkəb faiz",
    a1_title:"Üç bank: hansı seçim daha çox artırır?",
    a1_text:"Başlanğıc məbləği 50,000 AZN, müddət isə 3 ildir. Bank A 9.5% ilə aylıq, Bank B 10.2% ilə rüblük, Bank C isə 11% ilə illik kapitallaşma tətbiq edir. Müqayisəni eyni əsasda aparmaq üçün Effektiv İllik Faizdən (EİF) istifadə etdim, çünki təkcə nominal faiz kapitallaşmanın tam təsirini göstərmir.",
    c1t:"3 ildən sonra yekun məbləğ (AZN)",
    c2t:"Effektiv illik faiz (EİF) və nominal faiz",
    t1h:"Banklar üzrə mürəkkəb faiz müqayisəsi",
    t1b:"3 bank · 3 il",
    th_bank:"Bank",
    th_rate:"Nominal faiz",
    th_freq:"Kapitallaşma",
    th_eir:"EİF",
    th_fv:"Yekun məbləğ (AZN)",
    th_gain:"Qazanc (AZN)",
    annual:"İllik",
    quarterly:"Rüblük",
    monthly:"Aylıq",
    i_a1_1:"<strong>Bu müqayisədə əsas təsir kapitallaşma tezliyindən yox, nominal faizdən gəlir.</strong> Bank C digərlərindən daha az kapitallaşır, amma 11% faiz ona ən yüksək yekun məbləği verir. Kapitallaşma tezliyi əsasən faizlər bir-birinə çox yaxın olanda daha ciddi rol oynayır.",
    i_a1_2:"<strong>Bank A-nın EİF göstəricisi nominal faizindən yuxarıdır, yəni aylıq kapitallaşma həqiqətən əlavə dəyər yaradır.</strong> Amma bu təsir Bank A ilə Bank C arasındakı 1.5 faiz bəndlik fərqi bağlamağa kifayət etmir.",
    a2_lbl:"Tapşırıq A.2 - İnflyasiya korreksiyası",
    a2_title:"Real alıcılıq gücü: Fisher tənliyi",
    a2_text:"100,000 AZN 12% ilə 3 illik depozitə qoyulduqda nominal balans 140,493 AZN-ə çatır. 14.53% kumulyativ inflyasiya tətbiq olunduqdan sonra real balans 122,665 AZN olur. Bank çıxarışında görünən məbləğin arxasındakı alıcılıq gücünü göstərmək üçün Fisher düsturundan istifadə etdim: real gəlir = (1 + nominal gəlir) / (1 + inflyasiya) - 1.",
    c3t:"3 il ərzində nominal və real balans (AZN)",
    c4t:"İllik inflyasiya və depozit faizi",
    f5l:"Nominal balans (AZN)",
    f5d:"12% nominal faizlə 3 ildən sonra bankın göstərdiyi məbləğ.",
    f6l:"Real balans (AZN)",
    f6d:"14.53% kumulyativ inflyasiyadan sonra qalan alıcılıq gücü.",
    f7l:"Real illik gəlir",
    f7d:"12% nominal artımın 4.63% orta inflyasiya ilə müqayisəsindən alınan Fisher-düzəlişli gəlir.",
    i_a2_1:"<strong>Depozit yenə də alıcılıq gücünü qoruyur.</strong> 7.04% real gəlir o deməkdir ki, 12% depozit orta inflyasiyadan rahat şəkildə yuxarıdır. Pul yalnız kağız üzərində artmır, real dəyər də qazanır.",
    i_a2_2:"<strong>Nominal qazancı olduğu kimi qəbul etmək düzgün deyil.</strong> 40,493 AZN artım inflyasiyadan sonra 22,665 AZN real qazanca çevrilir. Bu depoziti zəif etmir, sadəcə qərar verərkən real gəlirin daha doğru göstərici olduğunu göstərir.",
    a3_lbl:"Tapşırıq A.3 - Alternativ investisiya analizi",
    a3_title:"Üç strategiya: 50,000 AZN üçün 5 illik baxış",
    a3_text:"Aylıq kapitallaşma ilə 10.5% bank depozitini, illik 9.8% dövlət istiqrazlarını və gözlənilən 13% gəlirə, 4% standart sapmaya malik qarşılıqlı fondu müqayisə etdim. Fond üzrə nəticəni pessimist, normal və optimistik ssenarilərə ayırdım ki, gəlir riskdən ayrı göstərilməsin.",
    c5t:"Strategiyalar üzrə 5 illik yekun məbləğ (AZN)",
    t2h:"İnvestisiya strategiyalarının müqayisəsi",
    t2b:"5 il · 50,000 AZN",
    th_option:"Seçim",
    th_5yr:"5 illik yekun (AZN)",
    th_gainn:"Qazanc (AZN)",
    th_risk:"Risk",
    row_dep:"Bank depoziti (10.5%)",
    row_bond:"Dövlət istiqrazı (9.8%)",
    row_fpess:"Fond - Pessimist (9%)",
    row_fnorm:"Fond - Normal (13%)",
    row_fopt:"Fond - Optimist (17%)",
    r_low:"✓ Sığortalı (ƏSF)",
    r_high:"Yüksək risk",
    i_a3_1:"<strong>Fondun pessimist nəticəsi zəmanətli depozit qazancından aşağıdır.</strong> Fond aşağı ssenari üzrə nəticə versə, investor 26,930 AZN qazanır, qorunan depozit isə 34,355 AZN qazanc verir.",
    i_a3_2:"<strong>Seçim yalnız ən böyük rəqəmdən yox, risk tolerantlığından asılıdır.</strong> Fondun yuxarı potensialı daha yüksəkdir, depozit isə konservativ investor üçün daha güclüdür. İstiqraz təhlükəsizdir, amma bu faizlərdə oxşar risk səviyyəsinə görə depozitdən daha az gəlir verir.",
    b_lbl:"Tapşırıq B - Analitik esselər",
    b_title:"Faiz siyasəti və əmanət sığortası",
    b1_h:"B.1 - Faiz dərəcəsinin transmissiya mexanizmi",
    b1_p1:"Mərkəzi banklar iqtisadi fəaliyyəti siyasət faizi vasitəsilə yönləndirir. Azərbaycan Mərkəzi Bankı bu faizi artıranda kommersiya banklarının maliyyələşmə xərci yüksəlir və banklar pərakəndə əmanətləri cəlb etmək üçün depozit faizlərini artırmağa meylli olurlar. Siyasət faizi ilə bankların təklif etdiyi faizlər arasındakı bu əlaqə faiz transmissiya mexanizmi adlanır.",
    b1_p2:"2022-ci ildə Azərbaycanda inflyasiya 13.85%-ə çatdığı üçün Mərkəzi Bank pul siyasətini sərtləşdirdi. Banklar da daha yüksək depozit faizləri ilə buna uyğunlaşdı. 2024-cü ildə inflyasiya 2.21%-ə düşsə də, banklar faizləri azaltmaqda daha yavaş davrandılar, çünki aşağı faiz müştərilərin rəqiblərə keçməsinə səbəb ola bilər. Faiz artımına tez, azalmasına isə gec reaksiya verilməsi asimmetrik transmissiya kimi izah olunur.",
    b1_p3:"Azərbaycanda transmissiyanın təsirini bir neçə yerli amil məhdudlaşdırır. Əmanətçilərin bir hissəsi hələ də vəsaitini USD və ya EUR ilə saxladığı üçün AZN faizlərindəki dəyişiklik hamıya eyni dərəcədə təsir etmir. Kapital Bank və ABB kimi iri, dövlət dəstəkli bankların bazar mövqeyi də güclüdür, bu isə onların tez reaksiya vermə təzyiqini azalda bilər. Neft gəlirləri də önəmlidir, çünki bank sistemində likvidlik güclü olanda bankların depozit üçün aqressiv rəqabət aparmaq ehtiyacı azalır. Gürcüstan kimi daha rəqabətli bazarlarda isə TBC Bank və Bank of Georgia kimi banklar mərkəzi bank qərarlarından sonra faizləri daha sürətli tənzimləyir.",
    b2_h:"B.2 - Əmanət sığortası: müdafiə, yoxsa moral risk?",
    b2_p1:"Azərbaycanın Əmanətlərin Sığortalanması Fondu (ƏSF) hər bank üzrə hər əmanətçini 100,000 AZN-ə qədər qoruyur. Bu mühüm təhlükəsizlik mexanizmidir, xüsusilə də fondun indiyə qədər 19 ləğv edilmiş bank üzrə 62,520 əmanətçiyə 1.717 milyard AZN ödədiyini nəzərə alsaq. Bununla yanaşı, əmanət sığortası bəzi hallarda moral risk yarada bilər, çünki insanlar depozit sığortalanıb deyə bankın keyfiyyətini yoxlamağı dayandıra bilirlər.",
    b2_p2:"Risk ondan ibarətdir ki, sığortalanmış əmanətçi bankın vəziyyətinə baxmadan ən yüksək elan edilən faizi seçə bilər. Banklar da daha çox vəsait cəlb etmək üçün faizləri qaldırıb topladıqları vəsaiti daha riskli aktivlərə yönəldə bilərlər. Strategiya uğursuz olarsa, zərəri təkcə bank səhmdarları yox, sığorta sistemi və dolayı olaraq cəmiyyət daşıyır.",
    b2_p3:"<strong>Əmanətçi üçün praktik strategiya sadədir:</strong> 100,000 AZN-dən yuxarı məbləği bir neçə ƏSF üzvü bank arasında bölmək, MBDP hesabatlarında kapital adekvatlığı və problemli kredit göstəricilərini izləmək, böyük məbləğlər üçün daha güclü və ya dövlət dəstəkli banklara üstünlük vermək, bazar ortalamasından 3-4 faiz bəndi yüksək faizi isə hədiyyə yox, xəbərdarlıq siqnalı kimi qəbul etmək.",
    c_lbl:"Tapşırıq C - Keys-study",
    c_title:"Leyla xanımın kapital strategiyası: 80,000 AZN portfel",
    c_text:"Leyla xanımın üç prioriteti var: kapitalı qorumaq, inflyasiyadan yuxarı gəlir əldə etmək və pulun ən azı 30%-ni, yəni 24,000 AZN-i hər zaman əlçatan saxlamaq. Buna görə portfel dörd bank arasında məqsədə görə bölünür: likvidlik, əsas gəlir, diversifikasiya və çevik ehtiyat.",
    cc1_lbl:"Hissə 1 - Likvid (30%)",
    cc1_note:"İstənilən vaxt əlçatan olur, ƏSF üzvlüyü və geniş filial şəbəkəsi var.",
    cc2_lbl:"Hissə 2 - Əsas gəlir (35%)",
    cc2_note:"Seçilən ən yüksək bazar faizi, güclü dövlət dəstəkli bank və sığorta limitindən xeyli aşağı məbləğ.",
    cc3_lbl:"Hissə 3 - Diversifikasiya (25%)",
    cc3_note:"Kapital Bankdan asılılığı azaldır və portfeldə ikinci dövlət dəstəkli bank saxlayır.",
    cc4_lbl:"Hissə 4 - Çevik ehtiyat (10%)",
    cc4_note:"Qısamüddətli ehtiyaclar və daha yaxşı faiz imkanları üçün hər 6 aydan bir yenidən baxıla bilən yarı-likvid hissə.",
    demand:"Tələbli hesab",
    month:"ay",
    yr:"il",
    tot1:"Ümumi illik gəlir",
    tot2:"Effektiv faiz",
    tot3:"Real gəlir (orta 4.89% inflyasiyadan sonra)",
    c6t:"Portfel bölgüsü (%)",
    c7t:"Bank bölgüsünə görə illik gəlir (AZN)",
    d_lbl:"Tapşırıq D - Beynəlxalq müqayisə",
    d_title:"Regional depozit faizləri: 4 ölkə",
    d_text:"Nominal faiz müqayisənin yalnız ilk hissəsidir. Türkiyənin 41.49% faizi çox yüksək görünür, amma təxminən 31.1% inflyasiya real gəliri xeyli azaldır və ciddi valyuta riski yaradır. Qazaxıstanın 14.2% depozit faizi də 12.9% inflyasiya ilə zəifləyir. Azərbaycanın 11.9% faizi nominal olaraq daha aşağıdır, amma 4.63% orta inflyasiya ilə rəqabətli real gəlir verir və AZN əsaslı investor üçün valyuta çevrilməsi riski yaratmır.",
    c8t:"Ölkəyə görə nominal depozit faizi (%)",
    c9t:"Ölkəyə görə real gəlir (%) - Fisher düzəlişi",
    t3h:"Regional depozit müqayisəsi",
    t3b:"4 ölkə",
    th_country:"Ölkə / Bank",
    th_nom:"Nominal %",
    th_curr:"Valyuta",
    th_inf:"İnflyasiya %",
    th_real:"Real gəlir %",
    th_verdict:"Nəticə",
    row_geo:"Gürcüstan / TBC Bank",
    row_az:"Azərbaycan / Kapital Bank",
    row_tr:"Türkiyə / İş Bankası",
    row_kz:"Qazaxıstan / Halyk Bank",
    v_best:"✓ Ən yüksək real gəlir",
    v_stable:"✓ Stabil valyuta",
    v_fx:"⚠ Yüksək valyuta riski",
    v_weak:"✗ Ən zəif real gəlir",
    i_d1:"<strong>Cədvəldə ən güclü real gəlir Gürcüstandadır, amma çevirmə xərclərindən sonra praktik nəticə azalır.</strong> 50,000 AZN-i GEL-ə çevirmək və sonra geri çevirmək təxminən 1.5% xərc yarada bilər, bu da Azərbaycan investoru üçün üstünlüyü azaldır.",
    i_d2:"<strong>Türkiyədə yüksək faiz əsasən inflyasiya və valyuta riskinin kompensasiyasıdır.</strong> Lirə gözləniləndən daha sürətlə zəifləsə, xarici investor faizdən qazandığından daha çox məzənnə fərqində itirə bilər.",
    i_d3:"<strong>AZN əsaslı investor üçün ən təmiz seçim Azərbaycandır.</strong> Valyuta çevrilməsi riski yoxdur, real gəlir 7.04% ilə rəqabətlidir və manat neft gəlirlərinə əsaslanan fiskal ehtiyatlarla dəstəklənir.",
    risk_lbl:"Risk qiymətləndirməsi",
    risk_title:"Əsas risklər",
    r1t:"İnflyasiyanın yüksəlməsi ssenarisi",
    r1b:"İnflyasiya 9%-dən yuxarı qalxarsa, 12% depozit faizi zəif və ya mənfi real gəlirə çevrilə bilər. Bu əsas makro riskdir. Hazırkı AZN stabilliyi fonunda baza ssenari deyil, amma hər rüb CBAR məlumatları ilə izlənməlidir.",
    r2t:"Qarşılıqlı fondun aşağı ssenarisi",
    r2b:"Fondun pessimist qazancı 26,930 AZN-dir və 34,355 AZN-lik zəmanətli depozit qazancından aşağıdır. Kifayət qədər risk tolerantlığı olmadan fond seçimi bank depozitindən daha zəif nəticə verə bilər.",
    r3t:"Leyla xanımın portfelində konsentrasiya riski",
    r3b:"Kapital Bank portfelin 35%-ni, yəni 28,000 AZN-i saxlayır. Məbləğ sığorta limitindən aşağıdır, amma geniş bank stressi baş verərsə, depozit sığortalanmış olsa belə vəsaitə çıxış gecikə bilər.",
    rec_lbl:"Fəaliyyət addımları",
    rec_title:"Tövsiyələr",
    rec1t:"Fərdi investorlar üçün: 3 illik müddətdə Bank C seçimi",
    rec1b:"50,000 AZN əsas məbləğ 3 il saxlanıldıqda Bank C 68,382 AZN ilə ən yüksək yekun dəyəri verir. Müqayisə göstərir ki, faiz fərqi kifayət qədər böyükdürsə, daha yüksək nominal faiz daha tez-tez kapitallaşmadan üstün ola bilər.",
    rec2t:"İnflyasiyadan qorunmaq üçün: depozitdən əvvəl real gəliri yoxlayın",
    rec2b:"4.63% orta inflyasiya şəraitində 12% depozit 7.04% real gəlir verir. Kapitalı yerləşdirməzdən əvvəl investor yalnız elan edilən nominal faizə yox, Fisher düsturuna əsaslanmalıdır. Azərbaycanın hazırkı mühitində çox aşağı nominal depozitlər asanlıqla inflyasiya baxımından neytral və ya mənfi ola bilər.",
    rec3t:"Çox banklı portfel üçün: hər bankı konkret məqsədə bağlayın",
    rec3b:"Leyla xanımın bölgüsü ona görə işləyir ki, hər hissənin rolu var: likvidlik, gəlir, diversifikasiya və çevik ehtiyat. Heç bir bankda sığorta limitindən artıq məbləğ saxlanılmamalıdır. Çevik hissə 6 aylıq depozitlərdə qala bilər ki, faizlər yaxşılaşanda investor daha rahat reaksiya versin.",
  }
};

function applyLang(l){
  lang = l;
  localStorage.setItem('portfolioLang', l);
  document.documentElement.lang = l==='az'?'az':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(T[l][k]!==undefined) el.innerHTML=T[l][k];
  });
  
  
  
  buildCharts(l);
}
function toggleLang(c){applyLang(c?'az':'en');}


applyLang(lang);

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
`

export default function InvestmentAnalysis() {
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
