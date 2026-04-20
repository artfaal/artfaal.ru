// ============================================================
// Общие утилиты — используются обеими страницами
// ============================================================

// Хранилище таймеров и наблюдателей для очистки
const _timers = [];
let _scrollObserver = null;

// ── Безопасная вставка текста в HTML-атрибуты ──
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Возраст ──
function calcAge(dateStr) {
  const birth = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
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
  return `<span class="prompt-line">`
    + `<span class="prompt-user">${escapeHTML(user)}</span>`
    + `<span class="prompt-sep">@</span>`
    + `<span class="prompt-host">${escapeHTML(host)}</span>`
    + `<span class="prompt-sep">:</span>`
    + `<span class="prompt-tilde">~</span>`
    + `<span class="prompt-sep">$ </span>`
    + `<span>${text || ''}</span>`
    + `</span>`;
}

// ── Meta row (key...value) ──
function metaRowHTML(k, v) {
  return `<div class="meta-row">`
    + `<span class="meta-k">${k}</span>`
    + `<span class="meta-dot" aria-hidden="true">${'.'.repeat(60)}</span>`
    + `<span class="meta-v">${v}</span>`
    + `</div>`;
}

// ── ASCII rule (секционный разделитель) ──
function asciiRuleHTML(label, n) {
  return `<div class="ascii-rule" aria-hidden="true">`
    + `<span class="ar-left">\u251C\u2500\u2500</span>`
    + `<span class="ar-label">`
    + (n ? `<span class="ar-n">${n}</span>` : '')
    + `<span>${label}</span>`
    + `</span>`
    + `<span class="ar-right"></span>`
    + `</div>`;
}

// ── Рендер: Навигация ──
function renderNav(el, c, currentPage) {
  const isPersonal = currentPage === 'personal';
  el.innerHTML = ''
    + `<a class="tb-brand" href="/">`
    +   `<span class="tb-dot"></span>`
    +   `<span class="tb-name">${escapeHTML(c.meta.host)}</span>`
    + `</a>`
    + `<div class="tb-right">`
    +   `<div class="seg" role="navigation">`
    +     `<span class="seg-label">--page=</span>`
    +     `<a href="/" class="seg-btn ${isPersonal ? 'is-on' : ''}">${escapeHTML(c.nav.personal)}</a>`
    +     `<span class="seg-sep">|</span>`
    +     `<a href="/cv/" class="seg-btn ${!isPersonal ? 'is-on' : ''}">${escapeHTML(c.nav.cv)}</a>`
    +   `</div>`
    +   `<div class="seg" role="group" aria-label="lang">`
    +     `<span class="seg-label">--lang=</span>`
    +     `<button class="seg-btn is-on" id="lang-ru">ru</button>`
    +     `<span class="seg-sep">|</span>`
    +     `<button class="seg-btn" id="lang-en" disabled title="coming soon">en</button>`
    +   `</div>`
    +   `<a href="/assets/Solovev_Maksim_CV.pdf" download class="seg-btn seg-cv">${icon('download', 12)} CV</a>`
    + `</div>`;
}

