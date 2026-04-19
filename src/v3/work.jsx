// Work page — CV-style, print-friendly.

const { useState: uSW, useEffect: uEW } = React;

// ───────── Work hero ─────────
const HeroWork = () => (
  <section className="w-hero">
    <div className="w-hero-top">
      <div className="w-breadcrumb">
        <a href="../">← human</a>
        <span className="w-crumb-sep">/</span>
        <span>work</span>
      </div>
      <div className="w-hero-actions no-print">
        <button className="btn btn-primary" onClick={() => window.print()}>
          <Ico name="dl"/> скачать / печать
        </button>
      </div>
    </div>
    <div className="w-hero-body">
      <h1 className="w-name">{WORK.name}</h1>
      <div className="w-role">{WORK.role}</div>
      <p className="w-headline">{WORK.headline}</p>
      <div className="w-meta">
        <span><b>loc</b> {WORK.location}</span>
        <span className="w-sep">·</span>
        <span><b>avail</b> <StatusBadge labels={STATUS_LABELS_HUMAN}/></span>
        <span className="w-sep">·</span>
        <span><b>lang</b> ru · en</span>
      </div>
      <div className="w-contacts-inline">
        {CONTACTS.filter(c => ["tg","mail","gh","in"].includes(c.icon)).map((c,i) => (
          <a key={i} href={c.href} target="_blank" rel="noreferrer">
            <Ico name={c.icon}/> {c.handle}
          </a>
        ))}
      </div>
      <div className="w-uptimes">
        <UptimeLine iso={CAREER_ANCHORS.it_start} label="it_total"/>
        <UptimeLine iso={CAREER_ANCHORS.devops_start} label="devops"/>
      </div>
    </div>
  </section>
);

// ───────── About ─────────
const AboutWork = () => (
  <section className="w-sec">
    <h2 className="w-h2"><span className="w-h2-num">01</span>About</h2>
    <div className="w-about">
      {WORK.about.map((p, i) => <p key={i}>{p}</p>)}
    </div>
    <ul className="w-highlights">
      {WORK.highlights.map((h, i) => (
        <li key={i}><span className="w-bullet">▸</span>{h}</li>
      ))}
    </ul>
  </section>
);

