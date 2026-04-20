#!/usr/bin/env node
// ============================================================
// Тесты — валидация контента, PDF генерации, структуры
// Использование: node test.js
// ============================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
let passed = 0;
let failed = 0;

function ok(name) { console.log('  \x1b[32m✓\x1b[0m ' + name); passed++; }
function fail(name, reason) { console.log('  \x1b[31m✗\x1b[0m ' + name + ' — ' + reason); failed++; }

function assert(name, condition, reason) {
  if (condition) ok(name);
  else fail(name, reason || 'assertion failed');
}

// ── Загружаем контент ──
const CONTENT = require('./src/js/content.js');
const c = CONTENT.ru;

// ════════════════════════════════════════
console.log('\n\x1b[1mContent validation\x1b[0m');
// ════════════════════════════════════════

// Meta
assert('meta.handle', c.meta.handle === 'artfaal');
assert('meta.host', !!c.meta.host);
assert('meta.birth', !!c.meta.birth && !isNaN(Date.parse(c.meta.birth)));
assert('meta.start_it', !!c.meta.start_it && !isNaN(Date.parse(c.meta.start_it)));
assert('meta.start_devops', !!c.meta.start_devops && !isNaN(Date.parse(c.meta.start_devops)));
assert('meta.last_updated', !!c.meta.last_updated && !isNaN(Date.parse(c.meta.last_updated)));

// Напоминалка: контент не старше 3 месяцев
const lastUpdated = new Date(c.meta.last_updated);
const monthsAgo = (Date.now() - lastUpdated) / (1000 * 60 * 60 * 24 * 30);
assert('content freshness (< 3 months)', monthsAgo < 3, 'last_updated ' + c.meta.last_updated + ' — обнови контент!');

// Hero
assert('hero.name', !!c.hero.name);
assert('hero.role', !!c.hero.role);
assert('hero.tagline', !!c.hero.tagline);
assert('hero.prompt_lines', Array.isArray(c.hero.prompt_lines) && c.hero.prompt_lines.length >= 2);
assert('hero.cta_primary.href', !!c.hero.cta_primary.href);

// Contacts
assert('contacts.links >= 3', c.contacts.links.length >= 3);
c.contacts.links.forEach(l => {
  assert('contact.' + l.icon + ' has href', !!l.href);
});

// Personal page sections
const p = c.personal;
assert('personal.about.body', Array.isArray(p.about.body) && p.about.body.length > 0);
assert('personal.value.items >= 3', p.value.items.length >= 3);
assert('personal.principles.items >= 3', p.principles.items.length >= 3);
assert('personal.human.cards >= 3', p.human.cards.length >= 3);
assert('personal.exploring.items >= 1', p.exploring.items.length >= 1);

// Human cards — images exist
p.human.cards.forEach(card => {
  const imgPath = path.join(ROOT, card.img);
  assert('image: ' + card.img, fs.existsSync(imgPath), 'file not found');
});

// CV page sections
const cv = c.cv;
assert('cv.about.body', Array.isArray(cv.about.body) && cv.about.body.length > 0);
assert('cv.experience.items >= 2', cv.experience.items.length >= 2);
assert('cv.cases.items >= 3', cv.cases.items.length >= 3);
assert('cv.skills.groups >= 2', cv.skills.groups.length >= 2);
assert('cv.education.items >= 2', cv.education.items.length >= 2);

// Experience items have required fields
cv.experience.items.forEach(exp => {
  assert('exp "' + exp.title + '" has groups', Array.isArray(exp.groups) && exp.groups.length > 0);
});

// Cases items have required fields
cv.cases.items.forEach(cs => {
  assert('case "' + cs.num + '" has all fields', !!cs.task && !!cs.did && !!cs.result && !!cs.lesson);
});

// ── Доступные иконки ──
const ICONS = ['arrow', 'tg', 'mail', 'gh', 'in', 'blog', 'ext', 'download'];

// ── Контакты: все поля + иконки существуют ──
c.contacts.links.forEach(l => {
  assert('contact.' + l.icon + ' has label', !!l.label);
  assert('contact.' + l.icon + ' has handle', !!l.handle);
  assert('contact.' + l.icon + ' icon exists', ICONS.includes(l.icon), 'unknown icon: ' + l.icon);
  assert('contact.' + l.icon + ' href format', l.href.startsWith('http') || l.href.startsWith('mailto:'), 'bad href: ' + l.href);
});

// ── Blog: все поля + иконки ──
assert('blog.title', !!c.blog.title);
assert('blog.links >= 1', c.blog.links.length >= 1);
c.blog.links.forEach(l => {
  assert('blog.' + l.icon + ' icon exists', ICONS.includes(l.icon), 'unknown icon: ' + l.icon);
  assert('blog.' + l.icon + ' has href', !!l.href);
});

// ── Value items: все поля ──
p.value.items.forEach(it => {
  assert('value "' + it.k + '" has t+d', !!it.t && !!it.d);
});

// ── Principles items: все поля ──
p.principles.items.forEach(pr => {
  assert('principle "' + pr.n + '" has t+d', !!pr.t && !!pr.d);
});

