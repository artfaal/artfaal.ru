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
    sectionExploring(p.exploring),
    sectionBlog(c.blog),
    renderContacts(c.contacts),
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
    +   `<div class="hc-tag">${escapeHTML(c.tag)}</div>`
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

// ── Exploring (Сейчас копаю) ──
function sectionExploring(d) {
  const items = d.items.map(it =>
    `<div class="exploring-item">`
    + `<h3 class="p-t">${it.t}</h3>`
    + `<p class="p-d">${it.d}</p>`
    + `</div>`
  ).join('');

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
