#!/usr/bin/env node
// ============================================================
// Генерация PDF CV из content.js
// Использование: node generate-cv.js
// Требует: Google Chrome
// Результат: assets/Solovev_Maksim_CV.pdf
// ============================================================

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// ── Загружаем контент ──
eval(fs.readFileSync(path.join(__dirname, 'src/js/content.js'), 'utf8'));
const c = CONTENT.ru;
const hero = c.hero;
const cv = c.cv;
const contacts = c.contacts;

// Дублирует shared.js — скрипт standalone, не загружает браузерный код
function calcAge(dateStr) {
  var birth = new Date(dateStr);
  var today = new Date();
  var age = today.getFullYear() - birth.getFullYear();
  var m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// ── HTML-шаблон CV ──
function buildHTML() {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 14mm 18mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: #111;
  }

  /* Header */
  .header { margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #111; }
  .name { font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; }
  .role { font-size: 11pt; color: #444; margin-bottom: 6px; }
  .age { font-size: 9pt; color: #555; margin-bottom: 6px; }
  .contacts-list { list-style: none; font-size: 8.5pt; color: #555; display: flex; flex-direction: column; gap: 1px; }
  .contacts-list a { color: #555; text-decoration: none; }

  /* Sections */
  .section { margin-bottom: 12px; }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #111;
    border-bottom: 1px solid #ccc;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }

  /* About */
  .about p { margin-bottom: 4px; }

  /* Experience */
  .exp { margin-bottom: 10px; }
  .exp:last-child { margin-bottom: 0; }
  .exp-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .exp-title { font-size: 10.5pt; font-weight: 600; }
  .exp-period { font-size: 8.5pt; color: #666; white-space: nowrap; }
  .exp-company { font-size: 8.5pt; color: #666; margin-bottom: 3px; }
  .exp-project { font-size: 9pt; color: #333; margin-bottom: 5px; }
  .exp-group { font-size: 8.5pt; font-weight: 600; color: #333; margin: 5px 0 2px; }
  .exp ul { padding-left: 14px; }
  .exp li { font-size: 9pt; margin-bottom: 1px; }

  /* Cases */
  .case { margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dotted #ddd; }
  .case:last-child { border-bottom: none; }
  .case-title { font-size: 9.5pt; font-weight: 600; margin-bottom: 4px; }
  .case-row { margin-bottom: 2px; }
  .case-label { font-weight: 600; font-size: 8.5pt; color: #555; }
  .case-text { font-size: 9pt; }

  /* Skills */
  .skill-line { margin-bottom: 3px; }
  .skill-label { font-weight: 600; font-size: 8.5pt; }
  .skill-items { font-size: 9pt; color: #333; }

  /* Education */
  .edu { margin-bottom: 4px; }
  .edu-title { font-weight: 600; font-size: 9.5pt; }
  .edu-detail { font-size: 9pt; color: #333; }
  .edu-year { font-size: 8.5pt; color: #666; }

  /* Page breaks */
  .exp { page-break-inside: avoid; }
  .case { page-break-inside: avoid; }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="name">${hero.name}</div>
  <div class="role">${hero.role}</div>
  <div class="age">${calcAge('1989-07-24')} лет</div>
  <ul class="contacts-list">
    ${contacts.links.map(l => `<li><a href="${l.href}">${l.label}: ${l.handle}</a></li>`).join('\n    ')}
  </ul>
</div>

<!-- About -->
<div class="section">
  <div class="section-title">Обо мне</div>
  ${cv.about.body.map(p => `<p class="about">${p}</p>`).join('\n  ')}
</div>

<!-- Experience -->
<div class="section">
  <div class="section-title">Опыт работы</div>
  ${cv.experience.items.map(exp => `
  <div class="exp">
    <div class="exp-head">
      <div class="exp-title">${exp.title}</div>
      <div class="exp-period">${exp.period}</div>
    </div>
    <div class="exp-company">${exp.company}</div>
    <div class="exp-project">${exp.project}</div>
    ${exp.groups.map(g => `
    <div class="exp-group">${g.title}</div>
    <ul>${g.items.map(item => `<li>${item}</li>`).join('')}</ul>`).join('')}
  </div>`).join('')}
</div>

<!-- Cases -->
<div class="section">
  <div class="section-title">Избранные кейсы</div>
  ${cv.cases.items.map(cs => `
  <div class="case">
    <div class="case-title">${cs.num}. ${cs.title}</div>
    <div class="case-row"><span class="case-label">Задача:</span> <span class="case-text">${cs.task}</span></div>
    <div class="case-row"><span class="case-label">Решение:</span> <span class="case-text">${cs.did}</span></div>
    <div class="case-row"><span class="case-label">Результат:</span> <span class="case-text">${cs.result}</span></div>
    <div class="case-row"><span class="case-label">Урок:</span> <span class="case-text">${cs.lesson}</span></div>
  </div>`).join('')}
</div>

<!-- Skills -->
<div class="section">
  <div class="section-title">Навыки</div>
  ${cv.skills.groups.map(g => `
  <div class="skill-line">
    <span class="skill-label">${g.title}:</span>
    <span class="skill-items">${g.items.join(', ')}</span>
  </div>`).join('')}
</div>

<!-- Education -->
<div class="section">
  <div class="section-title">Образование и сертификаты</div>
  ${cv.education.items.map(e => `
  <div class="edu">
    <span class="edu-title">${e.title}</span> —
    <span class="edu-detail">${e.detail}</span>
    <span class="edu-year">(${e.year})</span>
  </div>`).join('')}
</div>

</body>
</html>`;
}

// ── Поиск Chrome ──
function findChrome() {
  var paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  for (var i = 0; i < paths.length; i++) {
    if (fs.existsSync(paths[i])) return paths[i];
  }
  return null;
}

// ── Main ──
var chrome = findChrome();
if (!chrome) {
  console.error('Chrome/Chromium не найден. Установите Google Chrome.');
  process.exit(1);
}

var tmpFile = path.join(__dirname, '.cv-tmp.html');
var outFile = path.join(__dirname, 'assets', 'Solovev_Maksim_CV.pdf');

fs.writeFileSync(tmpFile, buildHTML());

try {
  execSync(`"${chrome}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outFile}" "file://${tmpFile}"`, {
    stdio: 'pipe',
  });
  console.log('PDF: ' + outFile);
} catch (e) {
  console.error('Ошибка генерации:', e.message);
  process.exit(1);
} finally {
  fs.unlinkSync(tmpFile);
}
