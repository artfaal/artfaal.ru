// Human page — the warm side. Hero, hobbies collage, about, contacts.

const { useState: uSH, useEffect: uEH, useRef: uRH, useMemo: uMH } = React;

// ───────── Hero ─────────
const HeroHuman = () => {
  const [typed, setTyped] = uSH("");
  const [showAvatar, setShowAvatar] = uSH(true); // hover flips avatar ↔ photo
  const full = "cat ~/about/human.md";
  uEH(() => {
    let i = 0;
    const id = setInterval(() => {
      i++; setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-term">
          <div className="term-head">
            <span className="tr-dot tr-r"/><span className="tr-dot tr-y"/><span className="tr-dot tr-g"/>
            <span className="term-title">~/artfaal — zsh — 120×34</span>
            <span className="term-tail"><MskClock/></span>
          </div>
          <div className="term-body">
            <div className="term-line">
              <span className="term-user">artfaal</span>
              <span className="term-at">@</span>
              <span className="term-host">moscow</span>
              <span className="term-colon">:</span>
              <span className="term-path">~</span>
              <span className="term-dollar">$</span>
              <span className="term-cmd">{typed}<span className="cursor-block">▍</span></span>
            </div>
            {typed === full && (
              <div className="term-out">
                <h1 className="name-line">{HUMAN.name}</h1>
                <div className="role-line">{HUMAN.role}</div>
                <p className="tagline">{HUMAN.tagline}</p>
                <div className="hero-uptimes">
                  <UptimeLine iso={CAREER_ANCHORS.it_start} label="it_total"/>
                  <UptimeLine iso={CAREER_ANCHORS.devops_start} label="devops"/>
                </div>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="work/">
                    <Ico name="arrow"/> открыть work-режим
                  </a>
                  <a className="btn btn-ghost" href="#contact"><Ico name="dot"/> связаться</a>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="hero-port">
          <div
            className={`portrait ${showAvatar ? "is-avatar" : "is-photo"}`}
            onMouseEnter={() => setShowAvatar(false)}
            onMouseLeave={() => setShowAvatar(true)}
            onClick={() => setShowAvatar(v => !v)}
          >
            <img className="portrait-img avatar" src="assets/avatar.jpg" alt="Maksim — avatar"/>
            <img className="portrait-img photo" src="assets/photo.jpg" alt="Maksim — photo"/>
            <div className="portrait-scan"/>
            <div className="portrait-hint">
              <span className="hint-dot"/> peek
            </div>
          </div>
          <div className="port-meta">
            <div className="pm-row"><span>loc</span><b>{HUMAN.city}</b></div>
            <div className="pm-row"><span>status</span>
              <StatusBadge labels={STATUS_LABELS_HUMAN}/>
            </div>
            <div className="pm-row"><span>lang</span><b>ru · en</b></div>
          </div>
        </aside>
      </div>
    </section>
  );
};

// ───────── About (short, 3 paragraphs) ─────────
const AboutHuman = () => (
  <section id="about" className="sec sec-about">
    <Rule label="// about"/>
    <div className="about-grid">
      {HUMAN.about_short.map((p, i) => (
        <p key={i} className="about-p">{p}</p>
      ))}
    </div>
  </section>
);

// ───────── Hobbies collage ─────────
const HobbyCell = ({ h, big }) => (
  <article
    className={`hob hob-${h.tone} ${big ? "hob-big" : ""}`}
    style={{ aspectRatio: h.ratio }}
  >
    <header className="hob-head">
      <span className="hob-tag">#{h.tag}</span>
      {h.high && <span className="hob-high">{h.high}</span>}
    </header>
    <div className="hob-body">
      <h3 className="hob-title">{h.title}</h3>
      <p className="hob-blurb">{h.blurb}</p>
    </div>
    <footer className="hob-foot">
      <span className="hob-label">{h.label}</span>
      <span className="hob-dot"/>
    </footer>
  </article>
);

const HobbyCollage = () => (
  <section id="life" className="sec sec-life">
    <Rule label="// вне-работы"/>
    <p className="sec-lede">Что занимает голову и руки, когда компьютер закрыт.</p>
    <div className="collage">
      {HUMAN.hobbies.map((h, i) => (
        <HobbyCell key={i} h={h} big={i === 0 || i === 3}/>
      ))}
    </div>
  </section>
);

// ───────── Contacts ─────────
const ContactsHuman = () => (
  <section id="contact" className="sec sec-contact">
    <Rule label="// связаться"/>
    <div className="cts-grid">
      {CONTACTS.map((c, i) => (
        <a className="cts-card" key={i} href={c.href} target="_blank" rel="noreferrer">
          <span className="cts-ico"><Ico name={c.icon}/></span>
          <span className="cts-body">
            <b>{c.label}</b>
            <span>{c.handle}</span>
          </span>
          <span className="cts-ext"><Ico name="ext"/></span>
        </a>
      ))}
    </div>
  </section>
);

const Footer = ({ onLang }) => (
  <footer className="foot">
    <div className="foot-l">
      <span>© {new Date().getFullYear()} · artfaal</span>
      <span className="foot-sep">│</span>
      <span>сверстано руками без CMS</span>
    </div>
    <div className="foot-r">
      <a href="work/">work-mode →</a>
    </div>
  </footer>
);

Object.assign(window, { HeroHuman, AboutHuman, HobbyCollage, ContactsHuman, Footer });
