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
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
.nav-links{display:flex;gap:2.5rem;list-style:none;}
.nav-links a,.nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.nav-links a:hover,.nav-back:hover{color:var(--accent);}
.project-hero{padding:9rem 3rem 4rem;border-bottom:1px solid var(--border);}
.project-tag{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
.project-title{font-family:var(--serif);font-size:clamp(2rem,5.5vw,4.5rem);line-height:1.05;letter-spacing:-0.02em;max-width:900px;}
.project-title em{font-style:italic;color:var(--accent);}
.project-meta{display:flex;gap:3rem;margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.5rem;flex-wrap:wrap;}
.meta-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem;}
.meta-value{font-family:var(--mono);font-size:0.78rem;color:var(--text);}
.quick-nav{position:sticky;top:65px;z-index:50;background:var(--bg2);border-bottom:1px solid var(--border);
  padding:0.65rem 3rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
.quick-nav-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-right:0.5rem;}
.qn-btn{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;
  padding:0.3rem 0.8rem;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:all 0.2s;}
.qn-btn:hover{border-color:var(--accent);color:var(--accent);}
.qn-btn.risk{border-color:rgba(239,68,68,0.3);color:#ef4444;}
.qn-btn.risk:hover{border-color:#ef4444;background:rgba(239,68,68,0.08);}
.qn-btn.rec{border-color:rgba(5,150,105,0.3);color:var(--accent2);}
.qn-btn.rec:hover{border-color:var(--accent2);background:rgba(5,150,105,0.08);}
main{max-width:1100px;margin:0 auto;padding:4rem 3rem 6rem;}
.summary{border-left:2px solid var(--accent);padding:1.5rem 2rem;background:var(--bg2);margin-bottom:4rem;}
.summary p{color:var(--muted);}
.summary p strong{color:var(--text);}
.content-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:0.5rem;}
.content-title{font-family:var(--serif);font-size:1.75rem;margin-bottom:1.25rem;}
.content-text{color:var(--muted);margin-bottom:2.5rem;max-width:740px;font-size:0.92rem;}
.chart-wrap{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:3rem;}
.chart-title{font-family:var(--mono);font-size:0.67rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);
  margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);}
