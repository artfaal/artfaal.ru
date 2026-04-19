// Shared atoms for v3 — uptime terminal, icons, rules.

const { useState: uStateA, useEffect: uEffA, useMemo: uMemoA } = React;

// ───────── Live wall clock (MSK) ─────────
function useNow(tickMs = 1000) {
  const [now, setNow] = uStateA(() => new Date());
  uEffA(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);
  return now;
}

function diff(from, to) {
  let y = to.getUTCFullYear() - from.getUTCFullYear();
  let mo = to.getUTCMonth() - from.getUTCMonth();
  let d = to.getUTCDate() - from.getUTCDate();
  let h = to.getUTCHours() - from.getUTCHours();
  let mi = to.getUTCMinutes() - from.getUTCMinutes();
  let s = to.getUTCSeconds() - from.getUTCSeconds();
  if (s < 0) { s += 60; mi--; }
  if (mi < 0) { mi += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) {
    const prev = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));
    d += prev.getUTCDate(); mo--;
  }
  if (mo < 0) { mo += 12; y--; }
  return { y, mo, d, h, mi, s };
}
const pad = (n, w = 2) => String(n).padStart(w, "0");

// Terminal-style uptime line: "13y 08mo 14d · 08:24:37"
const UptimeLine = ({ iso, label }) => {
  const now = useNow(1000);
  const dt = uMemoA(() => diff(new Date(iso), now), [now, iso]);
  return (
    <span className="uptime-line">
      <span className="uptime-label">{label}</span>
      <span className="uptime-sep">│</span>
      <span className="uptime-ymd">
        <b>{dt.y}</b>y <b>{pad(dt.mo)}</b>mo <b>{pad(dt.d)}</b>d
      </span>
      <span className="uptime-sep">·</span>
      <span className="uptime-hms">
        {pad(dt.h)}:{pad(dt.mi)}:<em>{pad(dt.s)}</em>
      </span>
    </span>
  );
};

// MSK clock
const MskClock = () => {
  const now = useNow(1000);
  const f = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "Europe/Moscow", hour12: false,
  });
  return <span className="msk-clock">MSK {f.format(now)}</span>;
};

// ───────── Small SVG icons ─────────
const Ico = ({ name }) => {
  const p = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "tg":   return (<svg {...p}><path d="M21 4 3 11l6 2 2 6 4-4 5 4 1-15z"/></svg>);
    case "mail": return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>);
    case "gh":   return (<svg {...p}><path d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.6 2.5 1.1 3.1.9.1-.7.4-1.2.7-1.5-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.5.1 2.8.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>);
    case "blog": return (<svg {...p}><path d="M4 6h16M4 12h16M4 18h10"/></svg>);
    case "in":   return (<svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/></svg>);
    case "dl":   return (<svg {...p}><path d="M12 3v12m-4-4 4 4 4-4M4 21h16"/></svg>);
    case "ext":  return (<svg {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>);
    case "dot":  return (<svg {...p}><circle cx="12" cy="12" r="4"/></svg>);
    case "arrow":return (<svg {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>);
    default:     return null;
  }
};

// ───────── Atoms: tag, rule, status badge ─────────
const Tag = ({ children, tone = "mute" }) => (
  <span className={`tag tag-${tone}`}>{children}</span>
);
const Rule = ({ label }) => (
  <div className="rule-lbl"><span>{label}</span><i/></div>
);

// Status pill: presence dot + "tz_label"
function currentStateMSK(d) {
  const f = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Moscow",
  });
  const [h, m] = f.format(d).split(":").map(Number);
  const mins = h * 60 + m;
  const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/Moscow" }).format(d);
  const weekend = /Sat|Sun/.test(day);
  if (mins >= 1 * 60 && mins < 8 * 60) return "sleeping";
  if (weekend) return "chilling";
  if (mins >= 10 * 60 && mins < 19 * 60) return "working";
  return "online";
}
const StatusBadge = ({ labels }) => {
  const now = useNow(15000);
  const s = currentStateMSK(now);
  return (
    <span className={`status status-${s}`}>
      <i className="status-dot"/>{labels[s]}
    </span>
  );
};

Object.assign(window, { useNow, diff, pad, UptimeLine, MskClock, Ico, Tag, Rule, StatusBadge });
