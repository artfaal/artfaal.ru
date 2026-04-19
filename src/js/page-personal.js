// ============================================================
// Личная страница — рендер секций
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  var c = initPage('personal');
  var p = c.personal;
  var main = document.getElementById('main');

  main.innerHTML = [
    sectionAbout(p.about),
    sectionValue(p.value),
    sectionPrinciples(p.principles),
    sectionHuman(p.human),
    sectionExploring(p.exploring),
    renderContacts(c.contacts, '07'),
  ].join('');

  initScrollReveal();
});

// ── About ──
function sectionAbout(d) {
  var body = d.body.map(function(p) {
    return '<p class="para">' + p + '</p>';
  }).join('');

  var stats = d.stats.map(function(s) {
    return '<div class="stat">'
      + '<div class="stat-v">' + s.v + '</div>'
      + '<div class="stat-k">' + s.k + '</div>'
      + '</div>';
  }).join('');

  return '<section class="sect sect-about" id="about">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="sect-body">'
    +     body
    +     '<div class="stat-row">' + stats + '</div>'
    +   '</div>'
    + '</div>'
    + '</section>';
}

// ── Value ──
function sectionValue(d) {
  var items = d.items.map(function(it) {
    return '<li class="value-item">'
      + '<div class="vi-key">' + it.k + '</div>'
      + '<div class="vi-body">'
      +   '<div class="vi-t">' + it.t + '</div>'
      +   '<div class="vi-d">' + it.d + '</div>'
      + '</div>'
      + '</li>';
  }).join('');

  return '<section class="sect sect-value" id="value">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<ul class="value-list">' + items + '</ul>'
    + '</div>'
    + '</section>';
}

// ── Principles ──
function sectionPrinciples(d) {
  var items = d.items.map(function(p) {
    return '<article class="principle">'
      + '<header class="p-head">'
      +   '<span class="p-n">' + p.n + '</span>'
      +   '<span class="p-rule" aria-hidden="true"></span>'
      + '</header>'
      + '<h3 class="p-t">' + p.t + '</h3>'
      + '<p class="p-d">' + p.d + '</p>'
      + '</article>';
  }).join('');

  return '<section class="sect sect-principles" id="principles">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title">'
    +     '<h2>' + d.title + '</h2>'
    +     '<p class="sect-sub">' + d.sub + '</p>'
    +   '</div>'
    +   '<div class="principles-grid">' + items + '</div>'
    + '</div>'
    + '</section>';
}

// ── Human ──
function sectionHuman(d) {
  var cards = d.cards.map(function(c, i) {
    return '<article class="human-card">'
      + stripePlaceholderHTML(c.img, i)
      + '<div class="hc-body">'
      +   '<div class="hc-tag">' + c.tag + '</div>'
      +   '<div class="hc-t">' + c.t + '</div>'
      +   '<p class="hc-d">' + c.d + '</p>'
      + '</div>'
      + '</article>';
  }).join('');

  return '<section class="sect sect-human" id="human">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title">'
    +     '<h2>' + d.title + '</h2>'
    +     '<p class="sect-sub">' + d.sub + '</p>'
    +   '</div>'
    +   '<div class="human-grid">' + cards + '</div>'
    + '</div>'
    + '</section>';
}

// ── Exploring (Сейчас копаю) ──
function sectionExploring(d) {
  var items = d.items.map(function(it) {
    return '<div class="exploring-item">'
      + '<h3 class="p-t">' + it.t + '</h3>'
      + '<p class="p-d">' + it.d + '</p>'
      + '</div>';
  }).join('');

  return '<section class="sect sect-exploring" id="exploring">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title">'
    +     '<h2>' + d.title + '</h2>'
    +     '<p class="sect-sub">' + d.sub + '</p>'
    +   '</div>'
    +   '<div class="exploring-list">' + items + '</div>'
    + '</div>'
    + '</section>';
}
