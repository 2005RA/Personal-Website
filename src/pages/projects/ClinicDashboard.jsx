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
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.lang-pill{display:flex;background:#EDE9FE;border-radius:20px;padding:3px;}
.lang-btn{padding:4px 14px;border:none;background:transparent;border-radius:16px;
  font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.06em;
  color:#52525B;transition:all .2s;}
.lang-btn.active{background:white;color:#7C3AED;box-shadow:0 1px 6px rgba(124,58,237,.14);}
`

const bodyHtml = `
<nav>
  <a href="/" class="nav-logo">R.A.</a>
  <div class="nav-right">
    <a href="/" class="nav-back" id="navBack">← Back to Portfolio</a>
  </div>
  <div class="lang-pill">
    <button class="lang-btn active" onclick="setLang('en')">EN</button>
    <button class="lang-btn"        onclick="setLang('az')">AZ</button>
  </div>
</nav>

<div class="project-hero">
  <div class="project-tag">Healthcare Analytics · Operations Dashboard</div>
  <h1 class="project-title">MedLife Clinic Network:<br><em>Performance Dashboard</em></h1>
  <div class="project-meta">
    <div><div class="meta-label">Tools</div><div class="meta-value">Excel · Pivot Tables · Multi-table Lookup</div></div>
    <div><div class="meta-label">Clinics</div><div class="meta-value">MedLife 1–6 (6 clinics)</div></div>
    <div><div class="meta-label">Data Sources</div><div class="meta-value">Patients · Doctors · Services · Clinics (4 tables joined)</div></div>
    <div><div class="meta-label">KPIs</div><div class="meta-value">Revenue · Profit Margin · Wait Time · Complaints · Doctor Performance</div></div>
  </div>
</div>
<div class="quick-nav">
  <span class="quick-nav-label">Jump to →</span>
  <a class="qn-btn" href="#clinic-perf">Clinic Performance</a>
  <a class="qn-btn" href="#doctors">Doctor Analysis</a>
  <a class="qn-btn" href="#complaints">Complaints</a>
  <a class="qn-btn" href="#delays">Delays</a>
  <a class="qn-btn risk" href="#risks">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations">✓ Recommendations</a>
</div>
<main>
  <div class="summary">
    <p><strong>Objective:</strong> Join 4 separate data tables (Patients, Doctors, Services, Clinics) and compute revenue, profit margin, and quality KPIs — then use pivot analysis to identify performance gaps, high-risk patients, and operational bottlenecks across MedLife's 6-clinic network.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> MedLife 3 and MedLife 1 are the two highest-revenue clinics, but for different reasons. MedLife 3 earns it through service quality — it has one of the lowest quality complaint counts (7) in the network and the highest average performance rating. MedLife 1, on the other hand, has the most delays in the entire network, and its top-revenue doctor (Elvin Mammadov) ranks 4th in performance. Volume is carrying quality there. The clearest individual risk: Orxan Abdullayev has the most appointments and the highest revenue contribution, but also 159 complaints — mostly about service quality and delays.</p>
  </div>

  <div id="clinic-perf" class="section-anchor">
    <p class="content-label">Clinic Performance</p>
    <h2 class="content-title">Revenue, Profit &amp; Appointment Volume</h2>
  </div>
  <p class="content-text">Comparing profit margins, all clinics sit at around 51% except MedLife 5. MedLife 3 and MedLife 4 have both the highest appointment counts and very similar revenue and profit totals. MedLife 1 generates strong revenue despite leading the network in delays.</p>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span>Fig 01</span> — Profit Margin % by Clinic</div><div class="chart-canvas-wrap"><canvas id="c-margin"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span>Fig 02</span> — Appointment Count by Clinic</div><div class="chart-canvas-wrap"><canvas id="c-appts"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>MedLife 3 has the highest performance rating and one of the fewest quality complaint counts (7) in the network.</strong> Because patients who complained still gave it a higher performance score (4.13) than clinics with fewer complaints, its average stayed high. The high revenue follows from that — good service quality drives income.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>MedLife 1 has the most delays in the network, yet still generates top revenue.</strong> Patients who experienced delays gave similar performance scores to those who did not, so the overall average stayed close. But Elvin Mammadov, its highest-revenue doctor (21% of clinic revenue), holds only the 4th-best performance rating (4.05) while having the most appointments (52). Volume is compensating for quality here, and that is not a stable situation.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="doctors" class="section-anchor">
    <p class="content-label">Doctor Analysis</p>
    <h2 class="content-title">Performance Rating vs Patient Volume</h2>
  </div>
  <p class="content-text">The doctor with the highest average performance rating is Leyla Rzayeva, but her total revenue ranks 4th (12%). Orxan Abdullayev has the most appointments and the highest total revenue, but his average performance rating is second from last (3.87). Nigar Aliyeva has the lowest total revenue and appointment count, despite a mid-range performance rating (4.04).</p>
  <div class="chart-wrap"><div class="chart-title"><span>Fig 03</span> — Doctor Performance: Rating vs Appointment Count</div><div class="chart-canvas-wrap" style="height:300px"><canvas id="c-doctor-scatter"></canvas></div></div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Orxan Abdullayev has the most appointments, the highest revenue contribution, and 159 complaints</strong> — mostly about delays and service quality. His numbers inflate the clinic's revenue totals while quietly eroding patient trust. <strong>This is the network's biggest hidden risk.</strong></span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Kamran Ismayilov is the best benchmark in the network.</strong> Among high-performing doctors, he is the only one with very few service quality complaints (3). The combination of solid volume, strong performance rating, and low complaints is what the network should be incentivising.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>High-performing doctors attract more patients, which raises their appointment count — but looking closely, most of them also have high service quality complaint numbers.</strong> Kamran Ismayilov is the exception. The network needs capacity management, not just individual performance scores.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="complaints" class="section-anchor">
    <p class="content-label">Complaint Analysis</p>
    <h2 class="content-title">Where Are Patients Most Dissatisfied?</h2>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span>Fig 04</span> — Complaint Rate by Service (%)</div><div class="chart-canvas-wrap"><canvas id="c-complaint-svc"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span>Fig 05</span> — Complaint Type Distribution</div><div class="chart-canvas-wrap"><canvas id="c-complaint-type"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Radiology (Rentgen) has a 74% complaint rate — the highest of any service.</strong> 8 of those complaints are about service quality, 5 about price, and 3 about delays. The overall picture shows service quality is the dominant complaint type across the network, and the services with the most quality complaints are MRI (9) and Radiology (8).</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>For price complaints, Physiotherapy (9) and Consultation are the most complained-about services.</strong> By clinic, Physiotherapy price complaints are highest at MedLife 6 (4 out of total), and Consultation price complaints are highest at MedLife 1. Pricing should be reviewed against competitors at both of these clinics.</span></li>
    <li><span class="insight-bullet">03</span><span class="insight-text"><strong>MRI and Small Surgery have the highest average profit</strong> (84.72 and 96.67 respectively), but MRI is also the service with the most service-quality complaints. Radiology ranks 4th in profit but second in quality complaints. These high-margin services need quality attention specifically.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="delays" class="section-anchor">
    <p class="content-label">Operational Efficiency</p>
    <h2 class="content-title">Delay Patterns by Service &amp; City</h2>
  </div>
  <div class="chart-wrap"><div class="chart-title"><span>Fig 06</span> — Avg Wait Time by Service (minutes) — Top 6</div><div class="chart-canvas-wrap" style="height:260px"><canvas id="c-wait"></canvas></div></div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>ECG, Vaccination, and USG have the highest average wait times.</strong> Looking at delay-related complaints, Vaccination stands out with 9 — the most of any service. For the others, the main complaint driver is service quality rather than delays specifically.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Vaccination and USG delays are concentrated in Baku (63%), while ECG delays are mostly in Absheron (63%).</strong> This means the problem is not network-wide — it is specific to certain facilities. Fixing the Baku bottleneck for Vaccination and USG, and the Absheron bottleneck for ECG, would resolve most of the delay complaints.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label">Risk Assessment</p><h2 class="content-title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Orxan Abdullayev: reputational risk to the network</div><div class="block-text">159 complaints against one doctor — mostly service quality and delays — can spread through word of mouth and online reviews. <strong>High revenue from appointment volume does not cancel out the reputational damage that is building up.</strong></div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Radiology and MRI quality complaints</div><div class="block-text">Both are high-profit services with the most service quality complaints in the network. Patients who have a poor experience with diagnostic services are unlikely to come back — and that revenue loss compounds over time.</div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> MedLife 5 profit margin lag</div><div class="block-text">MedLife 5 is the only clinic outside the ~51% margin range. The lowest-margin departments across the network are Traumatology and Cardiology, and in both cases the main complaint type is service quality. Quality improvements in these departments would directly affect margin.</div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label">Action Items</p><h2 class="content-title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Add complaint tracking per doctor as a performance KPI</div><div class="block-text">Performance ratings alone miss the quality signal. A monthly complaint count per doctor, broken down by type (quality, price, delay), should become part of every doctor's performance review. <strong>Kamran Ismayilov's profile — strong volume with very few quality complaints — should be the benchmark.</strong></div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Priority quality review for Radiology and MRI</div><div class="block-text">These are the two highest-complaint services despite being high-profit. Staff retraining and appointment scheduling improvements for these services specifically would protect margin while reducing patient churn.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Fix the Baku bottleneck for Vaccination and USG first</div><div class="block-text">63% of Vaccination and USG delays happen at Baku clinics. Adding scheduling slots or reallocating staff during peak hours at those specific facilities — before trying to fix the problem network-wide — would address the majority of delay complaints efficiently.</div></div>
</main>

<footer>
  <span>← <a href="/">Back to Portfolio</a></span>
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

new Chart(document.getElementById('c-margin'),{type:'bar',data:{
  labels:['MedLife 1','MedLife 2','MedLife 3','MedLife 4','MedLife 5','MedLife 6'],
  datasets:[{label:'Profit Margin %',data:[51,51,51,51,44,51],backgroundColor:[A,A,A,A,A3,A],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:35,max:60}}}});

new Chart(document.getElementById('c-appts'),{type:'bar',data:{
  labels:['MedLife 3','MedLife 4','MedLife 1','MedLife 2','MedLife 6','MedLife 5'],
  datasets:[{label:'Appointments',data:[310,295,280,260,240,195],backgroundColor:[A,A,'rgba(124,58,237,0.7)','rgba(124,58,237,0.5)','rgba(124,58,237,0.3)','rgba(124,58,237,0.15)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-doctor-scatter'),{type:'bubble',data:{datasets:[
  {label:'Leyla Rzayeva (Top Rating)',data:[{x:4.38,y:234,r:12}],backgroundColor:A2},
  {label:'Kamran Ismayilov',data:[{x:4.21,y:245,r:10}],backgroundColor:A4},
  {label:'Elvin Mammadov',data:[{x:4.05,y:260,r:14}],backgroundColor:A},
  {label:'Orxan Abdullayev (159 Complaints)',data:[{x:3.87,y:310,r:20}],backgroundColor:A3},
  {label:'Nigar Aliyeva',data:[{x:4.04,y:145,r:8}],backgroundColor:'rgba(168,85,247,0.7)'},
  {label:'Rashad Hasanov',data:[{x:4.01,y:120,r:7}],backgroundColor:'rgba(124,58,237,0.3)'}
]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:10,boxWidth:8}}},
  scales:{x:{...scl.x,title:{display:true,text:'Performance Rating',color:MUT},min:3.5,max:4.6},
          y:{...scl.y,title:{display:true,text:'Appointment Count',color:MUT}}}}});

new Chart(document.getElementById('c-complaint-svc'),{type:'bar',data:{
  labels:['Radiology','MRI','Physiotherapy','USG','ECG','Consultation'],
  datasets:[{label:'Complaint Rate %',data:[74,62,55,48,45,42],backgroundColor:[A3,'rgba(255,107,107,0.65)','rgba(255,107,107,0.5)','rgba(124,58,237,0.5)','rgba(124,58,237,0.4)','rgba(124,58,237,0.3)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-complaint-type'),{type:'doughnut',data:{
  labels:['Service Quality','Price','Delay','Other'],
  datasets:[{data:[45,28,18,9],backgroundColor:[A3,A,A2,'rgba(124,58,237,0.2)'],borderColor:'#faf9f7',borderWidth:3}]
},options:{responsive:true,maintainAspectRatio:false,cutout:'55%',plugins:{legend:{position:'bottom',labels:{color:MUT,padding:12,boxWidth:10}}}}});

new Chart(document.getElementById('c-wait'),{type:'bar',data:{
  labels:['ECG','Vaccination','USG','MRI','Radiology','Small Surgery'],
  datasets:[{label:'Avg Wait (min)',data:[31,28,27,22,19,16],backgroundColor:[A3,A3,'rgba(255,107,107,0.6)',A,'rgba(124,58,237,0.6)','rgba(124,58,237,0.35)'],borderWidth:0,borderRadius:3,indexAxis:'y'}]
},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false}},scales:scl}});



const PAGE_T={
en:{
  back:'← Back to Portfolio',tag:'Healthcare Analytics · 4-Table Excel Model',
  title_html:'MedLife Clinic Network:<br><em>Performance Dashboard</em>',
  meta_labels:['Tools','Tables Joined','Network','Metrics'],
  jt:'Jump to →',
  qn_labels:['Clinic Performance','Doctor Analysis','Complaints','Delays','⚠ Risks','✓ Recommendations'],
  obj_lbl:'Objective:',obj_text:'Join 4 separate data tables (Patients, Doctors, Services, Clinics) and compute revenue, profit margin, and quality KPIs — then use pivot analysis to identify performance gaps, high-risk patients, and operational bottlenecks across MedLife\\'s 6-clinic network.',
  kf_lbl:'Key Finding:',kf_text:'MedLife 3 and MedLife 1 are the two highest-revenue clinics, but for different reasons. MedLife 3 earns it through service quality — one of the fewest quality complaint counts (7) in the network and the highest average performance rating. MedLife 1 has the most delays in the network, and its top-revenue doctor (Elvin Mammadov) ranks 4th in performance. The clearest individual risk: Orxan Abdullayev has the most appointments and highest revenue, but also 159 complaints — mostly about service quality and delays.',
  finding_labels:['Top Revenue Clinics','Most Complaints','Radiology Complaint Rate','Quality Complaint Leaders'],
  finding_descs:['MedLife 3 (service quality) and MedLife 1 (volume) — for different reasons','Orxan Abdullayev — 159 complaints, mostly quality & delay','74% — highest complaint rate of any single service','MRI (9) and Radiology (8) lead on service quality complaints'],
  section_labels:['Clinic Performance','Doctor Analysis','Complaint Analysis','Operational Efficiency','Risk Assessment','Action Items'],
  section_titles:['Revenue, Profit & Appointment Volume','Performance Rating vs Patient Volume','Where Are Patients Most Dissatisfied?','Delay Patterns by Service & City','⚠ Key Risks','✓ Recommendations'],
  section_texts:[
    'Comparing profit margins, all clinics sit at around 51% except MedLife 5. MedLife 3 and MedLife 4 have both the highest appointment counts and very similar revenue and profit totals. MedLife 1 generates strong revenue despite leading the network in delays.',
    'The doctor with the highest average performance rating is Leyla Rzayeva, but her total revenue ranks 4th (12%). Orxan Abdullayev has the most appointments and highest total revenue, but his average performance rating is second from last (3.87). Nigar Aliyeva has the lowest total revenue and appointment count despite a mid-range performance rating (4.04).',
    'Radiology has a 74% complaint rate — the highest of any service. Service quality is the dominant complaint type across the network, with MRI (9) and Radiology (8) leading. For price complaints, Physiotherapy and Consultation are the most affected services.',
    'ECG, Vaccination, and USG have the highest average wait times. Vaccination stands out with 9 delay-related complaints. Delays are geographically concentrated: Vaccination and USG delays are mostly in Baku (63%), ECG delays mostly in Absheron (63%).'
  ],
  chart_titles:[
    '<span>Fig 01</span> — Profit Margin % by Clinic',
    '<span>Fig 02</span> — Appointment Count by Clinic',
    '<span>Fig 03</span> — Doctor Performance: Rating vs Appointment Count',
    '<span>Fig 04</span> — Complaint Rate by Service (%)',
    '<span>Fig 05</span> — Complaint Type Distribution',
    '<span>Fig 06</span> — Avg Wait Time by Service (minutes) — Top 6'
  ],
  insights:[
    '<strong>MedLife 3 has the highest performance rating and one of the fewest quality complaint counts (7) in the network.</strong> Because patients who complained still gave it a higher performance score (4.13) than clinics with fewer complaints, its average stayed high. Good service quality is driving the revenue.',
    '<strong>MedLife 1 has the most delays in the network, yet still generates top revenue.</strong> Elvin Mammadov, its highest-revenue doctor (21% of clinic revenue), holds only the 4th-best performance rating (4.05) while having the most appointments (52). Volume is compensating for quality here, and that is not a stable situation.',
    '<strong>Orxan Abdullayev has the most appointments, the highest revenue contribution, and 159 complaints</strong> — mostly about delays and service quality. His numbers inflate the clinic\\'s revenue totals while quietly eroding patient trust. <strong>This is the network\\'s biggest hidden risk.</strong>',
    '<strong>Kamran Ismayilov is the best benchmark in the network.</strong> Among high-performing doctors, he is the only one with very few service quality complaints (3). The combination of solid volume, strong performance rating, and low complaints is what the network should be incentivising.',
    '<strong>High-performing doctors attract more patients, but most of them also have high service quality complaint numbers.</strong> Kamran Ismayilov is the exception. The network needs capacity management, not just individual performance scores.',
    '<strong>Radiology (Rentgen) has a 74% complaint rate — the highest of any service.</strong> 8 of those are about service quality, 5 about price, and 3 about delays. Service quality is the dominant complaint type across the network, with MRI (9) and Radiology (8) leading.',
    '<strong>For price complaints, Physiotherapy (9) and Consultation are the most affected services.</strong> MedLife 6 leads Physiotherapy price complaints (4 out of total), MedLife 1 leads on Consultation. Pricing should be reviewed against competitors at both clinics.',
    '<strong>MRI and Small Surgery have the highest average profit</strong> (84.72 and 96.67 respectively), but MRI also has the most service quality complaints. Radiology ranks 4th in profit but 2nd in quality complaints. These high-margin services need quality attention specifically.',
    '<strong>ECG, Vaccination, and USG have the highest average wait times.</strong> Vaccination generates 9 delay complaints — the most of any service. For the others, the main complaint driver is service quality rather than delays specifically.',
    '<strong>Vaccination and USG delays are concentrated in Baku (63%), ECG delays mostly in Absheron (63%).</strong> The problem is not network-wide — it is facility-specific. Fixing the Baku bottleneck for Vaccination and USG, and the Absheron one for ECG, would resolve the majority of delay complaints.'
  ],
  risk_titles:['⚠ Orxan Abdullayev: reputational risk to the network','⚠ Radiology and MRI quality complaints','⚠ MedLife 5 profit margin lag'],
  risk_texts:[
    '159 complaints against one doctor — mostly service quality and delays — can spread through word of mouth and online reviews. <strong>High revenue from appointment volume does not cancel out the reputational damage that is building up.</strong>',
    'Both are high-profit services with the most service quality complaints in the network. Patients who have a poor experience with diagnostic services are unlikely to come back, and that revenue loss compounds over time.',
    'MedLife 5 is the only clinic outside the ~51% margin range. The lowest-margin departments network-wide are Traumatology and Cardiology, and in both cases the dominant complaint type is service quality. Improving quality in these departments would directly affect margin.'
  ],
  rec_titles:['→ Add complaint tracking per doctor as a performance KPI','→ Priority quality review for Radiology and MRI','→ Fix the Baku bottleneck for Vaccination and USG first'],
  rec_texts:[
    'Performance ratings alone miss the quality signal. A monthly complaint count per doctor, broken down by type (quality, price, delay), should become part of every doctor\\'s performance review. <strong>Kamran Ismayilov\\'s profile — solid volume with very few quality complaints — should be the benchmark.</strong>',
    'These are the two highest-complaint services despite being high-profit. Staff retraining and appointment scheduling improvements specifically for these services would protect margin while reducing patient churn.',
    '63% of Vaccination and USG delays happen at Baku clinics. Adding scheduling slots or reallocating staff during peak hours at those specific facilities — before trying to fix the problem network-wide — would address the majority of delay complaints efficiently.'
  ]
},
az:{
  back:'← Portfolioya Qayıt',tag:'Səhiyyə Analitikası · 4 Cədvəlli Excel Modeli',
  title_html:'MedLife Klinika Şəbəkəsi:<br><em>İdarəetmə Paneli</em>',
  meta_labels:['Alətlər','Birləşdirilmiş Cədvəllər','Şəbəkə','Göstəricilər'],
  jt:'Keç →',
  qn_labels:['Klinika Performansı','Həkim Analizi','Şikayətlər','Gecikmələr','⚠ Risklər','✓ Tövsiyələr'],
  obj_lbl:'Məqsəd:',obj_text:'4 ayrı cədvəli (Pasiyentlər, Həkimlər, Xidmətlər, Klinikalar) birləşdirib gəlir, mənfəət marjası və keyfiyyət KPI-larını hesablamaq — sonra isə pivot analizi ilə MedLife-ın 6 klinikalı şəbəkəsindəki performans boşluqlarını, yüksək riskli pasiyentləri və əməliyyat  ləngimələrini müəyyənləşdirmək.',
  kf_lbl:'Əsas Tapıntı:',kf_text:'MedLife 3 və MedLife 1 fərqli səbəblərlə ən yüksək gəlirli iki klinikadır. MedLife 3 bunu xidmət keyfiyyəti ilə qazanır, şəbəkədəki ən az keyfiyyət şikayətlərindən birinə (7) malikdir və ən yüksək orta performans reytinqinə sahibdir. MedLife 1 isə şəbəkədəki ən çox gecikmənin baş verdiyi klinikadır. Ən böyük riski odur ki, Orxan Abdullayevin ən çox randevusu və ən yüksək gəliri var, amma eyni zamanda 159 şikayəti də var hansılar ki, daha çox xidmət keyfiyyəti və gecikməyə aiddir.',
  finding_labels:['Ən Yüksək Gəlirli Klinikalar','Ən Çox Şikayət','Rentgen Şikayət Dərəcəsi','Keyfiyyət Şikayəti Liderləri'],
  finding_descs:['MedLife 3 (keyfiyyət) və MedLife 1 (həcm) — fərqli səbəblərlə','Orxan Abdullayev — 159 şikayət, əsasən keyfiyyət və gecikməyə aid','74%, bu da bütün xidmətlər arasında ən yüksək şikayət dərəcəsidir','MRT (9) və Rentgen (8) keyfiyyət şikayətlərinin liderləridir'],
  section_labels:['Klinika Performansı','Həkim Analizi','Şikayət Analizi','Əməliyyat Effektivliyi','Risk Qiymətləndirməsi','Fəaliyyət Addımları'],
  section_titles:['Gəlir, Mənfəət & Randevu Həcmi','Performans Reytinqi vs Xəstə Həcmi','Xəstələr Harada Ən Narazıdır?','Xidmət & Şəhərə Görə Gecikmə Tendensiyaları','⚠ Əsas Risklər','✓ Tövsiyələr'],
  section_texts:[
    'Mənfəət marjasını müqayisə etsək, MedLife 5-dən başqa hamısı 51% mənfəət marjasına sahibdir. MedLife 3 və MedLife 4 həm ən çox randevu sayına malikdir, həm də gəlir və mənfəət cəmləri bir-birinə çox yaxındır. MedLife 1 isə şəbəkənin ən çox gecikməsi olan klinikası olmasına baxmayaraq güclü gəlir yaradır.',
    'Ən yüksək orta performans reytinqinə sahib həkim Leyla Rzayevadır, lakin onun cəm gəliri 4-cü yerdədir (12%). Orxan Abdullayevin ən çox randevusu və ən yüksək cəm gəliri var, amma onun orta performans reytinqi sondan ikincidir (3,87). Nigar Əliyevanın ən aşağı cəm gəliri və randevu sayı var, orta performans reytinqinə (4,04) baxmayaraq.',
    'Rentgenin şikayət dərəcəsi 74%-dir hansı ki bütün xidmətlər arasında ən yüksəkdir. Xidmət keyfiyyəti şəbəkə üzrə üstünlük təşkil edən şikayət növüdür: MRT (9) və Rentgen (8) liderdir. Qiymət şikayətlərində isə Fizioterapiya və Konsultasiya ən çox şikayət edilən xidmətlərdir.',
    'EKQ, Peyvənd və USM ən yüksək orta gözləmə müddətinə malikdir. Peyvənd 9 gecikmə şikayəti ilə öndədir. Gecikmələr coğrafi olaraq toplanır: Peyvənd və USM  gecikmələri Bakıda (63%), EKQ  gecikmələri isə Abşeronda (63%) cəmlənib.'
  ],
  chart_titles:[
    '<span>Şəkil 01</span> — Klinikaya Görə Mənfəət Marjası %',
    '<span>Şəkil 02</span> — Klinikaya Görə Randevu Sayı',
    '<span>Şəkil 03</span> — Həkim Performansı: Reytinq vs Randevu Sayı',
    '<span>Şəkil 04</span> — Xidmətə Görə Şikayət Dərəcəsi (%)',
    '<span>Şəkil 05</span> — Şikayət Növü Bölgüsü',
    '<span>Şəkil 06</span> — Xidmətə Görə Orta Gözləmə Müddəti (dəq) — Top 6'
  ],
  insights:[
    '<strong>MedLife 3 ən yüksək performans reytinqinə və şəbəkədəki ən az keyfiyyət şikayəti saylarından birinə (7) malikdir.</strong> Şikayət edən pasiyentlər ona daha az şikayəti olan klinikalardan daha yüksək performans balı (4,13) verdikləri üçün ümumi ortalaması yüksək qalıb. Yüksək xidmət keyfiyyəti gəliri artırır.',
    '<strong>MedLife 1 şəbəkənin ən çox gecikməsinin baş verdiyi klinikadır, lakin hələ də yüksək gəlir yaradır.</strong> 4-cü ən yaxşı performans reytinqinə (4,05) sahib olmasına baxmayaraq ən çox randevuya (52) malikdir, Elvin Məmmədov, klinikanın ən çox gəlir gətirən həkimi (klinika gəlirinin 21%-i). Burada həcm keyfiyyəti kompensasiya edir, bu isə davamlı bir vəziyyət deyil.',
    '<strong>Orxan Abdullayevin ən çox randevusu, ən yüksək gəlir töhfəsi və 159 şikayəti var</strong> (əsasən gecikmə və xidmət keyfiyyəti üzrə). O klinikanın gəlir cəmlərini artırır, lakin eyni zamanda xəstə güvənini də azaldır. <strong>Bu şəbəkənin ən böyük gizli riskidir.</strong>',
    '<strong>Kamran İsmayılov şəbəkənin ən yaxşı etalon həkimidir.</strong> Yüksək performanslı həkimlər arasında o, xidmət keyfiyyəti ilə bağlı çox az şikayəti (3) olan yeganə həkimdir. Güclü həcm, yüksək performans reytinqi və az şikayətin bu kombinasiyası şəbəkənin dəyərləndirməli olduğu şeydir.',
    '<strong>Yüksək performanslı həkimlər daha çox xəstə cəlb edir, amma onların çoxunda da xidmət keyfiyyəti ilə bağlı çoxlu şikayət sayı var.</strong> Kamran İsmayılov istisnasıdır. Şəbəkənin yalnız fərdi performans qiymətləndirməsinə deyil, həm də iş yükünün düzgün idarə olunmasına ehtiyacı var.',
    '<strong>Rentgenin şikayət dərəcəsi 74%-dir, bu da bütün xidmətlər arasında ən yüksəkdir.</strong> Bunların 8-i xidmət keyfiyyəti, 5-i qiymət, 3-ü isə gecikmə ilə bağlıdır. Xidmət keyfiyyəti şəbəkə üzrə üstünlük təşkil edən şikayət növüdür: MRT (9) və Rentgen (8) liderdir.',
    '<strong>Qiymət şikayətlərində Fizioterapiya (9) və Konsultasiya ən çox şikayət edilən xidmətlərdir.</strong> MedLife 6 Fizioterapiya qiymət şikayətlərində (ümuminin 4-ü), MedLife 1 isə Konsultasiyada liderdir. Hər iki klinikada rəqiblərlə müqayisəli qiymət araşdırması aparılmalıdır.',
    '<strong>MRT və Kiçik cərrahi əməliyyatların ən yüksək orta mənfəəti var</strong> (müvafiq olaraq 84,72 və 96,67), lakin MRT eyni zamanda ən çox xidmət keyfiyyəti şikayətinə malikdir. Rentgen mənfəət sıralamasında 4-cüdür, amma keyfiyyət şikayətlərində 2-ci. Bu yüksək mənfəətli xidmətlər xüsusi keyfiyyət diqqətinə ehtiyac duyur.',
    '<strong>EKQ, Peyvənd və USM ən yüksək orta gözləmə müddətinə malikdir.</strong> Peyvənd 9 gecikmə şikayəti ilə öndədir, bu da bütün xidmətlər arasında ən yüksəkdir. Digərlərinde isə əsas şikayət amili gecikmədən deyil, xidmət keyfiyyətindəndir.',
    '<strong>Peyvənd və USM  gecikmələri Bakıda (63%), EKQ  gecikmələri isə Abşeronda (63%) cəmlənib.</strong> Peyvənd və USM xidmətlərində Bakı klinikalarında, EKQ xidmətində isə Abşeron klinikalarında yaranan gecikmələrin aradan qaldırılması şikayətlərin böyük hissəsini azalda bilər.'
  ],
  risk_titles:['⚠ Orxan Abdullayev: şəbəkədə reputasiya riski yaradır','⚠ Rentgen və MRT keyfiyyət şikayətləri','⚠ MedLife 5 mənfəət marjasında gerilik'],
  risk_texts:[
    'Bir həkimə qarşı 159 şikayət — əsasən xidmət keyfiyyəti və gecikmə üzrə — ağızdan-ağıza və onlayn rəylər vasitəsilə yayıla bilər. <strong>Randevu həcmindən əldə edilən yüksək gəlir toplanmaqda olan reputasiya zərərini ödəmir.</strong>',
    'Hər ikisi şəbəkənin ən çox keyfiyyət şikayəti olan yüksək gəlirli xidmətləridir. Diaqnostik xidmətlərə mənfi münasibəti olan pasiyentlər geri qayıtmaq istəmir, bu da gəlir itkisini zaman keçdikcə artırır.',
    'MedLife 5 təxminən 51%-lik marjaya çatmayan yeganə klinikadır. Şəbəkə üzrə ən aşağı marjalı şöbələr Travmatologiya və Kardiologiyadır, hər ikisində də üstünlük təşkil edən şikayət növü xidmət keyfiyyətidir. Bu şöbələrdə keyfiyyəti artırmaq marjaya birbaşa müsbət təsir edəcək.'
  ],
  rec_titles:['→ Həkim başına şikayət izləməsini performans KPI-ı kimi əlavə edin','→ Prioritet: Rentgen və MRT üçün keyfiyyətin nəzərdən keçirilməsi','→ Prioritet: Bakı klinikalarında Peyvənd və USM gecikmələrinin azaldılması'],
  rec_texts:[
    'Performans reytinqləri təkbaşına kifayət etmir. Hər həkimin keyfiyyət, qiymət və gecikmə üzrə aylıq şikayət göstəriciləri də qiymətləndirmədə nəzərə alınmalıdır. <strong>Kamran İsmayılov yüksək xidmət həcmi və çox az keyfiyyət şikayəti ilə bu sahədə nümunəvi nəticə göstərir.</strong>',
    'Yüksək mənfəət marjasına baxmayaraq, Rentgen və MRT xidmətləri ən yüksək şikayət göstəricilərinə malikdir. Hədəfli təlim proqramları və daha effektiv randevu idarəçiliyi xidmət keyfiyyətini yaxşılaşdıraraq şikayətlərin azalmasına və gəlirliliyin qorunmasına kömək edə bilər.',
    'Bu xidmətlər üzrə gecikmələrin 63%-i Bakı klinikalarında baş verir. Əlavə qəbul saatlarının ayrılması və ya pik dövrlərdə işçilərin yenidən bölüşdürülməsi gecikmələrin böyük hissəsini azaltmağa imkan verə bilər.'
  ]
}};

let lang=localStorage.getItem('portfolioLang')||'en';

function updateProjectCharts(l){
  const az=l==='az';
  const svcLabels=az?['Rentgen','MRT','Fizioterapiya','USM','EKQ','Konsultasiya']:['Radiology','MRI','Physiotherapy','USG','ECG','Consultation'];
  const waitLabels=az?['EKQ','Peyvənd','USM','MRT','Rentgen','Kiçik cərrahi']:['ECG','Vaccination','USG','MRI','Radiology','Small Surgery'];
  const apptLabels=az?['MedLife 3','MedLife 4','MedLife 1','MedLife 2','MedLife 6','MedLife 5']:['MedLife 3','MedLife 4','MedLife 1','MedLife 2','MedLife 6','MedLife 5'];
  const ctypeLabels=az?['Xidmət Keyfiyyəti','Qiymət','Gecikmə','Digər']:['Service Quality','Price','Delay','Other'];
  const doctorX=az?'Performans Reytinqi':'Performance Rating';
  const doctorY=az?'Randevu Sayı':'Appointment Count';
  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas)continue;
    const id=c.canvas.id;
    if(id==='c-complaint-svc'){c.data.labels=svcLabels;c.update();}
    if(id==='c-wait'){c.data.labels=waitLabels;c.update();}
    if(id==='c-appts'){c.data.labels=apptLabels;c.update();}
    if(id==='c-complaint-type'){c.data.labels=ctypeLabels;c.update();}
    if(id==='c-doctor-scatter'){
      if(c.options.scales.x.title)c.options.scales.x.title.text=doctorX;
      if(c.options.scales.y.title)c.options.scales.y.title.text=doctorY;
      c.data.datasets[0].label=az?'Leyla Rzayeva (Ən Yüksək Reytinq)':'Leyla Rzayeva (Top Rating)';
      c.data.datasets[1].label=az?'Kamran İsmayılov':'Kamran Ismayilov';
      c.data.datasets[2].label=az?'Elvin Məmmədov':'Elvin Mammadov';
      c.data.datasets[3].label=az?'Orxan Abdullayev (159 Şikayət)':'Orxan Abdullayev (159 Complaints)';
      c.data.datasets[4].label=az?'Nigar Əliyeva':'Nigar Aliyeva';
      c.data.datasets[5].label=az?'Rəşad Həsənov':'Rashad Hasanov';
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

  const mls=qa('.meta-label');
  t.meta_labels&&t.meta_labels.forEach((v,i)=>{if(mls[i])mls[i].textContent=v;});

  const qnl=q('.quick-nav-label');if(qnl)qnl.textContent=t.jt;
  const qns=qa('.qn-btn');
  t.qn_labels&&t.qn_labels.forEach((v,i)=>{if(qns[i])qns[i].innerHTML=v;});

  const sps=qa('.summary p');
  if(sps[0])sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1])sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;

  const fls=qa('.finding-label');const fds=qa('.finding-desc');
  t.finding_labels&&t.finding_labels.forEach((v,i)=>{if(fls[i])fls[i].textContent=v;});
  t.finding_descs&&t.finding_descs.forEach((v,i)=>{if(fds[i])fds[i].textContent=v;});

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

  qa('.risk-block .block-title').forEach((el,i)=>{if(t.risk_titles&&t.risk_titles[i])el.innerHTML=t.risk_titles[i];});
  qa('.risk-block .block-text').forEach((el,i)=>{if(t.risk_texts&&t.risk_texts[i])el.innerHTML=t.risk_texts[i];});
  qa('.rec-block .block-title').forEach((el,i)=>{if(t.rec_titles&&t.rec_titles[i])el.innerHTML=t.rec_titles[i];});
  qa('.rec-block .block-text').forEach((el,i)=>{if(t.rec_texts&&t.rec_texts[i])el.innerHTML=t.rec_texts[i];});

  const fs=qa('footer span');
  if(fs[1])fs[1].textContent=l==='az'?'© 2026 — Gənc Data Analitik Portfolio':'© 2026 — Junior Data Analyst Portfolio';

  updateProjectCharts(l);
}

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyProjectLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
applyProjectLang(lang);
`

export default function ClinicDashboard() {
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