.chart-title span{color:var(--accent);}
.chart-canvas-wrap{position:relative;width:100%;height:320px;}
.chart-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5px;background:var(--border);margin-bottom:3rem;}
.chart-row .chart-wrap{margin-bottom:0;border:none;}
.findings-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:var(--border);margin-bottom:3rem;}
.findings-grid.col3{grid-template-columns:repeat(3,1fr);}
.finding-card{background:var(--bg2);padding:1.5rem;}
.finding-num{font-family:var(--mono);font-size:1.9rem;color:var(--accent);line-height:1;margin-bottom:0.4rem;}
.finding-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:0.35rem;}
.finding-desc{font-size:0.76rem;color:var(--muted);}
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
.insights-list{list-style:none;margin-bottom:3rem;}
.insights-list li{padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);background:var(--bg2);display:flex;gap:1rem;align-items:flex-start;}
.insights-list li:first-child{border-top:1px solid var(--border);}
.insight-bullet{font-family:var(--mono);font-size:0.72rem;color:var(--accent);flex-shrink:0;margin-top:0.1rem;}
.insight-text{font-size:0.86rem;color:var(--muted);}
.insight-text strong{color:var(--text);}
.risk-block{border:1px solid rgba(239,68,68,0.25);background:rgba(239,68,68,0.05);padding:1.75rem 2rem;margin-bottom:1rem;}
.rec-block{border:1px solid rgba(5,150,105,0.25);background:rgba(5,150,105,0.06);padding:1.75rem 2rem;margin-bottom:1rem;}
.block-icon{font-size:1rem;margin-right:0.5rem;}
.block-title{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.75rem;}
.risk-block .block-title{color:var(--accent3);}
.rec-block .block-title{color:var(--accent2);}
.block-text{font-size:0.86rem;color:var(--muted);}
.block-text strong{color:var(--text);}
.divider{border:none;border-top:1px solid var(--border);margin:3rem 0;}
.section-anchor{scroll-margin-top:110px;}
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
.nav-right-bank{display:flex;align-items:center;gap:1.5rem;}
.lang-pill{display:flex;background:#EDE9FE;border-radius:20px;padding:3px;}
.lang-btn{padding:4px 14px;border:none;background:transparent;border-radius:16px;
  font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.06em;
  color:#52525B;transition:all .2s;}
.lang-btn.active{background:white;color:#7C3AED;box-shadow:0 1px 6px rgba(124,58,237,.14);}
.slicer-btn{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;
  padding:0.4rem 1rem;border:1px solid var(--border);background:transparent;color:var(--muted);
  cursor:pointer;transition:all 0.2s;}
.slicer-btn:hover{border-color:var(--accent);color:var(--accent);}
.slicer-btn.active{border-color:var(--accent);background:rgba(124,58,237,0.08);color:var(--accent);}
`

const bodyHtml = `
<nav>
  <a href="${import.meta.env.BASE_URL}" class="nav-logo">R.A.</a>
  <div class="nav-right-bank">
    <a href="${import.meta.env.BASE_URL}" class="nav-back" id="navBack">← Back to Portfolio</a>
  </div>
  <div class="lang-pill">
    <button class="lang-btn active" onclick="setLang('en')">EN</button>
    <button class="lang-btn"        onclick="setLang('az')">AZ</button>
  </div>
</nav>

<div class="project-hero">
  <div class="project-tag">Financial Analysis · Market Research · Azerbaijan</div>
  <h1 class="project-title">Bank Deposit Rates:<br><em>Azerbaijan Market Comparison</em></h1>
  <div class="project-meta">
    <div><div class="meta-label">Tools</div><div class="meta-value">Excel · Data Collection · Financial Modeling</div></div>
    <div><div class="meta-label">Banks Analysed</div><div class="meta-value">ABB · AccessBank · Kapital Bank · Bank of Baku · Unibank</div></div>
    <div><div class="meta-label">Principal</div><div class="meta-value">10,000 AZN base · 1-year horizon</div></div>
    <div><div class="meta-label">Dimensions</div><div class="meta-value">Rate · Annual Return · Market Positioning · Forecast</div></div>
  </div>
</div>
<div class="quick-nav">
  <span class="quick-nav-label">Jump to →</span>
  <a class="qn-btn" href="#slicer">Bank Filter</a>
  <a class="qn-btn" href="#comparison">Comparison</a>
  <a class="qn-btn" href="#forecast">Forecast</a>
  <a class="qn-btn risk" href="#risks">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations">✓ Recommendations</a>
</div>
<main>
  <div class="summary">
    <p><strong>Objective:</strong> Compare deposit interest rates offered by 5 major Azerbaijani banks for retail clients, identify the optimal investment choice, analyse market positioning, and forecast short-term rate dynamics.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> Kapital Bank (Birbank) leads the market at 11.90%, generating 1,190 AZN on a 10,000 AZN deposit — 165 AZN more than AccessBank. The spread between the highest and lowest rate is only 1.65%, which shows the market has already reached a near-equilibrium state. No major rate movement is expected in the next 12 months.</p>
  </div>
  <div class="findings-grid">
    <div class="finding-card"><div class="finding-num">11.90%</div><div class="finding-label">Highest Rate</div><div class="finding-desc">Kapital Bank (Birbank) — 1,190 AZN annual return on 10,000 AZN</div></div>
    <div class="finding-card"><div class="finding-num">10.25%</div><div class="finding-label">Lowest Rate</div><div class="finding-desc">AccessBank — 165 AZN less per year compared to the top option</div></div>
    <div class="finding-card"><div class="finding-num">1.65%</div><div class="finding-label">Market Spread</div><div class="finding-desc">Narrow spread shows the market has reached near-equilibrium</div></div>
    <div class="finding-card"><div class="finding-num">10–12%</div><div class="finding-label">12-Month Forecast</div><div class="finding-desc">Rates expected to hold steady — inflation at 2–3% removes pressure to move</div></div>
  </div>

  <hr class="divider"/>
  <div id="slicer" class="section-anchor">
    <p class="content-label">Interactive Slicer</p>
    <h2 class="content-title">Filter by Bank</h2>
    <p class="content-text"></p>
  </div>
  <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:2rem;">
    <button class="slicer-btn active" data-bank="all" onclick="filterBanks(this,'all')">All Banks</button>
    <button class="slicer-btn" data-bank="ABB" onclick="filterBanks(this,'ABB')">ABB Bank</button>
    <button class="slicer-btn" data-bank="Access" onclick="filterBanks(this,'Access')">AccessBank</button>
    <button class="slicer-btn" data-bank="Kapital" onclick="filterBanks(this,'Kapital')">Kapital Bank</button>
    <button class="slicer-btn" data-bank="BoB" onclick="filterBanks(this,'BoB')">Bank of Baku</button>
    <button class="slicer-btn" data-bank="Uni" onclick="filterBanks(this,'Uni')">Unibank</button>
  </div>
  <div class="chart-wrap" id="slicer-chart-wrap">
    <div class="chart-title"><span> 01</span> — Annual Interest Rate & Return on 10,000 AZN</div>
    <div class="chart-canvas-wrap" style="height:280px"><canvas id="c-bank-rate"></canvas></div>
  </div>
  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 01</span> — Bank Deposit Rate Comparison</span>
      <span class="table-badge" id="visible-count">5 banks</span>
    </div>
    <table id="bank-table">
      <thead><tr><th>Bank</th><th>Annual Rate</th><th>1-Year Return (10k AZN)</th><th>Market Position</th><th>Notes</th></tr></thead>
      <tbody>
        <tr data-bank="Kapital"><td class="acc">Kapital Bank (Birbank)</td><td class="pos">11.90%</td><td class="pos">1,190 AZN</td><td>🥇 Market Leader</td><td class="mu">State participation; digital-first strategy</td></tr>
        <tr data-bank="ABB"><td class="acc">ABB Bank</td><td>11.00%</td><td>1,100 AZN</td><td>🥈 2nd</td><td class="mu">Strong state-backed institution</td></tr>
        <tr data-bank="BoB"><td class="acc">Bank of Baku</td><td>10.75%</td><td>1,075 AZN</td><td>🥉 3rd</td><td class="mu">Dynamic deposit product offering</td></tr>
        <tr data-bank="Uni"><td class="acc">Unibank</td><td>10.50%</td><td>1,050 AZN</td><td>4th</td><td class="mu">Mid-market positioning</td></tr>
        <tr data-bank="Access"><td class="acc">AccessBank</td><td class="neg">10.25%</td><td class="neg">1,025 AZN</td><td>5th</td><td class="mu">SME-focused; lower retail deposit need</td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider"/>
  <div id="comparison" class="section-anchor">
    <p class="content-label">Question Analysis</p>
    <h2 class="content-title">Market Dynamics & Bank Positioning</h2>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span> 02</span> — Rate vs Market Average</div><div class="chart-canvas-wrap"><canvas id="c-vs-avg"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span> 03</span> — Return Difference vs AccessBank (Base)</div><div class="chart-canvas-wrap"><canvas id="c-spread"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Kapital Bank's 11.90% can be explained by two things.</strong> First, in a competitive market, they may be running a more aggressive rate policy to attract depositors. Second, expanding the customer base is likely a core goal for Birbank as a digital platform, so the above-market rate is also a customer acquisition tool.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>AccessBank's lower rate is not necessarily a weakness.</strong> Since the bank is primarily oriented toward the SME segment, it may simply not need to compete for large retail deposits. Its capital reserves may also be sufficient enough that attracting additional deposits is not a priority. Lower brand recognition compared to the bigger banks could also be a factor — offering a low rate with lower visibility risks losing clients.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>The 1.65% spread between the highest and lowest rate shows the market is mature.</strong> All five banks are anchoring to the same macroeconomic conditions, and there is little room left for dramatic differentiation.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="forecast" class="section-anchor">
    <p class="content-label">12-Month Outlook</p>
    <h2 class="content-title">Rate Forecast & Economic Context</h2>
  </div>
  <p class="content-text">Inflation in Azerbaijan was recorded at 2–3% in 2024. That is not a large enough number to push banks into raising their rates to protect returns. On top of that, the spread between banks is only 1.65%, which is a small gap — and it signals that the market has already reached equilibrium. Taking all of this into account, rates will most likely stay within the 10–12% range over the next year, with no major shifts expected.</p>
  <div class="chart-wrap">
    <div class="chart-title"><span> 04</span> — Rate Stability Scenario: Expected Range for Next 12 Months</div>
    <div class="chart-canvas-wrap" style="height:260px"><canvas id="c-forecast"></canvas></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Rates will most likely stay between 10–12% for the next year.</strong> Low inflation removes any pressure to raise them, and the market's near-equilibrium state removes the urgency to lower them either.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Kapital Bank's lead may narrow slightly</strong> as other banks react to competitive pressure, but given Birbank's digital growth objectives, it is unlikely to disappear entirely.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label">Risk Assessment</p>
    <h2 class="content-title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Currency and oil price volatility</div><div class="block-text">The manat's exchange rate can remain stable for a period and then shift suddenly, and economic changes tied to oil dependency directly affect deposit rates. A sharp drop in oil revenues could create exchange rate pressure and force the Central Bank to adjust rates quickly. <strong>Oil dependency is the main macroeconomic risk factor here.</strong></div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Deposit insurance limits</div><div class="block-text">Deposits above the insured threshold carry counterparty risk. For larger amounts, concentrating everything in one bank — even the market leader — adds unnecessary exposure. <strong>Splitting across 2–3 banks reduces this risk without giving up much in returns.</strong></div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label">Action Items</p>
    <h2 class="content-title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> For long-term investors: Choose Kapital Bank (Birbank)</div><div class="block-text">At 11.90% with state participation and strong capitalisation, Kapital Bank offers the best return in the market. On a 10,000 AZN deposit, that is 1,190 AZN per year — 165 AZN more than AccessBank. Given the deposit insurance framework, this bank is the optimal choice both for return and reliability. <strong>State participation further reduces counterparty risk.</strong></div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> For risk-conscious investors: Split between ABB and Kapital Bank</div><div class="block-text">Splitting across both banks keeps deposits within insured limits at each institution while capturing near-peak rates from both. ABB at 11.00% is a strong second choice with comparable institutional safety and state backing.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Monitor macroeconomic signals quarterly</div><div class="block-text">Track Central Bank rate decisions and official inflation data. If inflation climbs above 5%, banks may be pushed to raise rates, which creates a renegotiation opportunity at renewal. <strong>Set a calendar reminder 30 days before your deposit matures.</strong></div></div>
</main>

<footer>
  <span>← <a href="${import.meta.env.BASE_URL}">Back to Portfolio</a></span>
  <span>© 2026 — Junior Data Analyst Portfolio</span>
</footer>
`

const script = `
const A='#7c3aed',A2='#059669',A3='#ef4444',A4='#10b981';
const GRID='rgba(0,0,0,0.07)',MUT='#6b7280';
const FONT="'Syne',sans-serif";
Chart.defaults.color=MUT;Chart.defaults.borderColor=GRID;
Chart.defaults.font.family=FONT;Chart.defaults.font.size=11;
const scl={x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT}}};

const bankData={
  labels:['Kapital Bank','ABB Bank','Bank of Baku','Unibank','AccessBank'],
  rates:[11.90,11.00,10.75,10.50,10.25],
  keys:['Kapital','ABB','BoB','Uni','Access']
};
let bankChart;

// Colour palette per bank index — consistent regardless of selection order
const bankColors=['#7c3aed','rgba(124,58,237,0.7)','rgba(124,58,237,0.5)','rgba(124,58,237,0.35)','#ef4444'];

function buildBankChartMulti(keys){
  // keys is 'all' or an array of bank key strings
  const idx = keys==='all'
    ? [0,1,2,3,4]
    : bankData.keys.map((k,i)=>keys.includes(k)?i:-1).filter(i=>i>=0);

  const labels = idx.map(i=>bankData.labels[i]);
  const rates  = idx.map(i=>bankData.rates[i]);
  const bg     = idx.map(i=>bankColors[i]);

  if(bankChart) bankChart.destroy();
  bankChart = new Chart(document.getElementById('c-bank-rate'),{
    type:'bar',
    data:{labels,datasets:[{label:'Annual Rate %',data:rates,backgroundColor:bg,borderWidth:0,borderRadius:3}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:9.5,max:12.5}}}
  });
}
buildBankChartMulti('all');

