// ============================================================
// CV страница — рендер секций
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  var c = initPage('cv');
  var cv = c.cv;
  var main = document.getElementById('main');

  main.innerHTML = [
    sectionCvAbout(cv.about),
    sectionExperience(cv.experience),
    sectionCases(cv.cases),
    sectionSkills(cv.skills),
    sectionEducation(cv.education),
    renderContacts(c.contacts),
  ].join('');

  initScrollReveal();
  initCaseAccordion();
});

function initCaseAccordion() {
  document.querySelectorAll('.case-header').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentNode;
      var isOpen = item.classList.contains('is-open');
      // Закрыть все
      document.querySelectorAll('.case-item.is-open').forEach(function(el) {
        el.classList.remove('is-open');
        el.querySelector('.case-header').setAttribute('aria-expanded', 'false');
      });
      // Открыть текущий (если был закрыт)
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ── About (CV) ──
function sectionCvAbout(d) {
  var body = d.body.map(function(p) {
    return '<p class="para">' + p + '</p>';
  }).join('');

  return '<section class="sect sect-about" id="about">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="sect-body">' + body + '</div>'
    + '</div>'
    + '</section>';
}

// ── Experience ──
function sectionExperience(d) {
  var items = d.items.map(function(exp) {
    var groups = exp.groups.map(function(g) {
      var lis = g.items.map(function(item) {
        return '<li>' + item + '</li>';
      }).join('');
      return '<div class="exp-group-title">' + g.title + '</div>'
        + '<ul class="exp-list-items">' + lis + '</ul>';
    }).join('');

    return '<article class="exp-item">'
      + '<div class="exp-head">'
      +   '<div class="exp-title">' + exp.title + '</div>'
      +   '<div class="exp-period">' + exp.period + '</div>'
      + '</div>'
      + '<div class="exp-company">' + exp.company + '</div>'
      + '<p class="exp-project">' + exp.project + '</p>'
      + groups
      + '</article>';
  }).join('');

  return '<section class="sect sect-experience" id="experience">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="exp-list">' + items + '</div>'
    + '</div>'
    + '</section>';
}

// ── Cases (accordion) ──
function sectionCases(d) {
  var items = d.items.map(function(c) {
    return '<article class="case-item">'
      + '<button class="case-header" aria-expanded="false">'
      +   '<div class="case-num">' + c.num + '</div>'
      +   '<h3 class="case-title">' + c.title + '</h3>'
      +   '<span class="case-chevron">' + icon('arrow', 14) + '</span>'
      + '</button>'
      + '<div class="case-body">'
      +   '<div class="case-block">'
      +     '<div class="case-label">Задача</div>'
      +     '<p class="case-text">' + c.task + '</p>'
      +   '</div>'
      +   '<div class="case-block">'
      +     '<div class="case-label">Что сделал</div>'
      +     '<p class="case-text">' + c.did + '</p>'
      +   '</div>'
      +   '<div class="case-block">'
      +     '<div class="case-label">Результат</div>'
      +     '<p class="case-text">' + c.result + '</p>'
      +   '</div>'
      +   '<div class="case-block">'
      +     '<div class="case-label">Урок</div>'
      +     '<p class="case-text">' + c.lesson + '</p>'
      +   '</div>'
      + '</div>'
      + '</article>';
  }).join('');

  return '<section class="sect sect-cases" id="cases">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="cases-list">' + items + '</div>'
    + '</div>'
    + '</section>';
}

// ── Skills ──
function sectionSkills(d) {
  var groups = d.groups.map(function(g) {
    var tags = g.items.map(function(t) {
      return '<span class="skill-tag">' + t + '</span>';
    }).join('');
    return '<div class="skill-group">'
      + '<div class="skill-group-title">' + g.title + '</div>'
      + '<div class="skill-tags">' + tags + '</div>'
      + '</div>';
  }).join('');

  return '<section class="sect sect-skills" id="skills">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="skills-grid">' + groups + '</div>'
    + '</div>'
    + '</section>';
}

// ── Education ──
function sectionEducation(d) {
  var items = d.items.map(function(e) {
    return '<div class="edu-item">'
      + '<div class="edu-title">' + e.title + '</div>'
      + '<div class="edu-detail">' + e.detail + '</div>'
      + '<div class="edu-year">' + e.year + '</div>'
      + '</div>';
  }).join('');

  return '<section class="sect sect-education" id="education">'
    + asciiRuleHTML(d.head, d.n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title"><h2>' + d.title + '</h2></div>'
    +   '<div class="edu-list">' + items + '</div>'
    + '</div>'
    + '</section>';
}