// ───────── Featured (LLM case) ─────────
const Featured = () => {
  const f = WORK.featured;
  return (
    <section className="w-sec w-featured">
      <h2 className="w-h2"><span className="w-h2-num">02</span>Featured · {f.tag}</h2>
      <article className="feat">
        <header className="feat-head">
          <span className="feat-badge">{f.badge}</span>
          <h3 className="feat-title">{f.title}</h3>
          <p className="feat-sub">{f.sub}</p>
          <p className="feat-meta">{f.meta}</p>
        </header>
        <div className="feat-grid">
          <div className="feat-block">
            <h4 className="fb-h">задача</h4>
            <p>{f.task}</p>
          </div>
          <div className="feat-block">
            <h4 className="fb-h">попробовал</h4>
            <div className="chips">
              {f.tried.map((t,i) => <span key={i} className="chip">{t}</span>)}
            </div>
          </div>
          <div className="feat-block feat-block-cols">
            <div>
              <h4 className="fb-h fb-h-drop">отбросил</h4>
              <ul className="fb-list">
                {f.dropped.map((x,i) => (
                  <li key={i}><b>{x.t}</b> — {x.d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="fb-h fb-h-keep">оставил</h4>
              <ul className="fb-list">
                {f.kept.map((x,i) => (
                  <li key={i}><b>{x.t}</b> — {x.d}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="feat-block feat-lesson">
            <h4 className="fb-h">урок</h4>
            <p>{f.lesson}</p>
          </div>
        </div>
        <a className="feat-link no-print" href={f.link.href} target="_blank" rel="noreferrer">
          <Ico name="ext"/> читать полный разбор · {f.link.label}
        </a>
      </article>
    </section>
  );
};

// ───────── Key projects ─────────
const Projects = () => (
  <section className="w-sec">
    <h2 className="w-h2"><span className="w-h2-num">03</span>Key projects</h2>
    <div className="proj-list">
      {WORK.projects.map((p, i) => (
        <article key={i} className="proj">
          <header className="proj-head">
            <span className="proj-tag">#{p.tag}</span>
            <h3 className="proj-title">{p.title}</h3>
            <p className="proj-sub">{p.sub}</p>
          </header>
          <div className="proj-grid">
            <div><h4>задача</h4><p>{p.task}</p></div>
            <div><h4>что сделал</h4><p>{p.did}</p></div>
            <div><h4>что изменилось</h4><p>{p.changed}</p></div>
            <div><h4>чему научился</h4><p>{p.learned}</p></div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

// ───────── Experience ─────────
const ExpBlock = ({ e, num }) => (
  <article className="exp">
    <div className="exp-bar">
      <span className="exp-num">{num}</span>
      <span className="exp-period">{e.period}</span>
    </div>
    <div className="exp-body">
      <h3 className="exp-pos">{e.pos}</h3>
      <div className="exp-co">{e.co}</div>
      {e.project && (
        <div className="exp-proj"><b>Проект:</b> {e.project.t} — {e.project.d}</div>
      )}
      <p className="exp-summary">{e.summary}</p>
      {e.groups.map((g, i) => (
        <div key={i} className="exp-group">
          <h4 className="exp-gh">{g.h}</h4>
          <ul className="exp-list">
            {g.items.map((it, j) => (
              <li key={j}><span className="exp-bul">▸</span>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </article>
);
const Experience = () => (
  <section className="w-sec">
    <h2 className="w-h2"><span className="w-h2-num">04</span>Experience</h2>
    <div className="exp-list">
      {WORK.experience.map((e, i) => (
        <ExpBlock key={i} e={e} num={String(i+1).padStart(2, "0")}/>
      ))}
    </div>
  </section>
);

// ───────── Skills ─────────
const Skills = () => (
  <section className="w-sec">
    <h2 className="w-h2"><span className="w-h2-num">05</span>Skills</h2>
    <div className="skills">
      <div className="sk-block">
        <h4>Core</h4>
        <div className="chips">{WORK.skills.core.map((s,i) => <span key={i} className="chip chip-core">{s}</span>)}</div>
      </div>
      <div className="sk-block">
        <h4>Extended</h4>
        <div className="chips">{WORK.skills.extended.map((s,i) => <span key={i} className="chip">{s}</span>)}</div>
      </div>
      <div className="sk-block">
        <h4>Past</h4>
        <div className="chips">{WORK.skills.past.map((s,i) => <span key={i} className="chip chip-mute">{s}</span>)}</div>
      </div>
    </div>
  </section>
);

// ───────── Principles ─────────
const Principles = () => (
  <section className="w-sec">
    <h2 className="w-h2"><span className="w-h2-num">06</span>Как работаю</h2>
    <ol className="princ-list">
      {WORK.principles.map((p, i) => (
        <li key={i} className="princ">
          <span className="princ-num">{String(i+1).padStart(2, "0")}</span>
          <div>
            <h3 className="princ-t">{p.t}</h3>
            <p className="princ-d">{p.d}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

// ───────── Education & Languages ─────────
const EduLang = () => (
  <section className="w-sec w-sec-split">
    <div>
      <h2 className="w-h2"><span className="w-h2-num">07</span>Education</h2>
      <ul className="edu-list">
        {WORK.education.map((e, i) => (
          <li key={i}><b>{e.t}</b><span>{e.d}</span></li>
        ))}
      </ul>
    </div>
    <div>
      <h2 className="w-h2"><span className="w-h2-num">08</span>Languages</h2>
      <ul className="edu-list">
        {WORK.languages.map((e, i) => (
          <li key={i}><b>{e.t}</b><span>{e.d}</span></li>
        ))}
      </ul>
    </div>
  </section>
);

// ───────── Contacts (work) ─────────
const ContactsWork = () => (
  <section className="w-sec w-contacts">
    <h2 className="w-h2"><span className="w-h2-num">09</span>Contacts</h2>
    <div className="cts-grid">
      {CONTACTS.map((c, i) => (
        <a className="cts-card" key={i} href={c.href} target="_blank" rel="noreferrer">
          <span className="cts-ico"><Ico name={c.icon}/></span>
          <span className="cts-body"><b>{c.label}</b><span>{c.handle}</span></span>
          <span className="cts-ext"><Ico name="ext"/></span>
        </a>
      ))}
    </div>
  </section>
);

const FooterWork = () => (
  <footer className="w-foot">
    <span>© {new Date().getFullYear()} · Maksim Solovev · DevOps Expert Engineer</span>
    <a href="../" className="no-print">← human-mode</a>
  </footer>
);

const AppWork = () => (
  <main className="page-work">
    <HeroWork/>
    <AboutWork/>
    <Featured/>
    <Projects/>
    <Experience/>
    <Skills/>
    <Principles/>
    <EduLang/>
    <ContactsWork/>
    <FooterWork/>
  </main>
);

const rootW = ReactDOM.createRoot(document.getElementById("app"));
rootW.render(<AppWork/>);
