export function getShortMonth(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

export function getShortTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
}