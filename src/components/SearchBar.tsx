
import { useEffect, useRef, useState, useCallback } from "react";
import { Search, Clock, Trash2, X } from "lucide-react";
import { getSearchHistory, clearSearchHistory, pushSearchHistory } from "../lib/utils";

export function SearchBar({
  onSubmit,
  initial = "",
}: { onSubmit: (q: string) => void; initial?: string }) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setHistory(getSearchHistory()), []);
  useEffect(() => setQ(initial), [initial]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }, []);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  const submit = (raw: string) => {
    const term = raw.trim();
    onSubmit(term);
    if (term) { pushSearchHistory(term); setHistory(getSearchHistory()); }
    setOpen(false);
  };

  const clear = () => { setQ(""); setOpen(false); onSubmit(""); };

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        className="flex items-stretch"
        onSubmit={(e) => { e.preventDefault(); submit(q); }}
      >
        {/* input + clear */}
        <div className="flex-1 flex items-center rounded-l-full bg-ytbg-hover border border-yt">
          <input
            className="flex-1 h-10 bg-transparent text-yt text-sm px-4 outline-none placeholder-yt-muted"
            placeholder="Search projects, tech, tags…"
            value={q}
            onFocus={() => setOpen(true)}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
          {q && (
            <button
              type="button"
              title="Clear"
              onClick={clear}
              className="h-10 px-2 text-yt-muted hover:text-yt"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* magnifier button (cleaner look) */}
        <button
          type="submit"
          title="Search"
          className="h-10 w-12 rounded-r-full bg-ytbg-hover border border-l-0 border-yt grid place-items-center"
        >
          <Search className="size-5 text-yt-muted" />
        </button>
      </form>

      {/* token-based dropdown */}
      {open && history.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 rounded-xl bg-card border border-yt overflow-hidden shadow-yt">
          {history.map((h) => (
            <button
              key={h}
              onClick={() => submit(h)}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-sm hover:bg-ytbg-hover text-yt"
            >
              <Clock className="size-4 opacity-70" />
              <span className="truncate">{h}</span>
            </button>
          ))}
          <div className="border-t border-yt" />
          <button
            onClick={() => { clearSearchHistory(); setHistory([]); }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-xs text-yt-muted hover:bg-ytbg-hover"
          >
            <Trash2 className="size-4" /> Clear history
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
