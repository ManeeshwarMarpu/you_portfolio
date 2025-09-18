import { useMemo, useState } from "react";

type Cell = "" | "X" | "O";
const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function getWinner(board: Cell[]) {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a], line: [a,b,c] as [number,number,number] };
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<Cell>("X");

  const win = useMemo(() => getWinner(board), [board]);
  const full = board.every(Boolean);

  function play(i: number) {
    if (board[i] || win) return;
    const next = [...board]; next[i] = turn;
    setBoard(next); setTurn(turn === "X" ? "O" : "X");
  }

  function reset() {
    setBoard(Array(9).fill(""));
    setTurn("X");
  }

  return (
    <main className="mx-auto max-w-6xl p-4 space-y-6">
      {/* Hero */}
      <header className="bg-card border border-yt rounded-2xl p-5 shadow-yt">
        <h1 className="text-2xl font-bold text-yt">Tic-Tac-Toe</h1>
        <p className="text-sm text-yt-muted mt-1">
          Take turns placing X and O. First to line up three wins.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(340px,420px),1fr]">
        {/* Board */}
        <section className="bg-card border border-yt rounded-2xl p-4 shadow-yt">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[420px] mx-auto">
            {board.map((cell, i) => {
              const isWin = win?.line.includes(i) ?? false;
              return (
                <button
                  key={i}
                  onClick={() => play(i)}
                  className={`aspect-square rounded-2xl border border-yt bg-ytbg-hover hover:bg-card grid place-items-center text-4xl font-bold transition-all
                    ${isWin ? "ring-2 ring-emerald-500" : "hover:scale-[1.02]"}
                  `}
                >
                  <span className={
                    cell === "X" ? "text-emerald-500"
                    : cell === "O" ? "text-sky-500"
                    : "text-yt"
                  }>
                    {cell}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 justify-between max-w-[420px] mx-auto">
            <div className="text-yt">
              {win ? `Winner: ${win.mark}` : full ? "Draw!" : `Turn: ${turn}`}
            </div>
            <button
              onClick={reset}
              className="px-3 h-9 rounded-full border border-yt hover:bg-ytbg-hover text-yt"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Side card to fill space on large screens */}
        <aside className="bg-card border border-yt rounded-2xl p-4">
          <h2 className="font-semibold text-yt">Tips</h2>
          <ul className="mt-2 text-sm text-yt-muted space-y-1 list-disc pl-5">
            <li>Start in a corner or the center for best odds.</li>
            <li>Block forks; create two lines at once.</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
