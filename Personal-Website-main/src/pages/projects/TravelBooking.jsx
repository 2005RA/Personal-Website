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
    body::after{content:'';position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
    nav,main,footer,.project-hero{position:relative;z-index:1;}
    nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
    .nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
    .nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
    .nav-back:hover{color:var(--accent);}
    .project-hero{padding:9rem 3rem 4rem;border-bottom:1px solid var(--border);}
    .project-tag{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
    .project-title{font-family:var(--serif);font-size:clamp(2.2rem,6vw,5rem);line-height:1.05;letter-spacing:-0.02em;max-width:900px;}
    .project-title em{font-style:italic;color:var(--accent);}
    .project-meta{display:flex;gap:3rem;margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.5rem;flex-wrap:wrap;}
    .meta-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem;}
    .meta-value{font-family:var(--mono);font-size:0.82rem;color:var(--text);}
    main{max-width:1100px;margin:0 auto;padding:4rem 3rem 6rem;}
    .summary{border-left:2px solid var(--accent);padding:1.5rem 2rem;background:var(--bg2);margin-bottom:4rem;}
    .summary p{color:var(--muted);}
    .summary p strong{color:var(--text);}
    .content-label{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:0.5rem;}
    .content-title{font-family:var(--serif);font-size:1.8rem;margin-bottom:1.25rem;}
    .content-text{color:var(--muted);margin-bottom:2.5rem;max-width:740px;}
    .chart-wrap{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:3rem;}
    .chart-title{font-family:var(--mono);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);}
    .chart-title span{color:var(--accent);}
    .chart-canvas-wrap{position:relative;width:100%;height:320px;}
    .chart-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5px;background:var(--border);margin-bottom:3rem;}
    .chart-row .chart-wrap{margin-bottom:0;border:none;}
    .findings-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:var(--border);margin-bottom:3rem;}
    .finding-card{background:var(--bg2);padding:1.5rem;}
    .finding-num{font-family:var(--mono);font-size:2rem;color:var(--accent);line-height:1;margin-bottom:0.5rem;}
    .finding-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:0.4rem;}
    .finding-desc{font-size:0.78rem;color:var(--muted);}
    .table-wrap{background:var(--bg2);border:1px solid var(--border);overflow-x:auto;margin-bottom:3rem;}
    .table-header{padding:1rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
    .table-header-title{font-family:var(--mono);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
    .table-header-title span{color:var(--accent);}
    .table-badge{font-family:var(--mono);font-size:0.62rem;padding:0.2rem 0.6rem;border:1px solid var(--border);color:var(--muted);}
    table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:0.8rem;}
    thead th{padding:0.75rem 1.5rem;text-align:left;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;}
    tbody tr{border-bottom:1px solid var(--border);transition:background 0.15s;}
    tbody tr:last-child{border-bottom:none;}
    tbody tr:hover{background:var(--bg3);}
    tbody td{padding:0.7rem 1.5rem;color:var(--text);}
    td.positive{color:#5cb85c;}td.negative{color:#e05c2a;}td.accent{color:var(--accent);}
    .insights-list{list-style:none;margin-bottom:3rem;}
    .insights-list li{padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);background:var(--bg2);display:flex;gap:1rem;align-items:flex-start;}
    .insights-list li:first-child{border-top:1px solid var(--border);}
    .insight-bullet{font-family:var(--mono);font-size:0.75rem;color:var(--accent);margin-top:0.1rem;flex-shrink:0;}
    .insight-text{font-size:0.88rem;color:var(--muted);}
    .insight-text strong{color:var(--text);}
    .divider{border:none;border-top:1px solid var(--border);margin:3rem 0;}
    footer{border-top:1px solid var(--border);padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;}
    footer span{font-family:var(--mono);font-size:0.65rem;color:var(--muted);letter-spacing:0.1em;}
    footer a{color:var(--accent);text-decoration:none;}
    @media(max-width:768px){nav{padding:1rem 1.5rem;}.project-hero{padding:7rem 1.5rem 3rem;}main{padding:3rem 1.5rem 5rem;}.chart-row{grid-template-columns:1fr;}.findings-grid{grid-template-columns:1fr 1fr;}}
    .nav-right{display:flex;align-items:center;gap:1.5rem;}
    .lang-toggle{display:flex;align-items:center;gap:0.55rem;border-left:1px solid var(--border);padding-left:1.25rem;}
    .lang-label{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);opacity:0.38;transition:opacity 0.2s;user-select:none;}
    .lang-label.active{opacity:1;}
    .switch{position:relative;display:inline-block;width:36px;height:19px;flex-shrink:0;}
    .switch input{opacity:0;width:0;height:0;position:absolute;}
    .slider{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:19px;transition:0.3s;}
    .slider::before{content:'';position:absolute;height:11px;width:11px;left:3px;bottom:3px;background:var(--accent);border-radius:50%;transition:0.3s;}
    .switch input:checked + .slider::before{transform:translateX(17px);}
    .quick-nav{position:sticky;top:65px;z-index:50;background:var(--bg2);border-bottom:1px solid var(--border);padding:0.7rem 3rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
    .quick-nav-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-right:0.5rem;}
    .qn-btn{font-family:var(--mono);font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.32rem 0.85rem;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:all 0.2s;}
    .qn-btn:hover{border-color:var(--accent);color:var(--accent);}
    .qn-btn.risk{border-color:rgba(239,68,68,0.3);color:#ff6b6b;}
    .qn-btn.risk:hover{border-color:#ff6b6b;background:rgba(239,68,68,0.08);}
    .qn-btn.rec{border-color:rgba(5,150,105,0.3);color:var(--accent2);}
    .qn-btn.rec:hover{border-color:var(--accent2);background:rgba(5,150,105,0.08);}
    .risk-block{border:1px solid rgba(239,68,68,0.25);background:rgba(239,68,68,0.05);padding:1.75rem 2rem;margin-bottom:1rem;}
    .rec-block{border:1px solid rgba(5,150,105,0.25);background:rgba(5,150,105,0.06);padding:1.75rem 2rem;margin-bottom:1rem;}
    .block-title{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.75rem;}
    .risk-block .block-title{color:#ff6b6b;}
    .rec-block .block-title{color:var(--accent2);}
    .block-text{font-size:0.86rem;color:var(--muted);}
    .block-text strong{color:var(--text);}
    .section-anchor{scroll-margin-top:120px;}
  



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
    <a href="${import.meta.env.BASE_URL}" class="nav-back" id="navBack" data-en="← Back to Portfolio" data-az="← Portfolioya qayıt">← Back to Portfolio</a>
    
  </div>
    <div class="lang-pill">
      <button class="lang-btn active" onclick="setLang('en')">EN</button>
      <button class="lang-btn"        onclick="setLang('az')">AZ</button>
    </div>
</nav>

<div class="project-hero">
  <div class="project-tag">Multi-Table Analysis · Excel</div>
  <h1 class="project-title">Travel Booking:<br><em>Sales &amp; Channel Insights</em></h1>
    <!-- DATE: e.g. "March 2025 · University Internship Project" -->
  <div class="project-meta">
    <div><div class="meta-label">Tools Used</div><div class="meta-value">Excel · XLOOKUP · Pivot Tables</div></div>
    <div><div class="meta-label">Tables Joined</div><div class="meta-value">5 (Bookings, Products, Customers, Agents, Issues)</div></div>
    <div><div class="meta-label">Channels Analysed</div><div class="meta-value">Office · Website · Mobile App · Partner Agency</div></div>
    <div><div class="meta-label">Deliverables</div><div class="meta-value">Model Sheet · KPI Scorecard · 5 Insights</div></div>
  </div>
</div>

<div class="quick-nav">
  <span class="quick-nav-label" id="qn_label">Jump to →</span>
  <a class="qn-btn" href="#q1" id="qn1">Channels</a>
  <a class="qn-btn" href="#q2" id="qn2">Cancellations</a>
  <a class="qn-btn" href="#q3" id="qn3">Segments</a>
  <a class="qn-btn" href="#q4" id="qn4">Destinations</a>
  <a class="qn-btn" href="#q5" id="qn5">KPI Table</a>
  <a class="qn-btn risk" href="#risks" id="qn_risk">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations" id="qn_rec">✓ Recommendations</a>
</div>

<main>
  <div class="summary">
    <p><strong>Objective:</strong> Build a unified data model from 5 separate tables using XLOOKUP and INDEX/MATCH, then produce a KPI scorecard and answer 5 analytical questions about booking channel performance, cancellation risk, customer segments, destinations, and agent impact.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> Website drives the highest revenue despite the highest discount rate. However, it also carries the highest cancellation rate — signalling that discount-led volume doesn't always mean quality bookings. Agent-free channels outperform on revenue but are responsible for 60% of all cancellations.</p>
  </div>

  <p class="content-label">KPI Scorecard</p>
  <h2 class="content-title">At a Glance</h2>
  <div class="findings-grid">
    <div class="finding-card"><div class="finding-num">4</div><div class="finding-label">Booking Channels</div><div class="finding-desc">Office, Website, Mobile App, Partner Agency</div></div>
    <div class="finding-card"><div class="finding-num">8.08%</div><div class="finding-label">Peak Avg Discount</div><div class="finding-desc">Website channel — highest discount and highest revenue</div></div>
    <div class="finding-card"><div class="finding-num">3%</div><div class="finding-label">Cancellation Rate</div><div class="finding-desc">Website leads; exclusively in the Hotel segment</div></div>
    <div class="finding-card"><div class="finding-num">60%</div><div class="finding-label">Agentless Cancellations</div><div class="finding-desc">Website + App account for 60% of all cancelled bookings</div></div>
  </div>

  <hr class="divider"/>
  <div id="q1" class="section-anchor"></div>
  <p class="content-label" id="s1_lbl">Question 1 — Channel Problem</p>
  <h2 class="content-title" id="s1_title">Discount vs Revenue by Channel</h2>
  <p class="content-text" id="s1_text">Which channel has the highest average discount, and how does that correlate with Net Revenue? The answer is more nuanced than it first appears — especially when broken down by product type.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title" id="ct1"><span>Fig 01</span> — Net Revenue by Channel</div><div class="chart-canvas-wrap"><canvas id="chart-channel-rev"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title" id="ct2"><span>Fig 02</span> — Average Discount % by Channel</div><div class="chart-canvas-wrap"><canvas id="chart-channel-disc"></canvas></div></div>
  </div>
  <div class="chart-wrap"><div class="chart-title" id="ct3"><span>Fig 03</span> — Discount vs Revenue by Product Type (Partner Agency)</div><div class="chart-canvas-wrap" style="height:260px"><canvas id="chart-product-type"></canvas></div></div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Website leads on both discount and revenue.</strong> The highest average discount (8.08%) coincides with the highest net revenue — suggesting volume-driven growth where discounting works. However, this pattern is not universal across channels.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Flight discounts destroy margin; Hotel discounts don't.</strong> Within Partner Agency, Flight has the highest discount (10.33%) yet lower revenue than Hotel (8.14% discount). High discounting in Flight leads to loss, not gain.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>Mobile App and Partner Agency are discount-inefficient.</strong> Both channels apply significant discounts without proportional revenue return. Discount policy needs tighter controls in these channels.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="q2" class="section-anchor"></div>
  <p class="content-label" id="s2_lbl">Question 2 — Cancellation Risk</p>
  <h2 class="content-title" id="s2_title">Where Cancellations Happen</h2>
  <p class="content-text" id="s2_text">Cancelled bookings aren't evenly distributed. One channel and one product type are disproportionately responsible — and the combination points to a specific operational risk.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title" id="ct4"><span>Fig 04</span> — Cancellation Rate by Channel (%)</div><div class="chart-canvas-wrap"><canvas id="chart-cancel-channel"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title" id="ct5"><span>Fig 05</span> — Agent vs Agentless: Share of Cancellations</div><div class="chart-canvas-wrap"><canvas id="chart-cancel-agent"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Website has the highest cancellation rate at 3%</strong>, concentrated exclusively in the Hotel segment. "Hotel to Paris" was cancelled twice — which may indicate a supplier or availability issue rather than customer behaviour.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Agentless channels (Website + App) account for 60% of all cancellations</strong> despite generating more revenue. The absence of an agent removes a friction layer that might otherwise prevent impulsive bookings that get cancelled.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="q3" class="section-anchor"></div>
  <p class="content-label" id="s3_lbl">Question 3 — Segment Behaviour</p>
  <h2 class="content-title" id="s3_title">Premium vs Budget: A Tale of Two Strategies</h2>
  <p class="content-text" id="s3_text">Both Premium and Budget segments perform well on revenue — but for completely different reasons. The monthly breakdown reveals how each segment responds differently to pricing and discount changes.</p>
  <div class="chart-wrap"><div class="chart-title" id="ct6"><span>Fig 06</span> — Monthly Net Revenue: Premium vs Budget (Sep–Dec)</div><div class="chart-canvas-wrap" style="height:340px"><canvas id="chart-segments"></canvas></div></div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Premium sales are discount-sensitive.</strong> In Sep–Oct, when discounts rose from 5.57% to 7.83%, revenue jumped from 69k to 102k. When discounts fell again in Nov–Dec, revenue dropped to 46k. Premium customers respond strongly to discount signals.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Budget segment behaves inversely.</strong> In October, discounts dropped sharply (6.90%→2.14%) but revenue surged to 71k. By December, lower prices and slight discount increases lifted both passenger count (29→44) and revenue to 109k.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>Budget revenue is driven by price, not discount.</strong> When unit prices are low, Budget customers buy more even without discounts. This is fundamentally different from Premium, which needs discount incentive to convert.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="q4" class="section-anchor"></div>
  <p class="content-label" id="s4_lbl">Question 4 — Destination Trend</p>
  <h2 class="content-title" id="s4_title">Top 3 Destinations by Product Mix</h2>
  <p class="content-text" id="s4_text">The top 3 destinations by net revenue are Gəncə, Paris, and Baku — but each city has a distinctly different product preference, which has implications for how to market each route.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title" id="ct7"><span>Fig 07</span> — Top Destinations: Net Revenue (AZN)</div><div class="chart-canvas-wrap"><canvas id="chart-dest-rev"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title" id="ct8"><span>Fig 08</span> — Product Type Mix per Destination (%)</div><div class="chart-canvas-wrap"><canvas id="chart-dest-mix"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Hotel dominates overall at 54%</strong>, but destination-level breakdown tells a different story: Baku is 84% Hotel, Paris is 55% Package, and Gəncə is 41% Package.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Baku is a pure hotel destination</strong> — likely corporate travellers or short business trips. Paris and Gəncə attract packaged-holiday buyers. Marketing should reflect these intent differences.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="q5" class="section-anchor"></div>
  <p class="content-label" id="s5_lbl">Question 5 — Agent Impact</p>
  <h2 class="content-title" id="s5_title">KPI Summary Table</h2>
  <p class="content-text" id="s5_text">Final scorecard comparing all four booking channels across key performance indicators: revenue, discount, and cancellation risk.</p>
  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 01</span> — Channel KPI Scorecard</span>
      <span class="table-badge">4 channels</span>
    </div>
    <table>
      <thead><tr><th>Channel</th><th>Agent?</th><th>Net Revenue</th><th>Avg Discount %</th><th>Cancellation Rate</th><th>Revenue Trend</th><th>Risk Level</th></tr></thead>
      <tbody>
        <tr><td class="accent">Website</td><td>No</td><td>Highest</td><td class="accent">8.08%</td><td class="negative">3.0% — Highest</td><td>Volatile</td><td class="negative">High</td></tr>
        <tr><td class="accent">Office</td><td>Yes</td><td>2nd</td><td>~7.5%</td><td class="positive">Low</td><td class="positive">Stable</td><td class="positive">Low</td></tr>
        <tr><td class="accent">Mobile App</td><td>No</td><td>3rd</td><td>7.90%</td><td>Moderate</td><td>Growing</td><td>Medium</td></tr>
        <tr><td class="accent">Partner Agency</td><td>Yes</td><td>Lowest</td><td class="positive">6.32%</td><td class="positive">Low</td><td>Flat</td><td class="positive">Low</td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label" id="risk_lbl">Risk Assessment</p>
    <h2 class="content-title" id="risk_title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title" id="r1t">⚠ Website discount rate is eroding margins</div><div class="block-text" id="r1b">At 8.08% average discount, the Website channel generates the most revenue — but also the highest cancellation rate (3%). The combination of high discounts and high cancellations means that actual net revenue is being inflated by volume that partially reverses. <strong>Revenue quality, not just volume, must be measured.</strong></div></div>
  <div class="risk-block"><div class="block-title" id="r2t">⚠ Agentless channels carry 60% of cancellation risk</div><div class="block-text" id="r2b">Without an agent friction layer, impulsive bookings on Website and App are more likely to be cancelled. Hotel segment cancellations (Paris specifically) suggest a supplier or availability issue rather than purely customer behaviour — worth investigating before scaling Hotel marketing.</div></div>
  <div class="risk-block"><div class="block-title" id="r3t">⚠ Partner Agency channel is stagnating</div><div class="block-text" id="r3b">Partner Agency generates the lowest revenue despite the lowest discount rate — meaning its problem is volume, not margin. With a flat revenue trend, this channel risks becoming irrelevant unless new partner agreements or incentive structures are introduced.</div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label" id="rec_lbl">Action Items</p>
    <h2 class="content-title" id="rec_title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title" id="rec1t">→ Add cancellation deterrents on the Website hotel booking flow</div><div class="block-text" id="rec1b">Introduce a non-refundable option with a 2–3% price premium. This captures revenue from committed bookers while reducing speculative bookings. <strong>Target the Hotel segment specifically — it accounts for all Website cancellations.</strong></div></div>
  <div class="rec-block"><div class="block-title" id="rec2t">→ Reduce Website Hotel discount floor by 1–2%</div><div class="block-text" id="rec2b">Test a discount reduction from 8.08% to 6.5% on Website Hotel bookings in a single city first (e.g. Paris). If revenue holds, apply network-wide. The goal: retain volume while recapturing margin per booking.</div></div>
  <div class="rec-block"><div class="block-title" id="rec3t">→ Invest in Gəncə and Paris destination marketing</div><div class="block-text" id="rec3b">These two destinations lead revenue and show package/hotel demand respectively. Gəncə Package marketing and Paris Hotel promotion (with partial booking deposit to prevent cancellation) should be the next campaign priority.</div></div>
</main>

<footer>
  <span>← <a href="${import.meta.env.BASE_URL}">Back to Portfolio</a></span>
  <span>© 2026 — Junior Data Analyst Portfolio</span>
</footer>
`

const script = `
const A='#7c3aed',A2='#059669',GRID='rgba(0,0,0,0.07)',MUT='#6b7280';
  Chart.defaults.color=MUT;Chart.defaults.borderColor=GRID;
  Chart.defaults.font.family="'Syne',sans-serif";Chart.defaults.font.size=11;
  const scl={x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT}}};

  new Chart(document.getElementById('chart-channel-rev'),{type:'bar',data:{
    labels:['Website','Office','Mobile App','Partner Agency'],
    datasets:[{label:'Net Revenue (AZN)',data:[42800,35200,28100,17600],backgroundColor:[A,'rgba(124,58,237,0.6)','rgba(124,58,237,0.4)','rgba(255,255,255,0.1)'],borderWidth:0,borderRadius:2}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

  new Chart(document.getElementById('chart-channel-disc'),{type:'bar',data:{
    labels:['Website','Mobile App','Office','Partner Agency'],
    datasets:[{label:'Avg Discount %',data:[8.08,7.90,7.52,6.32],backgroundColor:[A,'rgba(124,58,237,0.65)','rgba(124,58,237,0.4)','rgba(255,255,255,0.1)'],borderWidth:0,borderRadius:2}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:5.5,max:9}}}});

  new Chart(document.getElementById('chart-product-type'),{type:'bar',data:{
    labels:['Flight','Hotel','Package'],
    datasets:[
      {label:'Avg Discount %',data:[10.33,8.14,7.20],backgroundColor:A,borderRadius:2,borderWidth:0},
      {label:'Net Revenue Index',data:[5.8,9.4,7.1],backgroundColor:'rgba(224,92,42,0.7)',borderRadius:2,borderWidth:0}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:16}}},scales:scl}});

  new Chart(document.getElementById('chart-cancel-channel'),{type:'bar',data:{
    labels:['Website','Mobile App','Office','Partner Agency'],
    datasets:[{label:'Cancellation Rate %',data:[3.0,1.4,0.8,0.5],backgroundColor:[A2,'rgba(224,92,42,0.55)','rgba(124,58,237,0.3)','rgba(255,255,255,0.1)'],borderWidth:0,borderRadius:2}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

  new Chart(document.getElementById('chart-cancel-agent'),{type:'doughnut',data:{
    labels:['Agentless (Website + App)','With Agent (Office + Partner)'],
    datasets:[{data:[60,40],backgroundColor:[A2,'rgba(255,255,255,0.12)'],borderColor:'#faf9f7',borderWidth:3}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:MUT,padding:14,boxWidth:10}}},cutout:'60%'}});

  new Chart(document.getElementById('chart-segments'),{type:'line',data:{
    labels:['September','October','November','December'],
    datasets:[
      {label:'Premium Segment',data:[69000,102000,83000,46000],borderColor:A,backgroundColor:'rgba(124,58,237,0.08)',borderWidth:2,pointBackgroundColor:A,pointRadius:5,tension:0.3,fill:true},
      {label:'Budget Segment',data:[65000,41000,71000,109000],borderColor:A2,backgroundColor:'rgba(224,92,42,0.06)',borderWidth:2,pointBackgroundColor:A2,pointRadius:5,tension:0.3,fill:true}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:16}}},scales:{x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT,callback:v=>'₼'+v.toLocaleString()}}}}});

  new Chart(document.getElementById('chart-dest-rev'),{type:'bar',data:{
    labels:['Gəncə','Paris','Baku'],
    datasets:[{label:'Net Revenue (AZN)',data:[38400,34200,29800],backgroundColor:[A,'rgba(124,58,237,0.65)','rgba(124,58,237,0.35)'],borderWidth:0,borderRadius:2}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

  new Chart(document.getElementById('chart-dest-mix'),{type:'bar',data:{
    labels:['Gəncə','Paris','Baku'],
    datasets:[
      {label:'Hotel',data:[28,30,84],backgroundColor:A,borderWidth:0},
      {label:'Package',data:[41,55,10],backgroundColor:A2,borderWidth:0},
      {label:'Flight',data:[31,15,6],backgroundColor:'rgba(255,255,255,0.12)',borderWidth:0}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:14,boxWidth:10}}},scales:{x:{grid:{color:GRID},ticks:{color:MUT},stacked:true},y:{grid:{color:GRID},ticks:{color:MUT,callback:v=>v+'%'},stacked:true,max:100}}}});



const TRAVEL_T={
en:{
  back:'← Back to Portfolio',tag:'Multi-Table Analysis · Excel',
  title_html:'Travel Booking:<br><em>Sales &amp; Channel Insights</em>',
  meta_labels:['Tools Used','Tables Joined','Channels Analysed','Deliverables'],
  jt:'Jump to →',qn1:'Channels',qn2:'Cancellations',qn3:'Segments',qn4:'Destinations',qn5:'KPI Table',qn_risk:'⚠ Risks',qn_rec:'✓ Recommendations',
  obj_lbl:'Objective:',obj_text:'Build a unified data model from 5 separate tables using XLOOKUP and INDEX/MATCH, then produce a KPI scorecard and answer 5 analytical questions about booking channel performance, cancellation risk, customer segments, destinations, and agent impact.',
  kf_lbl:'Key Finding:',kf_text:"Website drives the highest revenue despite the highest discount rate. However, it also carries the highest cancellation rate — signalling that discount-led volume doesn't always mean quality bookings. Agent-free channels outperform on revenue but are responsible for 60% of all cancellations.",
  finding_labels:['Booking Channels','Peak Avg Discount','Cancellation Rate','Agentless Cancellations'],
  finding_descs:['Office, Website, Mobile App, Partner Agency','Website channel — highest discount and highest revenue','Website leads; exclusively in the Hotel segment','Website + App account for 60% of all cancelled bookings'],
  s1_lbl:'Question 1 — Channel Problem',s1_title:'Discount vs Revenue by Channel',
  s1_text:'Which channel has the highest average discount, and how does that correlate with Net Revenue? The answer is more nuanced than it first appears — especially when broken down by product type.',
  c1t:'Net Revenue by Channel',c2t:'Average Discount % by Channel',c3t:'Discount vs Revenue by Product Type (Partner Agency)',
  i1:"<strong>Website leads on both discount and revenue.</strong> The highest average discount (8.08%) coincides with the highest net revenue — suggesting volume-driven growth where discounting works.",
  i2:"<strong>Flight discounts destroy margin; Hotel discounts don't.</strong> Within Partner Agency, Flight has the highest discount (10.33%) yet lower revenue than Hotel (8.14% discount).",
  i3:'<strong>Mobile App and Partner Agency are discount-inefficient.</strong> Both channels apply significant discounts without proportional revenue return.',
  s2_lbl:'Question 2 — Cancellation Risk',s2_title:'Where Cancellations Happen',
  s2_text:"Cancelled bookings aren't evenly distributed. One channel and one product type are disproportionately responsible — and the combination points to a specific operational risk.",
  c4t:'Cancellation Rate by Channel (%)',c5t:'Agent vs Agentless: Share of Cancellations',
  i4:'<strong>Website has the highest cancellation rate at 3%</strong>, concentrated exclusively in the Hotel segment. "Hotel to Paris" was cancelled twice — which may indicate a supplier or availability issue.',
  i5:'<strong>Agentless channels (Website + App) account for 60% of all cancellations</strong> despite generating more revenue. The absence of an agent removes a friction layer that might otherwise prevent impulsive bookings.',
  s3_lbl:'Question 3 — Segment Behaviour',s3_title:'Premium vs Budget: A Tale of Two Strategies',
  s3_text:'Both Premium and Budget segments perform well on revenue — but for completely different reasons. The monthly breakdown reveals how each segment responds differently to pricing and discount changes.',
  c6t:'Monthly Net Revenue: Premium vs Budget (Sep–Dec)',
  i6:'<strong>Premium sales are discount-sensitive.</strong> In Sep–Oct, when discounts rose from 5.57% to 7.83%, revenue jumped from 69k to 102k. When discounts fell again in Nov–Dec, revenue dropped to 46k.',
  i7:'<strong>Budget segment behaves inversely.</strong> In October, discounts dropped sharply (6.90%→2.14%) but revenue surged to 71k. By December, lower prices lifted passenger count (29→44) and revenue to 109k.',
  i8:'<strong>Budget revenue is driven by price, not discount.</strong> When unit prices are low, Budget customers buy more even without discounts.',
  s4_lbl:'Question 4 — Destination Trend',s4_title:'Top 3 Destinations by Product Mix',
  s4_text:'The top 3 destinations by net revenue are Gəncə, Paris, and Baku — but each city has a distinctly different product preference, which has implications for how to market each route.',
  c7t:'Top Destinations: Net Revenue (AZN)',c8t:'Product Type Mix per Destination (%)',
  i9:'<strong>Hotel dominates overall at 54%</strong>, but destination-level breakdown tells a different story: Baku is 84% Hotel, Paris is 55% Package, and Gəncə is 41% Package.',
  i10:'<strong>Baku is a pure hotel destination</strong> — likely corporate travellers or short business trips. Paris and Gəncə attract packaged-holiday buyers.',
  s5_lbl:'Question 5 — Agent Impact',s5_title:'KPI Summary Table',
  s5_text:'Final scorecard comparing all four booking channels across key performance indicators: revenue, discount, and cancellation risk.',
  tab_headers:['Channel','Agent?','Net Revenue','Avg Discount %','Cancellation Rate','Revenue Trend','Risk Level'],
  risk_lbl:'Risk Assessment',risk_title:'⚠ Key Risks',
  r1t:'⚠ Website discount rate is eroding margins',r1b:'At 8.08% average discount, the Website channel generates the most revenue — but also the highest cancellation rate (3%). The combination of high discounts and high cancellations means that actual net revenue is being inflated by volume that partially reverses. <strong>Revenue quality, not just volume, must be measured.</strong>',
  r2t:'⚠ Agentless channels carry 60% of cancellation risk',r2b:'Without an agent friction layer, impulsive bookings on Website and App are more likely to be cancelled. Hotel segment cancellations (Paris specifically) suggest a supplier or availability issue rather than purely customer behaviour.',
  r3t:'⚠ Partner Agency channel is stagnating',r3b:"Partner Agency generates the lowest revenue despite the lowest discount rate — meaning its problem is volume, not margin. With a flat revenue trend, this channel risks becoming irrelevant unless new partner agreements or incentive structures are introduced.",
  rec_lbl:'Action Items',rec_title:'✓ Recommendations',
  rec1t:'→ Add cancellation deterrents on the Website hotel booking flow',rec1b:'Introduce a non-refundable option with a 2–3% price premium. This captures revenue from committed bookers while reducing speculative bookings. <strong>Target the Hotel segment specifically — it accounts for all Website cancellations.</strong>',
  rec2t:'→ Reduce Website Hotel discount floor by 1–2%',rec2b:'Test a discount reduction from 8.08% to 6.5% on Website Hotel bookings in a single city first (e.g. Paris). If revenue holds, apply network-wide.',
  rec3t:'→ Invest in Gəncə and Paris destination marketing',rec3b:'These two destinations lead revenue. Gəncə Package marketing and Paris Hotel promotion (with partial booking deposit to prevent cancellation) should be the next campaign priority.',
  footer_r:'© 2026 — Junior Data Analyst Portfolio',
},
az:{
  back:'← Portfolioya Qayıt',tag:'Çox Cədvəlli Analiz · Excel',
  title_html:'Turizm Rezervi:<br><em>Satış &amp; Kanal Analizi</em>',
  meta_labels:['İstifadə Edilmiş Alətlər','Birləşdirilmiş Cədvəllər','Analiz Edilmiş Kanallar','Çatdırılacaqlar'],
  jt:'Keç →',qn1:'Kanallar',qn2:'Ləğvetmələr',qn3:'Seqmentlər',qn4:'Marşrutlar',qn5:'KPI Cədvəli',qn_risk:'⚠ Risklər',qn_rec:'✓ Tövsiyələr',
  obj_lbl:'Məqsəd:',obj_text:'XLOOKUP və INDEX/MATCH istifadə edərək 5 ayrı cədvəldən vahid məlumat modeli qurmaq, sonra bir KPI göstərici cədvəli hazırlamaq və rezerv kanalı performansı, ləğvetmə riski, müştəri seqmentləri, marşrutlar və agent təsiri haqqında 5 analitik suala cavab vermək.',
  kf_lbl:'Əsas Tapıntı:',kf_text:'Veb sayt ən yüksək endirim dərəcəsinə baxmayaraq ən yüksək gəliri yaradır. Lakin ən yüksək ləğvetmə dərəcəsinə də malikdir — endirim əsaslı həcmin həmişə keyfiyyətli rezerv demək olmadığını siqnallaşdırır. Agentsiz kanallar gəlirdə üstündür, lakin bütün ləğvetmələrin 60%-indən məsuldur.',
  finding_labels:['Rezerv Kanalları','Pik Orta Endirim','Ləğvetmə Dərəcəsi','Agentsiz Ləğvetmə'],
  finding_descs:['Ofis, Veb Sayt, Mobil Tətbiq, Tərəfdaş Agentlik','Veb sayt kanalı — ən yüksək endirim və ən yüksək gəlir','Vəb sayt liderdir; müstəsna olaraq Hotel seqmentindədir','Veb Sayt + Tətbiq bütün ləğvedilmiş rezervlərin 60%-ni təşkil edir'],
  s1_lbl:'Sual 1 — Kanal Problemi',s1_title:'Kanala Görə Endirim vs Gəlir',
  s1_text:'Hansı kanalın ən yüksək orta endirimi var və bu Xalis Gəlirlə necə korrelyasiya edir? Cavab əvvəlcə göründüyündən daha çoxqatlıdır — xüsusilə məhsul növünə görə bölündükdə.',
  c1t:'Kanala Görə Xalis Gəlir',c2t:'Kanala Görə Orta Endirim %',c3t:'Məhsul Növünə Görə Endirim vs Gəlir (Tərəfdaş Agentlik)',
  i1:'<strong>Veb sayt həm endirimdə, həm də gəlirdə liderdir.</strong> Ən yüksək orta endirim (8.08%) ən yüksək xalis gəlirlə üst-üstə düşür — endirimin işlədiyi həcm əsaslı artımı göstərir.',
  i2:'<strong>Uçuş endirimləri marjanı məhv edir; Hotel endirimləri etmir.</strong> Tərəfdaş Agentlik daxilində Uçuş ən yüksək endirimi (10.33%) daşıyır, lakin Hoteldən (8.14%) daha az gəlir əldə edir.',
  i3:'<strong>Mobil Tətbiq və Tərəfdaş Agentlik endirim baxımından səmərəsizdir.</strong> Hər iki kanal orantısız gəlir qaytarmadan əhəmiyyətli endirimlər tətbiq edir.',
  s2_lbl:'Sual 2 — Ləğvetmə Riski',s2_title:'Ləğvetmələrin Baş Verdiyi Yer',
  s2_text:'Ləğv edilmiş rezervlər bərabər paylanmayıb. Bir kanal və bir məhsul növü orantısız şəkildə məsuldur — kombinasiya xüsusi bir əməliyyat riskini göstərir.',
  c4t:'Kanala Görə Ləğvetmə Dərəcəsi (%)',c5t:'Agent vs Agentsiz: Ləğvetmə Payı',
  i4:'<strong>Veb saytın ən yüksək ləğvetmə dərəcəsi (3%) var</strong>, müstəsna olaraq Hotel seqmentindədir. "Paris Hoteli" iki dəfə ləğv edildi — bu, müştəri davranışından daha çox təchizatçı probleminə işarə edə bilər.',
  i5:'<strong>Agentsiz kanallar (Veb Sayt + Tətbiq) daha çox gəlir yaratmasına baxmayaraq bütün ləğvetmələrin 60%-ni təşkil edir.</strong> Agentin olmaması spontan rezervləri əngəlləyə biləcək bir sürtünmə qatını aradan qaldırır.',
  s3_lbl:'Sual 3 — Seqment Davranışı',s3_title:'Premium vs Büdcə: İki Strategiyanın Hekayəsi',
  s3_text:'Həm Premium, həm də Büdcə seqmentləri gəlirdə yaxşı nəticə göstərir — lakin tamamilə fərqli səbəblərdən. Aylıq bölgü hər seqmentin qiymət və endirim dəyişikliklərinə necə fərqli reaksiya verdiyini ortaya qoyur.',
  c6t:'Aylıq Xalis Gəlir: Premium vs Büdcə (Sep–Dek)',
  i6:'<strong>Premium satışlar endirimlərə həssasdır.</strong> Sep–Okt aylarında endirimlər 5.57%-dən 7.83%-ə yüksəldikdə gəlir 69k-dan 102k-a atladı. Endirimlər Noy–Dek aylarında azaldıqda gəlir 46k-a düşdü.',
  i7:'<strong>Büdcə seqmenti əks reaksiya göstərir.</strong> Oktyabrda endirimlər kəskin düşdü (6.90%→2.14%), lakin gəlir 71k-a qalxdı. Dekabrda aşağı qiymətlər həm sərnişin sayını (29→44), həm də gəliri 109k-a qaldırdı.',
  i8:'<strong>Büdcə gəliri endirimlə deyil, qiymətlə idarə olunur.</strong> Vahid qiymətlər aşağı olduqda Büdcə müştəriləri endirim olmadan da daha çox alır.',
  s4_lbl:'Sual 4 — Marşrut Trendi',s4_title:'Məhsul Qarışığına Görə Top 3 Marşrut',
  s4_text:'Xalis gəlirə görə top 3 marşrut Gəncə, Paris və Bakıdır — lakin hər şəhərin tamamilə fərqli məhsul üstünlüyü var.',
  c7t:'Top Marşrutlar: Xalis Gəlir (AZN)',c8t:'Marşruta Görə Məhsul Növü Qarışığı (%)',
  i9:'<strong>Hotel ümumilikdə 54% ilə üstünlük edir</strong>, lakin marşrut səviyyəsindəki bölgü fərqlidir: Bakı 84% Hotel, Paris 55% Paket, Gəncə isə 41% Paketdir.',
  i10:'<strong>Bakı saf hotel marşrutudur</strong> — yəqin ki, korporativ səyahətçilər. Paris və Gəncə paketli tətil alıcılarını cəlb edir.',
  s5_lbl:'Sual 5 — Agent Təsiri',s5_title:'KPI Xülasə Cədvəli',
  s5_text:'Əsas performans göstəriciləri üzrə bütün dörd rezerv kanalını müqayisə edən yekun göstərici cədvəli: gəlir, endirim və ləğvetmə riski.',
  tab_headers:['Kanal','Agent?','Xalis Gəlir','Orta Endirim %','Ləğvetmə Dərəcəsi','Gəlir Trendi','Risk Səviyyəsi'],
  risk_lbl:'Risk Qiymətləndirməsi',risk_title:'⚠ Əsas Risklər',
  r1t:'⚠ Veb saytın endirim dərəcəsi marjları aşındırır',r1b:'8.08% orta endirim ilə Veb sayt kanalı ən çox gəlir yaradır — lakin həm də ən yüksək ləğvetmə dərəcəsinə (3%) malikdir. <strong>Yalnız həcm deyil, gəlir keyfiyyəti ölçülməlidir.</strong>',
  r2t:'⚠ Agentsiz kanallar ləğvetmə riskinin 60%-ni daşıyır',r2b:'Bir agent sürtünmə qatı olmadan Veb Sayt və Tətbiqdəki spontan rezervlər ləğv edilməyə daha meyllidir. Hotel seqmenti ləğvetmələri (xüsusilə Paris) təchizatçı probleminə işarə edir.',
  r3t:'⚠ Tərəfdaş Agentlik kanalı durğunlaşır',r3b:'Tərəfdaş Agentlik ən aşağı endirim dərəcəsinə baxmayaraq ən az gəlir yaradır — yəni problemi marja deyil, həcmdir. Düz gəlir trendi ilə bu kanal yeni tərəfdaş sazişləri olmadan əhəmiyyətsizləşmə riskini daşıyır.',
  rec_lbl:'Fəaliyyət Addımları',rec_title:'✓ Tövsiyələr',
  rec1t:'→ Veb sayt hotel rezerv axınına ləğvetmə maneçiləri əlavə edin',rec1b:'2–3% qiymət üstəliyinə sahib geri qaytarılmayan seçim tətbiq edin. <strong>Xüsusilə Hotel seqmentini hədəfləyin — bütün Veb Sayt ləğvetmələri oradan gəlir.</strong>',
  rec2t:'→ Veb Sayt Hotel endirim tabanını 1–2% azaldın',rec2b:'Əvvəlcə bir şəhərdə (məs. Paris) Veb Sayt Hotel rezervlərindəki endirimi 8.08%-dən 6.5%-ə endirin. Gəlir sabit qalarsa, şəbəkəyə tətbiq edin.',
  rec3t:'→ Gəncə və Paris marşrut marketinqinə investisiya edin',rec3b:'Bu iki marşrut gəliri aparır. Gəncə Paket marketinqi və Paris Hotel tanıtımı (ləğvetmənin qarşısını almaq üçün qismən depozit ilə) növbəti kampaniya prioriteti olmalıdır.',
  footer_r:'© 2026 — Gənc Data Analitik Portfolio',
}};

// ── FIX: safe localStorage read ──────────────────────────────────────────────
let lang='en';
try{lang=localStorage.getItem('portfolioLang')||'en';}catch(e){}

function applyTravelLang(l){
  lang=l;
  // ── FIX: safe localStorage write ─────────────────────────────────────────
  try{localStorage.setItem('portfolioLang',l);}catch(e){}
  document.documentElement.lang=l==='az'?'az':'en';
  const t=TRAVEL_T[l],q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  if(q('#navBack'))q('#navBack').textContent=t.back;
  const tg=q('.project-tag');if(tg)tg.innerHTML=t.tag;
  const ti=q('.project-title');if(ti)ti.innerHTML=t.title_html;
  qa('.meta-label').forEach((el,i)=>{if(t.meta_labels[i])el.textContent=t.meta_labels[i];});
  if(q('#qn_label'))q('#qn_label').textContent=t.jt;
  ['qn1','qn2','qn3','qn4','qn5','qn_risk','qn_rec'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  const sps=qa('.summary p');
  if(sps[0])sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1])sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;
  qa('.finding-label').forEach((el,i)=>{if(t.finding_labels[i])el.textContent=t.finding_labels[i];});
  qa('.finding-desc').forEach((el,i)=>{if(t.finding_descs[i])el.textContent=t.finding_descs[i];});
  ['s1_lbl','s2_lbl','s3_lbl','s4_lbl','s5_lbl','risk_lbl','rec_lbl'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.textContent=t[id];});
  ['s1_title','s2_title','s3_title','s4_title','s5_title','risk_title','rec_title'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  ['s1_text','s2_text','s3_text','s4_text','s5_text'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.textContent=t[id];});
  const ctitles=qa('.chart-title');
  ['c1t','c2t','c3t','c4t','c5t','c6t','c7t','c8t'].forEach((k,i)=>{if(ctitles[i]&&t[k]){const fig=i+1;ctitles[i].innerHTML='<span>Fig 0'+fig+'</span> — '+t[k];}});
  const ils=qa('.insight-text');
  ['i1','i2','i3','i4','i5','i6','i7','i8','i9','i10'].forEach((k,i)=>{if(ils[i]&&t[k])ils[i].innerHTML=t[k];});
  ['r1t','r2t','r3t','r1b','r2b','r3b','rec1t','rec2t','rec3t','rec1b','rec2b','rec3b'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  const ths=qa('thead th');
  if(t.tab_headers)t.tab_headers.forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});
  const fs=qa('footer span');
  if(fs[1])fs[1].textContent=t.footer_r;
  
  
  
  const az=l==='az';
  const ch_en=['Website','Office','Mobile App','Partner Agency'];
  const ch_az=['Veb Sayt','Ofis','Mobil Tətbiq','Tərəfdaş Agentlik'];
  const ch_disc_en=['Website','Mobile App','Office','Partner Agency'];
  const ch_disc_az=['Veb Sayt','Mobil Tətbiq','Ofis','Tərəfdaş Agentlik'];
  const mo_en=['September','October','November','December'];
  const mo_az=['Sentyabr','Oktyabr','Noyabr','Dekabr'];
  const de_en=['Gəncə','Paris','Baku'];
  const de_az=['Gəncə','Paris','Bakı'];
  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas)continue;
    const id=c.canvas.id;
    if(id==='chart-channel-rev'){c.data.labels=az?ch_az:ch_en;c.update();}
    if(id==='chart-channel-disc'){c.data.labels=az?ch_disc_az:ch_disc_en;c.update();}
    if(id==='chart-product-type'){
      c.data.labels=az?['Uçuş','Hotel','Paket']:['Flight','Hotel','Package'];
      if(c.data.datasets[0])c.data.datasets[0].label=az?'Orta Endirim %':'Avg Discount %';
      if(c.data.datasets[1])c.data.datasets[1].label=az?'Xalis Gəlir İndeksi':'Net Revenue Index';
      c.update();
    }
    if(id==='chart-cancel-channel'){c.data.labels=az?ch_disc_az:ch_disc_en;c.update();}
    if(id==='chart-cancel-agent'){
      c.data.labels=az?['Agentsiz (Veb+Tətbiq)','Agentlə (Ofis+Tərəfdaş)']:['Agentless (Website + App)','With Agent (Office + Partner)'];
      c.update();
    }
    if(id==='chart-segments'){
      c.data.labels=az?mo_az:mo_en;
      if(c.data.datasets[0])c.data.datasets[0].label=az?'Premium Seqment':'Premium Segment';
      if(c.data.datasets[1])c.data.datasets[1].label=az?'Büdcə Seqmenti':'Budget Segment';
      c.update();
    }
    if(id==='chart-dest-rev'){c.data.labels=az?de_az:de_en;c.update();}
    if(id==='chart-dest-mix'){
      c.data.labels=az?de_az:de_en;
      if(c.data.datasets[0])c.data.datasets[0].label=az?'Hotel':'Hotel';
      if(c.data.datasets[1])c.data.datasets[1].label=az?'Paket':'Package';
      if(c.data.datasets[2])c.data.datasets[2].label=az?'Uçuş':'Flight';
      c.update();
    }
  }
}
function toggleLang(c){applyTravelLang(c?'az':'en');}

window.addEventListener('load',()=>applyTravelLang(lang));
applyTravelLang(lang);

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyTravelLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
`

export default function TravelBooking() {
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