// ── Рендер: Hero ──
function renderHero(el, c, pageTitle) {
  const hero = c.hero;
  const meta = c.meta;

  document.title = pageTitle;

  el.innerHTML = ''
    + `<div class="hero-grid">`
    +   `<div class="hero-left">`
    // Терминал
    +     `<div class="terminal-head">`
    +       `<span class="tdot"></span>`
    +       `<span class="tdot"></span>`
    +       `<span class="tdot"></span>`
    +       `<span class="tname">${escapeHTML(meta.handle)}@${escapeHTML(meta.host)} — ${escapeHTML(meta.shell)}</span>`
    +     `</div>`
    +     `<div class="terminal-body" id="terminal-body">`
    +       `<div id="terminal-lines"></div>`
    +       `<div class="hero-body" id="hero-body">`
    +         `<div class="hero-role">${escapeHTML(hero.role)}</div>`
    +         `<h1 class="hero-name">${escapeHTML(hero.name)}</h1>`
    +         `<p class="hero-tagline">${hero.tagline}</p>`
    +         `<p class="hero-sub">${hero.sub}</p>`
    +         `<div class="hero-cta">`
    +           `<a class="btn btn-primary" href="${escapeHTML(hero.cta_primary.href)}">`
    +             `${icon('tg', 16)} ${escapeHTML(hero.cta_primary.label)} ${icon('arrow', 14)}`
    +           `</a>`
    +           `<a class="btn btn-ghost" href="${escapeHTML(hero.cta_secondary.href)}">`
    +             `${icon('gh', 16)} ${escapeHTML(hero.cta_secondary.label)}`
    +           `</a>`
    +         `</div>`
    +       `</div>`
    +     `</div>`
    +   `</div>`
    // Аватар (правая колонка)
    +   `<aside class="hero-right">`
    +     `<div class="avatar-wrap">`
    +       `<div class="avatar-frame">`
    +         `<img class="avatar-img" src="/assets/avatar.webp" alt="${escapeHTML(hero.name)}" loading="lazy">`
    +         `<img class="avatar-photo" src="/assets/photo.webp" alt="${escapeHTML(hero.name)}" loading="lazy">`
    +         `<div class="avatar-scan" aria-hidden="true"></div>`
    +       `</div>`
    +       `<div class="avatar-meta">`
    +         metaRowHTML('user', meta.handle)
    +         metaRowHTML('age', calcAge(meta.birth))
    +         metaRowHTML('role', hero.role)
    +         metaRowHTML('в IT', '<span id="exp-it">...</span>')
    +         metaRowHTML('в DevOps', '<span id="exp-devops">...</span>')
    +         metaRowHTML('status', '<span id="live-status" class="status-on">\u25CF online</span>')
    +         metaRowHTML('host', meta.host)
    +       `</div>`
    +     `</div>`
    +   `</aside>`
    + `</div>`;
}

// ── Рендер: Контакты ──
function renderContacts(data) {
  const html = data.links.map(l =>
    `<li>`
    + `<a class="contact-row" href="${escapeHTML(l.href)}" target="_blank" rel="noopener">`
    +   `<span class="cr-icon">${icon(l.icon, 18)}</span>`
    +   `<span class="cr-label">${escapeHTML(l.label)}</span>`
    +   `<span class="cr-dots" aria-hidden="true">${'.'.repeat(80)}</span>`
    +   `<span class="cr-handle">${escapeHTML(l.handle)}</span>`
    +   `<span class="cr-ext">${icon('ext', 14)}</span>`
    + `</a></li>`
  ).join('');

  return `<section class="sect sect-contact" id="contact">`
    + asciiRuleHTML(data.head, data.n)
    + `<div class="sect-grid">`
    +   `<div class="sect-title">`
    +     `<h2>${data.title}</h2>`
    +     `<p class="sect-sub">${data.sub}</p>`
    +   `</div>`
    +   `<ul class="contact-list stagger">${html}</ul>`
    + `</div>`
    + `</section>`;
}

// ── Рендер: Футер ──
function renderFooter(el, data, contacts) {
  const year = new Date().getFullYear();
  const email = contacts.links.find(l => l.icon === 'mail');
  el.innerHTML = ''
    + `<span>${data.sig}</span>`
    + `<span>`
    +   `<span class="foot-built" title="или нет?">${data.built}</span> &middot; ${year}`
    +   (email ? ` &middot; <a href="${escapeHTML(email.href)}">${escapeHTML(email.handle)}</a>` : '')
    + `</span>`;

  // Пасхалка
  const builtEl = el.querySelector('.foot-built');
  const secret = 'собрано Claude под чутким руководством \u{1F916}';
  const glyphs = '\u2588\u2593\u2592\u2591@#$%&*!?';

  builtEl.style.cursor = 'pointer';
  builtEl.addEventListener('click', function() {
    builtEl.style.cursor = 'default';
    let pos = 0;
    const iv = setInterval(function() {
      if (pos > secret.length) { clearInterval(iv); builtEl.textContent = secret; return; }
      let out = '';
      for (let i = 0; i < secret.length; i++) {
        if (secret[i] === ' ') out += ' ';
        else if (i < pos) out += secret[i];
        else out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      builtEl.textContent = out;
      pos++;
    }, 25);
  }, { once: true });
}

// ── Динамический статус по MSK ──
function getMskStatus() {
  const msk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
  const day = msk.getDay();
  const h = msk.getHours();
  const t = h * 60 + msk.getMinutes();

  const isWeekend = day === 0 || day === 6;
  if (t >= 30 && t < 510)   return { text: 'sleeping', icon: '\u{1F319}', cls: 'status-sleep' };
  if (isWeekend)             return { text: 'chilling', icon: '\u{1F3D6}\uFE0F', cls: 'status-chill' };
  if (t >= 600 && t < 1110)  return { text: 'working', icon: '\u{1F680}', cls: 'status-work' };
  return { text: 'online', icon: '\u{1F7E2}', cls: 'status-on' };
}

function initStatusUpdater() {
  const el = document.getElementById('live-status');
  if (!el) return;

  const update = () => {
    const s = getMskStatus();
    el.className = s.cls;
    el.textContent = s.icon + ' ' + s.text;
  };
  update();
  _timers.push(setInterval(update, 60000));
}

// ── Счётчик опыта (живой) ──
function formatDuration(startStr) {
  const start = new Date(startStr);
  const now = new Date();

  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();
  if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }

  let sec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const hr = Math.floor(sec / 3600); sec %= 3600;
  const min = Math.floor(sec / 60); sec %= 60;

  const pad = n => String(n).padStart(2, '0');
  return `${y} лет ${m} мес ${d} дн ${pad(hr)}:${pad(min)}:${pad(sec)}`;
}

