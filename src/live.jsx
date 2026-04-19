// Live helpers: MSK-time status, live career counters, and a small hook.

const { useState: useTS, useEffect: useTE } = React;

// ───── MSK time helpers ─────
// Derive MSK components from Date via Intl (avoids hard-coding UTC+3 drift).
function getMSKParts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Moscow",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(d).map((p) => [p.type, p.value]));
  const hour = parseInt(parts.hour, 10);
  const minute = parseInt(parts.minute, 10);
  const weekday = parts.weekday; // Mon, Tue, ...
  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  const mins = hour * 60 + minute;
  return { hour, minute, mins, weekday, isWeekday };
}

// Status rules:
//  weekday 10:00 – 18:30 → working
//  any day 23:30 – 08:30 (wraps) → sleeping
//  weekend, waking → chilling
//  else → online
function deriveStatus(parts = getMSKParts()) {
  const { mins, isWeekday } = parts;
  const sleepStart = 23 * 60 + 30;
  const sleepEnd   = 8  * 60 + 30;
  const isSleeping = mins >= sleepStart || mins < sleepEnd;
  if (isSleeping) return "sleeping";
  const workStart = 10 * 60;
  const workEnd   = 18 * 60 + 30;
  if (isWeekday && mins >= workStart && mins < workEnd) return "working";
  if (!isWeekday) return "chilling";
  return "online";
}

const STATUS_COLORS = {
  working:  "oklch(0.82 0.17 85)",   // amber — same family as accent
  online:   "oklch(0.78 0.14 145)",  // green
  sleeping: "oklch(0.72 0.08 260)",  // muted blue-violet
  chilling: "oklch(0.78 0.14 205)",  // cyan
};

function useMSKStatus() {
  const [parts, setParts] = useTS(getMSKParts);
  useTE(() => {
    // tick every 20s — enough granularity for status transitions
    const iv = setInterval(() => setParts(getMSKParts()), 20000);
    return () => clearInterval(iv);
  }, []);
  const status = deriveStatus(parts);
  const timeStr = `${String(parts.hour).padStart(2,"0")}:${String(parts.minute).padStart(2,"0")}`;
  return { status, timeStr, color: STATUS_COLORS[status] };
}

// ───── Live career counter ─────
// Returns { years, months, days, hours, minutes, seconds } since an anchor ISO.
function diffFromAnchor(anchorIso) {
  const start = new Date(anchorIso);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours   < 0) { hours   += 24; days -= 1; }
  if (days    < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
    months -= 1;
  }
  if (months  < 0) { months  += 12; years -= 1; }

  return { years, months, days, hours, minutes, seconds };
}

// Tick every second. The consumer decides how much precision to render.
function useLiveCounter(anchorIso) {
  const [val, setVal] = useTS(() => diffFromAnchor(anchorIso));
  useTE(() => {
    const iv = setInterval(() => setVal(diffFromAnchor(anchorIso)), 1000);
    return () => clearInterval(iv);
  }, [anchorIso]);
  return val;
}

// Russian pluralisation; for EN we just use [2] (plural) for any n!=1.
function plural(n, forms, lang) {
  if (lang === "en") return n === 1 ? forms[0] : forms[2];
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

Object.assign(window, {
  getMSKParts, deriveStatus, STATUS_COLORS,
  useMSKStatus, useLiveCounter, diffFromAnchor, plural,
});
