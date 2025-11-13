import { useState } from "react";

export default function FilterChips({
  items,
  onChange,
  initial = "All",
}: {
  items: string[];
  onChange: (v: string) => void;
  initial?: string;
}) {
  const [active, setActive] = useState(initial);

  return (
    <div
      className="
        chips-scroll
        flex gap-2
        overflow-x-auto
        w-full min-w-0
        pb-3
        no-scrollbar
      "
    >
      {items.map((name) => {
        const isActive = active === name;
        return (
          <button
            key={name}
            onClick={() => {
              setActive(name);
              onChange(name);
            }}
            className={`
              shrink-0 h-9 px-3 rounded-full border text-sm transition
              ${isActive ? "chip-active" : "chip hover:bg-ytbg-hover"}
            `}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
