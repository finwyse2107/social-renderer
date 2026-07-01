// On-brand HTML templates for Connected, Not Consumed social graphics.
// Carousel slides = 1080x1350 (4:5). Pinterest pins = 1000x1500 (2:3).

const HEAD = `<head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"></head>`;

const BASE = `:root{--navy:#203A5B;--sage:#8FA88F;--ivory:#FAF8F4;--gold:#C6A15B;--coral:#C46A4E;}
*{box-sizing:border-box;margin:0;padding:0;font-family:'Open Sans','Segoe UI',sans-serif;}
.slide{width:1080px;height:1350px;overflow:hidden;position:relative;padding:84px 80px;display:flex;flex-direction:column;
 background:radial-gradient(760px 700px at 92% 6%,rgba(143,168,143,.30),transparent 60%),radial-gradient(640px 620px at 6% 98%,rgba(198,161,91,.20),transparent 60%),linear-gradient(150deg,#FBF9F5,#EFEDE6);}
.eyebrow{font-family:'Poppins';font-weight:600;font-size:24px;letter-spacing:.22em;text-transform:uppercase;color:var(--sage);display:flex;align-items:center;}
.eyebrow .g{color:var(--gold);}
.num{font-family:'Poppins';font-weight:800;font-size:30px;color:#fff;background:var(--gold);width:64px;height:64px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-right:22px;}
.em{width:120px;height:120px;border:3px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:26px;border-top:2px solid rgba(32,58,91,.12);}
.foot .brand{font-family:'Poppins';font-weight:700;font-size:26px;color:var(--navy);}
.foot .brand .g,.eyebrow .g{color:var(--gold);}
.foot .swipe{font-family:'Poppins';font-weight:700;font-size:24px;color:var(--sage);letter-spacing:.04em;}`;

const EMBLEM = `<svg width="66" height="52" viewBox="0 0 72 56" fill="none" stroke="#203A5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="13" r="7"/><path d="M6 40c0-8 5-13 11-13s11 5 11 13"/><circle cx="55" cy="13" r="7"/><path d="M44 40c0-8 5-13 11-13s11 5 11 13"/><rect x="30" y="20" width="12" height="20" rx="2.5" stroke="#C6A15B"/></svg>`;

function doc(css, body) { return `<!DOCTYPE html><html>${HEAD}<body><style>${BASE}${css}</style>${body}</body></html>`; }
const brandFoot = (swipe) => `<div class="foot"><span class="brand">Connected, <span class="g">Not</span> Consumed&trade;</span><span class="swipe">${swipe ? 'swipe &rarr;' : '&nbsp;'}</span></div>`;

// slide types: cover | tip | point | cta
function renderSlide(s) {
  if (s.type === 'cover') {
    return doc(`.mid{flex:1;display:flex;flex-direction:column;justify-content:center;}
      .hook{font-family:'Poppins';font-weight:800;font-size:82px;line-height:1.08;color:var(--navy);margin-top:36px;}
      .hook .hl{color:var(--gold);} .sub{font-size:32px;color:#5f6b78;line-height:1.45;margin-top:30px;font-style:italic;max-width:820px;}`,
      `<div class="slide"><div class="eyebrow">Connected, <span class="g">Not</span> Consumed</div>
        <div class="mid"><div class="em">${EMBLEM}</div><div class="hook">${s.hook}</div><div class="sub">${s.sub || ''}</div></div>${brandFoot(true)}</div>`);
  }
  if (s.type === 'tip') {
    return doc(`.mid{flex:1;display:flex;flex-direction:column;justify-content:center;gap:40px;}
      .lab{font-family:'Poppins';font-weight:700;font-size:26px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;}
      .lab.bad{color:var(--coral);} .lab.good{color:#5c8a5c;}
      .txt{font-family:'Poppins';font-weight:600;font-size:46px;line-height:1.25;color:var(--navy);}
      .bad .txt{color:#8a7a72;text-decoration:line-through;text-decoration-color:rgba(196,106,78,.5);} .arrow{font-size:44px;color:var(--gold);text-align:center;}`,
      `<div class="slide"><div class="eyebrow"><span class="num">${s.n}</span>${s.kicker || 'Screen-time scripts'}</div>
        <div class="mid"><div class="bad"><div class="lab bad">Instead of</div><div class="txt">&ldquo;${s.instead}&rdquo;</div></div>
        <div class="arrow">&darr;</div><div class="good"><div class="lab good">Try</div><div class="txt">&ldquo;${s.tryLine}&rdquo;</div></div></div>${brandFoot(true)}</div>`);
  }
  if (s.type === 'point') {
    const bullets = (s.bullets || []).map(b => `<li>${b}</li>`).join('');
    return doc(`.mid{flex:1;display:flex;flex-direction:column;justify-content:center;}
      .head{font-family:'Poppins';font-weight:800;font-size:58px;line-height:1.14;color:var(--navy);}
      .body{font-size:36px;color:#4a545f;line-height:1.5;margin-top:28px;} ul{margin-top:24px;padding-left:6px;list-style:none;}
      li{font-size:34px;color:#4a545f;line-height:1.5;margin-bottom:18px;padding-left:44px;position:relative;}
      li:before{content:'';position:absolute;left:0;top:14px;width:16px;height:16px;border-radius:50%;background:var(--sage);}`,
      `<div class="slide"><div class="eyebrow">${s.n ? `<span class="num">${s.n}</span>` : ''}${s.kicker || ''}</div>
        <div class="mid"><div class="head">${s.heading}</div>${s.body ? `<div class="body">${s.body}</div>` : ''}${bullets ? `<ul>${bullets}</ul>` : ''}</div>${brandFoot(true)}</div>`);
  }
  // cta
  return doc(`.mid{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;}
    .em2{width:130px;height:130px;border:3px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:40px;}
    .big{font-family:'Poppins';font-weight:800;font-size:64px;line-height:1.14;color:var(--navy);} .big .g{color:var(--gold);}
    .sub{font-size:30px;color:#5f6b78;margin-top:26px;line-height:1.5;max-width:760px;}
    .pill{margin-top:38px;background:var(--navy);color:var(--ivory);font-family:'Poppins';font-weight:700;font-size:30px;padding:20px 44px;border-radius:50px;}`,
    `<div class="slide"><div class="eyebrow">Connected, <span class="g">Not</span> Consumed</div>
      <div class="mid"><div class="em2">${EMBLEM}</div><div class="big">${s.headline || 'Save this &amp; share it <span class="g">&hearts;</span>'}</div>
      <div class="sub">${s.sub || 'Want the whole calm-tech system? Grab the <strong>free chapter</strong> &mdash; link in bio.'}</div>
      <div class="pill">${s.button || 'Free chapter in bio &rarr;'}</div></div>${brandFoot(false)}</div>`);
}

