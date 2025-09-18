
import { useEffect, useMemo, useRef, useState } from "react";

const EMOJI = ["🚀","🧠","🤖","⚙️","🐍","☕","📦","📈"]; // 8 pairs (16 cards)
const PREVIEW_MS = 2500; 

function shuffledDeck() {
  return [...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5);
}

export default function Memory() {
  const [deck, setDeck] = useState<string[]>(shuffledDeck());
  const [open, setOpen] = useState<number[]>([]);
  const [solved, setSolved] = useState<boolean[]>(Array(16).fill(false));
  const [moves, setMoves] = useState(0);

  // "preview" shows all cards and blocks clicks
  const [preview, setPreview] = useState(true);
  const [bar, setBar] = useState(100); // countdown progress %
  const barTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const done = useMemo(() => solved.every(Boolean), [solved]);

  // Start preview on mount + whenever we reset/deck changes
  useEffect(() => {
    setPreview(true);
    setOpen(Array.from({ length: deck.length }, (_, i) => i)); // show all
    setBar(100);

    // animate progress bar
    const start = performance.now();
    function tick(t: number) {
      const elapsed = t - start;
      const pct = Math.max(0, 100 - (elapsed / PREVIEW_MS) * 100);
      setBar(pct);
      if (elapsed < PREVIEW_MS) {
        barTimer.current = requestAnimationFrame(tick) as unknown as number;
      }
    }
    barTimer.current = requestAnimationFrame(tick) as unknown as number;

    // hide after PREVIEW_MS
    hideTimer.current = window.setTimeout(() => {
      setPreview(false);
      setOpen([]); // flip all back
    }, PREVIEW_MS);

    return () => {
      if (barTimer.current) cancelAnimationFrame(barTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [deck]);

  // Matching logic (only during play, not preview)
  useEffect(() => {
    if (preview || open.length !== 2) return;
    const [a, b] = open;
    if (deck[a] === deck[b]) {
      setSolved((s) => s.map((x, i) => x || i === a || i === b));
      setOpen([]);
    } else {
      const t = setTimeout(() => setOpen([]), 600);
      return () => clearTimeout(t);
    }
    setMoves((m) => m + 1);
  }, [open, deck, preview]);

  function flip(i: number) {
    if (preview || open.length === 2 || open.includes(i) || solved[i]) return;
    setOpen((o) => [...o, i]);
  }

  function reset() {
    setDeck(shuffledDeck());
    setOpen([]);
    setSolved(Array(16).fill(false));
    setMoves(0);
    // preview starts automatically via useEffect on deck change
  }

  return (
    <main className="mx-auto max-w-6xl p-4 space-y-6">
      {/* Hero */}
      <header className="bg-card border border-yt rounded-2xl p-5 shadow-yt">
        <h1 className="text-2xl font-bold text-yt">Memory Match</h1>
        <p className="text-sm text-yt-muted mt-1">
          Preview shows all cards for a moment. Then find the matching pairs in as few moves as possible.
        </p>

        {/* preview countdown bar */}
        {preview && (
          <div className="mt-3 h-1 rounded bg-ytbg-hover overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-100 linear"
              style={{ width: `${bar}%` }}
            />
          </div>
        )}
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(340px,420px),1fr]">
        {/* Grid */}
        <section className="bg-card border border-yt rounded-2xl p-4 shadow-yt">
          {/* strict 4×4, responsive cells, never overflow */}
          <div className="mx-auto w-full max-w-[420px]">
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(4, minmax(70px, 1fr))" }}>
              {deck.map((sym, i) => {
                const show = preview || open.includes(i) || solved[i];
                return (
                  <button
                    key={i}
                    disabled={preview || solved[i]}
                    onClick={() => flip(i)}
                    className={`aspect-square rounded-2xl border border-yt grid place-items-center text-3xl transition
                      ${show ? "bg-card text-yt" : "bg-ytbg-hover hover:bg-card text-yt"}
                      ${preview ? "cursor-default" : ""}
                    `}
                    aria-label={show ? sym : "Hidden card"}
                  >
                    {show ? sym : "?"}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-yt-muted text-sm">
                {preview ? "Memorize the board…" : "Find all pairs!"} &nbsp;•&nbsp;
                Moves: <span className="text-yt">{moves}</span>
                {done && <span className="ml-2">• 🎉 Completed!</span>}
              </div>
              <button
                onClick={reset}
                className="px-3 h-9 rounded-full border border-yt hover:bg-ytbg-hover text-yt"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Side card */}
{/* Side card */}
<aside className="bg-card border border-yt rounded-2xl p-4">
  <h2 className="font-semibold text-yt">How to Play</h2>

  <ul className="mt-2 list-disc list-inside text-sm text-yt-muted space-y-1">
    <li>
      <strong>Preview:</strong> All cards are shown for{" "}
      <strong>{PREVIEW_MS / 1000}s</strong>; clicks are disabled. The green bar
      shows remaining preview time.
    </li>
    <li>
      <strong>Flip two</strong> cards per turn. A completed turn counts as{" "}
      <strong>1 move</strong>.
    </li>
    <li>
      <strong>Match = stay up:</strong> Matching emojis stay face-up and are
      marked solved.
    </li>
    <li>
      <strong>No match:</strong> Cards flip back after ~600ms; then try again.
    </li>
    <li>
      <strong>No re-clicks:</strong> Solved cards can’t be clicked.
    </li>
    <li>
      <strong>Win:</strong> Clear all <strong>{EMOJI.length}</strong> pairs to
      finish. 🎉
    </li>
  </ul>

  <div className="mt-3 text-xs text-yt-muted">
    Tip: Aim for fewer moves. For a harder game, increase pairs to 10 or shorten
    the preview time.
  </div>
</aside>

      </div>
    </main>
  );
}
