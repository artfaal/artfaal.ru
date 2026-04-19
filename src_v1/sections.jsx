// Section components.

const { useState, useEffect, useMemo, useRef } = React;

// ─────────── Hero ───────────
const HeroSection = ({ t, meta }) => {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [bodyVisible, setBodyVisible] = useState(false);

  // Type out the prompt lines once on mount, then reveal body.
  useEffect(() => {
    const lines = t.prompt_lines;
    let i = 0, j = 0;
    setTyped(""); setLineIdx(0); setBodyVisible(false);
    const iv = setInterval(() => {
      const line = lines[i];
      if (!line) { clearInterval(iv); setBodyVisible(true); return; }
      if (j <= line.length) {
        setTyped(line.slice(0, j));
        j += 1;
      } else {
        i += 1; j = 0;
        setLineIdx(i);
        if (i >= lines.length) { clearInterval(iv); setBodyVisible(true); }
      }
    }, 55);
    return () => clearInterval(iv);
  }, [t.prompt_lines.join("|")]);

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="terminal-head">
            <span className="tdot" style={{ background: "#ff5f56" }} />
            <span className="tdot" style={{ background: "#ffbd2e" }} />
            <span className="tdot" style={{ background: "#27c93f" }} />
            <span className="tname">{meta.handle}@{meta.host} — {meta.shell}</span>
          </div>
          <div className="terminal-body">
            {t.prompt_lines.slice(0, lineIdx).map((line, idx) => (
              <div key={idx} className="tline">
                <Prompt user={meta.handle} host={meta.host}>{line}</Prompt>
              </div>
            ))}
            <div className="tline">
              <Prompt user={meta.handle} host={meta.host}>
                {typed}
                <Cursor />
              </Prompt>
            </div>

            <div className={`hero-body ${bodyVisible ? "is-on" : ""}`}>
              <div className="hero-role">{t.role}</div>
              <h1 className="hero-name">{t.name}</h1>
              <p className="hero-tagline">
                {t.tagline.map((ln, i) => <span key={i}>{ln}<br /></span>)}
              </p>
              <p className="hero-sub">{t.sub}</p>

              <div className="hero-cta">
                <a className="btn btn-primary" href="https://t.me/artfaal">
                  <Icon name="tg" size={16} /> {t.cta_primary} <Icon name="arrow" size={14} />
                </a>
                <a className="btn btn-ghost" href="https://github.com/artfaal">
                  <Icon name="gh" size={16} /> {t.cta_secondary}
                </a>
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-right">
          <div className="avatar-wrap">
            <div className="avatar-frame">
              <img src="assets/avatar.jpg" alt="avatar" loading="lazy" />
              <div className="avatar-scan" aria-hidden />
            </div>
            <div className="avatar-meta">
              <MetaRow k="user" v={meta.handle} />
              <MetaRow k="role" v={t.role} />
              <MetaRow k="status" v={<span className="status-on">● online</span>} mono={false} />
              <MetaRow k="host" v={meta.host} />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

// ─────────── About ───────────
const AboutSection = ({ t }) => (
  <section className="sect sect-about" id="about" data-screen-label="02 About">
    <AsciiRule label={t.head} n="02" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
      </div>
      <div className="sect-body">
        {t.body.map((p, i) => <p key={i} className="para">{p}</p>)}
        <div className="stat-row">
          {t.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-v">{s.v}</div>
              <div className="stat-k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─────────── Value ───────────
const ValueSection = ({ t }) => (
  <section className="sect sect-value" id="value" data-screen-label="03 Value">
    <AsciiRule label={t.head} n="03" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
      </div>
      <ul className="value-list">
        {t.items.map((it) => (
          <li key={it.k} className="value-item">
            <div className="vi-key">{it.k}</div>
            <div className="vi-body">
              <div className="vi-t">{it.t}</div>
              <div className="vi-d">{it.d}</div>
            </div>
            <div className="vi-mark" aria-hidden>→</div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─────────── Principles ───────────
const PrinciplesSection = ({ t }) => (
  <section className="sect sect-principles" id="principles" data-screen-label="04 Principles">
    <AsciiRule label={t.head} n="04" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <div className="principles-grid">
        {t.items.map((p) => (
          <article key={p.n} className="principle">
            <header className="p-head">
              <span className="p-n">{p.n}</span>
              <span className="p-rule" aria-hidden />
            </header>
            <h3 className="p-t">{p.t}</h3>
            <p className="p-d">{p.d}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ─────────── Human ───────────
const HumanSection = ({ t }) => (
  <section className="sect sect-human" id="human" data-screen-label="05 Human">
    <AsciiRule label={t.head} n="05" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <div className="human-grid">
        {t.cards.map((c, i) => (
          <article key={i} className="human-card">
            <StripePlaceholder label={c.img} ratio="4 / 3" tone={i % 2 === 0 ? "accent" : "panel"} />
            <div className="hc-body">
              <div className="hc-tag">{c.tag}</div>
              <div className="hc-t">{c.t}</div>
              <p className="hc-d">{c.d}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ─────────── Contacts ───────────
const ContactsSection = ({ t, meta }) => (
  <section className="sect sect-contact" id="contact" data-screen-label="06 Contact">
    <AsciiRule label={t.head} n="06" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <ul className="contact-list">
        {t.links.map((l) => (
          <li key={l.key}>
            <a className="contact-row" href={l.href} target="_blank" rel="noopener">
              <span className="cr-icon"><Icon name={l.key} size={18} /></span>
              <span className="cr-label">{l.label}</span>
              <span className="cr-dots" aria-hidden>{".".repeat(80)}</span>
              <span className="cr-handle">{l.handle}</span>
              <span className="cr-ext"><Icon name="ext" size={14} /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

Object.assign(window, {
  HeroSection, AboutSection, ValueSection,
  PrinciplesSection, HumanSection, ContactsSection,
});
