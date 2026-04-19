// ============================================================
// Общие утилиты — используются обеими страницами
// ============================================================

// ── Возраст ──
function calcAge(dateStr) {
  var birth = new Date(dateStr);
  var today = new Date();
  var age = today.getFullYear() - birth.getFullYear();
  var m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// ── Язык ──
function getLang() {
  return localStorage.getItem('lang') || 'ru';
}
function setLang(lang) {
  localStorage.setItem('lang', lang);
  location.reload();
}

// ── Prompt строка (ZSH-стиль) ──
function promptHTML(user, host, text) {
  return '<span class="prompt-line">'
    + '<span style="color:var(--accent)">' + user + '</span>'
    + '<span style="color:var(--muted)">@</span>'
    + '<span style="color:var(--fg-2)">' + host + '</span>'
    + '<span style="color:var(--muted)">:</span>'
    + '<span style="color:var(--accent-2)">~</span>'
    + '<span style="color:var(--muted)">$ </span>'
    + '<span>' + (text || '') + '</span>'
    + '</span>';
}

// ── Meta row (key...value) ──
function metaRowHTML(k, v) {
  var dots = '';
  for (var i = 0; i < 60; i++) dots += '.';
  return '<div class="meta-row">'
    + '<span class="meta-k">' + k + '</span>'
    + '<span class="meta-dot" aria-hidden="true">' + dots + '</span>'
    + '<span class="meta-v">' + v + '</span>'
    + '</div>';
}

// ── ASCII rule (секционный разделитель) ──
function asciiRuleHTML(label, n) {
  return '<div class="ascii-rule" aria-hidden="true">'
    + '<span class="ar-left">\u251C\u2500\u2500</span>'
    + '<span class="ar-label">'
    + (n ? '<span class="ar-n">' + n + '</span>' : '')
    + '<span>' + label + '</span>'
    + '</span>'
    + '<span class="ar-right"></span>'
    + '</div>';
}

// ── Рендер: Навигация ──
function renderNav(el, c, currentPage) {
  var isPersonal = currentPage === 'personal';
  el.innerHTML = ''
    + '<a class="tb-brand" href="/">'
    +   '<span class="tb-dot"></span>'
    +   '<span class="tb-name">' + c.meta.host + '</span>'
    + '</a>'
    + '<div class="tb-right">'
    +   '<div class="seg" role="navigation">'
    +     '<span class="seg-label">--page=</span>'
    +     '<a href="/" class="seg-btn ' + (isPersonal ? 'is-on' : '') + '">' + c.nav.personal + '</a>'
    +     '<span class="seg-sep">|</span>'
    +     '<a href="/cv.html" class="seg-btn ' + (!isPersonal ? 'is-on' : '') + '">' + c.nav.cv + '</a>'
    +   '</div>'
    +   '<div class="seg" role="group" aria-label="lang">'
    +     '<span class="seg-label">--lang=</span>'
    +     '<button class="seg-btn is-on" id="lang-ru">ru</button>'
    +     '<span class="seg-sep">|</span>'
    +     '<button class="seg-btn" id="lang-en" disabled title="coming soon">en</button>'
    +   '</div>'
    +   '<a href="/assets/Solovev_Maksim_CV.pdf" download class="seg-btn seg-cv">' + icon('download', 12) + ' CV</a>'
    + '</div>';
}

// ── Рендер: Hero ──
function renderHero(el, c, pageTitle) {
  var hero = c.hero;
  var meta = c.meta;

  document.title = pageTitle;

  el.innerHTML = ''
    + '<div class="hero-grid">'
    +   '<div class="hero-left">'
    // Терминал
    +     '<div class="terminal-head">'
    +       '<span class="tdot" style="background:#ff5f56"></span>'
    +       '<span class="tdot" style="background:#ffbd2e"></span>'
    +       '<span class="tdot" style="background:#27c93f"></span>'
    +       '<span class="tname">' + meta.handle + '@' + meta.host + ' — ' + meta.shell + '</span>'
    +     '</div>'
    +     '<div class="terminal-body" id="terminal-body">'
    +       '<div id="terminal-lines"></div>'
    +       '<div class="hero-body" id="hero-body">'
    +         '<div class="hero-role">' + hero.role + '</div>'
    +         '<h1 class="hero-name">' + hero.name + '</h1>'
    +         '<p class="hero-tagline">' + hero.tagline + '</p>'
    +         '<p class="hero-sub">' + hero.sub + '</p>'
    +         '<div class="hero-cta">'
    +           '<a class="btn btn-primary" href="' + hero.cta_primary.href + '">'
    +             icon('tg', 16) + ' ' + hero.cta_primary.label + ' ' + icon('arrow', 14)
    +           '</a>'
    +           '<a class="btn btn-ghost" href="' + hero.cta_secondary.href + '">'
    +             icon('gh', 16) + ' ' + hero.cta_secondary.label
    +           '</a>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    // Аватар (правая колонка)
    +   '<aside class="hero-right">'
    +     '<div class="avatar-wrap">'
    +       '<div class="avatar-frame">'
    +         '<img class="avatar-img" src="assets/avatar.webp" alt="' + hero.name + '" loading="lazy">'
    +         '<img class="avatar-photo" src="assets/photo.webp" alt="' + hero.name + '" loading="lazy">'
    +         '<div class="avatar-scan" aria-hidden="true"></div>'
    +       '</div>'
    +       '<div class="avatar-meta">'
    +         metaRowHTML('user', meta.handle)
    +         metaRowHTML('age', calcAge(meta.birth))
    +         metaRowHTML('role', hero.role)
    +         metaRowHTML('в IT', '<span id="exp-it">...</span>')
    +         metaRowHTML('в DevOps', '<span id="exp-devops">...</span>')
    +         metaRowHTML('status', '<span id="live-status" class="status-on">\u25CF online</span>')
    +         metaRowHTML('host', meta.host)
    +       '</div>'
    +     '</div>'
    +   '</aside>'
    + '</div>';
}

// ── Рендер: Контакты ──
function renderContacts(data) {
  var n = data.n;
  var html = '';
  data.links.forEach(function(l) {
    html += '<li>'
      + '<a class="contact-row" href="' + l.href + '" target="_blank" rel="noopener">'
      +   '<span class="cr-icon">' + icon(l.icon, 18) + '</span>'
      +   '<span class="cr-label">' + l.label + '</span>'
      +   '<span class="cr-dots" aria-hidden="true">' + '.'.repeat(80) + '</span>'
      +   '<span class="cr-handle">' + l.handle + '</span>'
      +   '<span class="cr-ext">' + icon('ext', 14) + '</span>'
      + '</a></li>';
  });

  return '<section class="sect sect-contact" id="contact">'
    + asciiRuleHTML(data.head, n)
    + '<div class="sect-grid">'
    +   '<div class="sect-title">'
    +     '<h2>' + data.title + '</h2>'
    +     '<p class="sect-sub">' + data.sub + '</p>'
    +   '</div>'
    +   '<ul class="contact-list">' + html + '</ul>'
    + '</div>'
    + '</section>';
}

// ── Рендер: Футер ──
function renderFooter(el, data) {
  var year = new Date().getFullYear();
  el.innerHTML = ''
    + '<span>' + data.sig + '</span>'
    + '<span>'
    +   data.built + ' &middot; ' + year
    +   ' &middot; <a href="mailto:sys.dll@gmail.com">sys.dll@gmail.com</a>'
    + '</span>';
}

// ── Динамический статус по MSK ──
function getMskStatus() {
  var msk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
  var day = msk.getDay(); // 0=вс, 6=сб
  var h = msk.getHours();
  var m = msk.getMinutes();
  var t = h * 60 + m; // минуты от полуночи

  var isWeekend = day === 0 || day === 6;
  // 00:30–08:30 → sleeping
  if (t >= 30 && t < 510)    return { text: 'sleeping', icon: '\u{1F319}', cls: 'status-sleep' }; // 00:30–08:30
  if (isWeekend)             return { text: 'chilling', icon: '\u{1F3D6}\uFE0F', cls: 'status-chill' };
  if (t >= 600 && t < 1110)  return { text: 'working', icon: '\u{1F680}', cls: 'status-work' };  // 10:00–18:30
  return { text: 'online', icon: '\u{1F7E2}', cls: 'status-on' };
}

function initStatusUpdater() {
  var el = document.getElementById('live-status');
  if (!el) return;

  function update() {
    var s = getMskStatus();
    el.className = s.cls;
    el.textContent = s.icon + ' ' + s.text;
  }
  update();
  setInterval(update, 60000); // проверяем раз в минуту
}

// ── Счётчик опыта (живой) ──
function formatDuration(startStr) {
  var start = new Date(startStr);
  var now = new Date();

  // Календарные годы/месяцы/дни
  var y = now.getFullYear() - start.getFullYear();
  var m = now.getMonth() - start.getMonth();
  var d = now.getDate() - start.getDate();
  if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }

  // Часы/минуты/секунды из остатка дня
  var sec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  var hr = Math.floor(sec / 3600); sec %= 3600;
  var min = Math.floor(sec / 60); sec %= 60;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  return y + ' лет ' + m + ' мес ' + d + ' дн ' + pad(hr) + ':' + pad(min) + ':' + pad(sec);
}

