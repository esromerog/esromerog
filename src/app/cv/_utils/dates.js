// Dates are declared as "YYYY" or "YYYY-MM" (or "present") and rendered as seasons.
const season = (month) => (month <= 5 ? "Spring" : month <= 8 ? "Summer" : "Fall");

function parse(date) {
  const [year, month] = date.split("-").map(Number);
  return { year, month };
}

function formatDate(date) {
  if (date === "present") return "Present";
  const { year, month } = parse(date);
  return month ? `${season(month)}, ${year}` : `${year}`;
}

export function formatRange(start, end) {
  const from = formatDate(start);
  if (!end) return from;
  const to = formatDate(end);
  return from === to ? from : `${from} – ${to}`;
}

export function sortKey(date) {
  if (date === "present") return Infinity;
  const { year, month } = parse(date);
  return year * 12 + (month ?? 6);
}