// Multi-select state
let activeFilters = new Set();

function filterBanks(btn, key){
  if(key === 'all'){
    // Reset to show all
    activeFilters.clear();
    document.querySelectorAll('.slicer-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    // Deactivate the "All Banks" button when a specific bank is toggled
    document.querySelector('.slicer-btn[data-bank="all"]').classList.remove('active');
    if(activeFilters.has(key)){
      activeFilters.delete(key);
      btn.classList.remove('active');
    } else {
      activeFilters.add(key);
      btn.classList.add('active');
    }
    // If nothing is selected, revert to showing all
    if(activeFilters.size === 0){
      document.querySelector('.slicer-btn[data-bank="all"]').classList.add('active');
    }
  }

  const showAll = activeFilters.size === 0;

  // Filter table rows
  const rows = document.querySelectorAll('#bank-table tbody tr');
  let vis = 0;
  rows.forEach(r => {
    const show = showAll || activeFilters.has(r.dataset.bank);
    r.style.display = show ? '' : 'none';
    if(show) vis++;
  });

  // Rebuild slicer chart
  buildBankChartMulti(showAll ? 'all' : [...activeFilters]);

  // Update badge
  const t = BANK_T[lang];
  document.getElementById('visible-count').textContent =
    vis + (vis === 1 ? ' ' + t.visible_single : ' ' + t.visible_plural);
}

new Chart(document.getElementById('c-vs-avg'),{type:'bar',data:{
  labels:['Kapital Bank','ABB Bank','Bank of Baku','Unibank','AccessBank'],
  datasets:[
    {label:'Bank Rate %',data:[11.90,11.00,10.75,10.50,10.25],backgroundColor:[A,'rgba(124,58,237,0.7)','rgba(124,58,237,0.5)','rgba(124,58,237,0.35)','rgba(124,58,237,0.2)'],borderWidth:0,borderRadius:3},
    {label:'Market Avg (10.88%)',data:[10.88,10.88,10.88,10.88,10.88],type:'line',borderColor:A2,borderDash:[4,4],pointRadius:0,borderWidth:1.5,fill:false}
  ]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:{...scl,y:{...scl.y,min:9.5,max:12.5}}}});

new Chart(document.getElementById('c-spread'),{type:'bar',data:{
  labels:['Kapital Bank','ABB Bank','Bank of Baku','Unibank','AccessBank'],
  datasets:[{label:'Extra Return vs AccessBank (AZN)',data:[165,75,50,25,0],backgroundColor:[A,A2,'rgba(124,58,237,0.5)','rgba(124,58,237,0.3)','rgba(124,58,237,0.1)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-forecast'),{type:'line',data:{
  labels:['Now','Q1 2026','Q2 2026','Q3 2026','Q4 2026'],
  datasets:[
    {label:'Kapital Bank',data:[11.90,11.85,11.80,11.75,11.70],borderColor:A,backgroundColor:'rgba(124,58,237,0.06)',borderWidth:2,tension:0.3,fill:true},
    {label:'Market Average',data:[10.88,10.85,10.82,10.80,10.78],borderColor:A2,borderDash:[4,4],borderWidth:1.5,tension:0.3,pointRadius:3},
    {label:'Lower Bound',data:[10.25,10.20,10.15,10.10,10.05],borderColor:'rgba(0,0,0,0.15)',borderDash:[2,4],borderWidth:1,tension:0.3}
  ]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:{...scl,y:{...scl.y,min:9,max:12.5}}}});



const BANK_T={
en:{
  back:'← Back to Portfolio',
  tag:'Financial Analysis · Market Research · Azerbaijan',
  title_html:'Bank Deposit Rates:<br><em>Azerbaijan Market Comparison</em>',
  m1l:'Tools',m2l:'Banks Analysed',m3l:'Principal',m4l:'Dimensions',
  jt:'Jump to →',
  qn1:'Bank Filter',qn2:'Comparison',qn3:'Forecast',qn_risk:'⚠ Risks',qn_rec:'✓ Recommendations',
  obj_lbl:'Objective:',obj_text:'Compare deposit interest rates offered by 5 major Azerbaijani banks for retail clients, identify the optimal investment choice, analyse market positioning, and forecast short-term rate dynamics.',
  kf_lbl:'Key Finding:',kf_text:'Kapital Bank (Birbank) leads the market at 11.90%, generating 1,190 AZN on a 10,000 AZN deposit — 165 AZN more than AccessBank. The spread between the highest and lowest rate is only 1.65%, which shows the market has already reached a near-equilibrium state. No major rate movement is expected in the next 12 months.',
  f1l:'Highest Rate',f1d:'Kapital Bank (Birbank) — 1,190 AZN annual return on 10,000 AZN',
  f2l:'Lowest Rate',f2d:'AccessBank — 165 AZN less per year compared to the top option',
  f3l:'Market Spread',f3d:'Narrow spread shows the market has reached near-equilibrium',
  f4l:'12-Month Forecast',f4d:'Rates expected to hold steady — inflation at 2–3% removes pressure to move',
  slicer_title:'Filter by Bank',slicer_text:' ',
  slicer_all:'All Banks',
  tab_h1:'Bank',tab_h2:'Annual Rate',tab_h3:'1-Year Return (10k AZN)',tab_h4:'Market Position',tab_h5:'Notes',
  trow_n1:'State participation; digital-first strategy',trow_n2:'Strong state-backed institution',trow_n3:'Dynamic deposit product offering',trow_n4:'Mid-market positioning',trow_n5:'SME-focused; lower retail deposit need',
  comp_lbl:'Question Analysis',comp_title:'Market Dynamics & Bank Positioning',
  c_vs_avg:'Rate vs Market Average',c_spread:'Return Difference vs AccessBank (Base)',
  i1:'<strong>Kapital Bank\\'s 11.90% can be explained by two things.</strong> First, in a competitive market, they may be running a more aggressive rate policy to attract depositors. Second, expanding the customer base is likely a core goal for Birbank as a digital platform, so the above-market rate is also a customer acquisition tool.',
  i2:'<strong>AccessBank\\'s lower rate is not necessarily a weakness.</strong> Since the bank is primarily oriented toward the SME segment, it may simply not need to compete for large retail deposits. Its capital reserves may also be sufficient enough that attracting additional deposits is not a priority. Lower brand recognition compared to the bigger banks could also be a factor.',
  i3:'<strong>The 1.65% spread between the highest and lowest rate shows the market is mature.</strong> All five banks are anchoring to the same macroeconomic conditions, and there is little room left for dramatic differentiation.',
  fore_lbl:'12-Month Outlook',fore_title:'Rate Forecast & Economic Context',
  fore_text:"Inflation in Azerbaijan was recorded at 2–3% in 2024. That is not a large enough number to push banks into raising their rates to protect returns. On top of that, the spread between banks is only 1.65% — a small gap that signals the market has already reached equilibrium. Taking all of this into account, rates will most likely stay within the 10–12% range over the next year, with no major shifts expected.",
  c_forecast:'Rate Stability Scenario: Expected Range for Next 12 Months',
  i4:'<strong>Rates will most likely stay between 10–12% for the next year.</strong> Low inflation removes any pressure to raise them, and the market\\'s near-equilibrium state removes the urgency to lower them either.',
  i5:'<strong>Kapital Bank\\'s lead may narrow slightly</strong> as other banks react to competitive pressure, but given Birbank\\'s digital growth objectives, it is unlikely to disappear entirely.',
  risk_lbl:'Risk Assessment',risk_title:'⚠ Key Risks',
  r1t:'⚠ Currency and oil price volatility',r1b:"The manat's exchange rate can remain stable for a period and then shift suddenly, and economic changes tied to oil dependency directly affect deposit rates. A sharp drop in oil revenues could create exchange rate pressure and force the Central Bank to adjust rates quickly. <strong>Oil dependency is the main macroeconomic risk factor here.</strong>",
  r2t:'⚠ Deposit insurance limits',r2b:'Deposits above the insured threshold carry counterparty risk. For larger amounts, concentrating everything in one bank — even the market leader — adds unnecessary exposure. <strong>Splitting across 2–3 banks reduces this risk without giving up much in returns.</strong>',
  rec_lbl:'Action Items',rec_title:'✓ Recommendations',
  rec1t:'→ For long-term investors: Choose Kapital Bank (Birbank)',rec1b:'At 11.90% with state participation and strong capitalisation, Kapital Bank offers the best return in the market. On a 10,000 AZN deposit, that is 1,190 AZN per year — 165 AZN more than AccessBank. Given the deposit insurance framework, this bank is the optimal choice both for return and reliability. <strong>State participation further reduces counterparty risk.</strong>',
  rec2t:'→ For risk-conscious investors: Split between ABB and Kapital Bank',rec2b:'Splitting across both banks keeps deposits within insured limits at each institution while capturing near-peak rates from both. ABB at 11.00% is a strong second choice with comparable institutional safety and state backing.',
  rec3t:'→ Monitor macroeconomic signals quarterly',rec3b:'Track Central Bank rate decisions and official inflation data. If inflation climbs above 5%, banks may be pushed to raise rates, which creates a renegotiation opportunity at renewal. <strong>Set a calendar reminder 30 days before your deposit matures.</strong>',
  visible_single:'bank',visible_plural:'banks',
  fig01:'Annual Interest Rate & Return on 10,000 AZN',
  tab01:'Bank Deposit Rate Comparison',
  market_avg_lbl:'Market Avg (10.88%)',extra_lbl:'Extra Return vs AccessBank (AZN)',
  fore_kap:'Kapital Bank',fore_avg:'Market Average',fore_low:'Lower Bound',
  quarterly:['Now','Q1 2026','Q2 2026','Q3 2026','Q4 2026'],
  footer_r:'© 2026 — Junior Data Analyst Portfolio',
},
az:{
  back:'← Portfolioya Qayıt',
  tag:'Maliyyə Analizi · Bazar Tədqiqi · Azərbaycan',
  title_html:'Bank Əmanət Faizləri:<br><em>Azərbaycan Bazarı Müqayisəsi</em>',
  m1l:'Alətlər',m2l:'Analiz Edilmiş Banklar',m3l:'Əsas Məbləğ',m4l:'Ölçülər',
  jt:'Keç →',
  qn1:'Bank Filteri',qn2:'Müqayisə',qn3:'Proqnoz',qn_risk:'⚠ Risklər',qn_rec:'✓ Tövsiyələr',
  obj_lbl:'Məqsəd:',obj_text:'5 əsas Azərbaycan bankının pərakəndə müştərilər üçün təqdim etdiyi əmanət faiz dərəcələrini müqayisə etmək, optimal investisiya seçimini müəyyənləşdirmək, bazar mövqeləşdirməsini analiz etmək və qısamüddətli faiz dinamikasını proqnozlaşdırmaq.',
  kf_lbl:'Əsas Tapıntı:',kf_text:'Kapital Bank (Birbank) 11,90% illik faiz dərəcəsi ilə bazarda liderdir — 10.000 AZN əmanətdə 1.190 AZN gəlir əldə edir hansı ki, AccessBank-dan 165 AZN çoxdur. Ən yüksək və ən aşağı faiz arasındakı fərq cəmi 1,65%-dir ki, bu da bazarın artıq tarazlıq səviyyəsinə gəlib çatdığını göstərir. Yaxın 12 ayda böyük bir dəyişiklik gözlənilmir.',
  f1l:'Ən Yüksək Faiz',f1d:'Kapital Bank (Birbank) — 10.000 AZN əmanətdə ildə 1.190 AZN gəlir',
  f2l:'Ən Aşağı Faiz',f2d:'AccessBank — top seçimə nisbətən ildə 165 AZN az',
  f3l:'Bazar Fərqi',f3d:'Aşağı fərq bazarın tarazlıq səviyyəsinə gəldiyini göstərir',
  f4l:'12 Aylıq Proqnoz',f4d:'Faizlər sabit qalacaq — 2–3% inflyasiya hərəkət üçün təzyiq yaratmır',
  slicer_title:'Banka Görə Filter',slicer_text:' ',
  slicer_all:'Bütün Banklar',
  tab_h1:'Bank',tab_h2:'İllik Faiz',tab_h3:'1 İllik Gəlir (10k AZN)',tab_h4:'Bazar Mövqeyi',tab_h5:'Qeydlər',
  trow_n1:'Dövlət iştirakı; rəqəmsal birinci strategiya',trow_n2:'Güclü dövlət dəstəkli müəssisə',trow_n3:'Dinamik əmanət məhsulu təklifi',trow_n4:'Orta bazar mövqeləşdirməsi',trow_n5:'KOB yönümlü; pərakəndə əmanət ehtiyacı azdır',
  comp_lbl:'Sual Analizi',comp_title:'Bazar Dinamikası & Bank Mövqeləşdirməsi',
  c_vs_avg:'Faiz vs Bazar Ortalaması',c_spread:'AccessBank-a nisbətin Gəlir Fərqi',
  i1:'<strong>Kapital Bankın 11,90%-ini bir neçə amillə izah etmək olar.</strong> Birincisi, rəqabətli bazarda əmanətçiləri cəlb etmək üçün daha aqressiv faiz siyasəti yeridə bilər. İkincisi, bankın rəqəmsal platforması olan Birbankın inkişafı çərçivəsində müştəri bazasını genişləndirmək hədəfi güdə bilər.',
  i2:'<strong>AccessBank-ın aşağı faizi mütləq zəiflik deyil.</strong> AccessBank əsasən kiçik və orta biznes seqmentinə yönəlmiş bir idarə kimi fəaliyyət göstərdiyi üçün pərakəndə depozit bazarında daha az rəqabətçi kimi görünür. Bankın kapital ehtiyatının kifayət qədər olması səbəbindən əlavə depozit cəlbinə ehtiyac duymur. Digər səbəb o ola bilər ki,  bankın brend tanınırlığının böyük banklarla müqayisədə aşağı olması da depozit faizinə təsir edən əsas amillərdən biridir (aşağı faizlə çox müştəri itkiyə səbəb ola bilər).',
  i3:'<strong>Ən yüksək və ən aşağı faiz arasındakı 1,65%-lik fərq bazarın yetkinliyini göstərir.</strong> Bütün beş bank eyni makroiqtisadi göstəricilərə bağlıdır və kəskin fərqlənmə üçün çox az yer qalıb.',
  fore_lbl:'12 Aylıq Perspektiv',fore_title:'Faiz Proqnozu & İqtisadi Kontekst',
  fore_text:'2024-cü ildə Azərbaycanda inflyasiya 2–3% ilə qeydə alınıb. Bu, bankları gəlirlilik üçün faizlərini artırmağa məcbur edəcək qədər böyük bir rəqəm deyil. Bundan əlavə, banklar arasındakı fərq 1,65%-dir — bu kiçik bir fərqdir və bazarın artıq tarazlıq nöqtəsinə çatdığını göstərir. Bütün bunları nəzərə alaraq deyə bilərik ki, yaxın 1 ildə faizlər 10–12% arasında qalacaq, böyük bir dəyişiklik gözlənilmir.',
  c_forecast:'Faiz Sabitliyi Ssenarisi: Növbəti 12 Ay Üçün Gözlənilən Aralıq',
  i4:'<strong>Faizlərin gələn il boyunca 10–12% arasında qalması ehtimalı güclüdür.</strong> Aşağı inflyasiya onları artırmaq üçün təzyiqi aradan qaldırır.',
  i5:'<strong>Kapital Bankın üstünlüyü bir qədər azala bilər</strong>, çünki digər banklar rəqabətçi təzyiqə reaksiya verəcək, lakin Birbankın rəqəmsal artım hədəfləri nəzərə alındıqda bu üstünlüyün tamamilə yox olması gözlənilmir.',
  risk_lbl:'Risk Qiymətləndirməsi',risk_title:'⚠ Əsas Risklər',
  r1t:'⚠ Valyuta və neft qiyməti dəyişkənliyi',r1b:'Manatın məzənnəsi bir müddət sabit qalıb sonra qəfil dəyişiklik göstərə bilər, neftdən asılı iqtisadi dəyişikliklər isə depozit faizlərinə birbaşa təsir edən əsas amillərdəndir. Neft gəlirlərindəki kəskin düşüş məzənnəyə təzyiq yarada bilər ki, bu da Mərkəzi Bankı faizləri sürətlə tənzimləməyə məcbur edəcək. <strong>Neftdən asılılıq burada əsas makroiqtisadi risk amilidir.</strong>',
  r2t:'⚠ Əmanət sığortası limitləri',r2b:'Bank əmanətləri yalnız müəyyən məbləğə qədər sığortalanır və həmin həddi aşan vəsait risk daşıyır. Böyük məbləği bir bankda saxlamaq əvəzinə, onu 2–3 bank arasında bölmək daha təhlükəsizdir. Beləliklə, pulun daha böyük hissəsi sığorta ilə qorunur və gəlirdən çox şey itirmədən riski azaltmış olarıq.</strong>',
  rec_lbl:'Fəaliyyət Addımları',rec_title:'✓ Tövsiyələr',
  rec1t:'→ Uzunmüddətli investorlar üçün: Kapital Bank (Birbank) seçin',rec1b:'Dövlət iştirakı və güclü kapitallaşma ilə 11,90%-də Kapital Bank bazardakı ən yaxşı gəliri təqdim edir. 10.000 AZN əmanət üçün ildə 1.190 AZN deməkdir — AccessBank-dan 165 AZN çox. Əmanət sığortası çərçivəsini nəzərə aldıqda, bu bank həm gəlirlilik, həm də etibarlılıq baxımından optimal seçimdir. <strong>Dövlətin bankda pay sahibi olması bankın öhdəliklərini yerinə yetirə bilməməsi riskini daha da azaldır.</strong>',
  rec2t:'→ Riskə həssas investorlar üçün: ABB və Kapital Bank arasında bölün',rec2b:'Hər iki bankda əmanət saxlamaq hər birindəki sığorta limitlərini keçmədən zirvəyə yaxın faizləri əldə etməyə imkan verir. 11,00% ilə ABB, müqayisəli maliyyə etibarlılığı və dövlət dəstəyi ilə güclü ikinci seçimdir.',
  rec3t:'→ Makroiqtisadi göstəriciləri rüblük izləyin',rec3b:'Mərkəzi Bank faiz qərarlarını və rəsmi inflyasiya məlumatlarını izləyin. İnflyasiya 5%-dən yuxarı çıxarsa, banklar faizlərini artırmağa məcbur ola bilər, bu da yenilənmə zamanı yenidən danışıqlar üçün fürsət yaradır. <strong>Əmanətin ödəmə tarixindən 30 gün əvvəl xatırlatma qurun.</strong>',
  visible_single:'bank',visible_plural:'bank',
  fig01:'İllik Faiz Dərəcəsi & 10.000 AZN-də Gəlir',
  tab01:'Bank Əmanət Faizi Müqayisəsi',
  market_avg_lbl:'Bazar Ortalaması (10.88%)',extra_lbl:'AccessBank-a nisbətin Əlavə Gəlir (AZN)',
  fore_kap:'Kapital Bank',fore_avg:'Bazar Ortalaması',fore_low:'Aşağı Hədd',
  quarterly:['İndi','I rüb 2026','II rüb 2026','III rüb 2026','IV rüb 2026'],
  footer_r:'© 2026 — Gənc Data Analitik Portfolio',
}};

let lang=localStorage.getItem('portfolioLang')||'en';

function applyBankLang(l){
  lang=l;localStorage.setItem('portfolioLang',l);
  document.documentElement.lang=l==='az'?'az':'en';
  const t=BANK_T[l];const q=s=>document.querySelector(s);const qa=s=>[...document.querySelectorAll(s)];

  if(q('#navBack'))q('#navBack').textContent=t.back;
  const tg=q('.project-tag');if(tg)tg.innerHTML=t.tag;
  const ti=q('.project-title');if(ti)ti.innerHTML=t.title_html;

  const mls=qa('.meta-label');
  ['m1l','m2l','m3l','m4l'].forEach((k,i)=>{if(mls[i]&&t[k])mls[i].textContent=t[k];});

  const qnl=q('.quick-nav-label');if(qnl)qnl.textContent=t.jt;
  const qns=qa('.qn-btn');
  ['qn1','qn2','qn3','qn_risk','qn_rec'].forEach((k,i)=>{if(qns[i]&&t[k])qns[i].innerHTML=t[k];});

  const sps=qa('.summary p');
  if(sps[0])sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1])sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;

  const fls=qa('.finding-label');const fds=qa('.finding-desc');
  ['f1l','f2l','f3l','f4l'].forEach((k,i)=>{if(fls[i]&&t[k])fls[i].textContent=t[k];if(fds[i]&&t['f'+(i+1)+'d'])fds[i].textContent=t['f'+(i+1)+'d'];});

  const cls=qa('.content-label');const cts=qa('.content-title');const ctx=qa('.content-text');

  if(cls[0])cls[0].textContent=l==='az'?'Slicer':'Slicer';
  if(cts[0])cts[0].textContent=t.slicer_title;
  if(ctx[0])ctx[0].textContent=t.slicer_text;

  const sbs=qa('.slicer-btn');if(sbs[0])sbs[0].textContent=t.slicer_all;

  const ths=qa('thead th');
  [t.tab_h1,t.tab_h2,t.tab_h3,t.tab_h4,t.tab_h5].forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});
  const notes=qa('td.mu');
  [t.trow_n1,t.trow_n2,t.trow_n3,t.trow_n4,t.trow_n5].forEach((v,i)=>{if(notes[i])notes[i].textContent=v;});

  if(cls[1])cls[1].textContent=t.comp_lbl;
  if(cts[1])cts[1].textContent=t.comp_title;

  const ctit=qa('.chart-title');
  const fig=(n)=>'<span>'+(l==='az'?' ':'Fig')+' 0'+n+'</span> — ';
  if(ctit[0])ctit[0].innerHTML=fig(1)+t.fig01;
  if(ctit[1])ctit[1].innerHTML=fig(2)+t.c_vs_avg;
  if(ctit[2])ctit[2].innerHTML=fig(3)+t.c_spread;
  if(ctit[3])ctit[3].innerHTML=fig(4)+t.c_forecast;

  const tabHeader=q('.table-header-title');
  if(tabHeader)tabHeader.innerHTML='<span>'+(l==='az'?'Cəd':'Tab')+' 01</span> — '+t.tab01;

  const ils=qa('.insight-text');
  ['i1','i2','i3','i4','i5'].forEach((k,i)=>{if(ils[i]&&t[k])ils[i].innerHTML=t[k];});

  if(cls[2])cls[2].textContent=t.fore_lbl;
  if(cts[2])cts[2].textContent=t.fore_title;
  if(ctx[1])ctx[1].textContent=t.fore_text;

  if(cls[3])cls[3].textContent=t.risk_lbl;
  if(cts[3])cts[3].innerHTML=t.risk_title;
  if(cls[4])cls[4].textContent=t.rec_lbl;
  if(cts[4])cts[4].innerHTML=t.rec_title;

  qa('.risk-block .block-title').forEach((el,i)=>{const k='r'+(i+1)+'t';if(t[k])el.innerHTML=t[k];});
  qa('.risk-block .block-text').forEach((el,i)=>{const k='r'+(i+1)+'b';if(t[k])el.innerHTML=t[k];});
  qa('.rec-block .block-title').forEach((el,i)=>{const k='rec'+(i+1)+'t';if(t[k])el.innerHTML=t[k];});
  qa('.rec-block .block-text').forEach((el,i)=>{const k='rec'+(i+1)+'b';if(t[k])el.innerHTML=t[k];});

  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas)continue;
    const id=c.canvas.id;
    const bl=['Kapital Bank','ABB Bank','Bank of Baku','Unibank','AccessBank'];
    if(id==='c-bank-rate'){c.data.labels=bl;c.update();}
    if(id==='c-vs-avg'){c.data.labels=bl;if(c.data.datasets[1])c.data.datasets[1].label=t.market_avg_lbl;c.update();}
    if(id==='c-spread'){c.data.labels=bl;if(c.data.datasets[0])c.data.datasets[0].label=t.extra_lbl;c.update();}
    if(id==='c-forecast'){
      c.data.labels=t.quarterly;
      if(c.data.datasets[0])c.data.datasets[0].label=t.fore_kap;
      if(c.data.datasets[1])c.data.datasets[1].label=t.fore_avg;
      if(c.data.datasets[2])c.data.datasets[2].label=t.fore_low;
      c.update();
    }
  }

  const vc=q('#visible-count');
  if(vc){const n=parseInt(vc.textContent);if(!isNaN(n))vc.textContent=n+(n===1?' '+t.visible_single:' '+t.visible_plural);}

  const fs=qa('footer span');if(fs[1])fs[1].textContent=t.footer_r;
}

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyBankLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
applyBankLang(lang);
`

export default function BankDeposits() {
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