function initExpCounters(meta) {
  var elIT = document.getElementById('exp-it');
  var elDO = document.getElementById('exp-devops');
  if (!elIT || !elDO) return;

  function tick() {
    elIT.textContent = formatDuration(meta.start_it);
    elDO.textContent = formatDuration(meta.start_devops);
  }
  tick();
  setInterval(tick, 1000);
}

// ── Терминальная анимация набора ──
function initTerminalTyping(lines, user, host) {
  var container = document.getElementById('terminal-lines');
  var heroBody = document.getElementById('hero-body');
  var termBody = container.parentNode;

  function makePromptDiv() {
    var div = document.createElement('div');
    div.className = 'tline';
    div.innerHTML = promptHTML(user, host, '') + '<span class="cursor"></span>';
    container.appendChild(div);
    return div;
  }

  // Резервируем высоту terminal-body целиком (prompt-строки + hero-body),
  // чтобы блок не прыгал при наборе и появлении контента
  for (var k = 0; k <= lines.length; k++) {
    var tmp = document.createElement('div');
    tmp.className = 'tline';
    tmp.innerHTML = promptHTML(user, host, k < lines.length ? lines[k] : '');
    container.appendChild(tmp);
  }
  heroBody.style.cssText = 'opacity:1;transform:none;transition:none';
  termBody.style.minHeight = termBody.offsetHeight + 'px';
  heroBody.style.cssText = 'opacity:0;transform:translateY(10px)';
  container.innerHTML = '';

  // Набор prompt-строк посимвольно
  var i = 0, j = 0;
  var currentDiv = makePromptDiv();

  function typeNext() {
    if (i >= lines.length) {
      setTimeout(function() { revealGlitch(heroBody); }, 700);
      return;
    }
    var line = lines[i];
    if (j <= line.length) {
      currentDiv.innerHTML = promptHTML(user, host, line.slice(0, j))
        + '<span class="cursor"></span>';
      j++;
      setTimeout(typeNext, 80);
    } else {
      currentDiv.innerHTML = promptHTML(user, host, line);
      i++;
      j = 0;
      currentDiv = makePromptDiv();
      setTimeout(typeNext, i >= lines.length ? 0 : 400);
    }
  }

  setTimeout(typeNext, 500);
}

