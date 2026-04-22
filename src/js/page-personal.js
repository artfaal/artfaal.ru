// ============================================================
// Личная страница — рендер секций
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const c = initPage('personal');
  const p = c.personal;
  const main = document.getElementById('main');

  main.innerHTML = [
    sectionAbout(p.about),
    sectionValue(p.value),
    sectionPrinciples(p.principles),
    sectionHuman(p.human),
    sectionSideQuests(p.sidequests),
    sectionExploring(p.exploring),
    sectionBlog(c.blog),
    renderContacts(c.contacts, "07"),
  ].join('');

  initScrollReveal();
});

// ── About ──
function sectionAbout(d) {
  const body = d.body.map(p => `<p class="para">${p}</p>`).join('');

  return `<section class="sect sect-about" id="about">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title"><h2>${d.title}</h2></div>`
    +   `<div class="sect-body">${body}</div>`
    + `</div>`
    + `</section>`;
}

// ── Value ──
function sectionValue(d) {
  const items = d.items.map(it =>
    `<li class="value-item">`
    + `<div class="vi-key">${it.k}</div>`
    + `<div class="vi-body">`
    +   `<div class="vi-t">${it.t}</div>`
    +   `<div class="vi-d">${it.d}</div>`
    + `</div>`
    + `</li>`
  ).join('');

  return `<section class="sect sect-value" id="value">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title"><h2>${d.title}</h2></div>`
    +   `<ul class="value-list stagger">${items}</ul>`
    + `</div>`
    + `</section>`;
}

// ── Principles ──
function sectionPrinciples(d) {
  const items = d.items.map(p =>
    `<article class="principle">`
    + `<header class="p-head">`
    +   `<span class="p-n">${p.n}</span>`
    +   `<span class="p-rule" aria-hidden="true"></span>`
    + `</header>`
    + `<h3 class="p-t">${p.t}</h3>`
    + `<p class="p-d">${p.d}</p>`
    + `</article>`
  ).join('');

  return `<section class="sect sect-principles" id="principles">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${d.title}</h2>`
    +     `<p class="sect-sub">${d.sub}</p>`
    +   `</div>`
    +   `<div class="principles-grid stagger">${items}</div>`
    + `</div>`
    + `</section>`;
}

// ── Human ──
function sectionHuman(d) {
  const cards = d.cards.map(c =>
    `<article class="human-card">`
    + `<div class="hc-img"><img src="${escapeHTML(c.img)}" alt="${escapeHTML(c.t)}" loading="lazy"></div>`
    + `<div class="hc-body">`
    +   `<div class="hc-t">${escapeHTML(c.t)}</div>`
    +   `<p class="hc-d">${c.d}</p>`
    + `</div>`
    + `</article>`
  ).join('');

  return `<section class="sect sect-human" id="human">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${d.title}</h2>`
    +     `<p class="sect-sub">${d.sub}</p>`
    +   `</div>`
    +   `<div class="human-grid stagger">${cards}</div>`
    + `</div>`
    + `</section>`;
}

// ── Blog ──
function sectionBlog(d) {
  const links = d.links.map(l =>
    `<a class="blog-link" href="${escapeHTML(l.href)}" target="_blank" rel="noopener">`
    + `<span class="cr-icon">${icon(l.icon, 18)}</span>`
    + `<span class="blog-link-label">${escapeHTML(l.label)}</span>`
    + `<span class="blog-link-handle">${escapeHTML(l.handle)}</span>`
    + `<span class="cr-ext">${icon('ext', 14)}</span>`
    + `</a>`
  ).join('');

  return `<section class="sect sect-blog" id="blog">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${d.title}</h2>`
    +     `<p class="sect-sub">${d.sub}</p>`
    +   `</div>`
    +   `<div class="blog-links">${links}</div>`
    + `</div>`
    + `</section>`;
}

// ── Side quests (pet-projects по сюжетам) ──
function sectionSideQuests(d) {
  const sagas = d.sagas.map(saga => {
    const projects = saga.projects.map(pr => {
      const tags = pr.stack.map(s => `<span class="sq-tag">${escapeHTML(s)}</span>`).join('');
      const link = pr.href
        ? `<a class="sq-link" href="${escapeHTML(pr.href)}" target="_blank" rel="noopener" aria-label="открыть ${escapeHTML(pr.name)}">${icon('ext', 14)}</a>`
        : '';
      const img = pr.img
        ? `<div class="sq-img"><img src="${escapeHTML(pr.img)}" alt="${escapeHTML(pr.name)}" loading="lazy"></div>`
        : '';
      const metric = pr.metric
        ? `<div class="sq-metric">${escapeHTML(pr.metric)}</div>`
        : '';
      const cls = pr.img ? 'sq-card has-img' : 'sq-card';
      return `<article class="${cls}">`
        + img
        + `<div class="sq-text">`
        +   `<div class="sq-head">`
        +     `<div class="sq-name">${escapeHTML(pr.name)}</div>`
        +     link
        +   `</div>`
        +   metric
        +   `<p class="sq-d">${pr.d}</p>`
        +   `<div class="sq-stack">${tags}</div>`
        + `</div>`
        + `</article>`;
    }).join('');

    return `<div class="sq-saga">`
      + `<header class="sq-saga-head">`
      +   `<h3 class="sq-saga-title">${escapeHTML(saga.title)}</h3>`
      +   `<p class="sq-saga-intro">${saga.intro}</p>`
      + `</header>`
      + `<div class="sq-grid stagger">${projects}</div>`
      + `</div>`;
  }).join('');

  const outroLinks = Array.isArray(d.outro) ? d.outro : (d.outro ? [d.outro] : []);
  const outro = outroLinks.length
    ? `<div class="sq-outros">` + outroLinks.map(l =>
        `<a class="sq-outro" href="${escapeHTML(l.href)}" target="_blank" rel="noopener">`
        + `<span>${escapeHTML(l.label)}</span>`
        + `<span class="cr-ext">${icon('ext', 14)}</span>`
        + `</a>`
      ).join('') + `</div>`
    : '';

  return `<section class="sect sect-sidequests" id="sidequests">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${d.title}</h2>`
    +     `<p class="sect-sub">${d.sub}</p>`
    +   `</div>`
    +   `<div class="sq-body">`
    +     `<div class="sq-sagas">${sagas}</div>`
    +     outro
    +   `</div>`
    + `</div>`
    + `</section>`;
}

// ── Exploring (Сейчас копаю) ──
function sectionExploring(d) {
  const items = d.items.map(it => {
    const badge = it.status
      ? `<div class="exp-status" data-status="${it.status}"><span class="exp-dot"></span>${it.status}</div>`
      : '';
    return `<div class="exploring-item">`
      + `<h3 class="p-t">${it.t}</h3>`
      + `<p class="p-d">${it.d}</p>`
      + badge
      + `</div>`;
  }).join('');

  return `<section class="sect sect-exploring" id="exploring">`
    + asciiRuleHTML(d.head, d.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${d.title}</h2>`
    +     `<p class="sect-sub">${d.sub}</p>`
    +   `</div>`
    +   `<div class="exploring-list stagger">${items}</div>`
    + `</div>`
    + `</section>`;
}
