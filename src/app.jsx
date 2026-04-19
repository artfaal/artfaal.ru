// App wiring for v2.

const { useState: uS, useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "amber",
  "mono": "jetbrains",
  "density": "cozy",
  "theme": "dark"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = uS(() => localStorage.getItem("lang") || "ru");
  const [mode, setMode] = uS(() => localStorage.getItem("mode") || "work");
  const [tweaks, setTweaks] = uS(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = uS(false);

  uE(() => { localStorage.setItem("lang", lang); }, [lang]);
  uE(() => { localStorage.setItem("mode", mode); }, [mode]);
  uE(() => { applyTweaks(tweaks); }, [tweaks]);

  uE(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode")   setTweaksVisible(true);
      if (d.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const t = CONTENT[lang];
  uE(() => { document.title = t.meta.title; }, [lang]);

  uE(() => {
    const els = document.querySelectorAll(".sect");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, mode]);

  const workOrder  = ["identity","value","role","work","principles","digging","stack","writing","human","contact"];
  const humanOrder = ["identity","human","digging","principles","value","role","work","stack","writing","contact"];
  const order = mode === "work" ? workOrder : humanOrder;

  const render = (key) => {
    switch (key) {
      case "identity":   return <IdentitySection   key={key} t={t.identity} />;
      case "value":      return <ValueSection      key={key} t={t.value} />;
      case "role":       return <RoleSection       key={key} t={t.role} />;
      case "work":       return <WorkSection       key={key} t={t.work} lang={lang} />;
      case "principles": return <PrinciplesSection key={key} t={t.principles} />;
      case "digging":    return <DiggingSection    key={key} t={t.digging} />;
      case "human":      return <HumanSection      key={key} t={t.human} />;
      case "stack":      return <StackSection      key={key} t={t.stack} />;
      case "writing":    return <WritingSection    key={key} t={t.writing} />;
      case "contact":    return <ContactsSection   key={key} t={t.contacts} />;
      default: return null;
    }
  };

  // Hero needs the status-labels dict on its `t`, because the terminal header + avatar meta
  // render StatusBadge inline. Everything else gets a clean slice.
  const heroT = { ...t.hero, status: t.status };

  return (
    <>
      <ModeLangBar mode={mode} setMode={setMode} lang={lang} setLang={setLang} t={t} />
      <HeroSection t={heroT} meta={t.meta} lang={lang} units={t.units} />
      {order.map(render)}
      <footer className="foot">
        <span>{t.footer.sig}</span>
        <span>{t.footer.built} · {t.footer.year} · <a href="mailto:sys.dll@gmail.com">sys.dll@gmail.com</a></span>
      </footer>
      <TweakPanel visible={tweaksVisible} tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
