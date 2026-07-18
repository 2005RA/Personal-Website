import { useEffect, useState } from 'react'

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
body::after{content:'';position:fixed;inset:0;z-index:0;
  background-image:linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px);
  background-size:60px 60px;pointer-events:none;}
nav,main,footer,.project-hero{position:relative;z-index:1;}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:1.3rem 3rem;background:rgba(250,249,247,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.nav-logo{font-family:var(--mono);font-size:0.84rem;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;}
.nav-back{font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s;}
.nav-back:hover{color:var(--accent);}
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.lang-pill{display:flex;background:#EDE9FE;border-radius:20px;padding:3px;}
.lang-btn{padding:4px 14px;border:none;background:transparent;border-radius:16px;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.06em;
  color:#52525B;transition:all .2s;}
.lang-btn.active{background:white;color:#7C3AED;box-shadow:0 1px 6px rgba(124,58,237,.14);}
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
main{max-width:1100px;margin:0 auto;padding:4rem 3rem 6rem;}
.summary{border-left:2px solid var(--accent);padding:1.5rem 2rem;background:var(--bg2);margin-bottom:4rem;}
.summary p{color:var(--muted);}
.summary p strong{color:var(--text);}
.content-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:0.5rem;}
.content-title{font-family:var(--serif);font-size:1.75rem;margin-bottom:1.25rem;}
.content-text{color:var(--muted);margin-bottom:2rem;max-width:740px;font-size:0.92rem;}
.problem-block{margin-bottom:2.5rem;}
.problem-num{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:0.6rem;}
.risk-block{border:1px solid rgba(239,68,68,0.25);background:rgba(239,68,68,0.05);padding:1.5rem 1.75rem;margin-bottom:0.9rem;}
.rec-block{border:1px solid rgba(5,150,105,0.25);background:rgba(5,150,105,0.06);padding:1.5rem 1.75rem;}
.block-title{font-family:var(--mono);font-size:0.66rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.6rem;}
.risk-block .block-title{color:var(--accent3);}
.rec-block .block-title{color:var(--accent2);}
.block-text{font-size:0.86rem;color:var(--muted);}
.block-text strong{color:var(--text);}
.insights-list{list-style:none;margin-top:0.75rem;}
.insights-list li{padding:0.6rem 0;border-top:1px solid rgba(5,150,105,0.15);display:flex;gap:0.75rem;align-items:flex-start;}
.insights-list li:first-child{border-top:none;}
.insight-bullet{font-family:var(--mono);font-size:0.72rem;color:var(--accent2);flex-shrink:0;margin-top:0.1rem;}
.insight-text{font-size:0.85rem;color:var(--muted);}
.insight-text strong{color:var(--text);}
.flow-wrap{background:var(--bg2);border:1px solid var(--border);padding:2.5rem 2rem;margin-bottom:1.5rem;}
.flow-link{display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--mono);font-size:0.75rem;
  color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent);padding-bottom:2px;}
.scenario-grid{display:grid;gap:1.5px;background:var(--border);margin-bottom:3rem;}
.scenario-card{background:var(--bg2);padding:1.75rem 2rem;}
.scenario-title{font-family:var(--serif);font-size:1.15rem;margin-bottom:1rem;}
.scenario-row{margin-bottom:0.65rem;font-size:0.86rem;}
.scenario-row:last-child{margin-bottom:0;}
.scenario-row span{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;
  color:var(--accent);display:block;margin-bottom:0.2rem;}
.scenario-row p{color:var(--muted);}
.video-wrap{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:1.5rem;}
.video-wrap video{width:100%;display:block;background:#000;}
.divider{border:none;border-top:1px solid var(--border);margin:3rem 0;}
.section-anchor{scroll-margin-top:110px;}
footer{border-top:1px solid var(--border);padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;}
footer span{font-family:var(--mono);font-size:0.62rem;color:var(--muted);letter-spacing:0.1em;}
footer a{color:var(--accent);text-decoration:none;}

/* ---- Flowchart ---- */
.fc{display:flex;flex-direction:column;align-items:center;}
.fc-shared{width:100%;max-width:560px;display:flex;flex-direction:column;align-items:center;gap:0.35rem;}
.fc-node{width:100%;text-align:center;padding:0.85rem 1.25rem;border:1px solid var(--border);background:var(--bg2);
  font-size:0.83rem;color:var(--text);}
.fc-node.cap{font-family:var(--mono);font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;
  background:var(--accent);color:#fff;border:none;border-radius:30px;padding:0.6rem 1.25rem;}
.fc-node.end{background:var(--text);}
.fc-node.decision{background:#fdf6e3;border-color:#e8cf85;font-weight:600;}
.fc-arrow{font-family:var(--mono);color:var(--muted);font-size:1rem;line-height:1;padding:0.1rem 0;}
.fc-columns{display:grid;grid-template-columns:1fr 1fr;gap:2rem;width:100%;margin:0.35rem 0 1.25rem;align-items:start;}
.fc-col{display:flex;flex-direction:column;align-items:center;gap:0.35rem;}
.fc-col-label{font-family:var(--mono);font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;
  padding:0.3rem 0.9rem;border-radius:20px;margin-bottom:0.3rem;}
.fc-col-label.yes{background:rgba(5,150,105,0.1);color:var(--accent2);}
.fc-col-label.no{background:rgba(239,68,68,0.1);color:var(--accent3);}
.fc-split{display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;width:100%;}
.fc-split .fc-node{font-size:0.74rem;padding:0.7rem 0.6rem;}
.fc-outcomes{display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;width:100%;}
.fc-outcome{border:1px solid var(--border);padding:0.7rem 0.5rem;text-align:center;}
.fc-outcome-title{font-family:var(--mono);font-size:0.6rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.4rem;}
.fc-outcome-text{font-size:0.72rem;color:var(--muted);}
.fc-outcome.ok{border-color:rgba(5,150,105,.3);background:rgba(5,150,105,.05);}
.fc-outcome.ok .fc-outcome-title{color:var(--accent2);}
.fc-outcome.warn{border-color:rgba(217,119,6,.3);background:rgba(217,119,6,.05);}
.fc-outcome.warn .fc-outcome-title{color:#d97706;}
.fc-outcome.danger{border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.05);}
.fc-outcome.danger .fc-outcome-title{color:var(--accent3);}
.fc-outcome.success{border-color:rgba(124,58,237,.3);background:rgba(124,58,237,.05);}
.fc-outcome.success .fc-outcome-title{color:var(--accent);}
.fc-loop{font-family:var(--mono);font-size:0.66rem;color:var(--accent);text-align:center;padding:0.45rem 0.6rem;
  border:1px dashed var(--accent);border-radius:6px;}
.fc-note{font-size:0.72rem;color:var(--muted);text-align:center;}

@media(max-width:768px){
  nav{padding:1rem 1.5rem;}
  .project-hero,.quick-nav{padding-left:1.5rem;padding-right:1.5rem;}
  main{padding:3rem 1.5rem 5rem;}
  .scenario-grid{grid-template-columns:1fr !important;}
  .fc-columns{grid-template-columns:1fr;}
  .fc-outcomes{grid-template-columns:1fr 1fr;}
}
`

/* ---------------------------------------------------------------------- */
/* Bilingual content                                                       */
/* ---------------------------------------------------------------------- */

const T = {
  az: {
    tag: 'IT Biznes Analizi · Proses Təkmilləşdirilməsi',
    titleLine1: 'Hotel Rezervasiya Sisteminin',
    titleEm: 'Təkmilləşdirilməsi',
    back: '← Portfolioya qayıt',
    meta: [
      { label: 'Növ', value: 'IT Biznes Analiz · Case Study' },
      { label: 'Alətlər', value: 'Proses Modelləşdirmə · Whimsical' },
      { label: 'Sahə', value: 'Ləğvetmə · No-show · Gözləmə Siyahısı Siyasətləri' },
      { label: 'Məqsəd', value: 'Rezervasiya ləğvləri və boş qalan otaqlardan yaranan gəlir itkisinin azaldılması' },
    ],
    quickNavLabel: 'Keç →',
    quickNav: [
      { href: '#problem', label: 'Problem Analizi' },
      { href: '#flow', label: 'Proses Axını' },
      { href: '#scenarios', label: 'Kritik Ssenarilər' },
      { href: '#video', label: 'Video' },
    ],
    summaryGoalLabel: 'Məqsəd:',
    summaryGoal: 'Otel rezervasiya sistemində son anda ləğvetmə, no-show halları və boş qalan otaqlardan yaranan gəlir itkisinin qarşısını almaq üçün proses təkmilləşdirmələri təklif etmək.',
    summaryPropLabel: 'Əsas Təklif:',
    summaryProp: '48 saatlıq ödənişsiz ləğvetmə siyasəti, check-in öncəsi avtomatik xatırlatmalar, no-show üçün 3 saatlıq güzəşt müddəti ilə avtomatik cərimə, və boşalan otaqlar üçün sadiq/adi müştəri gözləmə siyahısı sistemi.',
    problemLabel: 'Problem Analizi',
    problemTitle: 'Problem Analizi və Həll',
    problemWord: 'Problem',
    solutionWord: '✓ Həll',
    problemBadge: '⚠ Problem',
    problems: [
      {
        problem: 'Müştərilər rezervasiya etdikləri otaqları son anda ləğv edirlər. Əsas səbəb — ləğvin heç bir cəriməsi olmamasıdır.',
        solution: 'Müştəri check-in tarixindən 48 saat əvvələ qədər ödənişsiz ləğv edə bilər. 48 saatdan sonra ləğv edərsə 1 gecəlik otaq haqqı və oteldən asılı olaraq müəyyən vergilər tutulur — Marriott və Hilton kimi böyük otellərdə tətbiq olunan ləğvetmə siyasətinə uyğun olaraq.',
      },
      {
        problem: 'Bəzi müştərilər rezervasiya etsələr də ümumiyyətlə otelə gəlmirlər (No-show). Bunun da əsas səbəbi cərimə tətbiq olunmamasıdır.',
        solution: 'Check-in tarixindən 48 və 24 saat əvvəl SMS/mail xatırlatması göndərilir. Check-in günü 3 saatlıq güzəşt müddəti verilir; bu müddət ərzində də gəlmirsə, 1 gecəlik otaq haqqı və vergilər ilə cərimə edilir.',
      },
      {
        problem: 'No-show halları uzun müddət boş qalan otaqlara səbəb olur: status sistemdə avtomatik yenilənmir (manual güncəllənmə tələb edir) və no-show üçün cərimə tətbiq olunmur.',
        solutionList: [
          'Əməkdaş check-in zamanı qeydiyyatı anında təsdiqləyir; güzəşt vaxtı bitdikdə sistem əməkdaşa bildiriş göndərib statusu avtomatik yeniləyir.',
          '3 saatlıq güzəşt bitdikdə no-show əməkdaş tərəfindən təsdiqlənir və 1 gecəlik ödəniş + vergilər qeydiyyat kartından avtomatik çıxılır.',
          'Müştəriyə 2 tarif seçimi: 1) kart nömrəsi ilə rezerv — no-show halında yalnız 1 gecəlik haqq tutulur; 2) endirimli tam ödəniş — no-show halında ödəniş geri qaytarılmır.',
          'Databaza əsasında no-show/ləğvetmə trendləri (bayramlar, tətillər, konsertlər) və müştəri mənbəyi (birbaşa sayt / agentlik) təhlil olunur.',
        ],
      },
      {
        problem: 'Bir otaq üçün yalnız bir rezervasiyanın olması risklidir — müştəri gəlmədikdə həm gəlir itkisi, həm də yeni müştərilər üçün "dolu" görünən boş otaq itkisi yaranır.',
        solutionList: [
          'Hər otaq üçün gözləmə siyahısı: ilk müştəri gəlməzsə/ləğv etsə, növbəti müştəriyə 30–60 dəqiqəlik təsdiq müddəti ilə bildiriş göndərilir (kiçik bonuslar — pulsuz səhər yeməyi və s. — qarşılığında).',
          'Prioritet gözləmə siyahısı: sadiq müştərilər əvvəlcə bildiriş alır, qəbul etmədikdə növbə adi müştərilərin siyahısına keçir.',
        ],
      },
    ],
    flowLabel: 'Proses Axını',
    flowTitle: 'Rezervasiya Proses Diaqramı',
    flowText: 'Bütün proses — otaq axtarışından tutmuş tarif seçiminə, gözləmə siyahısına və no-show halına qədər — aşağıdakı sxemdə göstərilib.',
    flowLink: 'İnteraktiv diaqrama bax (Whimsical) ↗',
    scenariosLabel: 'Kritik Ssenarilər',
    scenariosTitle: '4 Əsas Ssenari',
    rowLabels: { situation: 'Vəziyyət', system: 'Sistem', result: 'Nəticə' },
    scenarios: [
      {
        title: '1. Vaxtında Ləğvetmə',
        situation: 'Müştəri check-in-dən 48 saat öncəyə qədər rezervasiyanı ləğv edir.',
        system: 'Heç bir cərimə tətbiq olunmur. Sistem əvvəlcə sadiq müştərilərin gözləmə siyahısını, orada müştəri olmadıqda isə adi müştərilərin siyahısındakı ilk müştəriyə bildiriş göndərir. Hər iki siyahı boşdursa, otaq sistemdə "əlçatan" olaraq qeyd edilir.',
        result: 'Otaq boş qalmır və ödəniş itkisi yaşanmır.',
      },
      {
        title: '2. Son Anda Ləğvetmə',
        situation: 'Müştəri rezervasiyanı check-in-ə 24 saat qalmış ləğv edir.',
        system: 'Ödəniş növündən asılı olaraq cərimə tətbiq edilir: kart nömrəsi ilə rezervdə 1 gecəlik otaq haqqı və vergilər avtomatik tutulur; endirimli tam ödənişdə isə rezervasiya ləğv olunur və ödəniş geri qaytarılmır.',
        result: 'Otel gəlir itirmir.',
      },
      {
        title: '3. No-show Halı',
        situation: 'Müştəri check-in günü 3 saatlıq güzəşt müddəti bitsə də otelə gəlmir.',
        system: 'Tarifdən asılı olaraq cərimə tətbiq olunur. Gözləmə siyahısında müştəri varsa ona bildiriş göndərilir, yoxdursa otağın statusu "əlçatan" olaraq yenilənir.',
        result: 'Otel gəlir itkisi yaşamır.',
      },
      {
        title: '4. Ehtiyat Siyahısına Yazılma',
        situation: 'Müştərinin rezerv etmək istədiyi otaq artıq doludur.',
        system: 'Sistem müştərinin tipini (sadiq/adi) müəyyən edir və kiçik bir bonus qarşılığında (məsələn, ödənişsiz səhər yeməyi) uyğun gözləmə siyahısına yazılmağı təklif edir.',
        result: 'Otaq boşaldıqda bildiriş göndərilir. 30–60 dəqiqə ərzində təsdiq edildiyi halda tarifə əsasən ödəniş tutulur — otel nə gəlir, nə də müştəri itirmir.',
      },
    ],
    videoLabel: 'Video',
    videoTitle: 'Layihə Təqdimatı',
    videoText: 'Layihənin qısa video izahı.',
    footerBack: 'Portfolioya qayıt →',
    fc: {
      start: 'Müştəri hotel və tarixləri seçir',
      search: 'Sistem uyğun otaqları göstərir',
      available: 'Otaq mövcuddur?',
      no: 'Xeyr',
      yes: 'Bəli',
      custType: 'Müştəri tipi?',
      newCust: 'Adi / yeni müştəri',
      loyalCust: 'Sadiq müştəri (prioritet)',
      waitlist: 'Ehtiyat siyahısına yazılma (ödəniş ön-təsdiqi)',
      notifyFirst: 'İlk müştəriyə bonuslu bildiriş, 30–60 dəq cavab müddəti',
      confirmed: '30 dəq ərzində təsdiqlədimi?',
      confirmedYes: 'Rezervasiya yaranır, tarif seçilir → sağdakı axına keçir',
      confirmedNo: 'Siyahıdan çıxarılır, növbəti müştəriyə bildiriş göndərilir',
      loopNext: '↻ növbəti müştəriyə təkrarlanır',
      rateChoice: 'Tarif seçimi',
      flexRate: 'Sərbəst (refundable) — 48 saat pulsuz ləğv',
      discRate: 'Endirimli — geri qaytarılmayan, 10–20% ucuz',
      confirm: 'Rezervasiya təsdiqlənir, bildiriş göndərilir',
      reminders: '48 saat və 24 saat əvvəl avtomatik xatırlatma',
      whatDoes: 'Müştəri nə edir?',
      out1t: 'Vaxtında ləğv (48h+)', out1: 'Cərimə yoxdur',
      out2t: 'Son anda ləğv (<48h)', out2: '1 gecəlik haqq + vergi',
      out3t: 'No-show (güzəşt bitib)', out3: '1 gecəlik haqq + vergi',
      out4t: 'Check-in', out4: 'Uğurlu qonaqlama',
      merge: 'İlk 3 nəticədə otaq statusu real-time "əlçatan" olur',
      waitlistCheck: 'Ehtiyat siyahısında müştəri var?',
      loopBack: '↻ Bəli — növbəti müştəriyə bildiriş göndərilir (yuxarıdakı addıma qayıdır)',
      generalSearch: 'Xeyr — otaq ümumi axtarış nəticələrində göstərilir',
      end: 'Prosesin sonu',
    },
  },

  en: {
    tag: 'IT Business Analysis · Process Improvement',
    titleLine1: 'Hotel Reservation System',
    titleEm: 'Improvement',
    back: '← Back to Portfolio',
    meta: [
      { label: 'Type', value: 'IT Business Analysis · Case Study' },
      { label: 'Tools', value: 'Process Modeling · Whimsical' },
      { label: 'Scope', value: 'Cancellation · No-show · Waitlist Policies' },
      { label: 'Goal', value: 'Reducing revenue loss from reservation cancellations and empty rooms' },
    ],
    quickNavLabel: 'Jump to →',
    quickNav: [
      { href: '#problem', label: 'Problem Analysis' },
      { href: '#flow', label: 'Process Flow' },
      { href: '#scenarios', label: 'Critical Scenarios' },
      { href: '#video', label: 'Video' },
    ],
    summaryGoalLabel: 'Goal:',
    summaryGoal: 'To propose process improvements that prevent revenue loss caused by last-minute cancellations, no-shows, and rooms left vacant in the hotel reservation system.',
    summaryPropLabel: 'Main Proposal:',
    summaryProp: 'A 48-hour free-cancellation policy, automatic reminders before check-in, an automatic penalty after a 3-hour grace period for no-shows, and a loyal/regular customer waitlist system for rooms that become available.',
    problemLabel: 'Problem Analysis',
    problemTitle: 'Problem Analysis & Solutions',
    problemWord: 'Problem',
    solutionWord: '✓ Solution',
    problemBadge: '⚠ Problem',
    problems: [
      {
        problem: 'Customers cancel their reserved rooms at the last minute. The main reason is that cancellation carries no penalty at all.',
        solution: "A customer can cancel free of charge up until 48 hours before the check-in date. Cancelling after that deducts one night's room rate plus certain taxes (depending on the hotel) — in line with the cancellation policies used by major chains such as Marriott and Hilton.",
      },
      {
        problem: "Some customers make a reservation but never show up at the hotel at all (no-show). Here too, the main reason is that no penalty is applied.",
        solution: "SMS/email reminders are sent 48 and 24 hours before check-in. On the check-in day a 3-hour grace period is given; if the guest still hasn't arrived after that, one night's room rate plus taxes is charged as a penalty.",
      },
      {
        problem: "No-shows leave rooms empty for long periods: the status isn't updated automatically in the system (it requires a manual update), and no penalty is applied for no-shows.",
        solutionList: [
          "Staff confirm check-in the moment the guest registers; once the grace period ends, the system notifies staff and updates the room status automatically.",
          "Once the 3-hour grace period ends, staff confirm the no-show and one night's payment plus taxes is automatically charged to the card on file.",
          "Customers are given 2 rate options: 1) reserve with just a card number — only one night's charge applies on no-show; 2) discounted prepayment — no refund on no-show.",
          "The database is used to analyze no-show/cancellation trends (holidays, vacations, concerts) and customer source (direct site vs. travel agency).",
        ],
      },
      {
        problem: 'Relying on a single reservation per room is risky — if the guest doesn\'t show up, it causes both revenue loss and the loss of new customers, since the vacant room still appears as "full."',
        solutionList: [
          "A waitlist for every room: if the first customer doesn't show up or cancels, the next customer is notified with a 30–60 minute window to confirm (in exchange for a small perk, e.g. free breakfast).",
          "A priority waitlist: loyal customers are notified first; if none accept, the slot passes to the regular-customer waitlist.",
        ],
      },
    ],
    flowLabel: 'Process Flow',
    flowTitle: 'Reservation Process Diagram',
    flowText: 'The entire process — from room search to rate selection, the waitlist, and no-show handling — is mapped out below.',
    flowLink: 'View the interactive diagram (Whimsical) ↗',
    scenariosLabel: 'Critical Scenarios',
    scenariosTitle: '4 Key Scenarios',
    rowLabels: { situation: 'Situation', system: 'System', result: 'Result' },
    scenarios: [
      {
        title: '1. On-Time Cancellation',
        situation: 'The customer cancels the reservation up to 48 hours before check-in.',
        system: 'No penalty is applied at all. The system first checks the loyal-customer waitlist, then, if empty, notifies the first customer on the regular waitlist. If both lists are empty, the room is marked "available" in the system.',
        result: "The room doesn't stay empty and no payment is lost.",
      },
      {
        title: '2. Last-Minute Cancellation',
        situation: 'The customer cancels the reservation 24 hours before check-in.',
        system: "A penalty is applied depending on the payment type: for a card-only reservation, one night's room rate plus taxes is charged automatically; for a discounted prepayment, the reservation is cancelled and the payment is not refunded.",
        result: "The hotel doesn't lose revenue.",
      },
      {
        title: '3. No-show',
        situation: "The guest still hasn't arrived after the 3-hour grace period on the check-in day.",
        system: "A penalty is applied according to the rate type. If there's a customer on the waitlist, they're notified — otherwise the room's status updates to \"available.\"",
        result: "The hotel doesn't experience revenue loss.",
      },
      {
        title: '4. Joining the Waitlist',
        situation: 'The room the customer wants to book is already full.',
        system: 'The system identifies the customer type (loyal/regular) and offers to add them to the matching waitlist in exchange for a small perk (e.g. free breakfast).',
        result: "When the room becomes available, a notification is sent. If confirmed within 30–60 minutes, payment is charged per the chosen rate — the hotel loses neither the revenue nor the customer.",
      },
    ],
    videoLabel: 'Video',
    videoTitle: 'Project Walkthrough',
    videoText: 'A short video walkthrough of the project.',
    footerBack: 'Back to Portfolio →',
    fc: {
      start: 'Customer selects hotel & dates',
      search: 'System shows available rooms',
      available: 'Is a room available?',
      no: 'No',
      yes: 'Yes',
      custType: 'Customer type?',
      newCust: 'New / regular customer',
      loyalCust: 'Loyal customer (priority)',
      waitlist: 'Added to waitlist (payment pre-authorized)',
      notifyFirst: 'First customer gets a bonus offer, 30–60 min to respond',
      confirmed: 'Confirmed within 30 min?',
      confirmedYes: 'Reservation is created, rate is chosen → joins the flow on the right',
      confirmedNo: 'Removed from the list, next customer is notified',
      loopNext: '↻ repeats for the next customer',
      rateChoice: 'Rate selection',
      flexRate: 'Flexible (refundable) — free cancellation up to 48h',
      discRate: 'Discounted — non-refundable, 10–20% cheaper',
      confirm: 'Reservation confirmed, notification sent',
      reminders: 'Automatic reminder 48h and 24h before check-in',
      whatDoes: 'What does the customer do?',
      out1t: 'On-time cancel (48h+)', out1: 'No penalty',
      out2t: 'Late cancel (<48h)', out2: "1 night's rate + taxes",
      out3t: 'No-show (grace period over)', out3: "1 night's rate + taxes",
      out4t: 'Check-in', out4: 'Successful stay',
      merge: 'For the first 3 outcomes, room status updates to "available" in real time',
      waitlistCheck: 'Is anyone on the waitlist?',
      loopBack: '↻ Yes — the next customer is notified (loops back to the step above)',
      generalSearch: 'No — the room appears in general search results',
      end: 'End of process',
    },
  },
}

export default function HotelReservation() {
  const [lang, setLang] = useState('en')
  const t = T[lang]

  useEffect(() => {}, [])

  return (
    <>
      <style>{css}</style>

      <nav>
        <a href="${import.meta.env.BASE_URL}" className="nav-logo">R.A.</a>
        <div className="nav-right">
          <a href="${import.meta.env.BASE_URL}" className="nav-back">{t.back}</a>
          <div className="lang-pill">
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn${lang === 'az' ? ' active' : ''}`} onClick={() => setLang('az')}>AZ</button>
          </div>
        </div>
      </nav>

      <div className="project-hero">
        <div className="project-tag">{t.tag}</div>
        <h1 className="project-title">
          {t.titleLine1}<br /><em>{t.titleEm}</em>
        </h1>
        <div className="project-meta">
          {t.meta.map((m, i) => (
            <div key={i}>
              <div className="meta-label">{m.label}</div>
              <div className="meta-value">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-nav">
        <span className="quick-nav-label">{t.quickNavLabel}</span>
        {t.quickNav.map((q, i) => (
          <a key={i} className="qn-btn" href={q.href}>{q.label}</a>
        ))}
      </div>

      <main>
        <div className="summary">
          <p><strong>{t.summaryGoalLabel}</strong> {t.summaryGoal}</p>
          <p style={{ marginTop: '0.75rem' }}><strong>{t.summaryPropLabel}</strong> {t.summaryProp}</p>
        </div>

        <div id="problem" className="section-anchor">
          <p className="content-label">{t.problemLabel}</p>
          <h2 className="content-title">{t.problemTitle}</h2>
        </div>

        {t.problems.map((p, i) => (
          <div className="problem-block" key={i}>
            <div className="problem-num">{t.problemWord} {i + 1} / {t.problems.length}</div>
            <div className="risk-block">
              <div className="block-title">{t.problemBadge}</div>
              <p className="block-text">{p.problem}</p>
            </div>
            <div className="rec-block">
              <div className="block-title">{t.solutionWord}</div>
              {p.solution && <p className="block-text">{p.solution}</p>}
              {p.solutionList && (
                <ul className="insights-list">
                  {p.solutionList.map((item, j) => (
                    <li key={j}>
                      <span className="insight-bullet">{String(j + 1).padStart(2, '0')}</span>
                      <span className="insight-text">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        <hr className="divider" />

        <div id="flow" className="section-anchor">
          <p className="content-label">{t.flowLabel}</p>
          <h2 className="content-title">{t.flowTitle}</h2>
          <p className="content-text">{t.flowText}</p>
        </div>

        <div className="flow-wrap">
          <div className="fc">
            <div className="fc-shared">
              <div className="fc-node cap">{t.fc.start}</div>
              <div className="fc-arrow">↓</div>
              <div className="fc-node">{t.fc.search}</div>
              <div className="fc-arrow">↓</div>
              <div className="fc-node decision">{t.fc.available}</div>
            </div>

            <div className="fc-columns">
              {/* LEFT — room not available */}
              <div className="fc-col">
                <div className="fc-col-label no">{t.fc.no}</div>
                <div className="fc-node decision">{t.fc.custType}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-split">
                  <div className="fc-node">{t.fc.newCust}</div>
                  <div className="fc-node">{t.fc.loyalCust}</div>
                </div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node">{t.fc.waitlist}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node">{t.fc.notifyFirst}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node decision">{t.fc.confirmed}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-split">
                  <div className="fc-node">✓ {t.fc.confirmedYes}</div>
                  <div className="fc-node">✕ {t.fc.confirmedNo}</div>
                </div>
                <div className="fc-loop">{t.fc.loopNext}</div>
              </div>

              {/* RIGHT — room available */}
              <div className="fc-col">
                <div className="fc-col-label yes">{t.fc.yes}</div>
                <div className="fc-node decision">{t.fc.rateChoice}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-split">
                  <div className="fc-node">{t.fc.flexRate}</div>
                  <div className="fc-node">{t.fc.discRate}</div>
                </div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node">{t.fc.confirm}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node">{t.fc.reminders}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-node decision">{t.fc.whatDoes}</div>
                <div className="fc-arrow">↓</div>
                <div className="fc-outcomes">
                  <div className="fc-outcome ok">
                    <div className="fc-outcome-title">{t.fc.out1t}</div>
                    <div className="fc-outcome-text">{t.fc.out1}</div>
                  </div>
                  <div className="fc-outcome warn">
                    <div className="fc-outcome-title">{t.fc.out2t}</div>
                    <div className="fc-outcome-text">{t.fc.out2}</div>
                  </div>
                  <div className="fc-outcome danger">
                    <div className="fc-outcome-title">{t.fc.out3t}</div>
                    <div className="fc-outcome-text">{t.fc.out3}</div>
                  </div>
                  <div className="fc-outcome success">
                    <div className="fc-outcome-title">{t.fc.out4t}</div>
                    <div className="fc-outcome-text">{t.fc.out4}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fc-shared">
              <div className="fc-arrow">↓</div>
              <div className="fc-node">{t.fc.merge}</div>
              <div className="fc-arrow">↓</div>
              <div className="fc-node decision">{t.fc.waitlistCheck}</div>
              <div className="fc-arrow">↓</div>
              <div className="fc-split" style={{ maxWidth: '560px' }}>
                <div className="fc-loop">{t.fc.loopBack}</div>
                <div className="fc-node">{t.fc.generalSearch}</div>
              </div>
              <div className="fc-arrow">↓</div>
              <div className="fc-node cap end">{t.fc.end}</div>
            </div>
          </div>
        </div>

        <p style={{ marginBottom: '3rem' }}>
          <a
            className="flow-link"
            href="https://whimsical.com/ruqeyya-a/hotel-birbank-GeWD7LW7sPdoGkaPCWcASS"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.flowLink}
          </a>
        </p>

        <hr className="divider" />

        <div id="scenarios" className="section-anchor">
          <p className="content-label">{t.scenariosLabel}</p>
          <h2 className="content-title">{t.scenariosTitle}</h2>
        </div>
        <div className="scenario-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {t.scenarios.map((s, i) => (
            <div className="scenario-card" key={i}>
              <div className="scenario-title">{s.title}</div>
              <div className="scenario-row">
                <span>{t.rowLabels.situation}</span>
                <p>{s.situation}</p>
              </div>
              <div className="scenario-row">
                <span>{t.rowLabels.system}</span>
                <p>{s.system}</p>
              </div>
              <div className="scenario-row">
                <span>{t.rowLabels.result}</span>
                <p>{s.result}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        <div id="video" className="section-anchor">
          <p className="content-label">{t.videoLabel}</p>
          <h2 className="content-title">{t.videoTitle}</h2>
          <p className="content-text">{t.videoText}</p>
        </div>
        <div className="video-wrap">
          <video controls preload="none">
            <source src={`${import.meta.env.BASE_URL}videos/hotel-reservation-demo.mp4`} type="video/mp4" />
          </video>
        </div>
      </main>

      <footer>
        <span>© 2026 — Ruqiyya Aghatalibova</span>
        <a href="${import.meta.env.BASE_URL}">{t.footerBack}</a>
      </footer>
    </>
  )
}