function renderPin(p) {
  return `<!DOCTYPE html><html>${HEAD}<body><style>:root{--navy:#203A5B;--sage:#8FA88F;--ivory:#FAF8F4;--gold:#C6A15B;}
   *{box-sizing:border-box;margin:0;padding:0;font-family:'Open Sans','Segoe UI',sans-serif;}
   .pin{width:1000px;height:1500px;overflow:hidden;position:relative;padding:80px 76px;display:flex;flex-direction:column;
    background:radial-gradient(700px 640px at 92% 4%,rgba(143,168,143,.34),transparent 60%),linear-gradient(160deg,#FBF9F5,#ECEFE9);}
   .eye{font-family:'Poppins';font-weight:600;font-size:24px;letter-spacing:.2em;text-transform:uppercase;color:var(--sage);text-align:center;}
   .badge{align-self:center;margin-top:20px;background:var(--gold);color:#fff;font-family:'Poppins';font-weight:700;font-size:24px;letter-spacing:.08em;text-transform:uppercase;padding:12px 30px;border-radius:40px;}
   .mid{flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;}
   .title{font-family:'Poppins';font-weight:800;font-size:76px;line-height:1.1;color:var(--navy);} .title .g{color:var(--gold);}
   .sub{font-size:32px;color:#5f6b78;line-height:1.5;margin-top:30px;font-style:italic;}
   .card{margin-top:48px;align-self:center;width:360px;height:300px;background:#fff;border:1px solid #ece7dd;border-radius:16px;box-shadow:0 24px 46px rgba(32,58,91,.20);display:flex;flex-direction:column;padding:28px;gap:16px;}
   .card .h{height:26px;width:70%;background:var(--navy);border-radius:6px;} .card .l{height:16px;background:#e7e2d8;border-radius:5px;} .card .l.s{width:55%;}
   .foot{text-align:center;font-family:'Poppins';font-weight:700;font-size:28px;color:var(--navy);} .foot .u{color:var(--gold);font-weight:600;font-size:24px;display:block;margin-top:8px;}</style>
   <div class="pin"><div class="eye">Connected, Not Consumed</div><div class="badge">${p.badge || 'Free Printable'}</div>
     <div class="mid"><div class="title">${p.title}</div><div class="sub">${p.sub || ''}</div>
       <div class="card"><div class="h"></div><div class="l"></div><div class="l"></div><div class="l s"></div><div class="l"></div><div class="l s"></div></div></div>
     <div class="foot">${p.footer || 'Free chapter + printables'}<span class="u">${p.url || 'finwyse.gumroad.com'}</span></div></div></body></html>`;
}

module.exports = { renderSlide, renderPin };
