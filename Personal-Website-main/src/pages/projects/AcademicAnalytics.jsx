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
body::after{content:'';position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
nav,main,footer,.project-hero,.page-hero{position:relative;z-index:1;}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
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
.quick-nav{position:sticky;top:65px;z-index:50;background:var(--bg2);border-bottom:1px solid var(--border);padding:0.65rem 3rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
.quick-nav-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-right:0.5rem;}
.qn-btn{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.3rem 0.8rem;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:all 0.2s;}
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
.chart-title{font-family:var(--mono);font-size:0.67rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:1.5rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border);}
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
@media(max-width:768px){nav{padding:1rem 1.5rem;}.nav-links{display:none;}.project-hero,.quick-nav{padding-left:1.5rem;padding-right:1.5rem;}main{padding:3rem 1.5rem 5rem;}.chart-row{grid-template-columns:1fr;}.findings-grid{grid-template-columns:1fr 1fr;}.findings-grid.col3{grid-template-columns:1fr 1fr;}}
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.lang-toggle{display:flex;align-items:center;gap:0.55rem;border-left:1px solid var(--border);padding-left:1.25rem;}
.lang-label{font-family:var(--mono);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text);opacity:0.38;transition:opacity 0.2s;user-select:none;}
.lang-label.active{opacity:1;}
.switch{position:relative;display:inline-block;width:36px;height:19px;flex-shrink:0;}
.switch input{opacity:0;width:0;height:0;position:absolute;}
.slider{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:19px;transition:0.3s;}
.slider::before{content:'';position:absolute;height:11px;width:11px;left:3px;bottom:3px;background:var(--accent);border-radius:50%;transition:0.3s;}
.switch input:checked + .slider::before{transform:translateX(17px);}

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
    <a href="${import.meta.env.BASE_URL}" class="nav-back" data-i18n="back">← Back to Portfolio</a>
  </div>
    <div class="lang-pill">
      <button class="lang-btn active" onclick="setLang('en')">EN</button>
      <button class="lang-btn"        onclick="setLang('az')">AZ</button>
    </div>
</nav>

<div class="project-hero">
  <div class="project-tag">Education Analytics · Pivot Table Analysis</div>
  <h1 class="project-title">University Academic &amp;<br><em>Administrative Analytics</em></h1>
  <div class="project-meta">
    <div><div class="meta-label">Tools</div><div class="meta-value">Excel · Pivot Tables · XLOOKUP · Advanced Lookup</div></div>
    <div><div class="meta-label">Scope</div><div class="meta-value">Attendance · Grades · Scholarships · Complaints · Dormitory</div></div>
    <div><div class="meta-label">Tasks</div><div class="meta-value">8 pivot analyses with cross-table lookup</div></div>
    <div><div class="meta-label">Outcome</div><div class="meta-value">Identified failing teacher method, complaint bottleneck, payment risk group</div></div>
  </div>
</div>
<div class="quick-nav">
  <span class="quick-nav-label">Jump to →</span>
  <a class="qn-btn" href="#attendance">Attendance</a>
  <a class="qn-btn" href="#grades">Grades</a>
  <a class="qn-btn" href="#complaints">Admin Complaints</a>
  <a class="qn-btn" href="#activity">Student Activity</a>
  <a class="qn-btn risk" href="#risks">⚠ Risks</a>
  <a class="qn-btn rec" href="#recommendations">✓ Recommendations</a>
