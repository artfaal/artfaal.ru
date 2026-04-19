// Top bar with mode switch (work/human) and language switch (ru/en).
// Also handles the Tweaks panel (accent color, mono font, density, theme).

const { useState: useS, useEffect: useE } = React;

const ModeLangBar = ({ mode, setMode, lang, setLang, t }) => (
  <div className="topbar">
    <div className="tb-left">
      <span className="tb-brand">
        <span className="tb-dot" />
        <span className="tb-name">solovev.dev</span>
      </span>
    </div>
    <div className="tb-right">
      <div className="seg" role="group" aria-label={t.nav.mode_label}>
        <span className="seg-label">--mode=</span>
        <button
          className={`seg-btn ${mode === "work" ? "is-on" : ""}`}
          onClick={() => setMode("work")}
        >
          {t.nav.mode_work}
        </button>
        <span className="seg-sep">|</span>
        <button
          className={`seg-btn ${mode === "human" ? "is-on" : ""}`}
          onClick={() => setMode("human")}
        >
          {t.nav.mode_human}
        </button>
      </div>
      <div className="seg" role="group" aria-label={t.nav.lang_label}>
        <span className="seg-label">--lang=</span>
        <button
          className={`seg-btn ${lang === "ru" ? "is-on" : ""}`}
          onClick={() => setLang("ru")}
        >ru</button>
        <span className="seg-sep">|</span>
        <button
          className={`seg-btn ${lang === "en" ? "is-on" : ""}`}
          onClick={() => setLang("en")}
        >en</button>
      </div>
    </div>
  </div>
);

const ACCENTS = [
  { key: "amber", label: "amber", val: "oklch(0.82 0.17 85)" },
  { key: "cyan",  label: "cyan",  val: "oklch(0.82 0.14 205)" },
  { key: "lime",  label: "lime",  val: "oklch(0.85 0.18 135)" },
  { key: "magenta", label: "magenta", val: "oklch(0.74 0.19 340)" },
];

const FONTS = [
  { key: "jetbrains", label: "JetBrains Mono", css: "'JetBrains Mono', ui-monospace, monospace" },
  { key: "ibmplex",   label: "IBM Plex Mono",   css: "'IBM Plex Mono', ui-monospace, monospace" },
  { key: "spacemono", label: "Space Mono",      css: "'Space Mono', ui-monospace, monospace" },
];

const TweakPanel = ({ visible, tweaks, setTweaks }) => {
  if (!visible) return null;
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };
  return (
    <div className="tweak-panel">
      <div className="tp-head">
        <span className="tp-dot" />
        <span className="tp-title">Tweaks</span>
        <span className="tp-hint">runtime knobs</span>
      </div>

      <div className="tp-row">
        <div className="tp-k">accent</div>
        <div className="tp-v swatches">
          {ACCENTS.map(a => (
            <button
              key={a.key}
              className={`sw ${tweaks.accent === a.key ? "is-on" : ""}`}
              style={{ background: a.val }}
              onClick={() => set("accent", a.key)}
              title={a.label}
            />
          ))}
        </div>
      </div>

      <div className="tp-row">
        <div className="tp-k">mono</div>
        <div className="tp-v">
          {FONTS.map(f => (
            <button
              key={f.key}
              className={`chip ${tweaks.mono === f.key ? "is-on" : ""}`}
              onClick={() => set("mono", f.key)}
              style={{ fontFamily: f.css }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-row">
        <div className="tp-k">density</div>
        <div className="tp-v">
          {["cozy", "compact"].map(d => (
            <button
              key={d}
              className={`chip ${tweaks.density === d ? "is-on" : ""}`}
              onClick={() => set("density", d)}
            >{d}</button>
          ))}
        </div>
      </div>

      <div className="tp-row">
        <div className="tp-k">theme</div>
        <div className="tp-v">
          {["dark", "light"].map(th => (
            <button
              key={th}
              className={`chip ${tweaks.theme === th ? "is-on" : ""}`}
              onClick={() => set("theme", th)}
            >{th}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Applies tweak state to :root CSS vars.
const applyTweaks = (tw) => {
  const r = document.documentElement;
  const accent = ACCENTS.find(a => a.key === tw.accent) || ACCENTS[0];
  const mono = FONTS.find(f => f.key === tw.mono) || FONTS[0];
  r.style.setProperty("--accent", accent.val);
  r.style.setProperty("--mono", mono.css);
  r.setAttribute("data-theme", tw.theme);
  r.setAttribute("data-density", tw.density);
};

Object.assign(window, { ModeLangBar, TweakPanel, applyTweaks, ACCENTS, FONTS });
