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
  assert('card "' + card.t + '" has d+img', !!card.d && !!card.img);
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
  'favicon.svg',
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
  'assets/Solovev_Maksim_CV.pdf',
  'assets/Solovev_Maksim_CV_en.pdf',
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
const pdfPathEn = path.join(ROOT, 'assets', 'Solovev_Maksim_CV_en.pdf');

if (process.env.SKIP_PDF_GEN === '1') {
  assert('PDF exists (skip regen)', fs.existsSync(pdfPath));
  assert('PDF (en) exists (skip regen)', fs.existsSync(pdfPathEn));
} else {
  try {
    execSync('node generate-cv.js', { cwd: ROOT, stdio: 'pipe', timeout: 30000 });
    assert('PDF generated', fs.existsSync(pdfPath));
    execSync('node generate-cv.js --en', { cwd: ROOT, stdio: 'pipe', timeout: 30000 });
    assert('PDF (en) generated', fs.existsSync(pdfPathEn));
  } catch (e) {
    fail('PDF generation', e.message);
  }
}
assert('PDF size > 10KB', fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 10000);
assert('PDF (en) size > 10KB', fs.existsSync(pdfPathEn) && fs.statSync(pdfPathEn).size > 10000);

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
  assert(file + ' has favicon link', /rel=["']icon["']/.test(html));
  // Cache-busting: все local CSS/JS должны быть с ?v=<hash> (hook ставит md5).
  // Проверяем только наличие pattern — не точное значение, иначе будут
  // ложно-отрицательные прогоны когда файл грязный, а хук ещё не отработал.
  const localAssetRe = /(?:src|href)=["'](?:\.\.\/)?src\/(?:js|styles)\/[a-zA-Z0-9._-]+/g;
  const htmlAssets = html.match(localAssetRe) || [];
  htmlAssets.forEach(ref => {
    const hashRe = new RegExp(ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\?v=[a-f0-9]{6,12}');
    assert(file + ' cache-bust: ' + ref.split('/').pop(), hashRe.test(html),
      'no ?v=<hash> suffix');
  });
});

// ════════════════════════════════════════
console.log('\n\x1b[1mRU/EN parity\x1b[0m');
// ════════════════════════════════════════
// Количество items в каждой секции должно совпадать у обоих языков.
// Самая частая ошибка: добавил карточку в ru, забыл в en.

const parityChecks = [
  ['personal.value.items',      c.personal.value.items,      CONTENT.en.personal.value.items],
  ['personal.principles.items', c.personal.principles.items, CONTENT.en.personal.principles.items],
  ['personal.human.cards',      c.personal.human.cards,      CONTENT.en.personal.human.cards],
  ['personal.exploring.items',  c.personal.exploring.items,  CONTENT.en.personal.exploring.items],
  ['cv.experience.items',       c.cv.experience.items,       CONTENT.en.cv.experience.items],
  ['cv.cases.items',            c.cv.cases.items,            CONTENT.en.cv.cases.items],
  ['cv.skills.groups',          c.cv.skills.groups,          CONTENT.en.cv.skills.groups],
  ['cv.education.items',        c.cv.education.items,        CONTENT.en.cv.education.items],
  ['cv.languages.items',        c.cv.languages.items,        CONTENT.en.cv.languages.items],
  ['contacts.links',            c.contacts.links,            CONTENT.en.contacts.links],
  ['blog.links',                c.blog.links,                CONTENT.en.blog.links],
];
parityChecks.forEach(([name, ru, en]) => {
  assert(name + ' parity ru/en', ru.length === en.length,
    `ru=${ru.length} en=${en.length}`);
});

// ════════════════════════════════════════
console.log('\n\x1b[1mURL validity\x1b[0m');
// ════════════════════════════════════════
// Все href должны начинаться с http(s):, mailto:, / или #.
// Ловит опечатки типа "httsp://" и случайно-пустые ссылки.

const urlRe = /^(https?:\/\/|mailto:|\/|#)/;
[['ru', c], ['en', CONTENT.en]].forEach(([tag, lang]) => {
  lang.contacts.links.forEach(l => assert(
    `${tag} contacts.${l.icon} href valid`, urlRe.test(l.href), `bad: "${l.href}"`));
  lang.blog.links.forEach(l => assert(
    `${tag} blog.${l.icon} href valid`, urlRe.test(l.href), `bad: "${l.href}"`));
  assert(`${tag} hero.cta_primary href valid`,
    urlRe.test(lang.hero.cta_primary.href), `bad: "${lang.hero.cta_primary.href}"`);
  assert(`${tag} hero.cta_secondary href valid`,
    urlRe.test(lang.hero.cta_secondary.href), `bad: "${lang.hero.cta_secondary.href}"`);
});

// ════════════════════════════════════════
console.log('\n\x1b[1mCSS hygiene\x1b[0m');
// ════════════════════════════════════════
// Правило из CLAUDE.md: нет !important, кроме prefers-reduced-motion.

const cssForImportantCheck = [
  'src/styles/base.css',
  'src/styles/layout.css',
  'src/styles/components.css',
].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
// Убираем блоки prefers-reduced-motion (там !important разрешён).
// Regex не справляется с nested-блоками — считаем скобки вручную.
function stripPrefersBlocks(css) {
  let result = css;
  while (true) {
    const start = result.indexOf('@media (prefers-reduced-motion');
    if (start === -1) break;
    const braceStart = result.indexOf('{', start);
    if (braceStart === -1) break;
    let depth = 1;
    let i = braceStart + 1;
    while (i < result.length && depth > 0) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') depth--;
      i++;
    }
    result = result.slice(0, start) + result.slice(i);
  }
  return result;
}
const cssStripped = stripPrefersBlocks(cssForImportantCheck);
const importantMatches = cssStripped.match(/!important/g) || [];
assert('no !important outside prefers-reduced-motion',
  importantMatches.length === 0,
  `found ${importantMatches.length} occurrence(s)`);

// ════════════════════════════════════════
console.log('\n\x1b[1mContent sanity\x1b[0m');
// ════════════════════════════════════════

// meta.last_updated не в будущем (опечатка года вроде 2027).
assert('meta.last_updated не в будущем',
  new Date(c.meta.last_updated) <= new Date(),
  `last_updated=${c.meta.last_updated}`);

// Описания не слишком длинные — ломают layout карточек.
const MAX_DESC = 300;
const checkDesc = (name, str) => assert(
  `${name} длина <= ${MAX_DESC}`,
  typeof str === 'string' && str.length <= MAX_DESC,
  `actual=${str ? str.length : 'n/a'}`);

[['ru', c], ['en', CONTENT.en]].forEach(([tag, lang]) => {
  lang.personal.value.items.forEach((it, i) =>
    checkDesc(`${tag} value[${i}].d`, it.d));
  lang.personal.principles.items.forEach((it, i) =>
    checkDesc(`${tag} principle[${i}].d`, it.d));
  lang.personal.human.cards.forEach((it, i) =>
    checkDesc(`${tag} card[${i}].d`, it.d));
  lang.personal.exploring.items.forEach((it, i) =>
    checkDesc(`${tag} exploring[${i}].d`, it.d));
  lang.cv.cases.items.forEach((it, i) => {
    checkDesc(`${tag} case[${i}].task`, it.task);
    checkDesc(`${tag} case[${i}].did`, it.did);
    checkDesc(`${tag} case[${i}].result`, it.result);
    checkDesc(`${tag} case[${i}].lesson`, it.lesson);
  });
});

// ════════════════════════════════════════
console.log('\n\x1b[1mAssets hygiene\x1b[0m');
// ════════════════════════════════════════
// В assets/ должны быть только .webp (картинки) и .pdf (CV).
// .gitignore блокирует jpg/png/PNG при коммите, но тест даст явный сигнал.

const assetEntries = fs.readdirSync(path.join(ROOT, 'assets'));
const badExts = assetEntries.filter(f =>
  !/^\.|\.(webp|pdf)$/i.test(f) && fs.statSync(path.join(ROOT, 'assets', f)).isFile());
assert('assets/ — только .webp и .pdf',
  badExts.length === 0,
  `лишние файлы: ${badExts.join(', ')}`);

// ════════════════════════════════════════
console.log('\n\x1b[1mDead code detection\x1b[0m');
// ════════════════════════════════════════
// Проверяем что в коде нет орфанов: неиспользуемых CSS-классов,
// CSS-переменных из base.css и JS-функций. Если найдётся — имя выводится
// в описании теста, чтобы сразу было понятно что именно зависло.

const cssFiles = ['src/styles/base.css', 'src/styles/layout.css', 'src/styles/components.css'];
const jsFiles = ['src/js/content.js', 'src/js/utils.js', 'src/js/icons.js',
                 'src/js/shared.js', 'src/js/page-personal.js', 'src/js/page-cv.js'];
const htmlFiles = ['index.html', 'cv/index.html'];

const readSafe = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
// Источники, в которых могут встречаться упоминания классов/функций:
// HTML, все JS в src, а также test.js и generate-cv.js (для utils.js функций).
const usageSrc = [
  ...jsFiles.map(readSafe),
  ...htmlFiles.map(readSafe),
  readSafe('test.js'),
  readSafe('generate-cv.js'),
].join('\n');
const allCss = cssFiles.map(readSafe).join('\n');

// ── CSS классы ──
const cssClasses = new Set();
for (const f of cssFiles) {
  const clean = readSafe(f).replace(/\/\*[\s\S]*?\*\//g, '');
  const re = /\.([a-zA-Z_][-a-zA-Z0-9_]*)/g;
  let m;
  while ((m = re.exec(clean))) cssClasses.add(m[1]);
}
const unusedClasses = [];
for (const cls of cssClasses) {
  const re = new RegExp('[^a-zA-Z0-9_-]' + cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^a-zA-Z0-9_-]');
  if (!re.test(usageSrc)) unusedClasses.push(cls);
}
assert('CSS classes all used',
  unusedClasses.length === 0,
  'unused: .' + unusedClasses.sort().join(', .'));

// ── CSS переменные (--tokens) ──
const baseCss = readSafe('src/styles/base.css').replace(/\/\*[\s\S]*?\*\//g, '');
const tokens = Array.from(new Set(baseCss.match(/--[a-zA-Z0-9_-]+(?=\s*:)/g) || []));
const unusedTokens = tokens.filter(t =>
  !new RegExp('var\\(\\s*' + t + '\\b').test(allCss));
assert('CSS tokens all used',
  unusedTokens.length === 0,
  'unused: ' + unusedTokens.join(', '));

// ── JS функции ──
const fnDefs = [];
for (const f of jsFiles) {
  const re = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
  let m;
  const js = readSafe(f);
  while ((m = re.exec(js))) fnDefs.push({ file: f, name: m[1] });
}
const haystack = usageSrc + '\n' + allCss;
const unusedFns = fnDefs.filter(d => {
  const matches = haystack.match(new RegExp('\\b' + d.name + '\\b', 'g')) || [];
  // 1 вхождение = только сама декларация.
  return matches.length <= 1;
});
assert('JS functions all referenced',
  unusedFns.length === 0,
  'unused: ' + unusedFns.map(d => d.name + ' (' + d.file + ')').join(', '));

// ════════════════════════════════════════
// Summary
// ════════════════════════════════════════
console.log('\n' + (failed === 0 ? '\x1b[32m' : '\x1b[31m')
  + 'Result: ' + passed + ' passed, ' + failed + ' failed\x1b[0m\n');

process.exit(failed > 0 ? 1 : 0);
