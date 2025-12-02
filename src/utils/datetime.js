const pad = (n, len = 2) => String(n).padStart(len, "0");

export const isoToTokyoDatetimeLocal = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const tokyoMs = d.getTime() + 9 * 60 * 60 * 1000;
  const t = new Date(tokyoMs);
  const Y = t.getUTCFullYear();
  const M = pad(t.getUTCMonth() + 1);
  const D = pad(t.getUTCDate());
  const h = pad(t.getUTCHours());
  const m = pad(t.getUTCMinutes());
  const s = pad(t.getUTCSeconds());
  return `${Y}-${M}-${D}T${h}:${m}:${s}`;
};

export const tokyoDatetimeLocalToISOString = (localStr) => {
  if (!localStr) return null;
  const [datePart, timePart = "00:00:00"] = localStr.split("T");
  const [year, month, day] = datePart.split("-").map((v) => parseInt(v, 10));
  const timeParts = timePart.split(":").map((v) => parseInt(v || "0", 10));
  const hour = timeParts[0] || 0;
  const minute = timeParts[1] || 0;
  const second = timeParts[2] || 0;

  const utcMs = Date.UTC(year, month - 1, day, hour - 9, minute, second);
  return new Date(utcMs).toISOString();
};

export const tokyoNowDatetimeLocal = () => {
  const now = new Date();
  return isoToTokyoDatetimeLocal(now.toISOString()).slice(0, 16);
};

export default null;
