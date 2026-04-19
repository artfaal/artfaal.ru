// Section components (v2).

const { useState, useEffect, useMemo, useRef } = React;

// ───────── Hero ─────────
const HeroSection = ({ t, meta, lang, units }) => {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [portraitHover, setPortraitHover] = useState(false);

  useEffect(() => {
    const lines = t.prompt_lines;
    let i = 0, j = 0;
    setTyped(""); setLineIdx(0); setBodyVisible(false);
    const iv = setInterval(() => {
      const line = lines[i];
      if (!line) { clearInterval(iv); setBodyVisible(true); return; }
      if (j <= line.length) { setTyped(line.slice(0, j)); j += 1; }
      else { i += 1; j = 0; setLineIdx(i); if (i >= lines.length) { clearInterval(iv); setBodyVisible(true); } }
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
            <span className="tname-right"><StatusBadge labels={t.status} tzLabel={meta.tz_label} /></span>
          </div>
          <div className="terminal-body">
            {t.prompt_lines.slice(0, lineIdx).map((line, idx) => (
              <div key={idx} className="tline">
                <Prompt user={meta.handle} host={meta.host}>{line}</Prompt>
              </div>
            ))}
            <div className="tline">
              <Prompt user={meta.handle} host={meta.host}>{typed}<Cursor /></Prompt>
            </div>

            <div className={`hero-body ${bodyVisible ? "is-on" : ""}`}>
              <div className="hero-role">{t.role}</div>
              <h1 className="hero-name">{t.name}</h1>

              {/* anchor strip — live counters + static facts */}
              <div className="anchors">
                {t.anchors.map((a, i) => (
                  <div key={i} className={`anchor ${a.mode}`}>
                    {a.mode === "static"
                      ? <div className="a-v">{a.v}</div>
                      : <LiveSpan kind={a.mode} lang={lang} units={units} />}
                    <div className="a-k">{a.k}</div>
                  </div>
                ))}
              </div>

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
            <div
              className={`portrait ${portraitHover ? "is-hover" : ""}`}
              onMouseEnter={() => setPortraitHover(true)}
              onMouseLeave={() => setPortraitHover(false)}
              onFocus={() => setPortraitHover(true)}
              onBlur={() => setPortraitHover(false)}
              tabIndex={0}
            >
              <img className="p-photo"  src="assets/photo.jpg"  alt="portrait" loading="lazy" />
              <img className="p-avatar" src="assets/avatar.jpg" alt="avatar"   loading="lazy" />
              <div className="avatar-scan" aria-hidden />
              <span className="p-hint">{t.portrait_hint}</span>
            </div>
            <div className="avatar-meta">
              <MetaRow k="user" v={meta.handle} />
              <MetaRow k="role" v={t.role} />
              <MetaRow k="status" v={<StatusBadge labels={t.status} tzLabel={meta.tz_label} compact />} mono={false} />
              <MetaRow k="host" v={meta.host} />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

// ───────── Identity (with trajectory) ─────────
const IdentitySection = ({ t }) => (
  <section className="sect sect-identity" id="identity" data-screen-label="02 Identity">
    <AsciiRule label={t.head} n="01" />
    <div className="sect-grid">
      <div className="sect-title"><h2>{t.title}</h2></div>
      <div className="sect-body">
        {t.body.map((p, i) => <p key={i} className="para">{p}</p>)}
        <div className="trajectory">
          {t.trajectory.map((step, i, arr) => (
            <React.Fragment key={i}>
              <span className={`tr-step ${step.current ? "is-current" : ""}`}>
                <span className="tr-y">{step.y}</span>
                <span className="tr-t">{step.t}</span>
              </span>
              {i < arr.length - 1 && <span className="tr-arrow" aria-hidden>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ───────── Value / what i do ─────────
const ValueSection = ({ t }) => (
  <section className="sect sect-value" id="value" data-screen-label="03 Value">
    <AsciiRule label={t.head} n="02" />
    <div className="sect-grid">
      <div className="sect-title"><h2>{t.title}</h2></div>
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

// ───────── Current role ─────────
const RoleSection = ({ t }) => (
  <section className="sect sect-role" id="role" data-screen-label="04 Role">
    <AsciiRule label={t.head} n="03" />
    <div className="sect-grid">
      <div className="sect-title"><h2>{t.title}</h2></div>
      <div className="role-card">
        <div className="role-head">
          <div className="role-pos">{t.position}</div>
          <div className="role-co">@ {t.company} · <span className="role-since">{t.since}</span></div>
        </div>
        <div className="role-proj">
          <span className="rp-dot" />
          <span className="rp-t">{t.project}</span>
          <span className="rp-d"> — {t.project_desc}</span>
        </div>
        <ul className="role-bullets">
          {t.bullets.map((b, i) => (
            <li key={i}><span className="rb-mark" aria-hidden>▸</span>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// ───────── Work case card (expandable) ─────────
const WorkCard = ({ c, tLabels, open, onToggle }) => (
  <article className={`work-card ${open ? "is-open" : ""}`} id={`case-${c.id}`}>
    <button className="wc-head" onClick={onToggle} aria-expanded={open}>
      <div className="wc-head-l">
        <span className="wc-tag">{c.tag}</span>
        <div className="wc-title">
          <h3 className="wc-t">{c.t}</h3>
          <div className="wc-sub">{c.sub}</div>
        </div>
      </div>
      <div className="wc-head-r">
        <Icon name={open ? "minus" : "plus"} size={18} />
      </div>
    </button>
    <div className="wc-meta">{c.meta}</div>
    <div className="wc-body" style={{ maxHeight: open ? "1400px" : 0 }}>
      <div className="wc-inner">
        <div className="wc-row"><div className="wc-k">{tLabels.task}</div><div className="wc-v">{c.task}</div></div>
        <div className="wc-row"><div className="wc-k">{tLabels.did}</div><div className="wc-v">{c.did}</div></div>
        <div className="wc-row"><div className="wc-k">{tLabels.changed}</div><div className="wc-v">{c.changed}</div></div>
        <div className="wc-row"><div className="wc-k">{tLabels.learned}</div><div className="wc-v">{c.learned}</div></div>
      </div>
    </div>
  </article>
);

// ───────── Featured LLM case ─────────
const FeaturedCase = ({ c, tLabels }) => (
  <article className="featured-case" id={`case-${c.id}`}>
    <div className="fc-aside">
      <div className="fc-badge">{c.badge}</div>
      <div className="fc-tag">{c.tag}</div>
    </div>
    <div className="fc-main">
      <h3 className="fc-t">{c.t}</h3>
      <div className="fc-sub">{c.sub}</div>
      <div className="fc-meta">{c.meta}</div>

      <div className="fc-block">
        <div className="fc-k">{tLabels.task}</div>
        <p className="fc-p">{c.task}</p>
      </div>
      <div className="fc-block">
        <div className="fc-k">{tLabels.did}</div>
        <p className="fc-p">{c.did}</p>
      </div>

      <div className="fc-columns">
        <div className="fc-col fc-col-tried">
          <div className="fc-col-h">{tLabels.tried}</div>
          <div className="fc-chips">
            {c.timeline.tried.map((x, i) => <span key={i} className="fc-chip">{x}</span>)}
          </div>
        </div>
        <div className="fc-col fc-col-dropped">
          <div className="fc-col-h">{tLabels.dropped}</div>
          <ul className="fc-list">
            {c.timeline.dropped.map((x, i) => (
              <li key={i}><span className="fc-x"><Icon name="x" size={13} /></span><b>{x.t}</b><span> — {x.d}</span></li>
            ))}
          </ul>
        </div>
        <div className="fc-col fc-col-kept">
          <div className="fc-col-h">{tLabels.kept}</div>
          <ul className="fc-list">
            {c.timeline.kept.map((x, i) => (
              <li key={i}><span className="fc-c"><Icon name="check" size={13} /></span><b>{x.t}</b><span> — {x.d}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fc-block">
        <div className="fc-k">{tLabels.learned}</div>
        <p className="fc-p">{c.learned}</p>
      </div>

      {c.link && (
        <a className="fc-link" href={c.link.href} target="_blank" rel="noopener">
          {c.link.label}
        </a>
      )}
    </div>
  </article>
);

// ───────── Work section wrapper ─────────
const WorkSection = ({ t, lang }) => {
  const [openId, setOpenId] = useState(t.items[0]?.id);
  const caseLabels = lang === "ru"
    ? { task: "задача", did: "что сделал", changed: "что изменилось", learned: "чему научился", tried: "перепробовал", dropped: "выкинул", kept: "оставил" }
    : { task: "task",   did: "did",        changed: "changed",       learned: "learned",         tried: "tried",        dropped: "dropped",  kept: "kept" };

  return (
    <section className="sect sect-work" id="work" data-screen-label="05 Selected work">
      <AsciiRule label={t.head} n="04" />
      <div className="sect-grid">
        <div className="sect-title">
          <h2>{t.title}</h2>
          <p className="sect-sub">{t.sub}</p>
        </div>
        <div className="work-stack">
          <FeaturedCase c={t.featured} tLabels={caseLabels} />
          <div className="work-list">
            {t.items.map((c) => (
              <WorkCard
                key={c.id}
                c={c}
                tLabels={caseLabels}
                open={openId === c.id}
                onToggle={() => setOpenId(openId === c.id ? null : c.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── Principles ─────────
const PrinciplesSection = ({ t }) => (
  <section className="sect sect-principles" id="principles" data-screen-label="06 Principles">
    <AsciiRule label={t.head} n="05" />
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

// ───────── Now digging ─────────
const DiggingSection = ({ t }) => (
  <section className="sect sect-digging" id="digging" data-screen-label="07 Now digging">
    <AsciiRule label={t.head} n="06" />
    <div className="sect-grid">
      <div className="sect-title"><h2>{t.title}</h2></div>
      <ul className="dig-list">
        {t.items.map((it, i) => (
          <li key={i} className="dig-item">
            <div className="dg-t">{it.t}</div>
            <div className="dg-d">{it.d}</div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ───────── Human / off-hours ─────────
const HumanSection = ({ t }) => (
  <section className="sect sect-human" id="human" data-screen-label="08 Off-hours">
    <AsciiRule label={t.head} n="07" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <div className="human-grid">
        {t.cards.map((c, i) => (
          <article key={i} className="human-card">
            <StripePlaceholder
              label={c.img}
              ratio="4 / 3"
              tone={i % 2 === 0 ? "accent" : "panel"}
              highlight={c.highlight}
            />
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

// ───────── Stack ─────────
const StackSection = ({ t }) => (
  <section className="sect sect-stack" id="stack" data-screen-label="09 Stack">
    <AsciiRule label={t.head} n="08" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <div className="stack-groups">
        {t.groups.map((g) => (
          <div key={g.k} className={`sg sg-${g.k}`}>
            <div className="sg-h">{g.k}</div>
            <div className="sg-items">
              {g.items.map((x, i) => (
                <span key={i} className="sg-chip">{x}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ───────── Writing ─────────
const WritingSection = ({ t }) => (
  <section className="sect sect-writing" id="writing" data-screen-label="10 Writing">
    <AsciiRule label={t.head} n="09" />
    <div className="sect-grid">
      <div className="sect-title">
        <h2>{t.title}</h2>
        <p className="sect-sub">{t.sub}</p>
      </div>
      <ul className="writing-list">
        {t.links.map((l, i) => (
          <li key={i}>
            <a className="wr-link" href={l.href} target="_blank" rel="noopener">
              <span className="wr-label">{l.label}</span>
              <span className="wr-dots" aria-hidden>{".".repeat(60)}</span>
              <span className="wr-handle">{l.handle}</span>
              <span className="wr-ext"><Icon name="ext" size={14} /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ───────── Contacts ─────────
const ContactsSection = ({ t }) => (
  <section className="sect sect-contact" id="contact" data-screen-label="11 Contact">
    <AsciiRule label={t.head} n="10" />
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
  HeroSection, IdentitySection, ValueSection, RoleSection,
  WorkSection, PrinciplesSection, DiggingSection,
  HumanSection, StackSection, WritingSection, ContactsSection,
});
