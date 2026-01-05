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