// ── Глитч-reveal: параллельный набор с декодированием ──
function revealGlitch(heroBody) {
  var GLYPHS = '\u2588\u2593\u2592\u2591@#$%&*!?/\\|<>{}[]~^';
  var TICK = 18;
  var DECODE_TICKS = 4;
  var SPEED = [3, 3, 1, 1]; // role и name в 3x медленнее

  function randGlyph() {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }

  var targets = heroBody.querySelectorAll('.hero-role, .hero-name, .hero-tagline, .hero-sub');
  var cta = heroBody.querySelector('.hero-cta');
  var ctaBtns = cta ? cta.querySelectorAll('.btn') : [];

  // Сохраняем текст, очищаем (высота уже зафиксирована)
  var originals = [];
  for (var i = 0; i < targets.length; i++) {
    originals.push(targets[i].textContent);
    targets[i].textContent = '';
  }

  // Прячем кнопки до завершения
  if (cta) cta.style.opacity = '0';
  for (var b = 0; b < ctaBtns.length; b++) {
    ctaBtns[b].style.cssText = 'opacity:0;transform:translateY(12px) scale(0.95);'
      + 'transition:opacity 0.8s ease,transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
  }

  // Показываем блок (текст пустой — без моргания)
  heroBody.style.cssText = 'opacity:1;transform:none;transition:none';

  // Состояние каждого элемента
  var states = [];
  for (var i = 0; i < targets.length; i++) {
    states.push({ pos: 0, chars: [], tick: 0, every: SPEED[i] || 1 });
  }

  var iv = setInterval(function() {
    var allDone = true;

    for (var i = 0; i < targets.length; i++) {
      var st = states[i];
      var orig = originals[i];

      // Новый символ каждые st.every тиков
      st.tick++;
      if (st.tick % st.every === 0 && st.pos < orig.length) {
        st.chars.push({ real: orig[st.pos], ticks: orig[st.pos] === ' ' ? 0 : DECODE_TICKS });
        st.pos++;
      }

      // Рендер: глитч → реальный символ
      var out = '';
      var done = st.pos >= orig.length;
      for (var c = 0; c < st.chars.length; c++) {
        var ch = st.chars[c];
        if (ch.ticks > 0) { out += randGlyph(); ch.ticks--; done = false; }
        else { out += ch.real; }
      }
      targets[i].textContent = out;
      if (!done) allDone = false;
    }

    if (allDone) {
      clearInterval(iv);
      for (var i = 0; i < targets.length; i++) targets[i].textContent = originals[i];

      // Кнопки — bounce-появление
      if (cta) {
        setTimeout(function() {
          cta.style.opacity = '1';
          for (var b = 0; b < ctaBtns.length; b++) {
            (function(btn, d) {
              setTimeout(function() { btn.style.cssText = ''; }, d);
            })(ctaBtns[b], b * 250);
          }
        }, 500);
      }
    }
  }, TICK);
}

// ── Scroll reveal ──
function initScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sect').forEach(function(el) {
    observer.observe(el);
  });
}

// ── Инициализация (вызывается из page-*.js) ──
function initPage(currentPage) {
  var lang = getLang();
  var c = CONTENT[lang];
  if (!c) c = CONTENT.ru; // fallback

  // Навигация
  renderNav(document.getElementById('topbar'), c, currentPage);

  // Hero
  var titleKey = currentPage === 'personal' ? 'title_personal' : 'title_cv';
  renderHero(document.getElementById('hero'), c, c.meta[titleKey]);

  // Футер
  renderFooter(document.getElementById('footer'), c.footer);

  // Терминальная анимация
  initTerminalTyping(c.hero.prompt_lines, c.meta.handle, c.meta.host);

  // Живые фичи
  initExpCounters(c.meta);
  initStatusUpdater();

  return c;
}