// ── Exploring items: все поля ──
p.exploring.items.forEach(it => {
  assert('exploring "' + it.t + '" has d', !!it.d);
});

// ── Human cards: все поля ──
p.human.cards.forEach(card => {
  assert('card "' + card.t + '" has d+tag+img', !!card.d && !!card.tag && !!card.img);
});

// ── Languages: все поля ──
assert('cv.languages.items >= 1', cv.languages.items.length >= 1);
cv.languages.items.forEach(l => {
  assert('lang "' + l.name + '" has level', !!l.level);
});

// ── Education: все поля ──
cv.education.items.forEach(e => {
  assert('edu "' + e.title + '" has detail+year', !!e.detail && !!e.year);
});

// ── Experience: все обязательные поля ──
cv.experience.items.forEach(exp => {
  assert('exp "' + exp.title + '" has company', !!exp.company);
  assert('exp "' + exp.title + '" has period', !!exp.period);
  assert('exp "' + exp.title + '" has project', !!exp.project);
  exp.groups.forEach(g => {
    assert('exp group "' + g.title + '" has items', Array.isArray(g.items) && g.items.length > 0);
  });
});

// ── Skills: не пустые группы ──
cv.skills.groups.forEach(g => {
  assert('skill group "' + g.title + '" has items', g.items.length > 0);
});

// ── Даты: логическая консистентность ──
const birthDate = new Date(c.meta.birth);
const startIT = new Date(c.meta.start_it);
const startDevOps = new Date(c.meta.start_devops);
const now = new Date();
assert('birth < start_it', birthDate < startIT, 'birth should be before IT career');
assert('start_it < start_devops', startIT < startDevOps, 'IT should start before DevOps');
assert('start_devops < now', startDevOps < now, 'DevOps start should be in the past');
assert('birth > 1950', birthDate.getFullYear() > 1950, 'birth year sanity check');

// ════════════════════════════════════════
console.log('\n\x1b[1mSection numbering\x1b[0m');
// ════════════════════════════════════════

function checkNumbering(pageName, sections) {
  const nums = sections.map(s => parseInt(s.n, 10));
  for (let i = 0; i < nums.length; i++) {
    assert(pageName + ' section ' + i + ' has n="' + String(nums[i]).padStart(2, '0') + '"',
      nums[i] === i, 'expected ' + i + ', got ' + nums[i]);
  }
  const unique = new Set(nums);
  assert(pageName + ' no duplicate n', unique.size === nums.length, 'duplicate section numbers');
}

checkNumbering('personal', [p.about, p.value, p.principles, p.human, p.exploring, c.blog, c.contacts]);
checkNumbering('cv', [cv.about, cv.experience, cv.cases, cv.skills, cv.languages, cv.education, c.contacts]);

// ════════════════════════════════════════
console.log('\n\x1b[1mFile structure\x1b[0m');
// ════════════════════════════════════════

const requiredFiles = [
  'index.html',
  'cv/index.html',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  'src/js/content.js',
  'src/js/utils.js',
  'src/js/shared.js',
  'src/js/icons.js',
  'src/js/page-personal.js',
  'src/js/page-cv.js',
  'src/styles/base.css',
  'src/styles/layout.css',
  'src/styles/components.css',
  'assets/avatar.webp',
  'assets/photo.webp',
  'generate-cv.js',
];
requiredFiles.forEach(f => {
  assert(f, fs.existsSync(path.join(ROOT, f)), 'file missing');
});

// Убедиться что cv.html в корне НЕ существует (чистые URL)
assert('no root cv.html', !fs.existsSync(path.join(ROOT, 'cv.html')), 'cv.html should not exist in root');

// ════════════════════════════════════════
console.log('\n\x1b[1mPDF generation\x1b[0m');
// ════════════════════════════════════════

const pdfPath = path.join(ROOT, 'assets', 'Solovev_Maksim_CV.pdf');

if (process.env.SKIP_PDF_GEN === '1') {
  assert('PDF exists (skip regen)', fs.existsSync(pdfPath));
} else {
  try {
    execSync('node generate-cv.js', { cwd: ROOT, stdio: 'pipe', timeout: 30000 });
    assert('PDF generated', fs.existsSync(pdfPath));
  } catch (e) {
    fail('PDF generation', e.message);
  }
}
assert('PDF size > 10KB', fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 10000);

// ════════════════════════════════════════
console.log('\n\x1b[1mHTML validation\x1b[0m');
// ════════════════════════════════════════

['index.html', 'cv/index.html'].forEach(file => {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  assert(file + ' has lang="ru"', html.includes('lang="ru"'));
  assert(file + ' has meta description', html.includes('meta name="description"'));
  assert(file + ' has og:title', html.includes('og:title'));
  assert(file + ' has canonical', html.includes('rel="canonical"'));
  assert(file + ' has JSON-LD', html.includes('application/ld+json'));
});

// ════════════════════════════════════════
// Summary
// ════════════════════════════════════════
console.log('\n' + (failed === 0 ? '\x1b[32m' : '\x1b[31m')
  + 'Result: ' + passed + ' passed, ' + failed + ' failed\x1b[0m\n');

process.exit(failed > 0 ? 1 : 0);
