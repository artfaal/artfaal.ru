// ============================================================
// Общие утилиты — используются браузером и Node (generate-cv.js, test.js)
// ============================================================

function calcAge(dateStr) {
  const birth = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function calcYears(dateStr) {
  return Math.floor((new Date() - new Date(dateStr)) / (365.25 * 24 * 3600 * 1000));
}

// Номер секции для ascii-rule: 0-indexed, паддинг до двух цифр.
// Единая точка форматирования — чтобы автонумерация выглядела одинаково на всех страницах.
function sectionN(i) { return String(i).padStart(2, '0'); }

if (typeof module !== 'undefined') module.exports = { calcAge, calcYears, sectionN };