</div>
<main>
  <div class="summary">
    <p><strong>Objective:</strong> Apply Pivot Tables across 8 different analytical tasks covering academic performance, attendance patterns, administrative complaint resolution, dormitory payment status, and student activity levels. Then use Advanced Lookup to drill into specific failing cases.</p>
    <p style="margin-top:0.75rem"><strong>Key Finding:</strong> K. Rzayev stands out as a statistical outlier — his students have the lowest average scores in Microeconomics and the highest number of failures. On the administrative side, the Student Affairs department has the slowest complaint resolution time despite handling the highest volume of complaints, likely due to understaffing.</p>
  </div>

  <div id="attendance" class="section-anchor">
    <p class="content-label">Task 1–2 — Attendance Analysis</p>
    <h2 class="content-title">Attendance by Subject &amp; Status</h2>
  </div>
  <div class="findings-grid col3">
    <div class="finding-card"><div class="finding-num">Management</div><div class="finding-label">Highest Attendance</div><div class="finding-desc">Most attendance records overall — Ibrahimova leads within this subject, followed by Rzayev. Teaching style or classroom discipline may explain the difference.</div></div>
    <div class="finding-card"><div class="finding-num">12</div><div class="finding-label">Most Absences</div><div class="finding-desc">Research Methods has the most absences (12). 7 of these have no recorded reason, while 2 are family-related and 2 are transport-related. A campus access issue is also possible.</div></div>
    <div class="finding-card"><div class="finding-num">12</div><div class="finding-label">Most Tardiness</div><div class="finding-desc">Macroeconomics has 12 late arrivals. 3 are linked to family issues, 3 have no recorded reason. The cause may be scheduling or transport-related.</div></div>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span> 01</span> — Attendance Records by Subject</div><div class="chart-canvas-wrap"><canvas id="c-att-subj"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span> 02</span> — Absence vs Tardiness by Subject</div><div class="chart-canvas-wrap"><canvas id="c-att-status"></canvas></div></div>
  </div>

  <hr class="divider"/>
  <div id="grades" class="section-anchor">
    <p class="content-label">Task 3 &amp; 8 — Grade Analysis + Lookup</p>
    <h2 class="content-title">Average Exam Scores &amp; Failing Students</h2>
  </div>
  <p class="content-text">The lowest average exam score belongs to Microeconomics, and within that subject, K. Rzayev's students are the main reason — their average is noticeably lower than everyone else's. The same teacher also has the lowest class attendance rate. Advanced Lookup was used to extract all failing students along with their teachers, which confirmed that the problem is specific to one teacher, not the subject as a whole.</p>
  <div class="chart-wrap"><div class="chart-title"><span> 03</span> — Average Exam Score by Subject &amp; Teacher</div><div class="chart-canvas-wrap" style="height:300px"><canvas id="c-grades"></canvas></div></div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>K. Rzayev's students have both the lowest average score and the lowest attendance.</strong> When you combine that with the highest number of failed students, it points to a problem with the teacher's methodology rather than the subject difficulty itself.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>Both K. Rzayev and E.  Əliyev had the same number of failed students in Microeconomics,</strong> but Rzayev has more failures overall. The XLOOKUP analysis confirmed exactly which students failed and under which teacher, making targeted follow-up possible. The issue could be either the teaching method or the grading system.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="complaints" class="section-anchor">
    <p class="content-label">Task 5 — Administrative Complaints</p>
    <h2 class="content-title">Complaint Resolution by Department</h2>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span> 04</span> — Complaint Volume by Department</div><div class="chart-canvas-wrap"><canvas id="c-complaint-vol"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span> 05</span> — Avg Resolution Time by Dept (days)</div><div class="chart-canvas-wrap"><canvas id="c-complaint-time"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>Student Affairs has the slowest resolution time, with 80 total complaints.</strong> Only 18 have been approved — the lowest acceptance rate of any department — and 27 are still in progress. This is likely because the department is understaffed relative to its caseload.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>The Exam Center resolves cases faster than Student Affairs, even though it has more complaints in progress.</strong> This suggests better internal processes or more available staff. It would be worth studying what the Exam Center does differently and applying that approach to Student Affairs.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="activity" class="section-anchor">
    <p class="content-label">Task 6–7 — Resources &amp; Activity</p>
    <h2 class="content-title">Dormitory Payments &amp; Student Activity Levels</h2>
  </div>
  <div class="chart-row">
    <div class="chart-wrap"><div class="chart-title"><span> 06</span> — Payment Delays by Room Type</div><div class="chart-canvas-wrap"><canvas id="c-dorm"></canvas></div></div>
    <div class="chart-wrap"><div class="chart-title"><span> 07</span> — Student Activity Level Distribution</div><div class="chart-canvas-wrap"><canvas id="c-activity"></canvas></div></div>
  </div>
  <ul class="insights-list">
    <li><span class="insight-bullet">01</span><span class="insight-text"><strong>3-person rooms have the most payment delays, and they also have the lowest monthly price.</strong> The most delays are coming from the cheapest rooms, which points to students' financial situation as the underlying problem.</span></li>
    <li><span class="insight-bullet">02</span><span class="insight-text"><strong>51% of students are at medium activity level, and the high-activity group is notably small.</strong> This suggests a problem with motivation or the availability of extracurricular programs. Low activity levels are generally associated with higher disengagement and dropout risk.</span></li>
  </ul>

  <hr class="divider"/>
  <div id="risks" class="section-anchor">
    <p class="content-label">Risk Assessment</p><h2 class="content-title">⚠ Key Risks</h2>
  </div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> K. Rzayev teaching quality — institutional risk</div><div class="block-text">One teacher is responsible for a big share of academic failures and low exam scores. If this is not addressed, it creates a pattern of graduating underqualified students, which is both a reputational and accreditation risk for the university.</div></div>
  <div class="risk-block"><div class="block-title"><span class="block-icon">⚠</span> Student Affairs complaint backlog</div><div class="block-text">27 cases are still in progress and the department has the lowest approval rate of any unit. When students cannot resolve administrative issues, it affects their ability to continue enrollment and damages institutional trust.</div></div>

  <hr class="divider"/>
  <div id="recommendations" class="section-anchor">
    <p class="content-label">Action Items</p><h2 class="content-title">✓ Recommendations</h2>
  </div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Structured teaching review for K. Rzayev</div><div class="block-text">Initiate a peer review process: have a senior faculty member observe several classes, review the assessment methodology, and provide structured feedback. <strong>If scores do not improve by next semester, reassignment or team-teaching support should be considered.</strong></div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Restructure Student Affairs complaint handling</div><div class="block-text">Set a clear resolution deadline for standard complaints and fast-track cases that affect enrollment or financial status. The Exam Center's workflow is worth studying and replicating in Student Affairs.</div></div>
  <div class="rec-block"><div class="block-title"><span class="block-icon">→</span> Financial support for 3-person room residents</div><div class="block-text">Most payment delays come from the cheapest rooms, meaning these students are already financially stretched. Introducing an instalment payment option or an emergency grant process for this group would help prevent delays from turning into defaults.</div></div>
