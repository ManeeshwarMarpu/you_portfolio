
import { useEffect, useRef, useState } from "react";

const SIZE = 18;
const SPEED = 120;

export default function Snake() {
  const [snake, setSnake] = useState<[number, number][]>([[9,9]]);
  const [dir, setDir] = useState<[number, number]>([0,1]);
  const [food, setFood] = useState<[number, number]>([5,5]);
  const [dead, setDead] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir[0] !== 1) setDir([-1,0]);
      if (e.key === "ArrowDown" && dir[0] !== -1) setDir([1,0]);
      if (e.key === "ArrowLeft" && dir[1] !== 1) setDir([0,-1]);
      if (e.key === "ArrowRight" && dir[1] !== -1) setDir([0,1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir]);

  useEffect(() => {
    if (dead) return;
    timer.current = window.setInterval(() => {
      setSnake((prev) => {
        const head: [number, number] = [prev[0][0] + dir[0], prev[0][1] + dir[1]];
        if (head[0] < 0 || head[1] < 0 || head[0] >= SIZE || head[1] >= SIZE) { setDead(true); return prev; }
        if (prev.some(([r,c]) => r===head[0] && c===head[1])) { setDead(true); return prev; }
        const ate = head[0] === food[0] && head[1] === food[1];
        const body = [head, ...prev.slice(0, ate ? prev.length : prev.length - 1)];
        if (ate) {
          let fr=0, fc=0;
          do { fr = Math.floor(Math.random()*SIZE); fc = Math.floor(Math.random()*SIZE); }
          while (body.some(([r,c]) => r===fr && c===fc));
          setFood([fr, fc]);
        }
        return body;
      });
    }, SPEED);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [dir, food, dead]);

  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => i);
  const cell = "clamp(16px, 2vw, 28px)";

  return (
    <main className="p-4 mx-auto max-w-5xl min-h-[calc(100dvh-56px)]">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="bg-card border border-yt rounded-2xl p-4 shadow-yt">
          <h1 className="text-xl font-semibold mb-3 text-yt">Snake</h1>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${SIZE}, ${cell})` }}>
            {cells.map((i) => {
              const r = Math.floor(i / SIZE), c = i % SIZE;
              const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);
              const isHead = snake[0][0] === r && snake[0][1] === c;
              const isFood = food[0] === r && food[1] === c;
              return (
                <div
                  key={i}
                  style={{ width: cell, height: cell }}
                  className={`border border-yt ${
                    isSnake ? (isHead ? "bg-emerald-600" : "bg-emerald-500")
                    : isFood ? "bg-amber-500"
                    : "bg-ytbg-hover"
                  }`}
                />
              );
            })}
          </div>
          <div className="mt-3 text-yt">
            {dead ? "Game over — press Reset" : "Use arrow keys to move"}
          </div>
          <button
            onClick={() => { setSnake([[9,9]]); setDir([0,1]); setFood([5,5]); setDead(false); }}
            className="mt-3 px-3 h-9 rounded-full border border-yt hover:bg-ytbg-hover text-yt"
          >
            Reset
          </button>
        </section>

        <aside className="bg-card border border-yt rounded-2xl p-4">
          <h2 className="font-semibold text-yt mb-2">Rules</h2>
          <p className="text-sm text-yt-muted">Eat the orange squares to grow. Don’t hit walls or yourself.</p>
        </aside>
      </div>
    </main>
  );
}
