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
assert('hero.prompt_lines.cv', Array.isArray(c.hero.prompt_lines.cv) && c.hero.prompt_lines.cv.length >= 2);
assert('hero.prompt_lines.personal', Array.isArray(c.hero.prompt_lines.personal) && c.hero.prompt_lines.personal.length >= 2);
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
assert('personal.sidequests.sagas >= 2', p.sidequests.sagas.length >= 2);
p.sidequests.sagas.forEach(saga => {
  assert('sidequests saga "' + saga.title + '" projects >= 1',
    Array.isArray(saga.projects) && saga.projects.length >= 1);
});
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

// ── Side quests: поля саг и проектов ──
p.sidequests.sagas.forEach(saga => {
  assert('saga "' + saga.title + '" has intro', !!saga.intro);
  saga.projects.forEach(pr => {
    assert('sq "' + pr.name + '" has d',     !!pr.d);
    assert('sq "' + pr.name + '" has stack', Array.isArray(pr.stack) && pr.stack.length >= 1);
    assert('sq "' + pr.name + '" href valid',
      !pr.href || /^https?:\/\//.test(pr.href), 'bad href: ' + pr.href);
    if (pr.img) {
      const imgPath = path.join(ROOT, pr.img);
      assert('sq image: ' + pr.img, fs.existsSync(imgPath), 'file not found');
    }
  });
});
assert('sidequests.outro is array (ru)', Array.isArray(p.sidequests.outro),
  'outro должен быть массивом — рендер не нормализует одиночные объекты');
assert('sidequests.outro is array (en)', Array.isArray(CONTENT.en.personal.sidequests.outro));
p.sidequests.outro.forEach((l, i) => {
  assert(`sidequests.outro[${i}] has label+href`,
    !!l.label && /^https?:\/\//.test(l.href), 'bad: ' + JSON.stringify(l));
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
console.log('\n\x1b[1mSection numbering (autonumeration)\x1b[0m');
// ════════════════════════════════════════

// Единый источник порядка секций — массивы в page-personal.js / page-cv.js.
// Номер секции вычисляется по индексу через sectionN(i) (0-indexed, "NN").
// Здесь проверяем, что код действительно использует автонумерацию
// и в content.js нигде не остался хардкод секционного `n`.

const personalJs = fs.readFileSync(path.join(ROOT, 'src/js/page-personal.js'), 'utf8');
const cvJs       = fs.readFileSync(path.join(ROOT, 'src/js/page-cv.js'),       'utf8');
const sharedJs   = fs.readFileSync(path.join(ROOT, 'src/js/shared.js'),        'utf8');

assert('sectionN helper defined in shared.js',
  /function\s+sectionN\s*\(\s*i\s*\)/.test(sharedJs));

const autoNumerationPattern = /sections\.map\(\(\[fn,\s*data\],\s*i\)\s*=>\s*fn\(data,\s*sectionN\(i\)\)\)/;
assert('page-personal.js uses autonumeration', autoNumerationPattern.test(personalJs));
assert('page-cv.js uses autonumeration',       autoNumerationPattern.test(cvJs));

// Регрессия: явно проверяем, что в коде больше нет literal "NN" во втором аргументе renderContacts.
// Такой хардкод был бы возвратом к `nOverride`-паттерну.
const hardcodedN = /renderContacts\s*\(\s*[^,)]+,\s*["'`]\d{2}["'`]\s*\)/;
assert('no hardcoded n in renderContacts (personal)', !hardcodedN.test(personalJs));
assert('no hardcoded n in renderContacts (cv)',       !hardcodedN.test(cvJs));

// Регрессия: в content.js не должно быть секционного `n` (он жил на отступе 6 или 8 пробелов
// у объектов секций). Item-level `n` принципов имеет отступ 12 — его не трогаем.
const contentRaw = fs.readFileSync(path.join(ROOT, 'src/js/content.js'), 'utf8');
const sectionNLeftover = /^ {6,8}n: "\d+",$/m.test(contentRaw);
assert('content.js: no section-level n left', !sectionNLeftover,
  'секционные `n` должны быть удалены — номер приходит из индекса секций, не из контента');

// Санити: helper sectionN реально 0-indexed с паддингом.
// Eval-им код helper'а напрямую, чтобы не зависеть от браузерного окружения.
const sectionN = new Function('i', 'return String(i).padStart(2, "0");');
assert('sectionN(0) === "00"', sectionN(0) === '00');
assert('sectionN(7) === "07"', sectionN(7) === '07');
assert('sectionN(10) === "10"', sectionN(10) === '10');

// Ожидаемая длина массивов секций — защита от «забыл добавить рендер новой секции».
const personalSectionsCount = (personalJs.match(/\[\s*section[A-Z]\w*\s*,/g) || []).length
                            + (personalJs.match(/\[\s*renderContacts\s*,/g) || []).length;
const cvSectionsCount       = (cvJs.match(/\[\s*section[A-Z]\w*\s*,/g) || []).length
                            + (cvJs.match(/\[\s*renderContacts\s*,/g) || []).length;
assert('personal sections count = 8', personalSectionsCount === 8,
  `got ${personalSectionsCount}; проверь массив sections в page-personal.js`);
assert('cv sections count = 7', cvSectionsCount === 7,
  `got ${cvSectionsCount}; проверь массив sections в page-cv.js`);

// ════════════════════════════════════════
console.log('\n\x1b[1mFile structure\x1b[0m');
// ════════════════════════════════════════

// Единый источник путей страниц. Меняешь URL-структуру — правишь только здесь.
// Стаб-редиректы сюда не входят: у них нет ни JSON-LD, ни og — им отдельный assert.
// page — ключ рендера ('cv'/'personal'), совпадает с currentPage в initPage().
const HOST = 'https://' + fs.readFileSync(path.join(ROOT, 'CNAME'), 'utf8').trim();
const PAGES = {
  'index.html':      { url: '/',      lang: 'ru', page: 'cv'       },
  'life/index.html': { url: '/life/', lang: 'ru', page: 'personal' },
};
// Парный URL другого языка — вычисляется, не хранится: нельзя опечатать то, чего нет.
const altOf = u => u.startsWith('/en') ? (u.slice(3) || '/') : '/en' + u;
Object.values(PAGES).forEach(p => {
  assert('altOf round-trip: ' + p.url, altOf(altOf(p.url)) === p.url, altOf(altOf(p.url)));
});

const requiredFiles = [
  ...Object.keys(PAGES),
  '404.html',
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

Object.entries(PAGES).forEach(([file, p]) => {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const L = CONTENT[p.lang];
  assert(file + ' <html lang="' + p.lang + '">', html.includes('<html lang="' + p.lang + '"'));
  assert(file + ' has meta description', html.includes('meta name="description"'));
  assert(file + ' has JSON-LD', html.includes('application/ld+json'));
  assert(file + ' has favicon link', /rel=["']icon["']/.test(html));

  // Дрифт-ловушка: обе страницы с canonical на "/" → Google молча выкидывает вторую.
  // Ни 404, ни ошибки в консоли, ни визуальной разницы — поэтому только тест это и поймает.
  const want = HOST + p.url;
  const grab = re => (html.match(re) || [])[1];
  assert(file + ' canonical === ' + want, grab(/rel="canonical"\s+href="([^"]+)"/) === want);
  assert(file + ' og:url === ' + want, grab(/property="og:url"\s+content="([^"]+)"/) === want);
  assert(file + ' hreflang self === ' + want,
    grab(new RegExp('hreflang="' + p.lang + '"\\s+href="([^"]+)"')) === want);

  // og заполнен статикой: краулеры соцсетей (Telegram, Slack, LinkedIn) JS не исполняют,
  // и без этого шаренная ссылка разворачивается пустой карточкой. Раз статика — привязываем
  // к content.js, иначе разъедется при первой же правке контента.
  // og:description намеренно без стажа: в JS он считается из meta.start_it, хардкод бы протух.
  const wantOgTitle = p.page === 'cv' ? L.meta.title_cv : L.meta.title_personal;
  const wantOgDesc = L.hero.role + '. ' + L.hero.tagline;
  assert(file + ' og:title === content.js', grab(/property="og:title"\s+content="([^"]+)"/) === wantOgTitle,
    'в HTML: ' + grab(/property="og:title"\s+content="([^"]+)"/) + ' | в content.js: ' + wantOgTitle);
  assert(file + ' og:description === content.js', grab(/property="og:description"\s+content="([^"]+)"/) === wantOgDesc);
  // Превью — аватар, не фото: фото открывается по клику и печатается в PDF.
  assert(file + ' og:image === аватар', grab(/property="og:image"\s+content="([^"]+)"/) === HOST + '/assets/avatar.webp');
  assert(file + ' og:site_name', grab(/property="og:site_name"\s+content="([^"]+)"/) === L.meta.host);
  assert(file + ' og:locale', grab(/property="og:locale"\s+content="([^"]+)"/) === (p.lang === 'en' ? 'en_US' : 'ru_RU'));
  assert(file + ' og:type', grab(/property="og:type"\s+content="([^"]+)"/) === (p.page === 'cv' ? 'profile' : 'website'));

  // Cache-busting: все local CSS/JS должны быть с ?v=<hash> (hook ставит md5).
  // Проверяем только наличие pattern — не точное значение, иначе будут
  // ложно-отрицательные прогоны когда файл грязный, а хук ещё не отработал.
  // (?:\.\.\/)* — любая глубина: старый (?:\.\.\/)? был слеп на глубине 2,
  // цикл проверок молча не выполнялся. Заодно резолвим каждую ссылку по
  // фактической глубине файла — ловит битый префикс ../ (пустая страница
  // при зелёном тесте, в браузере громко, в тестах раньше — тихо).
  const dir = path.dirname(path.join(ROOT, file));
  const localAssetRe = /(?:src|href)=["']((?:\.\.\/)*src\/(?:js|styles)\/[a-zA-Z0-9._-]+)/g;
  const refs = [...html.matchAll(localAssetRe)].map(m => m[1]);
  assert(file + ' ссылается на src-ассеты', refs.length > 0, 'regex не нашёл ни одного — сломан?');
  refs.forEach(ref => {
    assert(file + ' asset exists: ' + ref, fs.existsSync(path.resolve(dir, ref)), 'битая глубина ../?');
    const hashRe = new RegExp(ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\?v=[a-f0-9]{6,12}');
    assert(file + ' cache-bust: ' + ref.split('/').pop(), hashRe.test(html),
      'no ?v=<hash> suffix');
  });
});

// /cv/ — стаб-редирект: в PAGES не входит (нет ни og, ни JSON-LD), но существовать обязан,
// иначе рекрутер со старой ссылкой из выдачи или ATS словит 404.
const stub = fs.readFileSync(path.join(ROOT, 'cv/index.html'), 'utf8');
assert('cv stub redirects', /http-equiv="refresh"/.test(stub) && /location\.replace/.test(stub));
assert('cv stub canonical → root', stub.includes('rel="canonical" href="' + HOST + '/"'));
assert('cv stub has no noindex', !/noindex/.test(stub), 'noindex заблокирует консолидацию сигналов');

// 404.html — GH Pages отдаёт его с ЛЮБОГО несуществующего пути, включая вложенные
// (/foo/bar/baz), поэтому относительная ссылка на ассет развалит страницу.
// В PAGES не входит: noindex, без canonical/og — это не страница, а экран ошибки.
const nf = fs.readFileSync(path.join(ROOT, '404.html'), 'utf8');
assert('404 has noindex', /name="robots" content="noindex"/.test(nf));
assert('404 has no canonical/og:url', !/rel="canonical"|og:url/.test(nf));
const nfRelRefs = [...nf.matchAll(/(?:src|href)=["'](?!https?:|\/|#|data:)([^"']+)/g)].map(m => m[1]);
assert('404 asset paths absolute', nfRelRefs.length === 0, 'relative: ' + nfRelRefs.join(', '));
assert('404 base.css cache-bust', /\/src\/styles\/base\.css\?v=[a-f0-9]{6,12}/.test(nf),
  'no ?v=<hash> — 404.html входит в glob хука (git ls-files \'*index.html\' \'404.html\')');

// sitemap не должен разъезжаться с реальным набором страниц
const sitemapXml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).sort();
const wantLocs = Object.values(PAGES).map(p => HOST + p.url).sort();
assert('sitemap <loc> === PAGES', JSON.stringify(locs) === JSON.stringify(wantLocs),
  'sitemap: ' + locs.join(',') + ' | ожидалось: ' + wantLocs.join(','));

// ════════════════════════════════════════
console.log('\n\x1b[1mNav rendering\x1b[0m');
// ════════════════════════════════════════

// shared.js — браузерный, но renderNav/initTerminalTyping по сути чистые: гоняем их
// в vm с минимальными моками. Иначе порядок вкладок и a11y hero не проверяются ничем.
const vm = require('vm');
let _reducedMotion = false;
const sandbox = {
  window: {
    addEventListener() {},
    matchMedia: q => ({ matches: _reducedMotion && q.includes('reduce') }),
  },
};
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync(path.join(ROOT, 'src/js/utils.js'), 'utf8') + '\n' +
  fs.readFileSync(path.join(ROOT, 'src/js/icons.js'), 'utf8') + '\n' +
  fs.readFileSync(path.join(ROOT, 'src/js/shared.js'), 'utf8'),
  sandbox
);

// renderNav — единственное место, где живут порядок вкладок и подсветка is-on.
// Тернарник и href правятся руками и врозь: перепутаешь — подсветка инвертируется
// молча, без ошибки в консоли и без визуальной поломки вёрстки.
{
  // Только вкладки страниц: парсим контейнер role="navigation",
  // lang-группа (role="group") — отдельная сущность, сюда не попадает.
  const tabsOf = page => {
    const el = {};
    sandbox.renderNav(el, c, page);
    const seg = (el.innerHTML.match(/<div class="seg" role="navigation">([\s\S]*?)<\/div>/) || [])[1] || '';
    return [...seg.matchAll(/<a href="([^"]*)" class="seg-btn([^"]*)"[^>]*>([^<]*)<\/a>/g)]
      .map(m => ({ href: m[1], on: m[2].includes('is-on'), text: m[3] }));
  };

  const onRoot = tabsOf('cv');
  const onLife = tabsOf('personal');

  assert('nav: работа первая, жизнь вторая',
    onRoot[0].href === '/' && onRoot[1].href === '/life/',
    onRoot.map(t => t.href).join(' | '));
  assert('nav: первая вкладка — это CV', onRoot[0].text === c.nav.cv, onRoot[0].text);
  assert('nav на /: подсвечена работа', onRoot[0].on && !onRoot[1].on);
  assert('nav на /life/: подсвечена жизнь', !onLife[0].on && onLife[1].on);
}

// updateMeta перезаписывает og на лету. Если разъедется со статикой в <head> —
// краулер соцсети покажет одно, браузер (и Google, который рендерит JS) другое,
// и оба будут «работать». Сверяем по каждой странице из таблицы.
{
  Object.entries(PAGES).forEach(([file, p]) => {
    const set = {};
    sandbox.document = {
      documentElement: {}, title: '',
      querySelector: sel => ({ setAttribute: (_k, v) => { set[sel] = v; } }),
      getElementById: () => ({ textContent: '' }),
    };
    sandbox.location = { pathname: p.url };
    vm.runInContext('_lang = ' + JSON.stringify(p.lang), sandbox);
    sandbox.updateMeta(CONTENT[p.lang], p.page);

    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const stat = re => (html.match(re) || [])[1];
    assert(file + ' updateMeta og:image === статика в <head>',
      set['meta[property="og:image"]'] === stat(/property="og:image"\s+content="([^"]+)"/),
      'JS: ' + set['meta[property="og:image"]'] + ' | HTML: ' + stat(/property="og:image"\s+content="([^"]+)"/));
    assert(file + ' updateMeta og:title === статика в <head>',
      set['meta[property="og:title"]'] === stat(/property="og:title"\s+content="([^"]+)"/));
    assert(file + ' updateMeta og:locale === статика в <head>',
      set['meta[property="og:locale"]'] === stat(/property="og:locale"\s+content="([^"]+)"/));
    // og:description НЕ сверяем: на CV рантайм считает стаж из дат, статика намеренно без стажа.
  });
  vm.runInContext('_lang = "ru"', sandbox); // вернуть дефолт для последующих блоков
}

// ════════════════════════════════════════
console.log('\n\x1b[1mHero a11y\x1b[0m');
// ════════════════════════════════════════

// CSS-заглушка reduced-motion не действует на JS-таймеры: без раннего выхода
// скринридер ~4 секунды читает пустой h1 (revealGlitch чистит textContent).
{
  const runTyping = () => {
    const container = {
      innerHTML: '', appendChild() {},
      parentNode: { style: {}, offsetHeight: 120 },
    };
    const heroBody = { innerHTML: '', style: { cssText: '' } };
    sandbox.document = {
      getElementById: id => (id === 'terminal-lines' ? container : heroBody),
      createElement: () => ({ className: '', innerHTML: '', style: {}, appendChild() {} }),
    };
    // Таймеры глушим: нас интересует только синхронное решение «анимировать или нет».
    sandbox.setTimeout = () => 0;
    sandbox.setInterval = () => 0;
    sandbox.initTerminalTyping(c.hero.prompt_lines.cv, c.meta.handle, c.meta.host);
    return { container, heroBody };
  };

  _reducedMotion = true;
  const reduced = runTyping();
  assert('reduced-motion: hero виден сразу',
    reduced.heroBody.style.cssText === 'opacity:1;transform:none', reduced.heroBody.style.cssText);
  assert('reduced-motion: строки терминала отрисованы без набора',
    c.hero.prompt_lines.cv.every(l => reduced.container.innerHTML.includes(l)));

  _reducedMotion = false;
  const animated = runTyping();
  assert('без reduced-motion: hero скрыт до анимации',
    animated.heroBody.style.cssText.includes('opacity:0'), animated.heroBody.style.cssText);
}

// ════════════════════════════════════════
console.log('\n\x1b[1mRU/EN parity\x1b[0m');
// ════════════════════════════════════════
// Количество items в каждой секции должно совпадать у обоих языков.
// Самая частая ошибка: добавил карточку в ru, забыл в en.

const parityChecks = [
  ['personal.value.items',      c.personal.value.items,      CONTENT.en.personal.value.items],
  ['personal.principles.items', c.personal.principles.items, CONTENT.en.personal.principles.items],
  ['personal.human.cards',      c.personal.human.cards,      CONTENT.en.personal.human.cards],
  ['personal.sidequests.sagas', c.personal.sidequests.sagas, CONTENT.en.personal.sidequests.sagas],
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

// cv.contact — не массив, а объект: сверяем набор ключей, а не длину.
const cvContactKeys = (t) => Object.keys(t.cv.contact).sort().join(',');
assert('cv.contact parity ru/en', cvContactKeys(c) === cvContactKeys(CONTENT.en),
  `ru=[${cvContactKeys(c)}] en=[${cvContactKeys(CONTENT.en)}]`);

// Внутри саг side-quests число проектов тоже должно совпадать по-саговно.
c.personal.sidequests.sagas.forEach((saga, i) => {
  const enSaga = CONTENT.en.personal.sidequests.sagas[i];
  assert(`sidequests.sagas[${i}].projects parity ru/en`,
    enSaga && saga.projects.length === enSaga.projects.length,
    `ru=${saga.projects.length} en=${enSaga ? enSaga.projects.length : 'n/a'}`);
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
// Дата парсится как локальная полночь: голый "YYYY-MM-DD" — это UTC, и вечерняя
// правка по MSK выглядела бы «из будущего» до 03:00.
assert('meta.last_updated не в будущем',
  new Date(`${c.meta.last_updated}T00:00:00`) <= new Date(),
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
  lang.personal.sidequests.sagas.forEach((saga, si) => {
    checkDesc(`${tag} saga[${si}].intro`, saga.intro);
    saga.projects.forEach((pr, pi) =>
      checkDesc(`${tag} saga[${si}].project[${pi}].d`, pr.d));
  });
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
const htmlFiles = Object.keys(PAGES);

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