function initExpCounters(meta) {
  const elIT = document.getElementById('exp-it');
  const elDO = document.getElementById('exp-devops');
  if (!elIT || !elDO) return;

  const tick = () => {
    elIT.textContent = formatDuration(meta.start_it);
    elDO.textContent = formatDuration(meta.start_devops);
  };
  tick();
  _timers.push(setInterval(tick, 1000));
}

// ── Терминальная анимация набора ──
function initTerminalTyping(lines, user, host) {
  const container = document.getElementById('terminal-lines');
  const heroBody = document.getElementById('hero-body');
  const termBody = container.parentNode;

  function makePromptDiv() {
    const div = document.createElement('div');
    div.className = 'tline';
    div.innerHTML = promptHTML(user, host, '') + '<span class="cursor"></span>';
    container.appendChild(div);
    return div;
  }

  // Резервируем высоту terminal-body целиком,
  // чтобы блок не прыгал при наборе и появлении контента
  for (let k = 0; k <= lines.length; k++) {
    const tmp = document.createElement('div');
    tmp.className = 'tline';
    tmp.innerHTML = promptHTML(user, host, k < lines.length ? lines[k] : '');
    container.appendChild(tmp);
  }
  heroBody.style.cssText = 'opacity:1;transform:none;transition:none';
  termBody.style.minHeight = termBody.offsetHeight + 'px';
  heroBody.style.cssText = 'opacity:0;transform:translateY(10px)';
  container.innerHTML = '';

  // Набор prompt-строк посимвольно
  let lineIdx = 0;
  let charIdx = 0;
  let currentDiv = makePromptDiv();

  function typeNext() {
    if (lineIdx >= lines.length) {
      setTimeout(() => revealGlitch(heroBody), 700);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx <= line.length) {
      currentDiv.innerHTML = promptHTML(user, host, line.slice(0, charIdx))
        + '<span class="cursor"></span>';
      charIdx++;
      setTimeout(typeNext, 80);
    } else {
      currentDiv.innerHTML = promptHTML(user, host, line);
      lineIdx++;
      charIdx = 0;
      currentDiv = makePromptDiv();
      setTimeout(typeNext, lineIdx >= lines.length ? 0 : 400);
    }
  }

  setTimeout(typeNext, 500);
}

