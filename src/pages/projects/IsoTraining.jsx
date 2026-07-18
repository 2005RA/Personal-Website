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
    nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
    .nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
    .nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
    .nav-back:hover{color:var(--accent);}
    .project-hero{padding:9rem 3rem 4rem;border-bottom:1px solid var(--border);}
    .project-tag{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
    .project-title{font-family:var(--serif);font-size:clamp(2.2rem,6vw,4.8rem);line-height:1.05;letter-spacing:-0.02em;max-width:900px;}
    .project-title em{font-style:italic;color:var(--accent);}
    .project-meta{display:flex;gap:3rem;margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.5rem;flex-wrap:wrap;}
    .meta-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem;}
    .meta-value{font-family:var(--mono);font-size:0.82rem;color:var(--text);}
    main{max-width:1200px;margin:0 auto;padding:4rem 3rem 6rem;}
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
    .finding-num{font-family:var(--mono);font-size:1.9rem;color:var(--accent);line-height:1;margin-bottom:0.5rem;}
    .finding-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:0.4rem;}
    .finding-desc{font-size:0.78rem;color:var(--muted);}
    .coverage-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1.5px;background:var(--border);margin-bottom:3rem;}
    .coverage-col{background:var(--bg2);padding:1.5rem;}
    .coverage-company{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--border);}
    .coverage-std{font-family:var(--mono);font-size:0.72rem;color:var(--muted);padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
    .coverage-std:last-child{border-bottom:none;}
    .coverage-std.highlight{color:var(--text);}
    .table-wrap{background:var(--bg2);border:1px solid var(--border);overflow-x:auto;margin-bottom:3rem;}
    .table-header{padding:1rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
    .table-header-title{font-family:var(--mono);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
    .table-header-title span{color:var(--accent);}
    .table-badge{font-family:var(--mono);font-size:0.62rem;padding:0.2rem 0.6rem;border:1px solid var(--border);color:var(--muted);}
    table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:0.78rem;}
    thead th{padding:0.75rem 1.25rem;text-align:left;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;}
    tbody tr{border-bottom:1px solid var(--border);transition:background 0.15s;}
    tbody tr:last-child{border-bottom:none;}
    tbody tr:hover{background:var(--bg3);}
    tbody td{padding:0.65rem 1.25rem;color:var(--text);vertical-align:top;}
    td.accent{color:var(--accent);}td.muted{color:var(--muted);font-size:0.72rem;}td.check{color:#5cb85c;}td.warn{color:#f0a500;}td.na{color:#9ca3af;font-size:0.7rem;}
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
    @media(max-width:900px){.coverage-grid{grid-template-columns:1fr 1fr;}.findings-grid{grid-template-columns:1fr 1fr;}}
    @media(max-width:768px){nav{padding:1rem 1.5rem;}.project-hero{padding:7rem 1.5rem 3rem;}main{padding:3rem 1.5rem 5rem;}.chart-row{grid-template-columns:1fr;}}
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
  <div class="project-tag">Market Research · Comparative Analysis · Azerbaijan</div>
  <h1 class="project-title">ISO Training Sector:<br><em>Provider Comparison</em></h1>
    <!-- DATE: e.g. "March 2025 · University Internship Project" -->
  <div class="project-meta">
    <div><div class="meta-label">Tools Used</div><div class="meta-value">Excel · Manual Data Collection</div></div>
    <div><div class="meta-label">Providers Analysed</div><div class="meta-value">5 companies · Azerbaijan market</div></div>
    <div><div class="meta-label">Standards Mapped</div><div class="meta-value">ISO 9001, 14001, 45001, 22000 + more</div></div>
    <div><div class="meta-label">Dimensions</div><div class="meta-value">Price · Duration · Format · Certification · Discount</div></div>
  </div>
</div>

<div class="quick-nav">
  <span class="quick-nav-label" id="qn_label">Jump to →</span>
  <a class="qn-btn" href="#pricing" id="qn1">Pricing</a>
  <a class="qn-btn" href="#portfolio" id="qn2">Portfolio</a>
  <a class="qn-btn" href="#format" id="qn3">Format</a>
  <a class="qn-btn" href="#table" id="qn4">Full Table</a>
  <a class="qn-btn risk" href="#risks" id="qn_risk">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations" id="qn_rec">✓ Recommendations</a>
</div>

<main>
  <div class="summary">
    <p><strong>Objective:</strong> I compared ISO training providers operating in Azerbaijan by looking at their course lists, prices, discount rules, training formats, and certification details. The goal was to understand how each provider is positioned and where the clearest differences appear.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> The market is not very consistent. Similar ISO standards are priced anywhere from 50 AZN* to 400 AZN, and discount information is uneven across providers. AQA stands out for the widest course portfolio and the clearest discount policy, while TÜV Austria Azerbaijan has the strongest international brand recognition.</p>
  </div>

  <p class="content-label">Market Snapshot</p>
  <h2 class="content-title">At a Glance</h2>
  <div class="findings-grid">
    <div class="finding-card"><div class="finding-num">5</div><div class="finding-label">Providers Analysed</div><div class="finding-desc">G&amp;I, TÜV Austria, QL Step, AQA, Revisa MMC</div></div>
    <div class="finding-card"><div class="finding-num">50-400</div><div class="finding-label">Price Range (AZN)</div><div class="finding-desc">Large price gaps for similar ISO standards</div></div>
    <div class="finding-card"><div class="finding-num">9</div><div class="finding-label">Max Standards (AQA)</div><div class="finding-desc">The widest course list among the reviewed providers</div></div>
    <div class="finding-card"><div class="finding-num">3 / 5</div><div class="finding-label">Online-Capable</div><div class="finding-desc">TÜV Austria, QL Step, and Revisa include online delivery</div></div>
  </div>

  <hr class="divider"/>
  <div id="pricing" class="section-anchor"></div>
  <p class="content-label" id="s1_lbl">Pricing Analysis</p>
  <h2 class="content-title" id="s1_title">Standard Price by Provider</h2>
  <p class="content-text" id="s1_text">These are the listed standard prices for each training programme. AQA uses different prices depending on the standard, while TÜV Austria's 50 AZN* figure is marked as applying from November 2025, so I treated it carefully as a possible promotional or partial price.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title" id="ct1"><span>Fig 01</span> - Listed Standard Price (AZN)</div><div class="chart-canvas-wrap"><canvas id="chart-price"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title" id="ct2"><span>Fig 02</span> - Number of ISO Standards Offered</div><div class="chart-canvas-wrap"><canvas id="chart-standards-count"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Revisa MMC has the highest listed price at 390 AZN</strong>, and some programmes last up to two months. That makes it look less like a short training session and more like an exam-based certification route for people who need deeper preparation.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>G&amp;I Training Academy and AQA both start at 350 AZN</strong>, but AQA becomes more flexible once discounts are included. Members, students, early payers, and group participants can all receive reductions.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>TÜV Austria's 50 AZN* price needs context.</strong> A five-day course with IRCA and Exemplar Global recognition would normally sit higher in the market, so this figure should be checked directly with the provider before it is used for budgeting.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="portfolio" class="section-anchor"></div>
  <p class="content-label" id="s2_lbl">Portfolio Coverage</p>
  <h2 class="content-title" id="s2_title">ISO Standards Offered by Provider</h2>
  <p class="content-text" id="s2_text">The providers do not cover the same set of standards. ISO 9001:2015 is the only standard listed by all five, while the rest of the portfolio changes from company to company. This gives broader providers an advantage for clients that want to arrange several trainings in one place.</p>
  <div class="coverage-grid">
    <div class="coverage-col"><div class="coverage-company">G&amp;I Training</div><div class="coverage-std highlight">ISO 9001:2015</div><div class="coverage-std highlight">ISO 19011:2018</div><div class="coverage-std highlight">ISO 45001:2018</div><div class="coverage-std highlight">ISO 22000:2018</div><div class="coverage-std highlight">ISO 31000:2018</div><div class="coverage-std highlight">ISO/IEC 17025:2017</div></div>
    <div class="coverage-col"><div class="coverage-company">TÜV Austria AZ</div><div class="coverage-std highlight">ISO 9001:2015</div><div class="coverage-std highlight">ISO 45001:2018</div><div class="coverage-std highlight">ISO 14001:2015</div></div>
    <div class="coverage-col"><div class="coverage-company">QL Step Academy</div><div class="coverage-std highlight">ISO 9001:2015</div><div class="coverage-std highlight">ISO 22000:2018</div><div class="coverage-std highlight">ISO 45001:2018</div><div class="coverage-std highlight">ISO 14001:2015</div><div class="coverage-std highlight">ISO 17025:2017</div></div>
    <div class="coverage-col"><div class="coverage-company">AQA</div><div class="coverage-std highlight">ISO 9001:2015</div><div class="coverage-std highlight">ISO 22000:2018</div><div class="coverage-std highlight">ISO 14001:2015</div><div class="coverage-std highlight">ISO 45001:2018</div><div class="coverage-std highlight">ISO 37001:2016</div><div class="coverage-std highlight">ISO 26000:2010</div><div class="coverage-std highlight">ISO 19011:2018</div><div class="coverage-std highlight">ISO 45001 (Local law)</div></div>
    <div class="coverage-col"><div class="coverage-company">Revisa MMC</div><div class="coverage-std highlight">ISO 9001:2015</div><div class="coverage-std highlight">ISO 10002:2018</div><div class="coverage-std highlight">ISO 17025:2017</div><div class="coverage-std highlight">ISO 19001:2018</div><div class="coverage-std highlight">ISO 21001:2018</div><div class="coverage-std highlight">ISO 21500:2021</div></div>
  </div>
  <div class="chart-wrap"><div class="chart-title" id="ct3"><span>Fig 03</span> - Unique Standards per Provider (count)</div><div class="chart-canvas-wrap" style="height:260px"><canvas id="chart-unique-stds"></canvas></div></div>

  <hr class="divider"/>
  <div id="format" class="section-anchor"></div>
  <p class="content-label" id="s3_lbl">Format &amp; Credentials</p>
  <h2 class="content-title" id="s3_title">Training Format &amp; Certification Comparison</h2>
  <p class="content-text" id="s3_text">Format and certification level matter because the cheapest option is not always the most useful one. For participants who need internationally recognised credentials, the certificate behind the training can be as important as the price.</p>
  <div class="chart-wrap"><div class="chart-title" id="ct4"><span>Fig 04</span> - Duration vs Price Positioning</div><div class="chart-canvas-wrap" style="height:300px"><canvas id="chart-bubble"></canvas></div></div>

  <div id="table" class="section-anchor"></div>
  <p class="content-label" id="s4_lbl">Full Comparison</p>
  <h2 class="content-title" id="s4_title">Provider Comparison Table</h2>
  <div class="table-wrap">
    <div class="table-header">
      <span class="table-header-title"><span>Tab 01</span> - All Providers · All Dimensions</span>
      <span class="table-badge">5 providers · 8 attributes</span>
    </div>
    <table>
      <thead><tr><th>Provider</th><th>Standards (#)</th><th>Price (AZN)</th><th>Duration</th><th>Format</th><th>Discount Policy</th><th>Certification</th><th>Notable Extras</th></tr></thead>
      <tbody>
        <tr><td class="accent">G&amp;I Training Academy</td><td>6</td><td>350</td><td>1 day</td><td>Offline</td><td class="na">Not disclosed</td><td class="check">International accreditation</td><td class="muted">Groups of 6-10; exam included</td></tr>
        <tr><td class="accent">TÜV Austria Azerbaijan</td><td>3</td><td class="warn">50 AZN*</td><td>5 days</td><td>Online</td><td class="na">Not disclosed</td><td class="check">IRCA + Exemplar Global</td><td class="muted">Recognised in 30+ countries; price marked from Nov 2025</td></tr>
        <tr><td class="accent">QL Step Academy</td><td>5</td><td>369</td><td>2 or 4 days</td><td>Online</td><td class="warn">March offer: 269 AZN for one standard</td><td class="check">International; QR-verified</td><td class="muted">QR code gives access to the international system</td></tr>
        <tr><td class="accent">AQA</td><td>9</td><td>350-400</td><td>1-2 days</td><td>Offline</td><td class="check">Members 15/10/5%; early payment 5%; group 5%; student 5%</td><td class="check">International; achievement certificate</td><td class="muted">Standard booklet included; refund available with 14 days notice</td></tr>
        <tr><td class="accent">Revisa MMC</td><td>6</td><td>390</td><td>1 day to 2 months</td><td>Online</td><td class="warn">Referral discount</td><td class="check">Local + international; exam-based</td><td class="muted">Official certificate issued after exam</td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider"/>
  <p class="content-label">Interpretation</p>
  <h2 class="content-title">Key Insights</h2>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>ISO 9001:2015 is the common entry point.</strong> It is the only standard offered by all five providers, which suggests that quality management training is still the core demand in this market.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>AQA has the clearest discount policy.</strong> Its discounts are linked to membership, early payment, group participation, and student status, so the final price is easier to understand and easier to negotiate.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>TÜV Austria has the strongest brand signal, but the narrowest listed portfolio.</strong> It lists only three standards, so organisations that need several ISO trainings may have to combine it with another provider.</span></li>
    <li><span class="insight-bullet">04</span><span class="insight-text"><strong>Revisa MMC seems to compete on depth rather than speed.</strong> Its longer programme option and exam-based certificate make it more suitable for learners who need proof of competence, not only attendance.</span></li>
    <li><span class="insight-bullet">05</span><span class="insight-text"><strong>Price transparency is still weak.</strong> Some providers do not publish discount information, so a company that explains total cost and eligibility rules clearly can stand out quickly.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label" id="risk_lbl">Risk Assessment</p>
    <h2 class="content-title" id="risk_title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title" id="r1t">⚠ TÜV Austria's 50 AZN price should be verified</div><div class="block-text" id="r1b">The asterisk in the data notes that this price applies from November 2025. If it is an introductory, modular, or partial price, the final cost may be higher than it first appears. <strong>Current pricing should be confirmed directly with the provider before any decision is made.</strong></div></div>
  <div class="risk-block"><div class="block-title" id="r2t">⚠ Certificate recognition changes the real value</div><div class="block-text" id="r2b">Not every certificate has the same value outside the local market. For companies that need export access, tender eligibility, or recognition by foreign clients, the accreditation behind the certificate may matter more than a small price difference.</div></div>
  <div class="risk-block"><div class="block-title" id="r3t">⚠ Online training should be checked against audit needs</div><div class="block-text" id="r3b">Online delivery is convenient, but some certification bodies or clients may still ask for proof of in-person training. Before choosing an online provider, companies should confirm that the format will be accepted for their own audit or certification purpose.</div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label" id="rec_lbl">Action Items</p>
    <h2 class="content-title" id="rec_title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title" id="rec1t">→ For price-sensitive companies: compare QL Step and Revisa MMC first</div><div class="block-text" id="rec1b">Both providers cover core ISO areas and offer online delivery. They are useful starting points for companies that want to keep the first training investment controlled, but the final choice should still depend on certificate recognition and programme length. <strong>Any available group or referral discount should be discussed before booking.</strong></div></div>
  <div class="rec-block"><div class="block-title" id="rec2t">→ For export-oriented or tender-focused companies: check TÜV Austria early</div><div class="block-text" id="rec2b">TÜV Austria is the strongest option when international recognition is the main requirement. It should be considered early if the certificate will be shown to foreign clients, auditors, or procurement teams, but the current price needs to be confirmed before budgeting.</div></div>
  <div class="rec-block"><div class="block-title" id="rec3t">→ For wider ISO coverage: AQA is the most complete option</div><div class="block-text" id="rec3b">AQA lists the broadest set of standards in this comparison. For companies planning several ISO trainings, working with one provider could simplify coordination and may also make discounts easier to negotiate.</div></div>
</main>

<footer>
  <span>← <a href="/">Back to Portfolio</a></span>
  <span>© 2026 - Junior Data Analyst Portfolio</span>
</footer>

<!-- ═══════════════════════════════════════════════════════════════════════
     FIX: Chart initialisation (was entirely missing from original file)
  ═══════════════════════════════════════════════════════════════════════ -->


<!-- ═══════════════════════════════════════════════════════════════════════
     FIX: i18n system (was entirely missing from original file)
  ═══════════════════════════════════════════════════════════════════════ -->
`

const script = `
const _A='#7c3aed',_A2='#059669',_A3='#ef4444',_A4='#10b981';
const _GRID='rgba(0,0,0,0.07)',_MUT='#6b7280';
Chart.defaults.color=_MUT;Chart.defaults.borderColor=_GRID;
Chart.defaults.font.family="'Syne',sans-serif";Chart.defaults.font.size=11;
const _scl={x:{grid:{color:_GRID},ticks:{color:_MUT}},y:{grid:{color:_GRID},ticks:{color:_MUT}}};

new Chart(document.getElementById('chart-price'),{type:'bar',data:{
  labels:['G&I Training','TÜV Austria AZ','QL Step','AQA','Revisa MMC'],
  datasets:[{label:'Price (AZN)',data:[350,50,369,375,390],
    backgroundColor:[_A,'rgba(124,58,237,0.45)',_A2,'#c4b5fd',_A3],borderWidth:0,borderRadius:2}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:_scl}});

new Chart(document.getElementById('chart-standards-count'),{type:'bar',data:{
  labels:['AQA','G&I Training','Revisa MMC','QL Step','TÜV Austria AZ'],
  datasets:[{label:'Standards offered',data:[9,6,6,5,3],
    backgroundColor:[_A,_A2,'rgba(124,58,237,0.55)','rgba(76,159,255,0.45)','#ddd6fe'],borderWidth:0,borderRadius:2}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:_scl}});

new Chart(document.getElementById('chart-unique-stds'),{type:'bar',data:{
  labels:['AQA','G&I Training','Revisa MMC','QL Step','TÜV Austria AZ'],
  datasets:[{label:'Unique standards',data:[9,6,6,5,3],
    backgroundColor:[_A,_A2,'rgba(124,58,237,0.55)','rgba(76,159,255,0.45)','#ddd6fe'],borderWidth:0,borderRadius:2}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
  scales:{..._scl,y:{..._scl.y,min:0,max:10}}}});

new Chart(document.getElementById('chart-bubble'),{type:'bubble',data:{
  datasets:[
    {label:'G&I Training',data:[{x:1,y:350,r:12}],backgroundColor:_A},
    {label:'TÜV Austria AZ',data:[{x:5,y:50,r:7}],backgroundColor:_A2},
    {label:'QL Step',data:[{x:3,y:369,r:10}],backgroundColor:'#a855f7'},
    {label:'AQA',data:[{x:1.5,y:375,r:18}],backgroundColor:_A4},
    {label:'Revisa MMC',data:[{x:45,y:390,r:12}],backgroundColor:_A3}
  ]
},options:{responsive:true,maintainAspectRatio:false,
  plugins:{legend:{labels:{color:_MUT,padding:12,boxWidth:9}}},
  scales:{
    x:{..._scl.x,title:{display:true,text:'Duration (days)',color:_MUT},min:0,max:60},
    y:{..._scl.y,title:{display:true,text:'Price (AZN)',color:_MUT},min:0,max:450}
  }}});



const ISO_T={
en:{
  back:'← Back to Portfolio',tag:'Market Research · Comparative Analysis · Azerbaijan',
  proj_title:'ISO Training Sector:<br><em>Provider Comparison</em>',
  m1l:'Tools Used',m2l:'Providers Analysed',m3l:'Standards Mapped',m4l:'Dimensions',
  jt:'Jump to →',qn1:'Pricing',qn2:'Portfolio',qn3:'Format',qn4:'Full Table',qn_risk:'⚠ Risks',qn_rec:'✓ Recommendations',
  obj_lbl:'Objective:',
  obj_text:'I compared ISO training providers operating in Azerbaijan by looking at their course lists, prices, discount rules, training formats, and certification details. The goal was to understand how each provider is positioned and where the clearest differences appear.',
  kf_lbl:'Key Finding:',
  kf_text:"The market is not very consistent. Similar ISO standards are priced anywhere from 50 AZN* to 400 AZN, and discount information is uneven across providers. AQA stands out for the widest course portfolio and the clearest discount policy, while TÜV Austria Azerbaijan has the strongest international brand recognition.",
  f1l:'Providers Analysed',f1d:'G&I, TÜV Austria, QL Step, AQA, Revisa MMC',
  f2l:'Price Range (AZN)',f2d:'Large price gaps for similar ISO standards',
  f3l:'Max Standards (AQA)',f3d:'The widest course list among the reviewed providers',
  f4l:'Online-Capable',f4d:'TÜV Austria, QL Step, and Revisa include online delivery',
  s1_lbl:'Pricing Analysis',s1_title:'Standard Price by Provider',
  s1_text:"These are the listed standard prices for each training programme. AQA uses different prices depending on the standard, while TÜV Austria's 50 AZN* figure is marked as applying from November 2025, so I treated it carefully as a possible promotional or partial price.",
  c1t:'Listed Standard Price (AZN)',c2t:'Number of ISO Standards Offered',c3t:'Unique Standards per Provider (count)',c4t:'Duration vs Price Positioning',
  i1:"<strong>Revisa MMC has the highest listed price at 390 AZN</strong>, and some programmes last up to two months. That makes it look less like a short training session and more like an exam-based certification route for people who need deeper preparation.",
  i2:"<strong>G&I Training Academy and AQA both start at 350 AZN</strong>, but AQA becomes more flexible once discounts are included. Members, students, early payers, and group participants can all receive reductions.",
  i3:"<strong>TÜV Austria's 50 AZN* price needs context.</strong> A five-day course with IRCA and Exemplar Global recognition would normally sit higher in the market, so this figure should be checked directly with the provider before it is used for budgeting.",
  s2_lbl:'Portfolio Coverage',s2_title:'ISO Standards Offered by Provider',
  s2_text:'The providers do not cover the same set of standards. ISO 9001:2015 is the only standard listed by all five, while the rest of the portfolio changes from company to company. This gives broader providers an advantage for clients that want to arrange several trainings in one place.',
  s3_lbl:'Format & Credentials',s3_title:'Training Format & Certification Comparison',
  s3_text:'Format and certification level matter because the cheapest option is not always the most useful one. For participants who need internationally recognised credentials, the certificate behind the training can be as important as the price.',
  s4_lbl:'Full Comparison',s4_title:'Provider Comparison Table',
  i4:'<strong>ISO 9001:2015 is the common entry point.</strong> It is the only standard offered by all five providers, which suggests that quality management training is still the core demand in this market.',
  i5:"<strong>AQA has the clearest discount policy.</strong> Its discounts are linked to membership, early payment, group participation, and student status, so the final price is easier to understand and easier to negotiate.",
  i6:"<strong>TÜV Austria has the strongest brand signal, but the narrowest listed portfolio.</strong> It lists only three standards, so organisations that need several ISO trainings may have to combine it with another provider.",
  i7:'<strong>Revisa MMC seems to compete on depth rather than speed.</strong> Its longer programme option and exam-based certificate make it more suitable for learners who need proof of competence, not only attendance.',
  i8:'<strong>Price transparency is still weak.</strong> Some providers do not publish discount information, so a company that explains total cost and eligibility rules clearly can stand out quickly.',
  risk_lbl:'Risk Assessment',risk_title:'⚠ Key Risks',
  r1t:'⚠ TÜV Austria\\'s 50 AZN price should be verified',r1b:'The asterisk in the data notes that this price applies from November 2025. If it is an introductory, modular, or partial price, the final cost may be higher than it first appears. <strong>Current pricing should be confirmed directly with the provider before any decision is made.</strong>',
  r2t:'⚠ Certificate recognition changes the real value',r2b:'Not every certificate has the same value outside the local market. For companies that need export access, tender eligibility, or recognition by foreign clients, the accreditation behind the certificate may matter more than a small price difference.',
  r3t:'⚠ Online training should be checked against audit needs',r3b:'Online delivery is convenient, but some certification bodies or clients may still ask for proof of in-person training. Before choosing an online provider, companies should confirm that the format will be accepted for their own audit or certification purpose.',
  rec_lbl:'Action Items',rec_title:'✓ Recommendations',
  rec1t:'→ For price-sensitive companies: compare QL Step and Revisa MMC first',rec1b:'Both providers cover core ISO areas and offer online delivery. They are useful starting points for companies that want to keep the first training investment controlled, but the final choice should still depend on certificate recognition and programme length. <strong>Any available group or referral discount should be discussed before booking.</strong>',
  rec2t:'→ For export-oriented or tender-focused companies: check TÜV Austria early',rec2b:"TÜV Austria is the strongest option when international recognition is the main requirement. It should be considered early if the certificate will be shown to foreign clients, auditors, or procurement teams, but the current price needs to be confirmed before budgeting.",
  rec3t:'→ For wider ISO coverage: AQA is the most complete option',rec3b:'AQA lists the broadest set of standards in this comparison. For companies planning several ISO trainings, working with one provider could simplify coordination and may also make discounts easier to negotiate.',
  footer_r:'© 2026 - Junior Data Analyst Portfolio',
},
az:{
  back:'← Portfolioya Qayıt',tag:'Bazar Araşdırması · Müqayisəli Analiz · Azərbaycan',
  proj_title:'ISO Təlim Sektoru:<br><em>Bazar Müqayisəsi</em>',
  m1l:'İstifadə Edilmiş Alətlər',m2l:'Analiz Edilmiş Provayderlər',m3l:'Xəritələnmiş Standartlar',m4l:'Ölçülər',
  jt:'Keç →',qn1:'Qiymətlər',qn2:'Portfolio',qn3:'Format',qn4:'Tam Cədvəl',qn_risk:'⚠ Risklər',qn_rec:'✓ Tövsiyələr',
  obj_lbl:'Məqsəd:',
  obj_text:'Azərbaycanda fəaliyyət göstərən ISO təlim provayderlərini kurs siyahısı, qiymət, endirim şərtləri, təlim formatı və sertifikat məlumatlarına görə müqayisə etdim. Məqsəd hər provayderin bazarda necə mövqeləndiyini və əsas fərqlərin harada olduğunu göstərmək idi.',
  kf_lbl:'Əsas Tapıntı:',
  kf_text:'Bazardakı məlumatlar çox vahid deyil. Oxşar ISO standartları üçün qiymətlər 50 AZN*-dən 400 AZN-yə qədər dəyişir və endirim məlumatları hər provayderdə eyni dərəcədə açıq verilmir. AQA ən geniş kurs siyahısı və ən aydın endirim siyasəti ilə seçilir, TÜV Austria Azerbaijan isə ən güclü beynəlxalq marka tanınırlığına malikdir.',
  f1l:'Analiz Edilmiş Provayderlər',f1d:'G&I, TÜV Austria, QL Step, AQA, Revisa MMC',
  f2l:'Qiymət Diapazonu (AZN)',f2d:'Oxşar ISO standartları üçün böyük qiymət fərqləri',
  f3l:'Maks. Standart (AQA)',f3d:'Araşdırılan provayderlər arasında ən geniş kurs siyahısı',
  f4l:'Onlayn Format',f4d:'TÜV Austria, QL Step və Revisa onlayn təlim formatı təklif edir',
  s1_lbl:'Qiymət Analizi',s1_title:'Provayderlərə Görə Standart Qiymət',
  s1_text:'Burada hər təlim proqramı üzrə göstərilən standart qiymətlər müqayisə olunur. AQA standartdan asılı olaraq fərqli qiymətlər təqdim edir. TÜV Austria-nın 50 AZN* qiyməti isə Noyabr 2025-dən tətbiq olunduğu üçün ayrıca yoxlanmalı məlumat kimi götürülməlidir.',
  c1t:'Göstərilmiş Standart Qiymət (AZN)',c2t:'Təklif Olunan ISO Standartlarının Sayı',c3t:'Provayderlərə Görə Unikal Standartlar (say)',c4t:'Müddət vs Qiymət Mövqeyi',
  i1:'<strong>Revisa MMC 390 AZN ilə ən yüksək göstərilən qiymətə malikdir</strong> və bəzi proqramlar iki aya qədər davam edir. Buna görə bu təklif qısa kursdan çox, daha dərin hazırlıq tələb edən imtahan əsaslı sertifikat yolu kimi görünür.',
  i2:'<strong>G&I Training Academy və AQA 350 AZN-dən başlayır</strong>, amma AQA endirimlərə görə daha çevikdir. Üzvlər, tələbələr, erkən ödəniş edənlər və qrup iştirakçıları üçün ayrıca güzəştlər var.',
  i3:'<strong>TÜV Austria-nın 50 AZN* qiyməti kontekst tələb edir.</strong> Beş günlük təlim və IRCA/Exemplar Global tanınması adətən daha yüksək qiymət gözləntisi yaradır, buna görə bu məbləğ büdcəyə daxil edilməzdən əvvəl birbaşa provayderlə dəqiqləşdirilməlidir.',
  s2_lbl:'Portfolio Əhatəsi',s2_title:'Provayderlərə Görə Təklif Olunan ISO Standartları',
  s2_text:'Provayderlər eyni standart siyahısını təqdim etmir. ISO 9001:2015 bütün beş provayderdə olan yeganə standartdır, digər istiqamətlər isə şirkətdən şirkətə dəyişir. Geniş portfoliolu provayderlər bir neçə təlimi eyni yerdən almaq istəyən müştərilər üçün daha rahat seçimdir.',
  s3_lbl:'Format & Etimadnamə',s3_title:'Təlim Formatı & Sertifikat Müqayisəsi',
  s3_text:'Format və sertifikat səviyyəsi seçimdə ciddi rol oynayır, çünki ən ucuz variant həmişə ən uyğun variant olmur. Beynəlxalq tanınma tələb edən iştirakçılar üçün sertifikatın arxasındakı akkreditasiya qiymət qədər vacib ola bilər.',
  s4_lbl:'Tam Müqayisə',s4_title:'Provayder Müqayisə Cədvəli',
  i4:'<strong>ISO 9001:2015 ortaq başlanğıc nöqtəsidir.</strong> Bütün beş provayder tərəfindən təklif edilən yeganə standart olması keyfiyyət idarəetməsi üzrə təlimə tələbatın hələ də əsas istiqamət olduğunu göstərir.',
  i5:'<strong>AQA-nın endirim siyasəti ən aydın görünür.</strong> Endirimlər üzvlük, erkən ödəniş, qrup iştirakı və tələbə statusu ilə bağlıdır, buna görə yekun qiyməti başa düşmək və müzakirə etmək daha asandır.',
  i6:'<strong>TÜV Austria güclü marka siqnalı verir, amma siyahıdakı portfolio daha dardır.</strong> Cəmi üç standart göstərildiyi üçün bir neçə ISO təliminə ehtiyacı olan təşkilatlar başqa provayderlə də işləməli ola bilər.',
  i7:'<strong>Revisa MMC sürətdən çox dərinliklə fərqlənir.</strong> Daha uzun proqram seçimi və imtahan əsaslı sertifikat onu yalnız iştirak sənədi deyil, bacarığını sübut etmək istəyənlər üçün daha uyğun edir.',
  i8:'<strong>Qiymət şəffaflığı hələ zəifdir.</strong> Bəzi provayderlər endirim məlumatlarını açıq göstərmir. Ümumi xərci və güzəşt şərtlərini aydın izah edən şirkət bazarda tez seçilə bilər.',
  risk_lbl:'Risk Qiymətləndirməsi',risk_title:'⚠ Əsas Risklər',
  r1t:'⚠ TÜV Austria-nın 50 AZN qiyməti dəqiqləşdirilməlidir',r1b:'Məlumatdakı ulduz işarəsi bu qiymətin Noyabr 2025-dən tətbiq edildiyini göstərir. Əgər bu məbləğ giriş, modul və ya qismən qiymətdirsə, yekun xərc daha yüksək ola bilər. <strong>Qərar verməzdən əvvəl cari qiymət birbaşa provayderlə təsdiqlənməlidir.</strong>',
  r2t:'⚠ Sertifikatın tanınması real dəyəri dəyişir',r2b:'Hər sertifikat yerli bazardan kənarda eyni çəkidə qəbul edilmir. İxrac, tender uyğunluğu və ya xarici müştərilər qarşısında tanınma tələb edən şirkətlər üçün sertifikatın arxasındakı akkreditasiya kiçik qiymət fərqindən daha vacib ola bilər.',
  r3t:'⚠ Onlayn təlim audit tələblərinə görə yoxlanmalıdır',r3b:'Onlayn format rahatdır, amma bəzi sertifikat orqanları və ya müştərilər canlı iştirak sübutu istəyə bilər. Onlayn provayder seçilməzdən əvvəl bu formatın audit və sertifikasiya məqsədi üçün qəbul ediləcəyi təsdiqlənməlidir.',
  rec_lbl:'Fəaliyyət Addımları',rec_title:'✓ Tövsiyələr',
  rec1t:'→ Qiymətə həssas şirkətlər üçün: əvvəlcə QL Step və Revisa MMC müqayisə edilməlidir',rec1b:'Hər iki provayder əsas ISO istiqamətlərini əhatə edir və onlayn format təklif edir. İlk təlim büdcəsini nəzarətdə saxlamaq istəyən şirkətlər üçün yaxşı başlanğıc ola bilər, amma yekun seçim sertifikatın tanınması və proqram müddəti ilə birlikdə qiymətləndirilməlidir. <strong>Qrup və ya dəvət endirimi əvvəlcədən müzakirə edilməlidir.</strong>',
  rec2t:'→ İxrac və ya tender yönümlü şirkətlər üçün: TÜV Austria erkən yoxlanmalıdır',rec2b:"Beynəlxalq tanınma əsas tələbidirsə, TÜV Austria ən güclü seçimdir. Sertifikat xarici müştərilərə, auditorlara və ya satınalma komandalarına təqdim olunacaqsa, bu provayder erkən mərhələdə nəzərdən keçirilməlidir, amma büdcə hazırlanmazdan əvvəl cari qiymət təsdiqlənməlidir.",
  rec3t:'→ Daha geniş ISO əhatəsi üçün: AQA ən tam seçimdir',rec3b:'Bu müqayisədə ən geniş standart siyahısını AQA təqdim edir. Bir neçə ISO təlimi planlayan şirkətlər üçün tək provayderlə işləmək koordinasiyanı sadələşdirə və endirim danışıqlarını asanlaşdıra bilər.',
  footer_r:'© 2026 - Gənc Data Analitik Portfolio',
}};

// ── FIX: safe localStorage read ──────────────────────────────────────────────
let isoLang='en';
try{isoLang=localStorage.getItem('portfolioLang')||'en';}catch(e){}

function applyISOLang(l){
  isoLang=l;
  // ── FIX: safe localStorage write ─────────────────────────────────────────
  try{localStorage.setItem('portfolioLang',l);}catch(e){}
  document.documentElement.lang=l==='az'?'az':'en';
  const t=ISO_T[l],q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const nb=q('#navBack');if(nb)nb.textContent=t.back;
  const tg=q('.project-tag');if(tg)tg.innerHTML=t.tag;
  const ti=q('.project-title');if(ti)ti.innerHTML=t.proj_title;
  qa('.meta-label').forEach((el,i)=>{const k=['m1l','m2l','m3l','m4l'];if(t[k[i]])el.textContent=t[k[i]];});
  const qnl=q('#qn_label');if(qnl)qnl.textContent=t.jt;
  ['qn1','qn2','qn3','qn4','qn_risk','qn_rec'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  const sps=qa('.summary p');
  if(sps[0])sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1])sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;
  qa('.finding-label').forEach((el,i)=>{const k=['f1l','f2l','f3l','f4l'];if(t[k[i]])el.textContent=t[k[i]];});
  qa('.finding-desc').forEach((el,i)=>{const k=['f1d','f2d','f3d','f4d'];if(t[k[i]])el.textContent=t[k[i]];});
  ['s1_lbl','s2_lbl','s3_lbl','s4_lbl','risk_lbl','rec_lbl'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.textContent=t[id];});
  ['s1_title','s2_title','s3_title','s4_title','risk_title','rec_title'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  ['s1_text','s2_text','s3_text'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.textContent=t[id];});
  const ctitles=qa('.chart-title');
  ['c1t','c2t','c3t','c4t'].forEach((k,i)=>{if(ctitles[i]&&t[k]){const n=i+1;ctitles[i].innerHTML='<span>Fig 0'+n+'</span> - '+t[k];}});
  const ils=qa('.insight-text');
  ['i1','i2','i3','i4','i5','i6','i7','i8'].forEach((k,i)=>{if(ils[i]&&t[k])ils[i].innerHTML=t[k];});
  ['r1t','r2t','r3t','r1b','r2b','r3b','rec1t','rec2t','rec3t','rec1b','rec2b','rec3b'].forEach(id=>{const el=q('#'+id);if(el&&t[id])el.innerHTML=t[id];});
  const fs=qa('footer span');if(fs[1])fs[1].textContent=t.footer_r;
  
  
  
  const az=l==='az';
  const prEN=['G&I Training','TÜV Austria AZ','QL Step','AQA','Revisa MMC'];
  const prAZ=['G&I Təlim','TÜV Austria AZ','QL Step','AQA','Revisa MMC'];
  const prSortEN=['AQA','G&I Training','Revisa MMC','QL Step','TÜV Austria AZ'];
  const prSortAZ=['AQA','G&I Təlim','Revisa MMC','QL Step','TÜV Austria AZ'];
  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas)continue;
    const id=c.canvas.id;
    if(id==='chart-price'){c.data.labels=az?prAZ:prEN;c.update();}
    if(id==='chart-standards-count'||id==='chart-unique-stds'){c.data.labels=az?prSortAZ:prSortEN;c.update();}
    if(id==='chart-bubble'){
      if(c.options.scales.x.title)c.options.scales.x.title.text=az?'Müddət (gün)':'Duration (days)';
      if(c.options.scales.y.title)c.options.scales.y.title.text=az?'Qiymət (AZN)':'Price (AZN)';
      const lbs=az?['G&I Təlim','TÜV Austria AZ','QL Step','AQA','Revisa MMC']
                  :['G&I Training','TÜV Austria AZ','QL Step','AQA','Revisa MMC'];
      c.data.datasets.forEach((ds,i)=>{if(lbs[i])ds.label=lbs[i];});
      c.update();
    }
  }
}
function toggleLang(c){applyISOLang(c?'az':'en');}

window.addEventListener('load',()=>applyISOLang(isoLang));
applyISOLang(isoLang);

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyISOLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
`

export default function IsoTraining() {
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