</main>

<footer>
  <span>← <a href="${import.meta.env.BASE_URL}">Back to Portfolio</a></span>
  <span>© 2026 — Junior Data Analyst Portfolio</span>
</footer>
`

const script = `
const A='#f5c518',A2='#4c9fff',A3='#ff6b6b',A4='#5dd87a';
const GRID='rgba(0,0,0,0.06)',MUT='#8fa0c8';
const FONT="'Syne',sans-serif";
Chart.defaults.color=MUT;Chart.defaults.borderColor=GRID;
Chart.defaults.font.family=FONT;Chart.defaults.font.size=11;
const scl={x:{grid:{color:GRID},ticks:{color:MUT}},y:{grid:{color:GRID},ticks:{color:MUT}}};

new Chart(document.getElementById('c-att-subj'),{type:'bar',data:{
  labels:['Management','Macroeconomics','Research Methods','Microeconomics','Finance'],
  datasets:[{label:'Attendance Records',data:[88,82,76,71,65],backgroundColor:[A,A2,'rgba(124,58,237,0.6)','rgba(124,58,237,0.4)','rgba(124,58,237,0.2)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-att-status'),{type:'bar',data:{
  labels:['Research Methods','Macroeconomics','Management','Finance','Microeconomics'],
  datasets:[
    {label:'Absent',data:[12,7,6,5,4],backgroundColor:A3,borderWidth:0,borderRadius:3},
    {label:'Late',data:[7,12,5,4,4],backgroundColor:A,borderWidth:0,borderRadius:3}
  ]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:MUT,padding:12,boxWidth:10}}},scales:scl}});

new Chart(document.getElementById('c-grades'),{type:'bar',data:{
  labels:['Management\\n(Ibrahimova)','Management\\n(Rzayev)','Macroeconomics\\n(avg)','Finance\\n(avg)','Micro\\n(E.  Əliyev)','Micro\\n(K. Rzayev)'],
  datasets:[{label:'Avg Score',data:[74,71,68,65,61,54],backgroundColor:[A,A,'rgba(124,58,237,0.6)','rgba(124,58,237,0.5)','rgba(255,107,107,0.55)',A3],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{...scl,y:{...scl.y,min:40,max:85}}}});

new Chart(document.getElementById('c-complaint-vol'),{type:'bar',data:{
  labels:["Student Affairs","Exam Center","Registrar","Library","Finance Dept"],
  datasets:[{label:'Total Complaints',data:[80,72,65,48,35],backgroundColor:[A3,A,A2,'rgba(124,58,237,0.4)','rgba(124,58,237,0.2)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-complaint-time'),{type:'bar',data:{
  labels:['Student Affairs','Library','Finance Dept','Registrar','Exam Center'],
  datasets:[{label:'Avg Days to Resolve',data:[8.2,6.8,6.1,5.5,4.3],backgroundColor:[A3,'rgba(255,107,107,0.55)',A,'rgba(76,159,255,0.55)',A4],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-dorm'),{type:'bar',data:{
  labels:['3-Person Room','2-Person Room','Single Room','Suite'],
  datasets:[{label:'Payment Delays',data:[12,7,4,2],backgroundColor:[A3,'rgba(255,107,107,0.5)','rgba(124,58,237,0.4)','rgba(124,58,237,0.2)'],borderWidth:0,borderRadius:3}]
},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:scl}});

new Chart(document.getElementById('c-activity'),{type:'doughnut',data:{
  labels:['Medium Activity','High Activity','Low Activity'],
  datasets:[{data:[51,27,22],backgroundColor:[A,A4,A3],borderColor:'#faf9f7',borderWidth:3}]
},options:{responsive:true,maintainAspectRatio:false,cutout:'55%',plugins:{legend:{position:'bottom',labels:{color:MUT,padding:12,boxWidth:10}}}}});



const PAGE_T={
en:{back:'← Back to Portfolio',tag:'Education Analytics · Pivot Table Analysis',
proj_title:'University Academic &amp;<br><em>Administrative Analytics</em>',
m1l:'Tools',m2l:'Scope',m3l:'Tasks',m4l:'Outcome',
jt:'Jump to →',qn1:'Attendance',qn2:'Grades',qn3:'Admin Complaints',qn4:'Student Activity',qn_risk:'⚠ Risks',qn_rec:'✓ Recommendations',
obj_lbl:'Objective:',kf_lbl:'Key Finding:',
obj_text:'Apply Pivot Tables across 8 different analytical tasks covering academic performance, attendance patterns, administrative complaint resolution, dormitory payment status, and student activity levels. Then use Advanced Lookup to drill into specific failing cases.',
kf_text:'K. Rzayev stands out as a statistical outlier — his students have the lowest average scores in Microeconomics and the highest number of failures. On the administrative side, the Student Affairs department has the slowest complaint resolution time despite handling the highest volume of complaints, likely due to understaffing.',
f1l:'Highest Attendance',f1d:'Management subject — Ibrahimova leads within this subject, followed by Rzayev. Teaching style or classroom discipline may explain the difference.',
f2l:'Most Absences',f2d:'Research Methods has the most absences (12). 7 have no recorded reason, 2 are family-related, 2 are transport-related. A campus access issue is also possible.',
f3l:'Most Tardiness',f3d:'Macroeconomics has 12 late arrivals. 3 are family-related, 3 have no recorded reason. The cause may be scheduling or transport.',
s1_lbl:'Task 1–2 — Attendance Analysis',s1_title:'Attendance by Subject & Status',
s1_text:'Management leads in total attendance records. Research Methods has the most absences (12), with 7 having no recorded reason. Macroeconomics has the most late arrivals, with causes ranging from family issues to unknown reasons.',
c1t:'Attendance Records by Subject',c2t:'Absence vs Tardiness by Subject',
i1:'<strong>K. Rzayev\\'s students have both the lowest average score and the lowest attendance.</strong> When combined with the highest number of failures, this points to a problem with the teacher\\'s methodology rather than the subject difficulty itself.',
i2:'<strong>Both K. Rzayev and E.Əliyev had the same number of failed students in Microeconomics,</strong> but Rzayev has more failures overall. XLOOKUP confirmed exactly which students failed and under which teacher. The issue could be either the teaching method or the grading system.',
s2_lbl:'Task 3 & 8 — Grade Analysis + Lookup',s2_title:'Average Exam Scores & Failing Students',
s2_text:'The lowest average exam score belongs to Microeconomics, and within that subject, K. Rzayev\\'s students are the main reason — their average is noticeably lower than everyone else\\'s. The same teacher also has the lowest class attendance rate. Advanced Lookup confirmed that the problem is specific to one teacher, not the subject as a whole.',
c3t:'Average Exam Score by Subject & Teacher',
s3_lbl:'Task 5 — Administrative Complaints',s3_title:'Complaint Resolution by Department',
c4t:'Complaint Volume by Department',c5t:'Avg Resolution Time by Dept (days)',
i3:'<strong>Student Affairs has the slowest resolution time, with 80 total complaints.</strong> Only 18 have been approved — the lowest acceptance rate of any department — and 27 are still in progress. This is likely because the department is understaffed relative to its caseload.',
i4:'<strong>The Exam Center resolves cases faster than Student Affairs, even though it has more complaints in progress.</strong> This suggests better internal processes or more available staff. It would be worth studying what the Exam Center does differently and applying that to Student Affairs.',
s4_lbl:'Task 6–7 — Resources & Activity',s4_title:'Dormitory Payments & Student Activity Levels',
c6t:'Payment Delays by Room Type',c7t:'Student Activity Level Distribution',
i5:'<strong>3-person rooms have the most payment delays, and they also have the lowest monthly price.</strong> The most delays are coming from the cheapest rooms, which points to students\\' financial situation as the underlying problem.',
i6:'<strong>51% of students are at medium activity level, and the high-activity group is notably small.</strong> This suggests a problem with motivation or the availability of extracurricular programs. Low activity is generally associated with higher disengagement and dropout risk.',
risk_lbl:'Risk Assessment',risk_title:'⚠ Key Risks',
r1t:'⚠ K. Rzayev teaching quality — institutional risk',r1b:'One teacher is responsible for a disproportionate share of academic failures and low exam scores. If this is not addressed, it creates a pattern of graduating underqualified students, which is both a reputational and accreditation risk for the university.',
r2t:'⚠ Student Affairs complaint backlog',r2b:'27 cases are still in progress and the department has the lowest approval rate of any unit. When students cannot resolve administrative issues, it affects their ability to continue enrollment and damages institutional trust.',
rec_lbl:'Action Items',rec_title:'✓ Recommendations',
rec1t:'→ Structured teaching review for K. Rzayev',rec1b:'Initiate a peer review process: have a senior faculty member observe several classes, review the assessment methodology, and provide structured feedback. <strong>If scores do not improve by next semester, reassignment or team-teaching support should be considered.</strong>',
rec2t:'→ Restructure Student Affairs complaint handling',rec2b:"Set a clear resolution deadline for standard complaints and fast-track cases that affect enrollment or financial status. The Exam Center's workflow is worth studying and replicating in Student Affairs.",
rec3t:'→ Financial support for 3-person room residents',rec3b:'Most payment delays come from the cheapest rooms, meaning these students are already financially stretched. Introducing an instalment payment option or an emergency grant process for this group would help prevent delays from turning into defaults.',
},
az:{back:'← Portfolioya Qayıt',tag:'Təhsil Analizi · Excel · Universitet Məlumatları',
proj_title:'Universitetin Akademik<br><em>Analitikası</em>',
m1l:'Alətlər',m2l:'Əhatə',m3l:'Tapşırıqlar',m4l:'Nəticə',
jt:'Keç →',qn1:'Davamiyyət',qn2:'Qiymətlər',qn3:'İnzibati Şikayətlər',qn4:'Tələbə Fəaliyyəti',qn_risk:'⚠ Risklər',qn_rec:'✓ Tövsiyələr',
obj_lbl:'Məqsəd:',kf_lbl:'Əsas Tapıntı:',
obj_text:'Pivot Table vasitəsilə 8 müxtəlif analitik tapşırığı icra etmək — davamiyyət, qiymətlər, inzibati şikayətlər, yataqxana ödəniş statusu və tələbə fəaliyyət səviyyələri. Sonra isə konkret problemli halları Advanced Lookup ilə dərinləşdirmək.',
kf_text:'K. Rzayev statistik kənar nöqtədir: onun tələbələri Mikroiqtisadiyyat üzrə ən aşağı ortalamaya sahibdir və ən çox kəsilən tələbələr də onun sinfindəndir. İnzibati tərəfdə isə Tələbə İşləri şöbəsi ən yüksək şikayət həcminə baxmayaraq ən yavaş icra sürətinə malikdir. Bunun səbəbi, böyük ehtimal ki, şöbədə işçi sayının az olmasıdır.',
f1l:'Ən Yüksək Davamiyyət',f1d:'İdarəetmə fənni — İbrahimova bu fənn üzrə liderdir, ardınca Rzayev gəlir. Aralarındakı fərq müəllimlərin tədris üsulu və ya sinif intizamı izah edə bilər.',
f2l:'Ən Çox Qayıb',f2d:'Tədqiqat Metodlarında ən çox qayıb var (12). 7-nin səbəbi bilinmir, 2-si ailə işi, 2-si nəqliyyat problemi ilə bağlıdır. Kampusla bağlı problem də ola bilər.',
f3l:'Ən Çox Gecikmə',f3d:'Makroiqtisadiyyatda 12 gecikmə var. 3-ü ailə işi ilə bağlıdır, 3-ünün isə səbəbi bilinmir.',
s1_lbl:'Tapşırıq 1–2 — Davamiyyət Analizi',s1_title:'Fənn və Statusa Görə Davamiyyət',
s1_text:'İştirak qeydlərinin sayı ən çox olan fənn Menecmentdir. Tədqiqat Metodlarında ən çox qayıb var (12), onlardan 7-nin isə heç bir qeydiyyatlı səbəbi yoxdur. Makroiqtisadiyyatda gecikmələrin səbəbləri ailə işindən tutmuş bilinməyən hallara qədər dəyişir.',
c1t:'Fənnə Görə Davamiyyət Qeydləri',c2t:'Fənnə Görə Qayıb vs Gecikmə',
i1:'<strong>K. Rzayevin tələbələrinin həm orta balı, həm də davamiyyəti ən aşağıdır.</strong> Buna ən çox kəsilmə sayını da əlavə etdikdə, problem fənnin çətinliyindən deyil, müəllimin tədris metodundan qaynaqlanır.',
i2:'<strong>Mikroiqtisadiyyatda kəsilmiş tələbə sayı həm K. Rzayev, həm də E. Əliyevdə  eynidir,</strong> lakin Rzayevin ümumi kəsilmə sayı daha çoxdur. XLOOKUP analizi hansı tələbələrin, hansı müəllimin fənnindən kəsildiyini dəqiq müəyyən etdi. Problem ya tədris metodu, ya da bal vermə sistemində ola bilər.',
s2_lbl:'Tapşırıq 3 & 8 — Qiymət Analizi + Axtarış',s2_title:'Orta İmtahan Qiymətləri və Kəsilmiş Tələbələr',
s2_text:'Ən aşağı orta bal Mikroiqtisadiyyat fənninə aiddir. Bu fənn daxilində isə K. Rzayevin tələbələrinin ortalaması hamıdan aşağıdır. Həmin müəllimin sinifinin davamiyyəti də ən azdır. Advanced Lookup analizi problemin fənn üzrə deyil, konkret bir müəllimə aid olduğunu təsdiqlədi.',
c3t:'Fənn və Müəllimə Görə Orta İmtahan Balı',
s3_lbl:'Tapşırıq 5 — İnzibati Şikayətlər',s3_title:'Departamente Görə Şikayət Həlli',
c4t:'Departamente Görə Şikayət Həcmi',c5t:'Departamente Görə Orta Həll Müddəti (gün)',
i3:'<strong>Tələbə İşlərinin icra müddəti ən uzundur, üstəlik ümumi şikayət sayı da 80-dir.</strong> Yalnız 18 şikayət qəbul edilib — bu hər hansı bir şöbə arasında ən aşağı qəbul faizidir — 27-si isə hələ icradadır. Bunun səbəbi, ehtimal olunur ki, şöbənin iş yüküylə müqayisədə az sayda işçiyə sahib olmasıdır.',
i4:'<strong>İmtahan Mərkəzinin icrada olan şikayət sayı Tələbə İşlərindən çox olsa da, icranı daha tez yekunlaşdırır.</strong> Bu, daha yaxşı daxili proseslərin və ya daha çox işçinin olduğunu göstərir. İmtahan Mərkəzinin nə etdiyini araşdırmaq və bu yanaşmanı Tələbə İşlərinə tətbiq etmək məqsədəuyğun olardı.',
s4_lbl:'Tapşırıq 6–7 — Resurslar & Fəaliyyət',s4_title:'Yataqxana Ödənişləri & Tələbə Fəaliyyət Səviyyələri',
c6t:'Otaq Növünə Görə Ödəniş Gecikməsi',c7t:'Tələbə Fəaliyyət Səviyyəsi Bölgüsü',
i5:'<strong>3 nəfərlik otaqlarda ödəniş gecikməsi ən çoxdur, üstəlik bu otaqların aylıq qiyməti də ən aşağıdır.</strong> Gecikmələrin ən çoxunun ən ucuz otaqlardan gəlməsi tələbələrin maddi vəziyyətini əsas problem kimi göstərir.',
i6:'<strong>Tələbələrin 51%-i orta aktivlik səviyyəsindədir, yüksək aktivlik qrupu isə diqqət çəkici dərəcədə kiçikdir.</strong> Bu, motivasiya problemi və ya təlim imkanlarının azlığını göstərir. Aşağı aktivlik səviyyəsi adətən daha yüksək tərk etmə riski ilə əlaqəlidir.',
risk_lbl:'Risk Qiymətləndirməsi',risk_title:'⚠ Əsas Risklər',
r1t:'⚠ K. Rzayevin tədris keyfiyyəti — institusional risk',r1b:'Bir müəllim akademik uğursuzluqların və aşağı imtahan nəticələrinin böyük bir hissəsindən məsuldur. Bu məsələ həll edilməzsə, aşağı savadlı tələbələrin məzun olması kimi bir vəziyyət yaranır ki, bu da universitetin nüfuzu və akkreditasiyası üçün risk deməkdir.',
r2t:'⚠ Tələbə İşlərinin şikayət sayı',r2b:'27 iş hələ icradadır və şöbənin qəbul faizi bütün bölmələr arasında ən aşağıdır. Tələbələr inzibati məsələlərini həll edə bilmədikdə, bu onların oxumağa davam etmə imkanına birbaşa təsir edir və instituta olan etibarı zədələyir.',
rec_lbl:'Fəaliyyət Addımları',rec_title:'✓ Tövsiyələr',
rec1t:'→ K. Rzayevin tədris metodlarının nəzərdən keçirilməsi',rec1b:'Həmkarların nəzərdən keçirməsi prosesini başladın: böyük müəllim heyəti nümayəndəsi bir neçə dərsi izləsin, qiymətləndirmə metodologiyasını araşdırsın və strukturlaşdırılmış rəy versin. <strong>Növbəti semestrə qədər nəticələr yaxşılaşmazsa, yenidən vəzifə bölgüsü və ya tədris dəstəyi nəzərdən keçirilməlidir.</strong>',
rec2t:'→ Tələbə İşlərinin şikayət idarəetməsini yenidən qurun',rec2b:"Standart şikayətlər üçün aydın bir icra müddəti müəyyən edin və qeydiyyat və ya maliyyəyə təsir edən işləri ön sıraya alın. İmtahan Mərkəzinin iş axını araşdırılmağa və Tələbə İşlərinə tətbiq edilməyə dəyər.",
rec3t:'→ 3 nəfərlik otaq sakinləri üçün maliyyə dəstəyi',rec3b:'Ödəniş gecikmələrinin əksəriyyəti ən ucuz otaqlardan gəlir, yəni bu tələbələr artıq maliyyə cəhətdən gərgin vəziyyətdədir. Bu qrup üçün taksit ödəniş seçimi və ya fövqəladə yardım mexanizmi tətbiq edilsə, gecikmələrin normaya çevrilməsinin qarşısı alına bilər.',
}};

let lang='en';
try{lang=localStorage.getItem('portfolioLang')||'en';}catch(e){}

function updateAcademicCharts(l){
  const az=l==='az';
  for(const c of Object.values(Chart.instances||{})){
    if(!c.canvas) continue;
    const id=c.canvas.id;
    if(id==='c-att-subj'){
      c.data.labels=az
        ?['İdarəetmə','Makroiqtisadiyyat','Tədqiqat Metodları','Mikroiqtisadiyyat','Maliyyə']
        :['Management','Macroeconomics','Research Methods','Microeconomics','Finance'];
      c.update();
    }
    if(id==='c-att-status'){
      c.data.labels=az
        ?['Tədqiqat Metodları','Makroiqtisadiyyat','İdarəetmə','Maliyyə','Mikroiqtisadiyyat']
        :['Research Methods','Macroeconomics','Management','Finance','Microeconomics'];
      if(c.data.datasets[0]) c.data.datasets[0].label=az?'Qayıb':'Absent';
      if(c.data.datasets[1]) c.data.datasets[1].label=az?'Gecikmə':'Late';
      c.update();
    }
    if(id==='c-complaint-vol'){
      c.data.labels=az
        ?['Tələbə İşləri','İmtahan Mərkəzi','Reyestr','Kitabxana','Maliyyə Şöbəsi']
        :['Student Affairs','Exam Center','Registrar','Library','Finance Dept'];
      c.update();
    }
    if(id==='c-complaint-time'){
      c.data.labels=az
        ?['Tələbə İşləri','Kitabxana','Maliyyə Şöbəsi','Reyestr','İmtahan Mərkəzi']
        :['Student Affairs','Library','Finance Dept','Registrar','Exam Center'];
      c.update();
    }
    if(id==='c-dorm'){
      c.data.labels=az
        ?['3 Nəfərlik Otaq','2 Nəfərlik Otaq','Tək Otaq','Suite']
        :['3-Person Room','2-Person Room','Single Room','Suite'];
      c.update();
    }
    if(id==='c-activity'){
      c.data.labels=az
        ?['Orta Fəaliyyət','Yüksək Fəaliyyət','Aşağı Fəaliyyət']
        :['Medium Activity','High Activity','Low Activity'];
      c.update();
    }
    if(id==='c-grades'){
      c.data.labels=az
        ?['İdarəetmə\\n(İbrahimova)','İdarəetmə\\n(Rzayev)',
          'Makroiqtisadiyyat\\n(ort.)','Maliyyə\\n(ort.)',
          'Mikro\\n(E.  Əliyev)','Mikro\\n(K. Rzayev)']
        :['Management\\n(Ibrahimova)','Management\\n(Rzayev)',
          'Macroeconomics\\n(avg)','Finance\\n(avg)',
          'Micro\\n(E.  Əliyev)','Micro\\n(K. Rzayev)'];
      c.update();
    }
  }
}

function applyAcademicLang(l){
  lang=l;
  try{localStorage.setItem('portfolioLang',l);}catch(e){}
  document.documentElement.lang=l==='az'?'az':'en';
  const t=PAGE_T[l];
  const q=s=>document.querySelector(s);
  const qa=s=>document.querySelectorAll(s);

  const nb=q('.nav-back');if(nb)nb.textContent=t.back;
  const tg=q('.project-tag');if(tg)tg.textContent=t.tag;
  const ti=q('.project-title');if(ti)ti.innerHTML=t.proj_title;

  qa('.meta-label').forEach((el,i)=>{const ks=['m1l','m2l','m3l','m4l'];if(t[ks[i]])el.textContent=t[ks[i]];});

  const qnl=q('.quick-nav-label');if(qnl)qnl.textContent=t.jt;
  const qns=qa('.qn-btn');
  ['qn1','qn2','qn3','qn4','qn_risk','qn_rec'].forEach((k,i)=>{if(qns[i]&&t[k])qns[i].innerHTML=t[k];});

  const sps=qa('.summary p');
  if(sps[0])sps[0].innerHTML='<strong>'+t.obj_lbl+'</strong> '+t.obj_text;
  if(sps[1])sps[1].innerHTML='<strong>'+t.kf_lbl+'</strong> '+t.kf_text;

  qa('.finding-label').forEach((el,i)=>{const ks=['f1l','f2l','f3l'];if(t[ks[i]])el.textContent=t[ks[i]];});
  qa('.finding-desc').forEach((el,i)=>{const ks=['f1d','f2d','f3d'];if(t[ks[i]])el.textContent=t[ks[i]];});

  const cls=qa('.content-label');
  const cts=qa('.content-title');
  const ctx=qa('.content-text');
  const ctit=qa('.chart-title');
  const ils=qa('.insight-text');

  if(cls[0])cls[0].textContent=t.s1_lbl;if(cts[0])cts[0].textContent=t.s1_title;
  if(ctx[0])ctx[0].textContent=t.s1_text;
  if(ctit[0])ctit[0].innerHTML='<span> 01</span> — '+t.c1t;
  if(ctit[1])ctit[1].innerHTML='<span> 02</span> — '+t.c2t;
  if(ils[0])ils[0].innerHTML=t.i1;if(ils[1])ils[1].innerHTML=t.i2;

  if(cls[1])cls[1].textContent=t.s2_lbl;if(cts[1])cts[1].textContent=t.s2_title;
  if(ctx[1])ctx[1].textContent=t.s2_text;
  if(ctit[2])ctit[2].innerHTML='<span> 03</span> — '+t.c3t;

  if(cls[2])cls[2].textContent=t.s3_lbl;if(cts[2])cts[2].textContent=t.s3_title;
  if(ctit[3])ctit[3].innerHTML='<span> 04</span> — '+t.c4t;
  if(ctit[4])ctit[4].innerHTML='<span> 05</span> — '+t.c5t;
  if(ils[2])ils[2].innerHTML=t.i3;if(ils[3])ils[3].innerHTML=t.i4;

  if(cls[3])cls[3].textContent=t.s4_lbl;if(cts[3])cts[3].textContent=t.s4_title;
  if(ctit[5])ctit[5].innerHTML='<span> 06</span> — '+t.c6t;
  if(ctit[6])ctit[6].innerHTML='<span> 07</span> — '+t.c7t;
  if(ils[4])ils[4].innerHTML=t.i5;if(ils[5])ils[5].innerHTML=t.i6;

  if(cls[4])cls[4].textContent=t.risk_lbl;if(cts[4])cts[4].innerHTML=t.risk_title;
  if(cls[5])cls[5].textContent=t.rec_lbl;if(cts[5])cts[5].innerHTML=t.rec_title;

  qa('.risk-block .block-title').forEach((el,i)=>{const ks=['r1t','r2t'];if(t[ks[i]])el.innerHTML=t[ks[i]];});
  qa('.risk-block .block-text').forEach((el,i)=>{const ks=['r1b','r2b'];if(t[ks[i]])el.innerHTML=t[ks[i]];});
  qa('.rec-block .block-title').forEach((el,i)=>{const ks=['rec1t','rec2t','rec3t'];if(t[ks[i]])el.innerHTML=t[ks[i]];});
  qa('.rec-block .block-text').forEach((el,i)=>{const ks=['rec1b','rec2b','rec3b'];if(t[ks[i]])el.innerHTML=t[ks[i]];});

  const fs=qa('footer span');if(fs[1])fs[1].textContent=l==='az'?'© 2026 — Gənc Data Analitik Portfolio':'© 2026 — Junior Data Analyst Portfolio';

  updateAcademicCharts(l);
}
function toggleLang(c){applyAcademicLang(c?'az':'en');}

window.addEventListener('load',()=>applyAcademicLang(lang));
applyAcademicLang(lang);

function setLang(l){
  localStorage.setItem('site-lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.textContent.trim().toLowerCase()===l));
  applyAcademicLang(l);
}
window.addEventListener('load',()=>{
  const l=localStorage.getItem('site-lang')||'en';
  setLang(l);
});
`

export default function AcademicAnalytics() {
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
