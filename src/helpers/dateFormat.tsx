export function getShortMonth(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

export function getShortTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
}

export function formatLocalDate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Source - https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time
// Posted by Adorjan Princz, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-05, License - CC BY-SA 3.0
export function utcDateToLocal(date: Date): Date {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}


export function formatTimeByLocale(time: string): string {
  if (!time) return '';

  const normalized = time.split('.')[0];
  const date = new Date(`1970-01-01T${normalized}`);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}
