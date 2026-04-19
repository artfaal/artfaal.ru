// Small shared components.

const Cursor = ({ on = true }) => (
  <span
    className="cursor"
    style={{
      display: "inline-block",
      width: "0.55em",
      height: "1.05em",
      background: "var(--accent)",
      verticalAlign: "-0.15em",
      marginLeft: "0.15em",
      animation: on ? "blink 1s steps(1) infinite" : "none",
      boxShadow: "0 0 0.6em color-mix(in oklab, var(--accent) 60%, transparent)",
    }}
  />
);

const Prompt = ({ user = "artfaal", host = "solovev.dev", path = "~", sym = "$", children, dim = false }) => (
  <span className="prompt-line" style={{ opacity: dim ? 0.55 : 1 }}>
    <span style={{ color: "var(--accent)" }}>{user}</span>
    <span style={{ color: "var(--muted)" }}>@</span>
    <span style={{ color: "var(--fg-2)" }}>{host}</span>
    <span style={{ color: "var(--muted)" }}>:</span>
    <span style={{ color: "var(--accent-2)" }}>{path}</span>
    <span style={{ color: "var(--muted)" }}>{sym} </span>
    <span>{children}</span>
  </span>
);

const AsciiRule = ({ label, n }) => (
  <div className="ascii-rule" aria-hidden>
    <span className="ar-left">├──</span>
    <span className="ar-label">
      {n && <span className="ar-n">{n}</span>}
      <span>{label}</span>
    </span>
    <span className="ar-right" />
  </div>
);

const StripePlaceholder = ({ label, ratio = "4 / 3", tone = "accent", highlight }) => {
  const bg = tone === "accent" ? "var(--accent)" : "var(--panel-2)";
  const fg = tone === "accent" ? "var(--bg)" : "var(--fg-2)";
  return (
    <div
      className="stripe-ph"
      style={{
        aspectRatio: ratio,
        background: `repeating-linear-gradient(135deg, ${bg} 0 14px, color-mix(in oklab, ${bg} 85%, black) 14px 28px)`,
        color: fg,
      }}
    >
      <div className="stripe-ph-inner">
        <span className="stripe-ph-dot" />
        <span className="stripe-ph-label">{label}</span>
        {highlight && <span className="stripe-ph-high">{highlight}</span>}
      </div>
    </div>
  );
};

const MetaRow = ({ k, v, mono = true }) => (
  <div className="meta-row">
    <span className="meta-k">{k}</span>
    <span className="meta-dot" aria-hidden>{".".repeat(60)}</span>
    <span className="meta-v" style={{ fontFamily: mono ? "var(--mono)" : "inherit" }}>{v}</span>
  </div>
);

const Icon = ({ name, size = 16 }) => {
  const s = size;
  const props = {
    width: s, height: s, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow":  return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "tg":     return <svg {...props}><path d="M3 11.5 20.5 4 17 20l-5-4-3 3v-5l9-8-11 6-4-1 .5-3.5Z" /></svg>;
    case "mail":   return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/></svg>;
    case "gh":     return <svg {...props}><path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.6-.2.6-.43v-1.6c-2.5.54-3.03-1.2-3.03-1.2-.4-1.05-1-1.33-1-1.33-.83-.57.07-.56.07-.56.92.07 1.4.95 1.4.95.82 1.4 2.15 1 2.68.77.08-.6.32-1 .58-1.23-2-.23-4.1-1-4.1-4.48 0-1 .35-1.8.93-2.44-.1-.23-.4-1.15.08-2.4 0 0 .76-.25 2.5.92a8.6 8.6 0 0 1 4.55 0c1.73-1.17 2.5-.92 2.5-.92.48 1.25.18 2.17.08 2.4.58.64.92 1.44.92 2.44 0 3.5-2.1 4.25-4.1 4.47.33.28.62.83.62 1.68v2.5c0 .24.15.52.6.43A9 9 0 0 0 12 3Z"/></svg>;
    case "in":     return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 11v6"/></svg>;
    case "blog":   return <svg {...props}><path d="M4 5h12a4 4 0 0 1 4 4v10H8a4 4 0 0 1-4-4V5Z"/><path d="M8 10h8M8 14h5"/></svg>;
    case "ext":    return <svg {...props}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case "plus":   return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":  return <svg {...props}><path d="M5 12h14"/></svg>;
    case "check":  return <svg {...props}><path d="m5 12 5 5 9-11"/></svg>;
    case "x":      return <svg {...props}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "dot":    return <svg {...props}><circle cx="12" cy="12" r="3"/></svg>;
    default: return null;
  }
};

// ───── live badge ─────
const StatusBadge = ({ labels, tzLabel, compact = false }) => {
  const { status, timeStr, color } = useMSKStatus();
  const label = labels?.[status] || status;
  return (
    <span className="status-badge" style={{ "--status-c": color }}>
      <span className="sb-dot" />
      <span className="sb-label">{label}</span>
      {!compact && <span className="sb-time">{tzLabel} {timeStr}</span>}
    </span>
  );
};

// ───── live counter cell (anchor strip) ─────
// Renders the biggest meaningful unit (Ys Mmo), with a monospace seconds readout below.
const LiveSpan = ({ kind, lang, units }) => {
  const anchor = kind === "live-it" ? CAREER_ANCHORS.it_start : CAREER_ANCHORS.devops_start;
  const v = useLiveCounter(anchor);
  const big = `${v.years}${lang === "ru" ? "" : ""}`;
  const bigUnit = plural(v.years, units.y, lang);
  // second line: months + time-of-day precision, monospace.
  const mo = v.months;
  const sub = lang === "ru"
    ? `${mo} ${plural(mo, units.mo, "ru")} · ${String(v.days).padStart(2,"0")}d ${String(v.hours).padStart(2,"0")}:${String(v.minutes).padStart(2,"0")}:${String(v.seconds).padStart(2,"0")}`
    : `${mo} ${plural(mo, units.mo, "en")} · ${String(v.days).padStart(2,"0")}d ${String(v.hours).padStart(2,"0")}:${String(v.minutes).padStart(2,"0")}:${String(v.seconds).padStart(2,"0")}`;
  return (
    <span className="live-span">
      <span className="lv-big">{big}<span className="lv-unit">{bigUnit}</span></span>
      <span className="lv-sub">{sub}</span>
    </span>
  );
};

Object.assign(window, {
  Cursor, Prompt, AsciiRule, StripePlaceholder, MetaRow, Icon,
  StatusBadge, LiveSpan,
});
