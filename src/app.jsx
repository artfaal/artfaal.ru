// Main app: wires up content + mode + lang + tweaks, and renders the page.

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "amber",
  "mono": "jetbrains",
  "density": "cozy",
  "theme": "dark"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "ru");
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "work");
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = useState(false);

  // Persist lang + mode.
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("mode", mode); }, [mode]);

  // Apply tweaks to :root whenever they change.
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  // Edit-mode host handshake.
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksVisible(true);
      if (d.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", onMsg);
    // only announce after listener attached
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Update document title on lang change.
  const t = CONTENT[lang];
  useEffect(() => { document.title = t.meta.title; }, [lang]);

  // Scroll-reveal: add .in-view to .sect when it enters viewport.
  useEffect(() => {
    const els = document.querySelectorAll(".sect");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, mode]);

  // Section order changes with mode. "work" leads with value+principles first;
  // "human" softly reshuffles so the human block surfaces earlier.
  const sectionOrder = mode === "work"
    ? ["about", "value", "principles", "human", "contact"]
    : ["about", "human", "principles", "value", "contact"];

  const renderSection = (key) => {
    switch (key) {
      case "about":      return <AboutSection key="about" t={t.about} />;
      case "value":      return <ValueSection key="value" t={t.value} />;
      case "principles": return <PrinciplesSection key="principles" t={t.principles} />;
      case "human":      return <HumanSection key="human" t={t.human} />;
      case "contact":    return <ContactsSection key="contact" t={t.contacts} meta={t.meta} />;
      default: return null;
    }
  };

  return (
    <>
      <ModeLangBar
        mode={mode} setMode={setMode}
        lang={lang} setLang={setLang}
        t={t}
      />
      <HeroSection t={t.hero} meta={t.meta} />
      {sectionOrder.map(renderSection)}
      <footer className="foot">
        <span>{t.footer.sig}</span>
        <span>
          {t.footer.built} · {t.footer.year} · <a href="mailto:sys.dll@gmail.com">sys.dll@gmail.com</a>
        </span>
      </footer>
      <TweakPanel visible={tweaksVisible} tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
