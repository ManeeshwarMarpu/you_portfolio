const KEY = "search_history_v1";

export function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr.slice(0, 5) : [];
  } catch {
    return [];
  }
}

export function pushSearchHistory(q: string) {
  const term = q.trim();
  if (!term) return;
  const cur = getSearchHistory().filter((x) => x.toLowerCase() !== term.toLowerCase());
  cur.unshift(term);
  localStorage.setItem(KEY, JSON.stringify(cur.slice(0, 5)));
}

export function clearSearchHistory() {
  localStorage.removeItem(KEY);
}
