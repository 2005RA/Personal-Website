import { useEffect } from 'react'

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
.lang-badge{font-family:var(--mono);font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);
  border:1px solid var(--border);padding:0.3rem 0.7rem;border-radius:20px;}
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
.flow-wrap{background:var(--bg2);border:1px solid var(--border);padding:2rem;margin-bottom:1.5rem;text-align:center;}
.flow-wrap img{max-width:100%;border:1px solid var(--border);}
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
.video-note{font-size:0.78rem;color:var(--muted);margin-top:1rem;}
.video-note code{font-family:var(--mono);background:var(--bg3);padding:0.15rem 0.4rem;border-radius:4px;}
.divider{border:none;border-top:1px solid var(--border);margin:3rem 0;}
.section-anchor{scroll-margin-top:110px;}
footer{border-top:1px solid var(--border);padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;}
footer span{font-family:var(--mono);font-size:0.62rem;color:var(--muted);letter-spacing:0.1em;}
footer a{color:var(--accent);text-decoration:none;}
@media(max-width:768px){
  nav{padding:1rem 1.5rem;}
  .project-hero,.quick-nav{padding-left:1.5rem;padding-right:1.5rem;}
  main{padding:3rem 1.5rem 5rem;}
  .scenario-grid{grid-template-columns:1fr !important;}
}
`

export default function HotelReservation() {
  useEffect(() => {
    // Keep the fixed nav's scrolled/shadow behaviour consistent with the
    // rest of the site if you later add scroll-based effects here.
  }, [])

  return (
    <>
      <style>{css}</style>

      <nav>
        <a href="${import.meta.env.BASE_URL}" className="nav-logo">R.A.</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="${import.meta.env.BASE_URL}" className="nav-back">← Back to Portfolio</a>
          <span className="lang-badge">AZ</span>
        </div>
      </nav>

      <div className="project-hero">
        <div className="project-tag">IT Biznes Analizi · Proses Təkmilləşdirilməsi</div>
        <h1 className="project-title">
          Hotel Rezervasiya Sisteminin<br /><em>Təkmilləşdirilməsi</em>
        </h1>
        <div className="project-meta">
          <div>
            <div className="meta-label">Növ</div>
            <div className="meta-value">IT Biznes Analiz · Case Study</div>
          </div>
          <div>
            <div className="meta-label">Alətlər</div>
            <div className="meta-value">Proses Modelləşdirmə · Whimsical</div>
          </div>
          <div>
            <div className="meta-label">Sahə</div>
            <div className="meta-value">Ləğvetmə · No-show · Gözləmə Siyahısı Siyasətləri</div>
          </div>
          <div>
            <div className="meta-label">Məqsəd</div>
            <div className="meta-value">Rezervasiya ləğvləri və boş qalan otaqlardan yaranan gəlir itkisinin azaldılması</div>
          </div>
        </div>
      </div>

      <div className="quick-nav">
        <span className="quick-nav-label">Keç →</span>
        <a className="qn-btn" href="#problem">Problem Analizi</a>
        <a className="qn-btn" href="#flow">Proses Axını</a>
        <a className="qn-btn" href="#scenarios">Kritik Ssenarilər</a>
        <a className="qn-btn" href="#video">Video</a>
      </div>

      <main>
        <div className="summary">
          <p>
            <strong>Məqsəd:</strong> Otel rezervasiya sistemində son anda ləğvetmə, no-show halları
            və boş qalan otaqlardan yaranan gəlir itkisinin qarşısını almaq üçün proses
            təkmilləşdirmələri təklif etmək.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <strong>Əsas Təklif:</strong> 48 saatlıq ödənişsiz ləğvetmə siyasəti, check-in öncəsi
            avtomatik xatırlatmalar, no-show üçün 3 saatlıq güzəşt müddəti ilə avtomatik cərimə, və
            boşalan otaqlar üçün sadiq/adi müştəri gözləmə siyahısı sistemi.
          </p>
        </div>

        <div id="problem" className="section-anchor">
          <p className="content-label">Problem Analizi</p>
          <h2 className="content-title">Problem Analizi və Həll</h2>
        </div>

        <div className="problem-block">
          <div className="problem-num">Problem 1 / 4</div>
          <div className="risk-block">
            <div className="block-title">⚠ Problem</div>
            <p className="block-text">
              Müştərilər rezervasiya etdikləri otaqları son anda ləğv edirlər. Əsas səbəb — ləğvin
              heç bir cəriməsi olmamasıdır.
            </p>
          </div>
          <div className="rec-block">
            <div className="block-title">✓ Həll</div>
            <p className="block-text">
              Müştəri check-in tarixindən <strong>48 saat əvvələ qədər ödənişsiz</strong> ləğv edə
              bilər. 48 saatdan sonra ləğv edərsə 1 gecəlik otaq haqqı və müəyyən vergilər tutulur —
              Marriott və Hilton kimi böyük otellərin siyasətinə uyğun olaraq.
            </p>
          </div>
        </div>

        <div className="problem-block">
          <div className="problem-num">Problem 2 / 4</div>
          <div className="risk-block">
            <div className="block-title">⚠ Problem</div>
            <p className="block-text">
              Bəzi müştərilər rezervasiya etsələr də ümumiyyətlə otelə gəlmirlər (No-show). Bunun da
              əsas səbəbi cərimə tətbiq olunmamasıdır.
            </p>
          </div>
          <div className="rec-block">
            <div className="block-title">✓ Həll</div>
            <p className="block-text">
              Check-in tarixindən <strong>48 və 24 saat əvvəl</strong> SMS/mail xatırlatması
              göndərilir. Check-in günü <strong>3 saatlıq güzəşt müddəti</strong> verilir; bu müddət
              ərzində də gəlmirsə, 1 gecəlik otaq haqqı və vergilər ilə cərimə edilir.
            </p>
          </div>
        </div>

        <div className="problem-block">
          <div className="problem-num">Problem 3 / 4</div>
          <div className="risk-block">
            <div className="block-title">⚠ Problem</div>
            <p className="block-text">
              No-show halları uzun müddət boş qalan otaqlara səbəb olur: status sistemdə avtomatik
              yenilənmir (manual güncəllənmə tələb edir) və no-show üçün cərimə tətbiq olunmur.
            </p>
          </div>
          <div className="rec-block">
            <div className="block-title">✓ Həll</div>
            <ul className="insights-list">
              <li>
                <span className="insight-bullet">01</span>
                <span className="insight-text">
                  Əməkdaş check-in zamanı qeydiyyatı anında təsdiqləyir; güzəşt vaxtı bitdikdə sistem
                  əməkdaşa bildiriş göndərib statusu avtomatik yeniləyir.
                </span>
              </li>
              <li>
                <span className="insight-bullet">02</span>
                <span className="insight-text">
                  3 saatlıq güzəşt bitdikdə no-show əməkdaş tərəfindən təsdiqlənir və 1 gecəlik ödəniş
                  + vergilər qeydiyyat kartından avtomatik çıxılır.
                </span>
              </li>
              <li>
                <span className="insight-bullet">03</span>
                <span className="insight-text">
                  Müştəriyə 2 tarif seçimi: <strong>1)</strong> kart nömrəsi ilə rezerv — no-show
                  halında yalnız 1 gecəlik haqq tutulur; <strong>2)</strong> endirimli tam ödəniş —
                  no-show halında ödəniş geri qaytarılmır.
                </span>
              </li>
              <li>
                <span className="insight-bullet">04</span>
                <span className="insight-text">
                  Databaza əsasında no-show/ləğvetmə trendləri (bayramlar, tətillər, iqtisadi
                  hadisələr) və müştəri mənbəyi (birbaşa sayt / agentlik) təhlil olunur.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="problem-block">
          <div className="problem-num">Problem 4 / 4</div>
          <div className="risk-block">
            <div className="block-title">⚠ Problem</div>
            <p className="block-text">
              Bir otaq üçün yalnız bir rezervasiyanın olması risklidir — müştəri gəlmədikdə həm gəlir
              itkisi, həm də yeni müştərilər üçün "dolu" görünən boş otaq itkisi yaranır.
            </p>
          </div>
          <div className="rec-block">
            <div className="block-title">✓ Həll</div>
            <ul className="insights-list">
              <li>
                <span className="insight-bullet">01</span>
                <span className="insight-text">
                  Hər otaq üçün <strong>gözləmə siyahısı</strong>: ilk müştəri gəlməzsə/ləğv etsə,
                  növbəti müştəriyə 30–60 dəqiqəlik təsdiq müddəti ilə bildiriş göndərilir (kiçik
                  bonuslar — pulsuz səhər yeməyi və s. — qarşılığında).
                </span>
              </li>
              <li>
                <span className="insight-bullet">02</span>
                <span className="insight-text">
                  <strong>Prioritet gözləmə siyahısı</strong>: sadiq müştərilər əvvəlcə bildiriş alır,
                  qəbul etmədikdə növbə adi müştərilərin siyahısına keçir.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="divider" />

        <div id="flow" className="section-anchor">
          <p className="content-label">Proses Axını</p>
          <h2 className="content-title">Rezervasiya Proses Diaqramı</h2>
          <p className="content-text">
            Bütün proses — otaq axtarışından tutmuş tarif seçiminə, gözləmə siyahısına və no-show
            halına qədər — aşağıdakı sxemdə göstərilib.
          </p>
        </div>
        <div className="flow-wrap">
          <img src="/hotel-reservation-flow.jpg" alt="Hotel rezervasiya proses axını diaqramı" />
        </div>
        <p style={{ marginBottom: '3rem' }}>
          <a
            className="flow-link"
            href="https://whimsical.com/ruqeyya-a/hotel-birbank-GeWD7LW7sPdoGkaPCWcASS"
            target="_blank"
            rel="noopener noreferrer"
          >
            İnteraktiv diaqrama bax (Whimsical) ↗
          </a>
        </p>

        <hr className="divider" />

        <div id="scenarios" className="section-anchor">
          <p className="content-label">Kritik Ssenarilər</p>
          <h2 className="content-title">4 Əsas Ssenari</h2>
        </div>
        <div className="scenario-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="scenario-card">
            <div className="scenario-title">1. Vaxtında Ləğvetmə</div>
            <div className="scenario-row">
              <span>Vəziyyət</span>
              <p>Müştəri check-in-dən 48 saat öncəyə qədər rezervasiyanı ləğv edir.</p>
            </div>
            <div className="scenario-row">
              <span>Sistem</span>
              <p>Sərbəst tarifdə cərimə tətbiq olunmur; endirimli tarifdə ödəniş geri qaytarılmır. Sistem sadiq → adi gözləmə siyahılarını yoxlayır.</p>
            </div>
            <div className="scenario-row">
              <span>Nəticə</span>
              <p>Otaq boş qalmır, ödəniş itkisi yaşanmır.</p>
            </div>
          </div>
          <div className="scenario-card">
            <div className="scenario-title">2. Son Anda Ləğvetmə</div>
            <div className="scenario-row">
              <span>Vəziyyət</span>
              <p>Müştəri rezervasiyanı check-in-ə 24 saat qalmış ləğv edir.</p>
            </div>
            <div className="scenario-row">
              <span>Sistem</span>
              <p>Kart nömrəsi ilə rezervdə 1 gecəlik haqq avtomatik tutulur; endirimli ödənişdə pul geri qaytarılmır.</p>
            </div>
            <div className="scenario-row">
              <span>Nəticə</span>
              <p>Otel gəlir itirmir.</p>
            </div>
          </div>
          <div className="scenario-card">
            <div className="scenario-title">3. No-show Halı</div>
            <div className="scenario-row">
              <span>Vəziyyət</span>
              <p>Check-in günü 3 saatlıq güzəşt bitsə də müştəri gəlmir.</p>
            </div>
            <div className="scenario-row">
              <span>Sistem</span>
              <p>Tarifə uyğun cərimə tətbiq olunur; gözləmə siyahısı varsa bildiriş göndərilir, yoxdursa otaq "əlçatan" statusuna keçir.</p>
            </div>
            <div className="scenario-row">
              <span>Nəticə</span>
              <p>Otel gəlir itkisi yaşamır.</p>
            </div>
          </div>
          <div className="scenario-card">
            <div className="scenario-title">4. Ehtiyat Siyahısına Yazılma</div>
            <div className="scenario-row">
              <span>Vəziyyət</span>
              <p>Müştərinin istədiyi otaq artıq doludur.</p>
            </div>
            <div className="scenario-row">
              <span>Sistem</span>
              <p>Müştəri tipini (sadiq/adi) müəyyən edir, kiçik bonus qarşılığında uyğun gözləmə siyahısına yazılmağı təklif edir.</p>
            </div>
            <div className="scenario-row">
              <span>Nəticə</span>
              <p>Otaq boşaldıqda 30–60 dəqiqə ərzində təsdiqlənərsə ödəniş tutulur — nə gəlir, nə də müştəri itirilir.</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div id="video" className="section-anchor">
          <p className="content-label">Video</p>
          <h2 className="content-title">Layihə Təqdimatı</h2>
          <p className="content-text">
            Layihənin qısa video izahı.
          </p>
        </div>
        <div className="video-wrap">
  <video controls preload="none">
<source src={`${import.meta.env.BASE_URL}videos/hotel-reservation-demo.mp4`} type="video/mp4" />  </video>
</div>
      </main>

      <footer>
        <span>© 2026 — Ruqiyya Aghatalibova</span>
        <a href="${import.meta.env.BASE_URL}">Portfolioya qayıt →</a>
      </footer>
    </>
  )
}