// ── Глитч-reveal: параллельный набор с декодированием ──
function revealGlitch(heroBody) {
  const GLYPHS = '\u2588\u2593\u2592\u2591@#$%&*!?/\\|<>{}[]~^';
  const TICK = 18;
  const DECODE_TICKS = 4;
  const SPEED = [3, 3, 1, 1]; // role и name в 3x медленнее

  const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

  const targets = heroBody.querySelectorAll('.hero-role, .hero-name, .hero-tagline, .hero-sub');
  const cta = heroBody.querySelector('.hero-cta');
  const ctaBtns = cta ? cta.querySelectorAll('.btn') : [];

  // Сохраняем текст, очищаем (высота уже зафиксирована)
  const originals = [];
  for (let i = 0; i < targets.length; i++) {
    originals.push(targets[i].textContent);
    targets[i].textContent = '';
  }

  // Прячем кнопки до завершения
  if (cta) cta.style.opacity = '0';
  for (let i = 0; i < ctaBtns.length; i++) {
    ctaBtns[i].style.cssText = 'opacity:0;transform:translateY(12px) scale(0.95);'
      + 'transition:opacity 0.8s ease,transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
  }

  // Показываем блок (текст пустой — без моргания)
  heroBody.style.cssText = 'opacity:1;transform:none;transition:none';

  // Состояние каждого элемента
  const states = [];
  for (let i = 0; i < targets.length; i++) {
    states.push({ pos: 0, chars: [], tick: 0, every: SPEED[i] || 1 });
  }

  const intervalId = setInterval(() => {
    let allDone = true;

    for (let i = 0; i < targets.length; i++) {
      const state = states[i];
      const orig = originals[i];

      // Новый символ каждые state.every тиков
      state.tick++;
      if (state.tick % state.every === 0 && state.pos < orig.length) {
        state.chars.push({ real: orig[state.pos], ticks: orig[state.pos] === ' ' ? 0 : DECODE_TICKS });
        state.pos++;
      }

      // Рендер: глитч -> реальный символ
      let out = '';
      let done = state.pos >= orig.length;
      for (let j = 0; j < state.chars.length; j++) {
        const charState = state.chars[j];
        if (charState.ticks > 0) { out += randGlyph(); charState.ticks--; done = false; }
        else { out += charState.real; }
      }
      targets[i].textContent = out;
      if (!done) allDone = false;
    }

    if (allDone) {
      clearInterval(intervalId);
      for (let i = 0; i < targets.length; i++) targets[i].textContent = originals[i];

      // Кнопки — bounce-появление
      if (cta) {
        setTimeout(() => {
          cta.style.opacity = '1';
          for (let i = 0; i < ctaBtns.length; i++) {
            const delay = i * 250;
            setTimeout(() => { ctaBtns[i].style.cssText = ''; }, delay);
          }
        }, 500);
      }
    }
  }, TICK);
}

// ── Scroll reveal ──
function initScrollReveal() {
  _scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sect').forEach(el => {
    if (el.querySelector('.stagger')) el.classList.add('has-stagger');
    _scrollObserver.observe(el);
  });
}

// ── Инициализация (вызывается из page-*.js) ──
function initPage(currentPage) {
  const lang = getLang();
  const c = CONTENT[lang] || CONTENT.ru;

  // Навигация
  renderNav(document.getElementById('topbar'), c, currentPage);

  // Hero
  const titleKey = currentPage === 'personal' ? 'title_personal' : 'title_cv';
  renderHero(document.getElementById('hero'), c, c.meta[titleKey]);

  // Футер
  renderFooter(document.getElementById('footer'), c.footer, c.contacts);

  // Терминальная анимация
  initTerminalTyping(c.hero.prompt_lines, c.meta.handle, c.meta.host);

  // Консольное приветствие
  console.log(
    '\n%c' + c.hero.name + ' %c(' + c.meta.handle + ')',
    'color:#f0ead8;font-size:16px;font-weight:bold',
    'color:#d4a017;font-size:16px'
  );
  console.log('%c' + c.hero.role, 'color:#d4a017;font-size:11px');
  console.log('%c' + c.meta.host, 'color:#6a665b;font-size:11px');
  console.log('%cА что ты тут рассчитывал увидеть? >_>\n', 'color:#8d887a;font-size:10px');

  // Живые фичи
  initExpCounters(c.meta);
  initStatusUpdater();

  // Scroll progress + кнопка наверх
  initScrollUI();

  return c;
}

function initScrollUI() {
  // Progress bar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // Кнопка наверх
  const btn = document.createElement('button');
  btn.className = 'btn-top';
  btn.setAttribute('aria-label', 'Наверх');
  btn.innerHTML = icon('arrow', 16);
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);

  // Обновление при скролле
  const avatar = window.innerWidth >= 900 ? document.querySelector('.avatar-wrap') : null;
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (scrollY / h) * 100 : 0;
        bar.style.width = pct + '%';
        btn.classList.toggle('is-visible', scrollY > 400);
        if (avatar) avatar.style.transform = `translateY(${scrollY * 0.08}px)`;
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Очистка при уходе со страницы ──
window.addEventListener('beforeunload', () => {
  _timers.forEach(id => clearInterval(id));
  if (_scrollObserver) _scrollObserver.disconnect();
});
